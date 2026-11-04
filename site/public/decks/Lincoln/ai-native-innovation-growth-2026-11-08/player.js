/* Offline, single-file presentation UI. Load after the official deck-stage.js. */
(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  const mode = params.has('preview') ? 'preview' : params.has('presenter') ? 'presenter' : 'audience';
  document.documentElement.dataset.mlMode = mode;
  const CHANNEL = 'mindsleap-innovation-20261108';
  const $ = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text != null) el.textContent = String(text);
    return el;
  };
  const button = (label, action, className = '') => {
    const el = $('button', className, label);
    el.type = 'button';
    el.addEventListener('click', action);
    return el;
  };
  const isTyping = target => target instanceof Element && Boolean(target.closest('input, textarea, select, [contenteditable="true"]'));
  const validURL = value => {
    try { if (typeof value !== 'string' || !value.trim()) return null; const url = new URL(value, location.href); return /^https?:$/.test(url.protocol) ? url : null; }
    catch { return null; }
  };
  const send = (target, action, values = {}) => {
    try { if (target && !target.closed) target.postMessage({ channel: CHANNEL, action, ...values }, '*'); }
    catch { /* A window can be closed between checking it and posting. */ }
  };

  async function boot() {
    const stage = document.getElementById('deck');
    if (!stage) return;
    if (window.customElements) await customElements.whenDefined('deck-stage');
    // The official component exposes this host protocol to suppress its own
    // control overlay. Our toolbar is the only visible presentation control.
    window.postMessage({ __omelette_presenting: true }, '*');
    const slides = Array.from(stage.querySelectorAll(':scope > section.slide'));
    if (!slides.length) return;
    let raw = [];
    try { raw = JSON.parse(document.getElementById('speaker-notes')?.textContent || '[]'); }
    catch (error) { console.warn('Speaker notes could not be parsed.', error); }
    const notes = slides.map((slide, index) => ({
      title: slide.querySelector('h1,h2')?.textContent || `第 ${index + 1} 页`,
      section: '', minutes: '', notes: [], transition: '', sources: [], caution: '',
      ...(Array.isArray(raw) && raw[index] && typeof raw[index] === 'object' ? raw[index] : {}),
    }));
    const total = slides.length;
    const clamp = value => Math.max(0, Math.min(total - 1, Math.trunc(Number(value) || 0)));
    const initial = Number(params.get('slide'));
    let current = params.has('slide') ? clamp(initial - 1) : clamp(stage.index);
    let presenterWindow = null;
    const presenterWindowName = `mindsleap-presenter-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    let previewFrame = null;
    let dialog = null;
    let restoreFocus = null;
    let outlineObserver = null;
    let blackout = false;
    let toolbar = null;
    let idleTimeout = 0;
    let toastTimeout = 0;
    let ui;

    function metadata(index) {
      const n = notes[index];
      return [`第 ${index + 1} / ${total} 页`, n.section, n.minutes ? `${n.minutes} 分钟` : ''].filter(Boolean).join(' · ');
    }
    function addSources(parent, index) {
      const box = $('section', 'ml-sources');
      box.append($('h3', '', '来源与进一步阅读'));
      const list = $('ul');
      const sources = Array.isArray(notes[index].sources) ? notes[index].sources : [];
      sources.forEach(source => {
        const url = validURL(source?.url);
        if (!url) return;
        const item = $('li');
        const link = $('a', '', source.label || url.hostname);
        link.href = url.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        item.append(link, $('span', 'ml-source-domain', url.hostname));
        list.append(item);
      });
      if (list.childElementCount) box.append(list);
      else box.append($('p', 'ml-dialog-meta', '本页为分享者的分析或讨论设计；具体事实来源见相关案例页。'));
      parent.append(box);
    }
    function addNotes(parent, index, sourcesOnly = false) {
      const n = notes[index];
      parent.append($('div', 'ml-note-meta', metadata(index)));
      if (!sourcesOnly) {
        const copy = $('div', 'ml-notes-copy');
        const paragraphs = Array.isArray(n.notes) ? n.notes : [n.notes];
        paragraphs.filter(Boolean).forEach(text => copy.append($('p', '', text)));
        if (n.transition) {
          copy.append($('h3', '', '转场'));
          copy.append($('div', 'ml-transition', n.transition));
        }
        parent.append(copy);
      }
      if (n.caution) parent.append($('div', 'ml-caution', n.caution));
      addSources(parent, index);
    }
    function notify(text) {
      if (!ui) return;
      clearTimeout(toastTimeout);
      let toast = ui.querySelector('.ml-toast');
      if (!toast) { toast = $('div', 'ml-toast'); toast.setAttribute('role', 'status'); ui.append(toast); }
      toast.textContent = text;
      toast.hidden = false;
      toastTimeout = setTimeout(() => { toast.hidden = true; }, 4500);
    }
    function closeDialog() {
      if (!dialog) return;
      dialog.remove();
      dialog = null;
      outlineObserver?.disconnect();
      outlineObserver = null;
      stage.removeAttribute('inert');
      toolbar?.removeAttribute('inert');
      ui.querySelector('.ml-presenter')?.removeAttribute('inert');
      if (restoreFocus instanceof HTMLElement && restoreFocus.isConnected) restoreFocus.focus({ preventScroll: true });
      restoreFocus = null;
      showToolbar();
    }
    function openDialog(type) {
      if (mode === 'preview') return;
      closeDialog();
      restoreFocus = document.activeElement;
      const backdrop = $('div', 'ml-dialog-backdrop');
      const panel = $('section', `ml-dialog${type === 'outline' ? ' is-outline' : ''}`);
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'true');
      panel.setAttribute('aria-labelledby', 'ml-dialog-title');
      panel.tabIndex = -1;
      const header = $('header', 'ml-dialog-header');
      const heading = $('h2', '', type === 'outline' ? '演示目录' : `${type === 'sources' ? '来源' : '讲述备注'} · ${notes[current].title}`);
      heading.id = 'ml-dialog-title';
      const close = button('×', closeDialog, 'ml-dialog-close');
      close.setAttribute('aria-label', '关闭弹层（Esc）');
      header.append(heading, close);
      const content = $('div', 'ml-dialog-content');
      if (type === 'outline') {
        content.append($('p', 'ml-dialog-meta', `${total} 页 · 点击缩略图跳转 · 按 Esc 返回`));
        const grid = $('div', 'ml-outline-grid');
        outlineObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(entries => {
          entries.forEach(entry => entry.target.style.setProperty('--thumb-scale', String(entry.contentRect.width / 1920)));
        }) : null;
        slides.forEach((slide, index) => {
          const card = button('', () => { closeDialog(); navigate(index); }, 'ml-outline-card');
          card.setAttribute('aria-label', `跳到第 ${index + 1} 页：${notes[index].title}`);
          if (index === current) card.setAttribute('aria-current', 'page');
          const thumb = $('div', 'ml-thumb');
          thumb.setAttribute('aria-hidden', 'true');
          const canvas = $('div', 'ml-thumb-canvas');
          const clone = slide.cloneNode(true);
          clone.removeAttribute('id'); clone.removeAttribute('hidden'); clone.setAttribute('inert', '');
          clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
          clone.querySelectorAll('script, iframe, video, audio').forEach(el => el.remove());
          clone.querySelectorAll('a, button, input, select, textarea, [tabindex]').forEach(el => el.setAttribute('tabindex', '-1'));
          canvas.append(clone); thumb.append(canvas);
          const caption = $('div', 'ml-outline-caption');
          caption.append($('span', 'ml-outline-number', String(index + 1).padStart(2, '0')), $('span', 'ml-outline-title', notes[index].title));
          card.append(thumb, caption); grid.append(card);
          outlineObserver?.observe(thumb);
        });
        content.append(grid);
      } else addNotes(content, current, type === 'sources');
      panel.append(header, content); backdrop.append(panel);
      backdrop.addEventListener('click', event => { if (event.target === backdrop) closeDialog(); });
      dialog = backdrop;
      ui.append(backdrop);
      stage.setAttribute('inert', ''); toolbar?.setAttribute('inert', '');
      ui.querySelector('.ml-presenter')?.setAttribute('inert', '');
      close.focus();
    }
    function showToolbar() {
      if (!toolbar) return;
      toolbar.classList.remove('is-idle');
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        if (!dialog && !toolbar.contains(document.activeElement)) toolbar.classList.add('is-idle');
      }, 3600);
    }
    function update() {
      if (mode === 'presenter') renderPresenter();
      if (toolbar) {
        toolbar.querySelector('input').value = String(current + 1);
        toolbar.querySelector('[data-direction="previous"]').disabled = current === 0;
        toolbar.querySelector('[data-direction="next"]').disabled = current === total - 1;
      }
      const live = ui?.querySelector('.ml-page-live');
      if (live) live.textContent = `第 ${current + 1} 页：${notes[current].title}`;
    }
    function localNavigate(index) {
      current = clamp(index);
      stage.goTo(current);
      update();
    }
    function navigate(index) {
      const next = clamp(index);
      if (mode === 'presenter' && window.opener && !window.opener.closed) {
        send(window.opener, 'navigate', { index: next });
        // Optimistic update keeps the controls responsive; the audience confirms state.
        current = next; update(); send(previewFrame?.contentWindow, 'state', { index: current });
      } else {
        localNavigate(next);
        if (mode === 'presenter') send(previewFrame?.contentWindow, 'state', { index: current });
      }
      showToolbar();
    }
    function openPresenter() {
      const url = new URL(location.href);
      url.searchParams.delete('preview');
      url.searchParams.set('presenter', '1');
      url.searchParams.set('slide', String(current + 1));
      presenterWindow = window.open(url.href, presenterWindowName, 'popup,width=1440,height=940');
      if (!presenterWindow) notify('浏览器拦截了演讲者窗口。请允许弹出窗口，再点击「演讲者」。');
      else { presenterWindow.focus(); notify('演讲者窗口已打开；将此观众窗口放到投影屏幕。'); }
    }
    async function fullscreen() {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
        else notify('此浏览器不支持网页全屏，请使用浏览器的全屏功能。');
      } catch { notify('未能进入全屏，请使用浏览器的全屏功能。'); }
    }
    function setBlackout(value) {
      blackout = Boolean(value);
      let cover = ui?.querySelector('.ml-blackout');
      if (blackout && !cover) {
        cover = $('div', 'ml-blackout'); cover.setAttribute('aria-label', '黑屏，按 B 或 Esc 退出');
        cover.addEventListener('click', () => setBlackout(false)); ui.append(cover);
      } else if (!blackout && cover) cover.remove();
      if (mode === 'audience') send(presenterWindow, 'state', { index: current, blackout });
      showToolbar();
    }
    function createToolbar() {
      toolbar = $('nav', 'ml-toolbar');
      toolbar.setAttribute('aria-label', '演示控制');
      const prev = button('←', () => navigate(current - 1));
      prev.dataset.direction = 'previous'; prev.setAttribute('aria-label', '上一页');
      const next = button('→', () => navigate(current + 1));
      next.dataset.direction = 'next'; next.setAttribute('aria-label', '下一页');
      const field = $('label', 'ml-page-field');
      field.append($('span', 'ml-sr-only', '跳转页码'));
      const input = $('input'); input.type = 'number'; input.min = '1'; input.max = String(total); input.value = String(current + 1); input.inputMode = 'numeric';
      input.addEventListener('change', () => navigate(Number(input.value) - 1));
      input.addEventListener('keydown', event => { if (event.key === 'Enter') { navigate(Number(input.value) - 1); input.blur(); } });
      field.append(input, $('span', '', `/ ${total}`));
      toolbar.append(prev, field, next, $('span', 'ml-toolbar-divider'));
      const items = [['目录', 'O', () => openDialog('outline')], ['备注', 'N', () => openDialog('notes')], ['来源', 'S', () => openDialog('sources')], ['演讲者', 'P', openPresenter], ['全屏', 'F', fullscreen], ['黑屏', 'B', () => setBlackout(true)]];
      items.forEach(([label, key, action]) => {
        const item = button(label, action); item.append($('kbd', '', key)); item.title = `${label}（${key}）`; toolbar.append(item);
      });
      for (const [label, file] of [['PPT', 'ai-native-innovation-growth-2026-11-08.pptx'], ['PDF', 'ai-native-innovation-growth-2026-11-08.pdf']]) {
        const link = $('a', 'ml-download', label); link.href = file; link.download = file; link.title = '下载 ' + label; toolbar.append(link);
      }
      toolbar.addEventListener('pointerenter', showToolbar);
      toolbar.addEventListener('focusin', showToolbar);
      ui.append(toolbar);
      document.addEventListener('pointermove', showToolbar, { passive: true });
      document.addEventListener('pointerdown', showToolbar, { passive: true });
      showToolbar();
    }

    let presenter;
    function createPresenter() {
      presenter = $('main', 'ml-presenter');
      const top = $('header', 'ml-presenter-top');
      const identity = $('div'); identity.append($('div', 'ml-presenter-brand', 'MindsLeap · 演讲者视图'), $('div', 'ml-presenter-status', '正在连接观众窗口…'));
      top.append(identity, button('目录 O', () => openDialog('outline')));
      const layout = $('div', 'ml-presenter-layout');
      const left = $('section');
      previewFrame = $('iframe', 'ml-presenter-preview');
      previewFrame.title = '当前演示页预览'; previewFrame.tabIndex = -1;
      const url = new URL(location.href); url.searchParams.delete('presenter'); url.searchParams.set('preview', '1'); url.searchParams.set('slide', String(current + 1));
      previewFrame.src = url.href;
      const controls = $('div', 'ml-presenter-controls');
      const previous = button('← 上一页', () => navigate(current - 1)); previous.dataset.direction = 'previous';
      const next = button('下一页 →', () => navigate(current + 1)); next.dataset.direction = 'next';
      const black = button('观众黑屏 B', () => {
        if (window.opener && !window.opener.closed) send(window.opener, 'blackout', { value: !blackout });
        else notify('未连接观众窗口。请从演示稿点击「演讲者」重新打开。');
      });
      controls.append(previous, next, black);
      const upcoming = $('div', 'ml-presenter-next'); upcoming.append($('small', '', '下一页'), $('strong'));
      left.append(previewFrame, $('div', 'ml-presenter-page'), $('h1', 'ml-presenter-title'), controls, upcoming);
      createTimer(left);
      left.append($('p', 'ml-presenter-help', '← → 翻页 · O 目录 · N 备注 · S 来源 · B 观众黑屏 · 计时由你手动开始'));
      const notePanel = $('article', 'ml-presenter-notes'); notePanel.append($('h2', '', '讲述备注'), $('div', 'ml-presenter-note-content'));
      layout.append(left, notePanel); presenter.append(top, layout); ui.append(presenter);
      renderPresenter();
      send(window.opener, 'ready');
      // Also resend after the preview document is available, including file:// loads.
      previewFrame.addEventListener('load', () => send(previewFrame.contentWindow, 'state', { index: current }));
      setInterval(() => {
        const connected = Boolean(window.opener && !window.opener.closed);
        presenter.querySelector('.ml-presenter-status').textContent = connected ? '已连接观众窗口 · 本窗口的备注不会投影' : '未连接观众窗口 · 请从演示稿的「演讲者」按钮打开';
      }, 1500);
    }
    function renderPresenter() {
      if (!presenter) return;
      presenter.querySelector('.ml-presenter-page').textContent = metadata(current);
      presenter.querySelector('.ml-presenter-title').textContent = notes[current].title;
      presenter.querySelector('.ml-presenter-next strong').textContent = current + 1 < total ? notes[current + 1].title : '已到最后一页';
      presenter.querySelector('[data-direction="previous"]').disabled = current === 0;
      presenter.querySelector('[data-direction="next"]').disabled = current === total - 1;
      const content = presenter.querySelector('.ml-presenter-note-content');
      if (content.dataset.index !== String(current)) {
        content.replaceChildren(); addNotes(content, current); content.dataset.index = String(current);
        presenter.querySelector('.ml-presenter-notes').scrollTop = 0;
      }
    }
    function createTimer(parent) {
      let accumulated = 0; let started = null;
      const timer = $('div', 'ml-timer');
      const displayWrap = $('div'); const display = $('div', 'ml-timer-display', '00:00');
      display.setAttribute('aria-label', '累计讲述时间');
      displayWrap.append(display, $('span', 'ml-timer-label', '分享 45 分钟 · 讨论 15 分钟'));
      const elapsed = () => accumulated + (started === null ? 0 : performance.now() - started);
      const refresh = () => { const seconds = Math.floor(elapsed() / 1000); display.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`; };
      const toggle = button('开始计时', () => {
        if (started === null) { started = performance.now(); toggle.textContent = '暂停'; }
        else { accumulated = elapsed(); started = null; toggle.textContent = '继续'; }
        refresh();
      });
      const reset = button('重置', () => { accumulated = 0; started = null; toggle.textContent = '开始计时'; refresh(); });
      timer.append(displayWrap, toggle, reset); parent.append(timer); setInterval(refresh, 250);
    }

    // Capture prevents the stage's own shortcuts from firing behind a modal or form.
    window.addEventListener('keydown', event => {
      if (mode === 'preview') { event.stopImmediatePropagation(); return; }
      if (dialog) {
        if (event.key === 'Escape') { event.preventDefault(); closeDialog(); }
        else if (event.key === 'Tab') {
          const focusable = Array.from(dialog.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), [tabindex="0"]'));
          const first = focusable[0]; const last = focusable[focusable.length - 1];
          if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { event.preventDefault(); last?.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        }
        event.stopImmediatePropagation(); return;
      }
      if (isTyping(event.target)) {
        if (event.key === 'Enter' && event.target === toolbar?.querySelector('input')) {
          event.preventDefault(); navigate(Number(event.target.value) - 1); event.target.blur();
        }
        event.stopImmediatePropagation(); return;
      }
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const key = event.key.toLowerCase();
      if (blackout && (key === 'escape' || key === 'b')) {
        event.preventDefault(); event.stopImmediatePropagation();
        if (mode === 'presenter') send(window.opener, 'blackout', { value: false }); else setBlackout(false);
        return;
      }
      if (mode === 'presenter' && ['arrowright', 'arrowleft', 'pagedown', 'pageup', 'home', 'end', ' '].includes(key)) {
        event.preventDefault(); event.stopImmediatePropagation();
        navigate(key === 'home' ? 0 : key === 'end' ? total - 1 : current + (['arrowleft', 'pageup'].includes(key) ? -1 : 1)); return;
      }
      const actions = { o: () => openDialog('outline'), n: () => openDialog('notes'), s: () => openDialog('sources'), p: () => { if (mode === 'audience') openPresenter(); }, f: fullscreen, b: () => {
        if (mode === 'presenter') send(window.opener, 'blackout', { value: !blackout }); else setBlackout(!blackout);
      } };
      if (actions[key]) { event.preventDefault(); event.stopImmediatePropagation(); actions[key](); }
      showToolbar();
    }, true);

    window.addEventListener('message', event => {
      const data = event.data;
      if (!data || data.channel !== CHANNEL) return;
      if (mode === 'preview') {
        if (event.source === window.parent && data.action === 'state' && Number.isInteger(data.index)) localNavigate(data.index);
      } else if (mode === 'presenter') {
        if (event.source === previewFrame?.contentWindow && data.action === 'ready') send(previewFrame.contentWindow, 'state', { index: current });
        if (event.source !== window.opener) return;
        if (data.action === 'state' && Number.isInteger(data.index)) {
          current = clamp(data.index); blackout = Boolean(data.blackout); update();
          send(previewFrame?.contentWindow, 'state', { index: current });
        }
      } else if (event.source === presenterWindow) {
        if (data.action === 'ready') send(presenterWindow, 'state', { index: current, blackout });
        if (data.action === 'navigate' && Number.isInteger(data.index)) { localNavigate(data.index); send(presenterWindow, 'state', { index: current, blackout }); }
        if (data.action === 'blackout' && typeof data.value === 'boolean') setBlackout(data.value);
      }
    });
    stage.addEventListener('slidechange', event => {
      if (mode === 'presenter') return;
      current = clamp(event.detail?.index ?? stage.index); update();
      if (mode === 'audience') send(presenterWindow, 'state', { index: current, blackout });
    });
    if (mode !== 'preview') {
      ui = $('div', 'ml-player-ui'); ui.id = 'ml-player-ui';
      const live = $('div', 'ml-sr-only ml-page-live'); live.setAttribute('aria-live', 'polite'); live.setAttribute('aria-atomic', 'true');
      ui.append(live); document.body.append(ui);
      if (mode === 'presenter') createPresenter(); else createToolbar();
    }
    localNavigate(current);
    if (mode === 'preview') send(window.parent, 'ready');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
