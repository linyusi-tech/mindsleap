# MindsLeap Website Content Tracker

本文件用于管理官网新闻 / 洞察内容的实际推进状态。

`PROJECT_CONTEXT.md` 负责长期稳定规则；
`CONTENT_TRACKER.md` 负责当前任务流转与优先级。

## Workflow

每篇内容统一按以下状态推进：

1. `Inbox`
   已收到原稿或选题，尚未判断栏目与优先级
2. `Drafting`
   已确定为 `events` 或 `insights`，正在改写官网稿
3. `Editing`
   标题、摘要、结构、SEO 表达与品牌口径优化中
4. `Awaiting Image`
   正文已定稿，待确认头图方向或补齐封面图
5. `Previewed`
   已本地预览，确认列表页与详情页显示正常
6. `Ready to Commit`
   内容、图片、frontmatter 已完整，可提交
7. `Published`
   已提交到 Git，必要时已推送

## Working Rules

- 一篇文章尽量对应一个独立提交，避免混入无关改动
- 同时进行中的内容最好不超过 3 篇，减少上下文切换
- 先冻结标题、摘要、栏目和 slug，再进入头图制作
- `site/content/news` 只放已进入制作阶段的正式稿件
- `site/public/images/news` 只放最终采用的头图成品

## Current Items

| Priority | Title | Category | Source | Target File | Image | Status | Next Action | Notes |
|---|---|---|---|---|---|---|---|---|
| P0 | 杨炯纬：龙虾 AI 员工实践洞察 | insights | `/Users/lincoln/lincoln-copaw-worker/memory/content/01_interviews/杨炯纬/杨炯纬访谈精华总结_龙虾AI员工的实践与智慧_20260408.md` | `/Users/lincoln/Claude-workspace/mindsleap-website/site/content/news/ai-agent-seo-experiment-yang-jiongwei-2026.mdx` | `/Users/lincoln/Claude-workspace/mindsleap-website/site/public/images/news/ai-agent-seo-experiment-yang-jiongwei-2026.png` | Previewed | 确认是否提交 Git | 正文与头图已接入，待发布前最后确认 |
| P0 | 陆蓉之：AI 重启人生洞察 | insights | `/Users/lincoln/lincoln-copaw-worker/memory/content/01_interviews/陆蓉之/陆蓉之访谈精华总结_宝藏萌奶奶的AI重启人生_20260408.md` | `/Users/lincoln/Claude-workspace/mindsleap-website/site/content/news/lu-rongzhi-ai-restart-life-2026.mdx` | `/Users/lincoln/Claude-workspace/mindsleap-website/site/public/images/news/lu-rongzhi-ai-restart-life-2026.png` | Previewed | 确认是否提交 Git | 正文与头图已接入，构建通过，待发布前最后确认 |

## Review Checklist

每篇发布前至少确认以下项目：

- frontmatter 是否完整：`title` `date` `excerpt` `category` `locale` `author` `image`
- 是否符合栏目规则：`events` 与 `insights` 不混用
- 标题与摘要是否适合搜索引擎理解
- 小标题是否清晰，是否便于快速扫描
- 结尾是否包含 `关于 MindsLeap 心智悦动`
- 新闻列表页与详情页是否显示正常
- 改动是否仅限内容发布相关文件
