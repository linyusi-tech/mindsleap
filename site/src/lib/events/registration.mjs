import { createHash } from 'node:crypto';

const API = 'https://open.feishu.cn/open-apis';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const json = (data, status = 200) => Response.json(data, {status, headers:{'Cache-Control':'no-store'}});
class SetupError extends Error {}

export function validateApplication(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('请检查申请信息。');
  const result = {};
  for (const [key,label,max,optional] of [['name','姓名',60,false],['company','公司',120,false],['position','职位',80,false],['inviter','邀请人',100,true]]) {
    const value = body[key] ?? '';
    if (typeof value !== 'string' || value.trim().length > max || (!optional && !value.trim()) || /[\u0000-\u001f\u007f]/u.test(value)) throw new Error(`请正确填写${label}。`);
    result[key] = value.trim();
  }
  if (typeof body.phone !== 'string' || body.phone.length > 30) throw new Error('请填写有效的中国大陆手机号。');
  const phone = body.phone.replace(/[\s-]/g, '').replace(/^\+86/, '');
  if (!/^1[3-9]\d{9}$/.test(phone)) throw new Error('请填写有效的中国大陆手机号。');
  if (body.privacyConsent !== true) throw new Error('请阅读并同意活动申请所需的隐私条款。');
  if (typeof body.marketingConsent !== 'boolean' || typeof body.tencentConsent !== 'boolean') throw new Error('请确认授权选择。');
  if (typeof body.requestId !== 'string' || !UUID.test(body.requestId) || (body.website !== undefined && body.website !== '')) throw new Error('请求无效，请刷新页面重试。');
  if (typeof body.submittedAt !== 'string' || body.submittedAt.length > 30 || !Number.isFinite(Date.parse(body.submittedAt)) || new Date(body.submittedAt).toISOString() !== body.submittedAt) throw new Error('提交时间无效，请刷新页面重试。');
  return {...result,submittedAt:body.submittedAt,phone,privacyConsent:true,marketingConsent:false,tencentConsent:body.tencentConsent,requestId:body.requestId};
}

export function buildFields(data) {
  return {
    '您的姓名':data.name, '您的手机号':data.phone, '您的企业':data.company,
    '您的职位':data.position, '邀请人':data.inviter, '渠道':'官网', '申请状态':'待审核',
    'M授权':data.privacyConsent ? '是' : '否', 'T授权':data.tencentConsent ? '是' : '否',
  };
}

export function readConfig(env = process.env) {
  return {enabled:env.EVENT_REGISTRATION_ENABLED === 'true',appId:env.EVENT_FEISHU_APP_ID,appSecret:env.EVENT_FEISHU_APP_SECRET,
    appToken:env.EVENT_FEISHU_APP_TOKEN,wikiToken:env.EVENT_FEISHU_WIKI_TOKEN || 'X0mywEWiripVUxk0sN0caVbwnmg',
    tableId:env.EVENT_FEISHU_TABLE_ID || 'tblgE64FFh8kWYbJ',
    allowedOrigins:(env.EVENT_ALLOWED_ORIGINS || 'https://www.mindsleap.cn,https://mindsleap.cn').split(',').map(s=>s.trim()).filter(Boolean)};
}
export function isConfigured(c) { return Boolean(c.enabled && c.appId && c.appSecret && (c.appToken || c.wikiToken) && c.tableId); }

async function boundedBody(request) {
  if (Number(request.headers.get('content-length') || 0) > 16384) throw new RangeError();
  const reader=request.body?.getReader();if(!reader) throw new Error('empty');
  const chunks=[];let size=0;
  try {
    while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>16384){await reader.cancel();throw new RangeError();}chunks.push(value);}
  } finally {reader.releaseLock();}
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export function createRegistrationHandler(config, fetcher = fetch) {
  // Only short-lived tokens/schema and one-way phone hashes are kept in process memory.
  let token='', tokenExpires=0, base=config.appToken, schemaExpires=0;
  const attempts=new Map();
  async function api(path, options={}) {
    const response=await fetcher(`${API}${path}`,{...options,headers:{'Content-Type':'application/json',...(token?{'Authorization':`Bearer ${token}`} : {}),...options.headers},signal:AbortSignal.timeout(12000)});
    if(!response.ok) throw new Error('upstream_http');
    const result=await response.json();
    if(result.code!==0) throw new Error('upstream_business');
    return result;
  }
  async function prepare() {
    if(Date.now()>=tokenExpires){
      token='';const auth=await api('/auth/v3/tenant_access_token/internal',{method:'POST',body:JSON.stringify({app_id:config.appId,app_secret:config.appSecret})});
      if(!auth.tenant_access_token) throw new Error('no_token');
      token=auth.tenant_access_token;tokenExpires=Date.now()+(Math.min(Number(auth.expire)||7200,7200)-120)*1000;
    }
    if(!base){const result=await api(`/wiki/v2/spaces/get_node?token=${encodeURIComponent(config.wikiToken)}`);if(result.data?.node?.obj_type!=='bitable'||!result.data.node.obj_token)throw new SetupError();base=result.data.node.obj_token;}
    if(Date.now()>=schemaExpires){
      const fields=[];let cursor='';
      do {const result=await api(`/bitable/v1/apps/${encodeURIComponent(base)}/tables/${encodeURIComponent(config.tableId)}/fields?page_size=100${cursor?`&page_token=${encodeURIComponent(cursor)}`:''}`);
        fields.push(...(result.data?.items||[]));cursor=result.data?.has_more?result.data.page_token:'';
        if(result.data?.has_more&&!cursor)throw new SetupError();
      } while(cursor);
      for(const name of ['您的姓名','您的手机号','您的企业','您的职位','邀请人','渠道','申请状态','M授权','T授权']){
        const field=fields.find(f=>f.field_name===name);
        const isConsent=name==='M授权'||name==='T授权';
        const allowed=isConsent?[3]:name==='您的手机号'?[1,13]:name==='渠道'||name==='申请状态'?[1,3]:[1];
        if(!field||!allowed.includes(field.type))throw new SetupError();
        const requiredOptions=isConsent?['是','否']:[name==='渠道'?'官网':'待审核'];
        if(field.type===3&&!requiredOptions.every(value=>field.property?.options?.some(o=>o.name===value)))throw new SetupError();
      }
      schemaExpires=Date.now()+60000;
    }
  }
  return async function submit(request) {
    if(request.method!=='POST')return json({error:'不支持此请求。'},405);
    if(!config.allowedOrigins?.includes(request.headers.get('origin')))return json({error:'请求来源无效。'},403);
    if(!isConfigured(config))return json({error:'申请通道尚未开启，请稍后再试或联系活动邀请人。'},503);
    if(!(request.headers.get('content-type')||'').toLowerCase().startsWith('application/json'))return json({error:'请求格式无效。'},415);
    let data;
    try{data=validateApplication(await boundedBody(request));}
    catch(error){return json({error:error instanceof RangeError?'提交内容过长。':error instanceof SyntaxError?'请求格式无效。':error.message},error instanceof RangeError?413:400);}
    const key=createHash('sha256').update(`${config.appSecret}:${data.phone}`).digest('hex');
    const now=Date.now();for(const [k,v] of attempts)if(now-v.start>600000)attempts.delete(k);
    const prior=attempts.get(key)||{start:now,count:0};
    if(prior.count>=5 || (!attempts.has(key)&&attempts.size>=5000))return json({error:'提交过于频繁，请稍后再试。'},429);
    attempts.set(key,{start:prior.start,count:prior.count+1});
    try {
      await prepare();
      const result=await api(`/bitable/v1/apps/${encodeURIComponent(base)}/tables/${encodeURIComponent(config.tableId)}/records?client_token=${encodeURIComponent(data.requestId)}`,{method:'POST',body:JSON.stringify({fields:buildFields(data)})});
      if(typeof result.data?.record?.record_id!=='string'||!result.data.record.record_id)throw new Error('missing_record');
      return json({ok:true,status:'pending_review',reference:data.requestId.slice(0,8).toUpperCase()});
    }catch(error){
      // Do not expose upstream responses, credentials or applicant information in logs/responses.
      tokenExpires=0;schemaExpires=0;
      return json({error:error instanceof SetupError?'申请通道正在配置中，请联系活动邀请人。':'暂未确认申请是否提交成功。请保留当前页面稍后重试，或联系活动邀请人核对。'},error instanceof SetupError?503:502);
    }
  };
}
