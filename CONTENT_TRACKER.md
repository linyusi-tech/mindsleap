# MindsLeap Website Content Tracker

本文件用于管理官网新闻 / 洞察内容的实际推进状态。

`PROJECT_CONTEXT.md` 负责长期稳定规则；
`CONTENT_TRACKER.md` 负责当前任务流转与优先级。

## Workflow

每篇内容统一按以下状态推进：

1. `Inbox`
   已收到原稿或选题，尚未判断栏目与优先级
2. `Drafting`
   已确定为 `events` 或 `insights`，正在改写中文官网稿
3. `Editing`
   标题、摘要、结构、SEO 表达与品牌口径优化中
4. `English Drafting`
   中文稿已基本稳定，正在生成或打磨英文官网稿
5. `Awaiting Image`
   正文已定稿，待确认头图方向或补齐封面图
6. `Previewed`
   已本地预览，确认中英文列表页与详情页显示正常
7. `Ready to Commit`
   中英文内容、图片、frontmatter 已完整，可提交
8. `Published`
   已提交到 Git，必要时已推送

## Working Rules

- 一篇文章尽量对应一个独立提交，避免混入无关改动
- 同时进行中的内容最好不超过 3 篇，减少上下文切换
- 先冻结标题、摘要、栏目和 slug，再进入头图制作
- 中文稿放在 `site/content/news/zh`
- 英文稿放在 `site/content/news/en`
- 中英文稿默认使用同一个 slug
- `site/public/images/news` 只放最终采用的头图成品
- 若英文稿暂未完成，英文站不会展示该篇文章

## Current Items

| Priority | Title | Category | Source | ZH File | EN File | Image | Status | Next Action | Notes |
|---|---|---|---|---|---|---|---|---|---|
| P0 | AI龙虾上海站活动回顾 | events | `/Users/lincoln/Downloads/2026-04-20-ai龙虾-上海站-嘉宾内容摘要.md` | `/Users/lincoln/Claude-workspace/mindsleap-website/site/content/news/zh/ai-lobster-shanghai-2026.mdx` | `/Users/lincoln/Claude-workspace/mindsleap-website/site/content/news/en/ai-lobster-shanghai-2026.mdx` | `/Users/lincoln/Claude-workspace/mindsleap-website/site/public/images/news/ai-lobster-shanghai-2026-cover.jpg` | Previewed | 提交并推送 Git | 中英文稿、配图与本地预览已完成，构建通过 |
| P0 | Token 经济学：企业智能调用能力 | insights | 原创洞察 | `/Users/lincoln/Claude-workspace/mindsleap-website/site/content/news/zh/token-economics-enterprise-ai-2026.mdx` | `/Users/lincoln/Claude-workspace/mindsleap-website/site/content/news/en/token-economics-enterprise-ai-2026.mdx` | `/Users/lincoln/Claude-workspace/mindsleap-website/site/public/images/news/token-economics-enterprise-ai-2026.png` | Previewed | 本地预览中英文新闻列表与详情 | 已补英文版并加 AI 翻译说明 |
| P1 | 张珣：硬科技投资与 AI 创业双重身份 | insights | `/Users/lincoln/lincoln-copaw-worker/memory/content/01_interviews/张珣/张珣访谈精华总结_硬科技投资与AI创业的双重身份_20260408.md` | `/Users/lincoln/Claude-workspace/mindsleap-website/site/content/news/zh/andy-zhang-hard-tech-ai-founder-investor-2026.mdx` | `/Users/lincoln/Claude-workspace/mindsleap-website/site/content/news/en/andy-zhang-hard-tech-ai-founder-investor-2026.mdx` | `/Users/lincoln/Claude-workspace/mindsleap-website/site/public/images/news/andy-zhang-hard-tech-ai-founder-investor-2026.png` | Previewed | 本地预览英文详情页 | 已补英文版并加 AI 翻译说明 |
| P1 | 杨炯纬：龙虾 AI 员工实践洞察 | insights | `/Users/lincoln/lincoln-copaw-worker/memory/content/01_interviews/杨炯纬/杨炯纬访谈精华总结_龙虾AI员工的实践与智慧_20260408.md` | `/Users/lincoln/Claude-workspace/mindsleap-website/site/content/news/zh/ai-agent-seo-experiment-yang-jiongwei-2026.mdx` | `/Users/lincoln/Claude-workspace/mindsleap-website/site/content/news/en/ai-agent-seo-experiment-yang-jiongwei-2026.mdx` | `/Users/lincoln/Claude-workspace/mindsleap-website/site/public/images/news/ai-agent-seo-experiment-yang-jiongwei-2026.png` | Previewed | 本地预览英文详情页 | 已补英文版并加 AI 翻译说明 |
| P1 | 陆蓉之：AI 重启人生洞察 | insights | `/Users/lincoln/lincoln-copaw-worker/memory/content/01_interviews/陆蓉之/陆蓉之访谈精华总结_宝藏萌奶奶的AI重启人生_20260408.md` | `/Users/lincoln/Claude-workspace/mindsleap-website/site/content/news/zh/lu-rongzhi-ai-restart-life-2026.mdx` | `/Users/lincoln/Claude-workspace/mindsleap-website/site/content/news/en/lu-rongzhi-ai-restart-life-2026.mdx` | `/Users/lincoln/Claude-workspace/mindsleap-website/site/public/images/news/lu-rongzhi-ai-restart-life-2026.png` | Previewed | 本地预览英文详情页 | 已补英文版并加 AI 翻译说明 |

## Review Checklist

每篇发布前至少确认以下项目：

- frontmatter 是否完整：`title` `date` `excerpt` `category` `locale` `author` `image`
- 中英文稿是否使用同一个 slug
- 英文稿是否为英文官网表达，而不是逐句直译
- 英文稿末尾是否标注：`This article was translated and adapted from the Chinese original with AI assistance.`
- 是否符合栏目规则：`events` 与 `insights` 不混用
- 标题与摘要是否适合搜索引擎理解
- 小标题是否清晰，是否便于快速扫描
- 结尾是否包含 `关于 MindsLeap 心智悦动`
- 英文稿结尾是否包含 `About MindsLeap`
- 中英文新闻列表页与详情页是否显示正常
- 改动是否仅限内容发布相关文件
