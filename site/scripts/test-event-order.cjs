const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const { test, after } = require('node:test');
const ts = require('typescript');

const site = path.resolve(__dirname, '..');
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'mindsleap-event-order-'));
after(() => fs.rmSync(fixture, { recursive: true, force: true }));

function loadPosts(cwd) {
  const cache = new Map();
  function load(file) {
    if (cache.has(file)) return cache.get(file).exports;
    const module = { exports: {} };
    cache.set(file, module);
    const localRequire = createRequire(file);
    const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
    }).outputText;
    vm.runInNewContext(code, {
      module, exports: module.exports, Date, console,
      process: { cwd: () => cwd },
      require: id => id.startsWith('@/')
        ? load(path.join(site, 'src', id.slice(2) + '.ts'))
        : localRequire(id),
    }, { filename: file });
    return module.exports;
  }
  return load(path.join(site, 'src/lib/posts.ts'));
}

for (const lang of ['zh', 'en']) {
  const dir = path.join(fixture, 'content/news', lang);
  fs.mkdirSync(dir, { recursive: true });
  for (const [slug, date, eventDate, category = 'events'] of [
    ['backfill', '2026-11-18', '2026-11-06'],
    ['recent', '2026-11-13', '2026-11-12'],
    ['same-day', '2026-11-12', '2026-11-12'],
    ['missing', '2026-11-09', null],
    ['invalid', '2026-11-08', 'not-a-date'],
    ['impossible', '2026-11-07', '2026-02-30'],
    ['timestamp', '2026-11-05', '2026-11-18T00:00:00Z'],
    ['insight', '2026-11-04', '2099-12-31', 'ai-insights'],
    ['talk', '2026-11-03', '2099-12-31', 'founders-talk'],
    ['yaml-date', '2026-11-02', '2026-11-01'],
  ]) {
    fs.writeFileSync(path.join(dir, slug + '.mdx'),
      `---\ntitle: "${slug}"\ndate: "${date}"\ncategory: "${category}"\n` +
      (eventDate === null ? '' : `eventDate: ${slug === 'yaml-date' ? eventDate : JSON.stringify(eventDate)}\n`) +
      `---\nOriginal article body.\n`);
  }
}

const posts = loadPosts(fixture);
test('events sort by occurrence, non-events by publication, with deterministic ties', () => {
  assert.equal(posts.getAllPosts('zh').map(p => p.slug).join(','),
    'recent,same-day,missing,invalid,impossible,backfill,timestamp,insight,talk,yaml-date');
});
test('missing, invalid, impossible and timestamp dates preserve the article and fall back', () => {
  for (const slug of ['missing', 'invalid', 'impossible', 'timestamp']) {
    const post = posts.getPostBySlug(slug);
    assert.ok(post);
    assert.equal(post.eventDate, undefined);
  }
});
test('publication date and body remain unchanged', () => {
  const post = posts.getPostBySlug('backfill');
  assert.equal(post.date, '2026-11-18');
  assert.equal(post.eventDate, '2026-11-06');
  assert.equal(post.content.trim(), 'Original article body.');
});
test('unquoted YAML dates and bilingual ordering work', () => {
  assert.equal(posts.getPostBySlug('yaml-date').eventDate, '2026-11-01');
  assert.equal(posts.getAllPosts('zh').map(p => p.slug).join(','), posts.getAllPosts('en').map(p => p.slug).join(','));
});
test('backfilled events remain readable and bilingual occurrence dates agree', () => {
  const actual = loadPosts(site);
  for (const lang of ['zh', 'en']) {
    for (const slug of actual.getAllPostSlugsByLocale(lang)) {
      const source = fs.readFileSync(path.join(site, 'content/news', lang, slug + '.mdx'), 'utf8');
      if (/^eventDate:/m.test(source)) assert.ok(actual.getPostBySlug(slug, lang), slug);
    }
  }
  for (const post of actual.getAllPosts('zh').filter(p => p.eventDate)) {
    const en = actual.getPostBySlug(post.slug, 'en');
    if (en) assert.equal(post.eventDate, en.eventDate, post.slug);
  }
});
