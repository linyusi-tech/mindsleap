# MindsLeap 双工作流

这个仓库以后固定分成两条工作流：

- `origin/main`
  用于同步 `upstream/main` 并部署 `https://www.mindsleap.cn/zh`
- `feature/...`
  用于从干净的 `upstream/main` 开发，并给 upstream 发 pull request

不要再直接在 `origin/main` 上做准备提交给 upstream 的功能开发。

## 工作流 A：同步 upstream 并部署中国站

目标：

- `upstream/main` 作为内容和站点更新来源
- 本地仓库保留中国站自己的少量补丁
- 推送到 `origin/main` 后，GitHub Actions 自动部署到阿里云服务器

本地执行：

```bash
cd /Users/yusi/Downloads/AI雨丝/websites/mindsleap
./scripts/sync-upstream-and-deploy-cn.sh
```

这条命令会自动：

1. 拉取 `origin` 和 `upstream`
2. 本地把 `main` 快进到 `origin/main`
3. 合并 `upstream/main` 到本地 `main`
4. 推送到 `origin/main`
5. 触发中国站自动部署

这条路径只服务于 `mindsleap.cn` 上线，不是给 upstream 发 PR 用的。

## 工作流 B：从 upstream 开 feature 分支并发 PR

目标：

- 从干净的 `upstream/main` 开功能分支
- 避免把中国站补丁、部署提交、同步提交一起带进 upstream

本地执行：

```bash
cd /Users/yusi/Downloads/AI雨丝/websites/mindsleap
./scripts/start-upstream-feature.sh <branch-name>
```

例如：

```bash
./scripts/start-upstream-feature.sh update-about-copy
```

这条命令会自动：

1. 拉取 `origin` 和 `upstream`
2. 本地 `main` 快进到 `origin/main`
3. 从 `upstream/main` 创建 `feature/update-about-copy`
4. 自动推送到 `origin/feature/update-about-copy`
5. 切换到这个新分支

后续你只需要：

1. 在这个 `feature/...` 分支上开发
2. 提交代码
3. 推送到同名分支
4. 发起 PR：

```text
origin/feature/update-about-copy -> upstream/main
```

## 为什么不能直接拿 `origin/main` 给 upstream 发 PR

因为 `origin/main` 是部署分支，里面可能包含：

- 中国站自己的线上修复
- 与部署相关的提交
- 一批 “sync upstream ...” 的同步提交

这些内容不一定适合进 upstream。

## 以后最少操作

如果你只是想更新中国站：

```bash
./scripts/sync-upstream-and-deploy-cn.sh
```

如果你是想做一个未来会贡献回 upstream 的改动：

```bash
./scripts/start-upstream-feature.sh <branch-name>
```

## 中国站自动部署依赖

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
3. 在 `/www/wwwroot/mindsleap/site` 执行 `npm install`
4. 重新 `next build`
5. 重启 `pm2` 中的 `mindsleap-main`
6. 重启 `pm2` 中的 `mindsleap-router`
7. 校验公网首页、新闻页和静态资源

## 服务器上的当前进程口径

线上不是单一 `next start -p 3000`，而是：

1. `mindsleap-main` 运行在 `3001`
2. `mindsleap-router` 监听 `3000`
3. Nginx 把 `mindsleap.cn` 反代到 `127.0.0.1:3000`

所以不要再使用旧的单进程 `mindsleap` 部署方式。
