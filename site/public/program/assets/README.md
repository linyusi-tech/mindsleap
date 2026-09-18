# AI 原生组织跃迁计划页面

入口：`../../ai-native-organization.html`。纯静态 HTML/CSS/JS，可直接用浏览器打开，无构建或服务器依赖。

## 内容和布局

内容依据本轮产品方案与原海报，使用 3＋3＋4 天、四次诊断、128,000 元/企业与 1＋3 席位；不沿用旧版日期、返现和早鸟赠品。

布局参考：https://executive-ed.xpro.mit.edu/ai-for-senior-executives-program

采用全幅头图、咨询区、事实条、课程收益、学习旅程、课程折叠、师资、FAQ。没有使用 MIT 品牌、师资、案例或课程文案。

品牌依据：https://www.mindsleap.ai/design-system/README.md 与 colors_and_type.css，读取于 2026-09-15。白色/中性灰为主，蓝色 #1e477c 用于重点；单 MindsLeap 标识与中文成对。使用当前目录已有 Logo 与 Lincoln 肖像。

用户明确允许生成主题视觉，故本页头图采用生成图，并标注“非实际教学场地”；该选择是相对品牌默认真实照片规则的本任务特例。字距为 0。通用加减、箭头作为符号；菜单使用 Heroicons 官方素材。

## 图片替换

| 文件 | 来源 | 用途 |
|---|---|---|
| hero.webp | 内置 image_gen，主题视觉 | 首屏全幅图，推荐替换尺寸 2400×1350 或更高 |
| workshop.webp | 用户原海报，裁切 (0,645,750,1050) | 实战现场 |
| classroom.webp | 用户原海报，裁切 (0,4288,750,4600) | 课堂现场 |
| visit.webp | 用户原海报，裁切 (48,10648,702,10920) | 往期智谱 AI 参访 |
| yusi.webp | 用户原海报，裁切 (323,13917,427,14017) | Yusi 肖像占位 |
| bingzhou.webp | 用户原海报，裁切 (548,13917,653,14017) | 李冰洲肖像占位 |

真实照片没有经过生成式重绘。可用相同文件名替换高清 WebP，并更新 HTML 宽高及必要的 object-position；如果替换头图为真实活动照片，同步更新图片说明。

裁切源：`/Users/lincoln/Downloads/Weixin Image_20260909134406_496_952.jpg`；脚本：`scripts/prepare_ai_native_assets.py`。运行脚本会重新生成本页占位素材，换高清图后不要直接重跑覆盖。

## 头图生成记录

模式：内置 image_gen；接口未指定具体模型版本，不声称使用了用户举例的“2.5”。原图保留在 `/Users/lincoln/.codex/generated_images/019e1d0b-cd36-76c3-8d27-d520e52bc531/exec-2ed6da43-a769-4fc8-8015-066eace5c2be.png`，页面使用本目录压缩副本。

提示词：Create a premium editorial photographic hero background for a Chinese executive education website called AI Native Organization. Wide landscape 16:9, 2560x1440 if possible. A luminous contemporary Shanghai riverside architectural setting: broad white travertine terraces and steps lead upward from foreground to a modern glass executive learning center at right, with the recognizable Shanghai Pudong skyline and river in middle distance. Morning natural daylight, pale soft blue sky, green trees and silver glass; restrained cobalt accents in architectural details. Viewpoint architectural photography, grounded, refined, realistic material details, crisp focus. The composition has generous quiet space on the left third and central area to overlay a white Chinese course title later, and building/skyline interest on upper center/right. Not an actual named campus. No people, no robots, no text, no logo, no watermarks, no glowing orbs, no sci-fi circuits, no purple. Purpose: evocative course hero conceptual image of business learning and organizational progress, not a factual event photo.

## 功能和服务边界

- 三阶段课程可展开/收起，旅程链接会打开对应阶段；FAQ 使用原生 details。
- 费用按 128,000＋额外人数×10,000 实时计算，UI 允许 0—20 个额外席位以便测算；实际容量需咨询确认。
- 咨询表单在浏览器内验证，生成邮件草稿及复制内容，收件人为官网公开的 mindsleap@gmail.com。不会自动发信、提交线索、持久化个人资料或创建 CRM 记录。
- `program-guide.html` 是独立完整手册，支持打印/保存 PDF。所有本地资源使用相对路径。
- 正式上线前如需在线提交，将确认后的服务端线索接口接入现有表单，并补充相应隐私说明。排期、场地、师资班表和服务频次须以正式资料更新。
