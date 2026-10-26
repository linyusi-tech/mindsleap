# AI 数字员工实战坊部署 Agent 交接文档

## 任务目标

把「AI 实战：AI 数字员工实战坊」工作台部署到线上，并同时提供正式环境和线上测试环境。

目标地址：

- 线上测试环境：`https://mindsleap.cn/event-test/ai-employee/`
- 正式环境：`https://mindsleap.cn/event/ai-employee/`

用户已说明：

- `mindsleap.cn` 已完成 ICP 备案。
- `mindsleap.com.cn` 未完成 ICP 备案。
- 因此主方案使用 `mindsleap.cn`，不要优先使用未备案域名做正式入口。

## 当前代码位置

本地项目目录：

```text
/Users/yusi/Downloads/AI雨丝/designer/output/ai-hermes-workshop
```

后端目录：

```text
/Users/yusi/Downloads/AI雨丝/designer/output/ai-hermes-workshop/dev-app
```

核心文件：

- `platform-demo.html`：前端单页应用。
- `dev-app/server.js`：Node.js 本地/线上 MVP 后端。
- `dev-app/package.json`：启动脚本。
- `dev-app/deploy/ecosystem.config.cjs`：PM2 示例配置。
- `dev-app/deploy/nginx-ai-hermes.conf`：Nginx 示例配置。
- `docs/deployment.md`：部署方案说明。
- `docs/test-plan.md`：测试计划。

## 已实现的部署能力

后端已支持以下环境变量：

| 变量 | 用途 |
| --- | --- |
| `APP_ENV` | 环境名称，如 `preproduction` / `production` |
| `BASE_PATH` | 挂载路径，如 `/event-test/ai-employee` |
| `PORT` | Node 监听端口 |
| `DATA_DIR` | JSON 数据目录 |
| `UPLOAD_DIR` | 上传文件目录 |
| `SESSION_COOKIE_NAME` | Cookie 名称 |
| `COOKIE_SECURE` | HTTPS 下设为 `true` |

隔离策略：

- 测试环境和正式环境使用不同 `PORT`。
- 测试环境和正式环境使用不同 `DATA_DIR`。
- 测试环境和正式环境使用不同 `UPLOAD_DIR`。
- 测试环境和正式环境使用不同 `SESSION_COOKIE_NAME`。
- Cookie Path 会跟随 `BASE_PATH`，不会互相覆盖登录态。

## 建议线上目录

建议在服务器上使用：

```text
/www/wwwroot/ai-hermes/current
/www/wwwroot/ai-hermes/preprod/data
/www/wwwroot/ai-hermes/preprod/uploads
/www/wwwroot/ai-hermes/prod/data
/www/wwwroot/ai-hermes/prod/uploads
```

`current` 放代码；`preprod` 和 `prod` 放隔离数据。

不要把本地 `dev-app/data/*.json` 当作正式数据直接复制上线，除非用户明确要求迁移测试数据。

## 正式环境首发数据原则

正式环境第一期发布必须是空库：

- 不迁移线上测试环境 `preprod/data` 的任何用户、提交、草稿、会话、点赞、评论或上传图片。
- 不复制本地 `dev-app/data` 中的测试用户和测试提交。
- 不把前端 Demo 的 sample/mock 帖作为正式环境真实数据。
- `platform-demo.html` 中的 `samplePosts` 只用于无后端的本地 Demo；在 `https://mindsleap.cn/event/ai-employee/` 这种真实后端环境中，广场只展示后端 `DATA_DIR` 中的真实提交。
- 首次上线时，正式环境广场应该为空。用户注册并提交后，才出现真实项目。

正式环境发布前，初始化或确认以下文件：

```bash
mkdir -p /www/wwwroot/ai-hermes/prod/data /www/wwwroot/ai-hermes/prod/uploads
printf "{}\n" > /www/wwwroot/ai-hermes/prod/data/users.json
printf "[]\n" > /www/wwwroot/ai-hermes/prod/data/submissions.json
printf "{}\n" > /www/wwwroot/ai-hermes/prod/data/drafts.json
printf "{}\n" > /www/wwwroot/ai-hermes/prod/data/sessions.json
test -f /www/wwwroot/ai-hermes/prod/data/feishu-profiles.json || printf "[]\n" > /www/wwwroot/ai-hermes/prod/data/feishu-profiles.json
```

正式发布前必须执行空库校验：

```bash
node - <<'NODE'
const fs = require("fs");
const dir = "/www/wwwroot/ai-hermes/prod/data";
const users = JSON.parse(fs.readFileSync(`${dir}/users.json`, "utf8"));
const submissions = JSON.parse(fs.readFileSync(`${dir}/submissions.json`, "utf8"));
const drafts = JSON.parse(fs.readFileSync(`${dir}/drafts.json`, "utf8"));
const sessions = JSON.parse(fs.readFileSync(`${dir}/sessions.json`, "utf8"));
if (Object.keys(users).length) throw new Error("production users.json is not empty");
if (submissions.length) throw new Error("production submissions.json is not empty");
if (Object.keys(drafts).length) throw new Error("production drafts.json is not empty");
if (Object.keys(sessions).length) throw new Error("production sessions.json is not empty");
console.log("production data is clean");
NODE
```

当前服务器已于 `2026-06-30` 预先创建并清空：

```text
/www/wwwroot/ai-hermes/prod/data
/www/wwwroot/ai-hermes/prod/uploads
```

备份目录：

```text
/www/wwwroot/ai-hermes/backups/prod-clean-init-20260630155856
```

## 启动方式

### 线上测试环境

PM2 环境配置见：

```text
dev-app/deploy/ecosystem.config.cjs
```

关键配置：

```text
APP_ENV=preproduction
BASE_PATH=/event-test/ai-employee
PORT=4174
DATA_DIR=/www/wwwroot/ai-hermes/preprod/data
UPLOAD_DIR=/www/wwwroot/ai-hermes/preprod/uploads
SESSION_COOKIE_NAME=ai_hermes_preprod_sid
COOKIE_SECURE=true
```

### 正式环境

关键配置：

```text
APP_ENV=production
BASE_PATH=/event/ai-employee
PORT=4175
DATA_DIR=/www/wwwroot/ai-hermes/prod/data
UPLOAD_DIR=/www/wwwroot/ai-hermes/prod/uploads
SESSION_COOKIE_NAME=ai_hermes_prod_sid
COOKIE_SECURE=true
```

## Nginx

参考配置：

```text
dev-app/deploy/nginx-ai-hermes.conf
```

关键要求：

- `/event-test/ai-employee/` 反代到 `127.0.0.1:4174`。
- `/event/ai-employee/` 反代到 `127.0.0.1:4175`。
- `proxy_pass` 后不要额外拼路径，保持原始 path 传给 Node。
- `/event-test/ai-employee` 和 `/event/ai-employee` 需要 308 到有尾斜杠的版本。
- `client_max_body_size` 至少 `20m`，避免粘贴图片提交失败。

如果担心测试环境地址外泄，可以给 `/event-test/ai-employee/` 增加 Basic Auth，但不要影响正式环境。

## 飞书默认资料同步

飞书同步只作为默认资料来源，不作为登录白名单。

默认飞书表：

```text
https://ycnf2mmv4sns.feishu.cn/wiki/DUzJwCU5GiDBwCk9TDZcPPZ6nPo?from=from_copylink
```

测试环境同步：

```bash
cd /www/wwwroot/ai-hermes/current/dev-app
DATA_DIR=/www/wwwroot/ai-hermes/preprod/data npm run sync:feishu
```

正式环境同步：

```bash
cd /www/wwwroot/ai-hermes/current/dev-app
DATA_DIR=/www/wwwroot/ai-hermes/prod/data npm run sync:feishu
```

如需定时同步，可以使用：

```bash
DATA_DIR=/www/wwwroot/ai-hermes/preprod/data npm run sync:feishu:watch -- --interval-minutes 60
```

注意：

- 同步脚本依赖飞书登录 Cookie。服务器环境若没有现成 Cookie，需要部署 Agent 与用户确认登录态获取方式。
- 用户在平台内填写或修改过公司、职位后，飞书同步不得覆盖。

## 部署步骤建议

1. 在服务器创建目录：

```bash
sudo mkdir -p /www/wwwroot/ai-hermes/current
sudo mkdir -p /www/wwwroot/ai-hermes/preprod/data /www/wwwroot/ai-hermes/preprod/uploads
sudo mkdir -p /www/wwwroot/ai-hermes/prod/data /www/wwwroot/ai-hermes/prod/uploads
```

2. 上传或拉取代码到：

```text
/www/wwwroot/ai-hermes/current
```

3. 进入后端目录安装依赖。当前项目没有第三方 npm 依赖，但仍可执行：

```bash
cd /www/wwwroot/ai-hermes/current/dev-app
npm install
```

4. 启动线上测试环境：

```bash
pm2 start deploy/ecosystem.config.cjs --only ai-hermes-preprod
```

5. 配置 Nginx，并 reload：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

6. 验证线上测试环境。

7. 线上测试通过后，再启动正式环境：

```bash
pm2 start deploy/ecosystem.config.cjs --only ai-hermes-prod
pm2 save
```

8. 正式环境只做冒烟测试，不做破坏性测试。

## 必测项

线上测试环境：

- 打开 `https://mindsleap.cn/event-test/ai-employee/` 页面 200。
- 打开无尾斜杠地址会跳转到有尾斜杠地址。
- Logo、字体、首页图、登录页图不 404。
- `/event-test/ai-employee/api/session` 返回正常 JSON。
- 根路径 `/api/session` 不应该被这个服务响应。
- 注册一个测试手机号，提交一条内容。
- 粘贴图片并提交，刷新后图片仍可显示。
- 点赞、评论刷新后仍保留。
- 复制项目分享链接，链接格式应为 `/event-test/ai-employee/project/<publicToken>`，仍然落在测试环境 base path 下。
- 同浏览器打开正式路径时，不应共享测试环境登录态。

正式环境：

- 打开 `https://mindsleap.cn/event/ai-employee/` 页面 200。
- 注册/登录流程可用。
- 不使用测试环境数据。
- 测试环境提交的数据不出现在正式环境。
- 正式环境上传目录没有测试环境图片。

## 本地已完成验证

本地模拟 preproduction 已验证：

- `/event-test/ai-employee` 返回 308 到 `/event-test/ai-employee/`。
- `/event-test/ai-employee/` 返回 200。
- `/event-test/ai-employee/platform-assets/mindsleap-logo-blue.png` 返回 200。
- `/event-test/ai-employee/api/session` 返回 200。
- `/api/session` 返回 404。
- Cookie Path 为 `/event-test/ai-employee`。

## 回滚

如果 preproduction 部署失败：

- 停止 `ai-hermes-preprod`。
- 保留 `/www/wwwroot/ai-hermes/preprod/data` 和 `/www/wwwroot/ai-hermes/preprod/uploads`，不要误删。
- 恢复上一版代码或 Nginx 配置。

如果 production 部署失败：

- 立即停止或回滚 `ai-hermes-prod`。
- 不要把 preproduction 数据复制到 production。
- 保留 production 数据目录，优先恢复代码版本。

## 风险与待确认

- 服务器是否已有 Node.js 20+、PM2、Nginx、SSL 证书。
- `mindsleap.cn` DNS 是否已指向目标服务器。
- 飞书同步在服务器上的登录态方案尚需确认。
- 如果测试环境不希望任何外部人访问，需要给测试路径增加 Basic Auth。
- 当前数据存储仍是 JSON 文件 + 本地上传目录，适合作为 MVP/测试版本；长期生产建议迁移 PostgreSQL + 对象存储。
