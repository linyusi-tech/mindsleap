# Sync upstream and deploy `mindsleap.cn`

以后默认使用这一条工作流，不再手工 SSH 到阿里云。

目标：

- `upstream/main` 作为内容和站点更新来源
- 本地仓库负责保留中国站自己的少量补丁
- 推送到 `origin/main` 后，GitHub Actions 通过 SSH 自动部署到阿里云服务器

## 以后你需要做的操作

在本地仓库根目录执行：

```bash
cd /Users/yusi/Downloads/AI雨丝/websites/mindsleap
./scripts/sync-upstream-and-deploy-cn.sh
```

这条命令会自动：

1. 拉取 `origin` 和 `upstream` 最新代码
2. 把 `upstream/main` 合并进本地 `main`
3. 把结果推送到 `origin/main`
4. 触发 GitHub Actions 通过 SSH 在阿里云服务器上部署

## 自动部署依赖

仓库内的 [deploy-cn.yml](/Users/yusi/Downloads/AI雨丝/websites/mindsleap/.github/workflows/deploy-cn.yml) 现在假定：

- GitHub 仓库里已经配置好这些 secrets：
  - `CN_SERVER_SSH_KEY`
  - `CN_SERVER_HOST`
  - `CN_SERVER_PORT`
  - `CN_SERVER_USER`
- 服务器部署目录是 `/www/wwwroot/mindsleap`

部署时会：

1. 把仓库同步到 `/www/wwwroot/mindsleap`
2. 重写 `site/.env.production`
3. 通过 SSH 登录服务器，并在 `/www/wwwroot/mindsleap/site` 执行 `npm ci`
4. 重新 `next build`
5. 重启 `pm2` 中的 `mindsleap-main`
6. 重启 `pm2` 中的 `mindsleap-router`
7. 校验 `3001` 和 `3000` 返回的是同一份 CSS 资源

## 服务器上的当前进程口径

线上不是单一 `next start -p 3000`，而是：

1. `mindsleap-main` 运行在 `3001`
2. `mindsleap-router` 监听 `3000`
3. Nginx 把 `mindsleap.cn` 反代到 `127.0.0.1:3000`

所以不要再使用旧的单进程 `mindsleap` 部署方式。

## 必要的 GitHub secrets

自动部署仍然需要这些 secrets：

- `CN_SERVER_SSH_KEY`
- `CN_SERVER_HOST`
- `CN_SERVER_PORT`
- `CN_SERVER_USER`
- `CN_SITE_URL`
- `CN_CONTACT_PUBLIC_EMAIL`
- `CN_RESEND_API_KEY`
- `CN_CONTACT_EMAIL`
- `CN_CONTACT_FROM_EMAIL`

## 如果脚本报错

### 1. 合并冲突

说明 `upstream/main` 和本地补丁改到了同一块代码。解决冲突后执行：

```bash
git add .
git commit
git push origin main
```

### 2. `git push` 权限失败

说明这台电脑还没有配置好对 `linyusi-tech/mindsleap` 的 push 权限。

### 3. Actions 没有自动部署

优先检查：

- GitHub Actions 是否启用
- `CN_SERVER_*` secrets 是否还在
- 服务器 SSH 是否仍然可用

## 手工兜底

如果 GitHub runner 暂时不可用，再退回服务器手工部署。

服务器上执行：

```bash
cd /www/wwwroot/mindsleap
git fetch origin
git reset --hard origin/main
cd /www/wwwroot/mindsleap/site
npm ci --no-fund --no-audit
rm -rf .next
NODE_OPTIONS=--max-old-space-size=1536 npm run build
pm2 restart mindsleap-main --update-env
pm2 restart mindsleap-router
pm2 save
```

只在明确知道自己要做什么时使用这个兜底方案。
