const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const sent = [];
let deliveryError = null;
const exportsObject = {};
const source = fs.readFileSync('src/app/api/contact/route.ts', 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
vm.runInNewContext(compiled, {
  exports: exportsObject, process: { env: {} }, console: { error() {} },
  require(name) {
    if (name === 'resend') return { Resend: class {
      emails = { send: async (mail) => { sent.push(mail); return { error: deliveryError }; } };
    } };
    if (name === 'next/server') return { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } };
    if (name === '@/lib/site') return { getContactEmail: () => 'test@example.com' };
    throw new Error(name);
  },
});
const submit = (body) => exportsObject.POST({ json: async () => body });
(async () => {
  for (const body of [null, [], {}, { name: 'Test', email: 'test@example.com' },
    { name: 'Test', phone: 'abc1234' }, { name: ' ', phone: '13800138000' },
    { name: 'Test', phone: '13800138000', email: 'invalid' }]) {
    assert.equal((await submit(body)).status, 400);
  }
  assert.equal(sent.length, 0);
  assert.equal((await submit({ name: 'Test', phone: '13800138000' })).status, 200);
  assert.match(sent[0].html, /13800138000/);
  assert.equal(sent[0].replyTo, undefined);
  assert.equal((await submit({ name: 'Test', phone: '+86 138 0013 8000', email: 'test@example.com', message: '<script>x</script>' })).status, 200);
  assert.equal(sent[1].replyTo, 'test@example.com');
  assert.match(sent[1].html, /&lt;script&gt;/);
  deliveryError = { message: 'Test failure' };
  assert.equal((await submit({ name: 'Test', phone: '13800138000' })).status, 500);
  const form = fs.readFileSync('src/components/contact/ContactContent.tsx', 'utf8');
  assert.match(form, /phone: formData.get\("phone"\)/);
  assert.match(form, /name="phone"[\s\S]*?required/);
  console.log('Contact tests passed: validation, phone-only lead, optional email, escaping, delivery failure, phone payload.');
})().catch((error) => { console.error(error); process.exitCode = 1; });
