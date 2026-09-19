# 杭州「见未来，见自己」活动平台

## 路由

- 活动入口：`/event/qinghuaemba`
- 数据接口：`/api/qinghuaemba/state`、`/api/qinghuaemba/action`
- 用户作品图片：`/api/qinghuaemba/images/:id`

前端是构建后放在 `public/event/qinghuaemba` 的独立单页应用。页面内部使用 hash 路由，避免公开作品链接在独立部署和主站反向代理之间出现刷新 404。

## 数据

平台使用 SQLite。账号、加密后的密码、会话、任务进度、作品、作品图片、评论和 NPS 均写入同一个数据库文件。

生产环境必须设置：

```text
QINGHUAEMBA_DATA_DIR=/path/outside/release/directory
```

中国站部署在 `SITE_URL` 包含 `mindsleap.cn` 且未显式设置该变量时，会安全回退到 `/www/wwwroot/qinghuaemba/prod/data`。这个目录位于主站发布树之外，不会被主站的 `rsync --delete` 清除。其他生产环境仍应显式配置持久目录。

数据库文件为 `${QINGHUAEMBA_DATA_DIR}/qinghuaemba.sqlite`，并会同时产生 SQLite WAL 文件。部署时不要把该目录放进会被 `rsync --delete` 或重新发布覆盖的位置。

首次启动会自动建表，并只写入以下三个系统 Demo：

1. https://www.mindsleap.cn/zh
2. https://xiyoujikaorou.vercel.app/
3. https://www.bobodada.cn/

本地浏览器的 localStorage、测试账号、测试作品和测试反馈不会迁移到线上。

## 安全与隐私

- 密码使用 Node.js `scrypt` 加盐哈希，不保存明文。
- 登录会话使用随机 token，数据库仅保存 token 的 SHA-256 摘要。
- Cookie 为 `HttpOnly`、`SameSite=Lax`，生产环境启用 `Secure`。
- 对外状态接口不会返回其他参与者的手机号，也不会返回密码字段。
- 作品截图限制为 PNG/JPEG/WebP，最大 1.2MB，并以 BLOB 保存到数据库。

## 发布检查

1. `npm run build` 通过。
2. `/api/qinghuaemba/state` 返回 `health.database = "sqlite"`，首次应有 3 个 Demo。
3. 新注册、重新登录、任务进度、作品、评论和 NPS 刷新后仍存在。
4. 数据目录在发布目录之外，并被备份。
5. 页面源码和数据库中均没有本地测试用户数据。
