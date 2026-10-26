'use strict';

const phases = [
  { id:'phase-1', title:'第一次学习：个人驾驭 AI，让个体效率 10X', meta:'第一次学习 · 3 天 · Day 1—3', days:[
    ['启动 AI 原生组织的转型之旅','理解 AI 原生组织新范式；智能体的本体论：数据、逻辑、行为与安全；企业数据盘点：唯一的真相在哪里？','构建决策者的第二大脑，让未来的 AI 员工充分了解你。','第二大脑，可以被 Agent 灵活调用的记忆体'],
    ['第一位 AI 员工上线','AI 员工的角色定位；如何让 AI 员工获得技能并不断优化；如何构建第一个 AI 项目。','搭建符合 AI 时代、持续进行 GEO 优化的官网。','网站原型、维护工作流与 GEO 策略'],
    ['AI 员工的能力增强','如何通过 MCP、CLI 实现 Agent 能力的大幅提升；善于利用外部可信 Skill 提升自身 AI 员工的能力。','实战创建你的 AI 秘书并与你的第二大脑连接；连接飞书实现外部工具调用。','AI 秘书原型，让 AI 来管理你的行程，记住重要的人与事']
  ]},
  { id:'phase-2', title:'第二次学习：构建赋能团队的 AI，AI 驱动的增长引擎', meta:'第二次学习 · 3 天 · Day 4—6', days:[
    ['AI 品牌、市场调研与内容团队','建立品牌战略 Agent 的方法；创建 AI 内容生产引擎；AI 短视频创作与分发的工作流。','构建让 Agent 使用的品牌资产中心，实现内容创作与分发的自动化。','AI 品牌资产库、AI 内容创作中心（图文内容与视频二选一）'],
    ['AI 销冠辅助系统','AI 赋能销冠能力规模化的方法；个性化销前准备与跟进机会。','根据客户与场景，生产自适应的介绍方案。','解决方案 AI 自动生成系统'],
    ['AI 销售助手，不错失每一个销售机会','AI 原生轻量化 CRM 系统；客户评分系统设计；语音录入线索、跟进提醒与跟进策略；用飞书实现针对销售个体的数据中台。','实现 AI 销售助手的原型与打磨。','AI 销售助手']
  ]},
  { id:'phase-3', title:'第三次学习：用 AI 重构经营，组织与商业模式创新', meta:'第三次学习 · 4 天 · Day 7—10', days:[
    ['搭建企业 AI 决策中枢','以决策为中心的 AI 系统设计；企业决策的层级设计。','梳理决策所需要的数据、逻辑以及行为；学习数据可视化方法，实战企业 AI 决策看板 Demo。','第一个 AI 经营决策看板'],
    ['AI 时代的企业治理与文化','AI 时代的企业文化；模型架构选择与数据安全；公司 AI 使用政策与员工条款；AI 领导力：如何让员工不站在企业 AI 战略的对立面。','围绕本企业项目，制定试点边界、权限规则、组织沟通与推广路线。','公司 AI 政策、组织变革路线图'],
    ['Innovation Day 创新日：设计你的登月计划 Moonshot Project','颠覆式创新、MIT 创新矩阵与第二增长曲线。','分组头脑风暴所在行业的 AI 颠覆式机会，形成可继续验证的方向。','AI+行业的创新 Demo 或研究方向'],
    ['企业参访与 Demo Day','走进 AI 企业，观察真实业务中的人机协作、数据系统与应用边界。','成果展示，邀请投资人与产业伙伴参与交流，优秀创新方向有机会获得投资或孵化支持。','项目展示、评审反馈与下一阶段行动方向']
  ]}
];

let dayIndex = 0;
const curriculumList = document.querySelector('#curriculum-list');
if (curriculumList) {
  curriculumList.innerHTML = phases.map((phase) => `<details class="phase" id="${phase.id}" open><summary><span class="phase-index">0${phases.indexOf(phase)+1}</span><span class="phase-title">${phase.title}<small>${phase.meta}</small></span><span class="toggle-symbol" aria-hidden="true">＋</span></summary><div>${phase.days.map(day => { dayIndex++; return `<article class="day"><span class="day-label">DAY ${String(dayIndex).padStart(2,'0')}</span><div><h4>${day[0]}</h4><div class="day-columns"><p><b>${dayIndex === 10 ? '上午 · 企业参访' : '上午 · 认知与方法'}</b>${day[1]}</p><p><b>${dayIndex === 10 ? '下午 · 成果展示' : '下午 · 实战与共创'}</b>${day[2]}</p></div><p class="day-output"><strong>当日交付</strong>${day[3]}</p></div></article>`; }).join('')}</div></details>`).join('');
}

const allPhases = [...document.querySelectorAll('.phase')];
const expandButton = document.querySelector('#expand-curriculum');
function syncExpandButton() {
  const expanded = allPhases.every(phase => phase.open);
  expandButton.setAttribute('aria-expanded', String(expanded));
  expandButton.innerHTML = `${expanded ? '收起全部' : '展开全部'} <span aria-hidden="true">${expanded ? '−' : '＋'}</span>`;
}
expandButton.addEventListener('click', () => {
  const expand = !allPhases.every(phase => phase.open);
  allPhases.forEach(phase => { phase.open = expand; });
  syncExpandButton();
});
allPhases.forEach(phase => phase.addEventListener('toggle', syncExpandButton));
document.querySelectorAll('[data-phase-link]').forEach(link => link.addEventListener('click', () => {
  document.getElementById(link.dataset.phaseLink).open = true;
}));
function openLinkedPhase() {
  const phase = allPhases.find(item => '#'+item.id === location.hash);
  if (phase) phase.open = true;
}
openLinkedPhase();
window.addEventListener('hashchange', openLinkedPhase);

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('#mobile-menu');
function closeMenu() { menu.hidden = true; menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','打开导航'); }
menuButton.addEventListener('click', () => {
  menu.hidden = !menu.hidden;
  menuButton.setAttribute('aria-expanded', String(!menu.hidden));
  menuButton.setAttribute('aria-label', menu.hidden ? '打开导航' : '关闭导航');
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
window.matchMedia('(min-width:801px)').addEventListener('change', closeMenu);

const navLinks = [...document.querySelectorAll('.nav-track a')];
const navSections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
let scrollPending = false;
function updateActiveSection() {
  let current = navSections[0];
  for (const section of navSections) if (section.getBoundingClientRect().top <= 140) current = section;
  navLinks.forEach(link => {
    if (link.getAttribute('href') === '#'+current.id) link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  });
  scrollPending = false;
}
window.addEventListener('scroll', () => { if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateActiveSection); } }, {passive:true});
updateActiveSection();

const extraInput = document.querySelector('#extra-members');
const decrease = document.querySelector('#decrease');
const increase = document.querySelector('#increase');
let extra = 0;
function updatePrice(value) {
  extra = Math.max(0, Math.min(20, Math.trunc(Number(value) || 0)));
  extraInput.value = extra;
  document.querySelector('#price-total').textContent = (128000 + extra*10000).toLocaleString('en-US');
  document.querySelector('#team-summary').textContent = `最多 ${4+extra} 人，共同推进 1 个企业主项目。`;
  decrease.disabled = extra === 0;
  increase.disabled = extra === 20;
}
extraInput.addEventListener('input', () => updatePrice(extraInput.value));
decrease.addEventListener('click', () => updatePrice(extra-1));
increase.addEventListener('click', () => updatePrice(extra+1));

const dialog = document.querySelector('#consult-dialog');
const entry = document.querySelector('#consult-entry');
const review = document.querySelector('#consult-review');
const dialogForm = entry.querySelector('form');
let lastTrigger = null;
function showConsult(trigger) {
  closeMenu();
  lastTrigger = trigger || document.activeElement;
  entry.hidden = false; review.hidden = true;
  dialog.setAttribute('aria-labelledby','consult-title');
  dialog.showModal(); document.body.classList.add('modal-open');
  dialogForm.elements.name.focus();
}
document.querySelectorAll('[data-consult]').forEach(button => button.addEventListener('click', () => showConsult(button)));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); if (lastTrigger) lastTrigger.focus(); });

// Consultation stays client-side. Only the visitor can send the generated email.
document.querySelectorAll('.consult-form').forEach(form => {
  const contactInput = form.elements.contact;
  form.querySelectorAll('input').forEach(input => input.addEventListener('input', () => input.setCustomValidity('')));
  form.addEventListener('submit', event => {
    event.preventDefault();
    for (const field of ['name','company','contact']) {
      const input = form.elements[field];
      if (!input.value.trim()) { input.setCustomValidity('请填写此项'); input.reportValidity(); return; }
    }
    const contact = contactInput.value.trim();
    const digits = contact.replace(/\D/g, '').length;
    const isPhone = /^\+?[\d\s()-]{7,22}$/.test(contact) && digits >= 7 && digits <= 15;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) && !isPhone) {
      contactInput.setCustomValidity('请填写有效的手机号或邮箱'); contactInput.reportValidity(); return;
    }
    const data = new FormData(form);
    if (form !== dialogForm) {
      ['name','company','contact','interest'].forEach(key => { dialogForm.elements[key].value = data.get(key); });
      dialogForm.elements.challenge.value = '';
      lastTrigger = form.querySelector('button');
    }
    const content = `MindsLeap 团队，你们好：\n\n我想了解「AI 原生组织跃迁实战营」。\n\n称呼：${String(data.get('name')).trim()}\n企业：${String(data.get('company')).trim()}\n联系方式：${contact}\n关注方向：${data.get('interest')}\n计划团队：1 位企业家 + 最多 ${3+extra} 位员工\n参考费用：¥${(128000+extra*10000).toLocaleString('en-US')} / 企业\n${data.get('challenge') ? '\n业务问题：'+String(data.get('challenge')).trim()+'\n' : ''}\n请与我沟通具体排期、项目适配情况与服务范围。`;
    document.querySelector('#enquiry-preview').textContent = content;
    document.querySelector('#send-enquiry').href = `mailto:mindsleap@gmail.com?subject=${encodeURIComponent('AI 原生组织跃迁实战营 · 企业咨询')}&body=${encodeURIComponent(content)}`;
    entry.hidden = true; review.hidden = false;
    dialog.setAttribute('aria-labelledby','review-title');
    document.querySelector('#copy-status').textContent = '收件人：mindsleap@gmail.com。发送前可继续编辑。';
    if (!dialog.open) { dialog.showModal(); document.body.classList.add('modal-open'); }
    document.querySelector('#review-title').focus();
  });
});
document.querySelector('#edit-enquiry').addEventListener('click', () => {
  entry.hidden = false; review.hidden = true; dialog.setAttribute('aria-labelledby','consult-title'); dialogForm.elements.name.focus();
});
document.querySelector('#copy-enquiry').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(document.querySelector('#enquiry-preview').textContent);
    document.querySelector('#copy-status').textContent = '已复制。可粘贴到邮件中，发送至 mindsleap@gmail.com。';
  } catch {
    const range = document.createRange(); range.selectNodeContents(document.querySelector('#enquiry-preview'));
    const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
    document.querySelector('#copy-status').textContent = '内容已选中，可使用系统复制功能。';
  }
});

let beforePrintState = [];
window.addEventListener('beforeprint', () => {
  beforePrintState = [...document.querySelectorAll('details')].map(item => [item,item.open]);
  beforePrintState.forEach(([item]) => { item.open = true; });
});
window.addEventListener('afterprint', () => beforePrintState.forEach(([item,open]) => { item.open = open; }));
