# AI数字员工实战营活动平台交付文档

## PRD

- 公开入口：`/event/ai-employee`，middleware 内部 rewrite 到 `/zh/event/ai-employee`，地址栏保持短路径。
- 用户路径：阅读安装攻略 → 提交安装状态和数字员工计划 → 保存私密编辑链接 → 管理员审核 → 作品进入广场。
- 展示范围：作品广场只显示 `approved` 且 `consentPublic=true` 的提交；联系方式和后台备注永不进入公开数据。
- v1 不做登录、评论、点赞、文件上传；成果以链接形式提交。

## 线上环境

- 正式环境：`https://mindsleap.cn/event/ai-employee/`
- 线上测试环境：`https://mindsleap.cn/event-test/ai-employee/`
- 当前线上正式/测试环境使用独立 Node MVP 部署，测试和正式分别使用独立端口、数据目录、上传目录和 Cookie 名称。
- 详细部署交接、空库原则、PM2/Nginx/路由配置和验证项见 `site/docs/ai-hermes-workshop-deployment.md`。
- 本目录下的 Next 原生实现是 upstream 可维护版本，用于把活动平台能力沉淀进主站代码库；上线前应按实际部署策略选择继续使用独立 MVP，或迁移到主站内置实现。

## 数据和接口

- 存储：`AI_EMPLOYEE_DATA_DIR/submissions.json`，未配置时开发环境写入系统临时目录；生产必须配置持久目录。
- 后台口令：`AI_EMPLOYEE_ADMIN_TOKEN`。生产未配置时后台 API 拒绝访问。
- API：
  - `POST /api/ai-employee/submissions`：新建或用 `id + editToken` 更新提交。
  - `GET /api/ai-employee/submissions?id=...&editToken=...`：编辑链接回填。
  - `GET /api/ai-employee/gallery`：公开作品列表。
  - `GET /api/ai-employee/admin/submissions`：后台列表。
  - `POST /api/ai-employee/admin/review`：审核公开、隐藏、回到待审。
  - `GET /api/ai-employee/admin/export?format=json|csv|feishu`：运营导出。

## 开发说明

- 页面放在 `src/app/[locale]/event/ai-employee`，避免破坏现有 `next-intl` 主站布局。
- `/event/ai-employee` 的短入口由 `src/middleware.ts` 处理，不需要在 `next.config.ts` 增加 rewrite。
- 存储层在 `src/lib/aiEmployeeStore.ts`，写入使用进程内队列和临时文件 rename，降低并发写坏 JSON 的风险。
- 安装攻略里的 Codex 口径来自 2026-06-29 拉取的 OpenAI Codex manual：Codex 支持 CLI、IDE extension、Codex app，CLI 提供 `codex doctor` 诊断。
- Pencil MCP 当前未连接桌面应用，因此本次提交先落页面和文档；连接 Pencil 后可按同一信息架构补 `.pen` 图。

## QA 清单

- 构建：`npm run build` 必须通过。
- 表单：新建提交、编辑链接回填、缺姓名/联系方式/公开授权时报错。
- 隐私：公开接口和作品页不包含 `participant.contact`、`moderation.adminNote`、`editToken`。
- 后台：无 token 返回 403；正确 token 可载入列表、审核公开、隐藏、导出 CSV/飞书 payload。
- 展示：作品广场只展示审核通过且授权公开的数据；隐藏或待审数据不可访问详情页。
- 路由：`/event/ai-employee`、`/event/ai-employee/submit`、`/event/ai-employee/gallery` 都应返回 200。
- 移动端：表单、首页 CTA、后台卡片不溢出，按钮文字不换行。
