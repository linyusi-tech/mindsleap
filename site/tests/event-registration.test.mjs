import test from 'node:test';
import assert from 'node:assert/strict';
import { validateApplication, buildFields, createRegistrationHandler } from '../src/lib/events/registration.mjs';

const id='51bcc211-ec9b-44d2-903a-414146c2da77';
const input={name:' 测试姓名 ',phone:'+86 138-0000-0000',company:'测试公司',position:'负责人',inviter:'',privacyConsent:true,marketingConsent:false,tencentConsent:false,requestId:id,submittedAt:'2026-10-26T08:00:00.000Z',website:''};
const config={enabled:true,appId:'test-app',appSecret:'test-secret',appToken:'test-base',tableId:'test-table',allowedOrigins:['https://www.mindsleap.cn']};
const makeRequest=(body=input,origin='https://www.mindsleap.cn')=>new Request('https://www.mindsleap.cn/api/events/2026november8',{method:'POST',headers:{'Content-Type':'application/json','Origin':origin},body:JSON.stringify(body)});

test('normalizes mainland phone and permits optional Tencent consent declined',()=>{
 const result=validateApplication(input);assert.equal(result.name,'测试姓名');assert.equal(result.phone,'13800000000');assert.equal(result.tencentConsent,false);
});
test('rejects blank company, malformed phone and spoofed consent',()=>{
 for(const patch of [{company:' '},{phone:'123'},{privacyConsent:false},{privacyConsent:'true'},{tencentConsent:'false'},{name:[]},{inviter:'x'.repeat(101)},{requestId:'bad'},{website:'spam'},{submittedAt:'bad'}]) assert.throws(()=>validateApplication({...input,...patch}));
});
test('server mapping pins channel and omits fee/sales/client supplied extras',()=>{
 const data=validateApplication({...input,channel:'其他',费用:999,销售:'恶意值'});
 const f=buildFields(data,new Date('2026-10-26T08:00:00Z'));
 assert.equal(f['渠道'],'官网');assert.equal(f['申请状态'],'待审核');assert.equal(f['您的手机号'],'13800000000');assert.ok(!('费用' in f));assert.ok(!('销售' in f));
 const consent=JSON.parse(f['授权记录']);assert.equal(consent.tencent,false);assert.equal(consent.mindsleapMarketing,false);assert.equal(consent.privacy,true);assert.equal(consent.requestId,id);assert.equal(consent.submittedAt,'2026-10-26T08:00:00.000Z');
});
test('disabled or unconfigured handler fails closed without upstream request',async()=>{
 const handler=createRegistrationHandler({...config,appSecret:''},()=>{throw Error('must not call');});
 assert.equal((await handler(makeRequest())).status,503);
});
test('untrusted origins and invalid payloads never reach Feishu',async()=>{
 const handler=createRegistrationHandler(config,()=>{throw Error('must not call');});
 assert.equal((await handler(makeRequest(input,'https://evil.test'))).status,403);
 assert.equal((await handler(makeRequest({...input,privacyConsent:false}))).status,400);
});
const schema=[['您的姓名',1],['您的手机号',1],['您的企业',1],['您的职位',1],['邀请人',1],['渠道',3],['申请状态',1],['授权记录',1]].map(([field_name,type])=>({field_name,type,property:field_name==='渠道'?{options:[{name:'官网'}]}:{}}));
function network(recordBody={code:0,data:{record:{record_id:'rec-test'}}},schemaItems=schema){
 const calls=[];return {calls,fetch:async(url,options)=>{calls.push({url:String(url),options});
 if(String(url).endsWith('/auth/v3/tenant_access_token/internal')) return Response.json({code:0,tenant_access_token:'test-access-token',expire:7200});
 if(String(url).includes('/fields')) return Response.json({code:0,data:{items:schemaItems,has_more:false}});
 if(String(url).includes('/records?')) return Response.json(recordBody);
 throw Error('unexpected upstream');
 }};
}
test('only confirmed Feishu records return success and retries preserve idempotency token',async()=>{
 const net=network();const handler=createRegistrationHandler(config,net.fetch);
 for(let i=0;i<2;i++){const response=await handler(makeRequest());assert.equal(response.status,200);assert.deepEqual(await response.json(),{ok:true,status:'pending_review',reference:'51BCC211'});}
 const creates=net.calls.filter(c=>c.url.includes('/records?'));assert.equal(creates.length,2);
 for(const c of creates){assert.equal(new URL(c.url).searchParams.get('client_token'),id);const fields=JSON.parse(c.options.body).fields;assert.equal(fields['渠道'],'官网');assert.ok(!('费用' in fields));}
});
test('business failures, missing record IDs and upstream errors never claim success',async()=>{
 for(const body of [{code:1254045,msg:'secret upstream details'},{code:0,data:{}},{}]){
 const handler=createRegistrationHandler(config,network(body).fetch);const response=await handler(makeRequest());assert.equal(response.status,502);assert.ok(!(await response.text()).includes('secret'));
 }
 const handler=createRegistrationHandler(config,async()=>{throw Error('timeout with token');});assert.equal((await handler(makeRequest())).status,502);
});
test('missing consent field prevents writing an untraceable application',async()=>{
 const net=network(undefined,schema.filter(x=>x.field_name!=='授权记录'));const response=await createRegistrationHandler(config,net.fetch)(makeRequest());assert.equal(response.status,503);assert.equal(net.calls.filter(x=>x.url.includes('/records?')).length,0);
});
test('rejects excessive body length before parsing',async()=>{
 const request=makeRequest({...input,company:'x'.repeat(17000)});assert.equal((await createRegistrationHandler(config,()=>{throw Error('no');})(request)).status,413);
});
test('retry produces an identical record payload across network uncertainty',async()=>{
 const net=network();const handler=createRegistrationHandler(config,net.fetch);
 const body={...input,submittedAt:'2026-10-26T08:00:00.000Z'};
 await handler(makeRequest(body));await new Promise(r=>setTimeout(r,5));await handler(makeRequest(body));
 const writes=net.calls.filter(c=>c.url.includes('/records?'));assert.equal(writes[0].options.body,writes[1].options.body);
});

test('event registration never grants MindsLeap marketing consent',()=>{
 for(const marketingConsent of [false,true]){
  const result=validateApplication({...input,marketingConsent});
  assert.equal(result.marketingConsent,false);
  const consent=JSON.parse(buildFields(result)['授权记录']);
  assert.equal(consent.mindsleapMarketing,false);
  assert.equal(consent.mindsleapMarketingMethod,'not_requested_on_event_form');
  assert.equal(consent.policyVersion,'2026-10-26-v2');
 }
});
