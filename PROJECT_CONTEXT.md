# MindsLeap Website Project Context

本文件用于在新线程、新 project，或切换模型后，快速恢复 `mindsleap-website` 项目的关键上下文。

建议在新的对话开头直接说明：

`请先阅读 /Users/lincoln/Claude-workspace/mindsleap-website/PROJECT_CONTEXT.md，再继续处理网站更新。`

## 1. 项目定位

- 仓库根目录：`/Users/lincoln/Claude-workspace/mindsleap-website`
- 网站代码目录：`/Users/lincoln/Claude-workspace/mindsleap-website/site`
- 资源素材目录：`/Users/lincoln/Claude-workspace/mindsleap-website/Asset`
- 上传资料目录：`/Users/lincoln/Claude-workspace/mindsleap-website/Upload`

这是一个以 `Next.js App Router` 构建的官网项目，日常更新主要集中在：

- 页面文案与版块内容
- 新闻 / 洞察文章发布
- 封面图与配图更新
- 首页与新闻列表的展示逻辑

## 2. 内容发布目录约定

新闻与洞察文章统一放在：

- `site/content/news`

封面图通常放在：

- `site/public/images/news`

文章 URL slug 通常与文件名保持一致。

## 3. 栏目规则

站点的新闻内容分两类：

- `events`：活动、发布会、研讨会、Workshop、线下动态
- `insights`：洞察、观点、方法论、行业分析、AI 实践总结

当前约定：

- 首页新闻区按顺序展示两个模块：最新活动、最新洞察；两个模块默认各展示最新 3 篇
- `/news` 页面默认展示 `events`
- 用户点击“全部”或“洞察”时，才展示 `insights`

如果新增文章，需要先判断它属于活动报道还是洞察内容，不要混用。

## 4. 洞察文章发布规范

洞察文章默认作者信息：

`作者：王林Lincoln | MindsLeap创始人 | Founders Space合伙人 | 企业家AI俱乐部创始人`

洞察文章默认补充要求：

- 改写成适合官网发布的分析型内容
- 表达要更适合 SEO 与品牌官网，而不是采访原稿或口述稿风格
- 标题、摘要、小标题需要清晰，便于搜索引擎理解
- 结尾统一加上 `关于 MindsLeap 心智悦动`

建议结构：

1. 标题
2. 摘要 / 导语
3. 分节正文
4. 可执行建议或方法总结
5. `关于 MindsLeap 心智悦动`

## 5. 已确认的站点行为

以下行为之前已经调整过，后续修改时不要误改回去：

- 首页按顺序展示最新 `events` 与最新 `insights` 两个模块
- 新闻页默认 tab 为活动
- 新闻详情从列表点击进入时，需要确保页面滚动位置正确，标题可见

相关代码位置：

- `site/src/app/[locale]/page.tsx`
- `site/src/components/news/NewsListClient.tsx`
- `site/src/components/news/NewsArticleClient.tsx`

## 6. 图片与头图工作流

文章头图常用 16:9。

若需要生成新闻 / 洞察头图，当前可使用本地生图网关：

- `/Users/lincoln/Documents/Playground/claw_course_prototype/tools/image_gateway.py`

当前流程建议：

1. 先为文章写出 2 到 3 个候选 prompt
2. 用户确认风格方向后再生成
3. 将最终图片放到 `site/public/images/news`
4. 在对应 MDX 中更新封面图路径

如果文章配图涉及人物合影或活动现场：

- 裁切时优先避免截掉头部
- 可适当多保留腿部或下半身空间
- 先本地预览再确认

## 7. 本地开发与预览

进入网站目录：

`/Users/lincoln/Claude-workspace/mindsleap-website/site`

常规开发命令：

```bash
npm run dev
```

此前本地预览常使用：

- [http://127.0.0.1:3001](http://127.0.0.1:3001)

如果已有开发服务在跑，优先复用，不要重复启动多个端口实例。

## 8. Git 协作习惯

- Git 仓库根目录是 `mindsleap-website`
- 实际开发常在 `site` 目录执行命令
- 提交前先确认没有误带入无关文件
- 若只是发布文章，通常改动应集中在 `content/news`、`public/images/news` 以及少量列表逻辑文件

## 9. 已完成的重要更新

以下内容已经完成，并已进入主线工作上下文：

- AI 培训页面内容重构
- 广州活动新闻发布
- Token Economics 洞察文章发布
- Software CLI 洞察文章发布
- 首页与新闻页的 `events / insights` 展示逻辑修正
- 新闻详情页锚点 / 标题可见性问题修正

部分已知提交记录：

- `a87f335` Add token economics insight article
- `b035835` Add software CLI insight article

## 10. 当前工作快照（2026-04-08）

目前已新增但尚未提交的本地文章草稿：

- `site/content/news/ai-agent-seo-experiment-yang-jiongwei-2026.mdx`

来源原稿：

- `/Users/lincoln/lincoln-copaw-worker/memory/content/01_interviews/杨炯纬/杨炯纬访谈新闻稿_龙虾AI员工春节值班记_20260408.md`

这篇内容已经被改写为适合官网发布的洞察文章，并已做过本地预览，但是否提交、是否补头图，需要根据最新对话继续判断。

## 11. 新线程建议开场方式

如果未来要把这个工作切到新的线程，推荐直接这样说：

```text
请先阅读 /Users/lincoln/Claude-workspace/mindsleap-website/PROJECT_CONTEXT.md。
项目根目录是 /Users/lincoln/Claude-workspace/mindsleap-website，网站代码在 /site。
这次我要继续更新官网的新闻 / 洞察内容，请基于这个上下文继续。
```

如果任务和具体文章有关，再额外补充：

- 原稿路径
- 目标栏目是 `events` 还是 `insights`
- 是否需要生成头图
- 是否需要本地预览
- 是否需要提交并推送 Git
