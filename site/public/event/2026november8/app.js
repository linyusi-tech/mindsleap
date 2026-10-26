(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const form = $('registration-form');
  const preview = ['127.0.0.1','localhost','::1','[::1]'].includes(location.hostname) || location.protocol === 'file:';
  const endpoint = '/api/events/2026november8';
  let busy = false, complete = false, submission = null;
  const uuid = () => crypto.randomUUID();
  $('preview-notice').hidden = !preview;
  if (preview) { $('submit-label').textContent = '预览提交效果'; $('preview-reset').hidden = false; }
  const clearError = id => {const el=$(id);el.removeAttribute('aria-invalid');$(id+'-error').textContent='';};
  for (const id of ['name','phone','company','position','inviter']) {
    $(id).setAttribute('aria-describedby', id === 'phone' ? 'phone-note phone-error' : id+'-error');
    $(id).addEventListener('input', () => { clearError(id); submission=null; $('submit-error').hidden=true; });
  }
  for (const id of ['privacy-consent','tencent-consent']) $(id).addEventListener('change', () => {submission=null;$('submit-error').hidden=true;if(id==='privacy-consent'){$('privacy-error').textContent='';$(id).removeAttribute('aria-invalid');}});
  const error = (id,message) => { $(id+'-error').textContent=message;$(id).setAttribute('aria-invalid','true'); };
  function validate() {
    let first = null;
    for (const [id,label,max] of [['name','姓名',60],['company','公司',120],['position','职位',80],['inviter','邀请人',100]]) {
      clearError(id);const value=$(id).value.trim();
      if ((id!=='inviter'&&!value)||value.length>max||/[\u0000-\u001f\u007f]/.test(value)) {error(id,`请正确填写${label}`);first ||= $(id);}
    }
    clearError('phone');const phone=$('phone').value.replace(/[\s-]/g,'').replace(/^\+86/,'');
    if(!/^1[3-9]\d{9}$/.test(phone)){error('phone','请填写有效的中国大陆手机号');first ||= $('phone');}
    $('privacy-error').textContent='';$('privacy-consent').removeAttribute('aria-invalid');
    if(!$('privacy-consent').checked){$('privacy-error').textContent='请阅读并同意本次活动所需的隐私条款';$('privacy-consent').setAttribute('aria-invalid','true');first ||= $('privacy-consent');}
    if(first){first.focus();return null;}
    return {name:$('name').value.trim(),phone,company:$('company').value.trim(),position:$('position').value.trim(),inviter:$('inviter').value.trim(),privacyConsent:true,marketingConsent:false,tencentConsent:$('tencent-consent').checked,website:$('website').value};
  }
  function showSuccess(reference) {
    complete=true;$('form-content').hidden=true;$('success-panel').hidden=false;
    $('success-title').textContent=preview?'预览：申请已提交':'申请已提交，等待审核';
    $('success-description').textContent=preview?'这是提交后的演示效果。本次填写未发送至飞书，也未保存。正式申请审核通过后，运营会通过微信联系并邀请入群。':'审核通过后，运营会通过微信与你联系，并邀请加入活动群。';
    $('reference').textContent=preview?'演示申请 · 未产生真实报名记录':`申请编号：${reference}`;
    $('success-panel').focus();$('mobile-cta').textContent='查看申请状态 ↑';updateBar();
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();if(busy||complete)return;
    const values=validate();if(!values)return;
    if(!submission)submission={...values,requestId:uuid(),submittedAt:new Date().toISOString()};
    busy=true;$('submit-button').disabled=true;$('submit-label').textContent='正在提交…';$('submit-error').hidden=true;form.setAttribute('aria-busy','true');
    // Keep the exact payload for retries after an uncertain network result.
    for(const input of form.querySelectorAll('input'))input.disabled=true;
    try {
      if(preview){await new Promise(resolve=>setTimeout(resolve,450));showSuccess('DEMO');form.reset();}
      else {
        const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),45000);
        try{
          const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(submission),signal:controller.signal,credentials:'same-origin'});
          const result=await response.json().catch(()=>null);
          if(!response.ok||result?.ok!==true||result?.status!=='pending_review')throw new Error(result?.error||'暂未确认提交结果，请保留此页面并稍后重试。');
          showSuccess(result.reference);form.reset();
        }finally{clearTimeout(timer);}
      }
    }catch(e){$('submit-error').textContent=e.name==='AbortError'?'网络连接超时，暂未确认提交结果。请保留此页面并稍后重试，或联系活动邀请人核对。':e.message||'提交暂未完成，请稍后重试。';$('submit-error').hidden=false;}
    finally{busy=false;$('submit-button').disabled=false;$('submit-label').textContent=preview?'预览提交效果':'提交参会申请';form.removeAttribute('aria-busy');for(const input of form.querySelectorAll('input'))input.disabled=false;}
  });
  $('preview-reset').addEventListener('click',()=>{complete=false;submission=null;form.reset();$('success-panel').hidden=true;$('form-content').hidden=false;$('mobile-cta').textContent='申请参加 ↑';$('name').focus();updateBar();});
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  for(const link of document.querySelectorAll('a[href="#apply"]'))link.addEventListener('click',e=>{e.preventDefault();$('apply').scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'});$('apply').focus({preventScroll:true});});
  function updateBar(){
    const rect=$('apply').getBoundingClientRect();
    const keyboardVisible=window.visualViewport && window.innerHeight-window.visualViewport.height>150;
    $('mobile-bar').hidden = window.innerWidth>850 || rect.bottom>90 || keyboardVisible;
  }
  new IntersectionObserver(updateBar,{threshold:[0,.1,1]}).observe($('apply'));
  window.addEventListener('scroll',updateBar,{passive:true});window.addEventListener('resize',updateBar);
  window.visualViewport?.addEventListener('resize',updateBar);updateBar();
  // Enable fields only after all submission handlers have been installed.
  $('registration-fields').disabled=false;
  $('copy-address').addEventListener('click',async()=>{const address='上海市浦东新区张江高科盛荣路88弄，盛大天地源创谷会议中心·银河厅';try{await navigator.clipboard.writeText(address);$('copy-status').textContent='地址已复制';}catch{$('copy-status').textContent=address;}});
})();
