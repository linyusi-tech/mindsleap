# Upstream PR Workflow

如果你的目标是给 upstream 提交改动，而不是部署中国站，请使用这条流程。

## 一键创建干净分支

```bash
cd /Users/yusi/Downloads/AI雨丝/websites/mindsleap
./scripts/start-upstream-feature.sh <branch-name>
```

例如：

```bash
./scripts/start-upstream-feature.sh redesign-home-hero
```

脚本会：

1. 拉取 `origin` 和 `upstream`
2. 从 `upstream/main` 创建 `feature/redesign-home-hero`
3. 自动推送到 `origin/feature/redesign-home-hero`

## 之后怎么做

1. 在当前 `feature/...` 分支上开发
2. 正常提交：

```bash
git add .
git commit -m "Describe the change"
```

3. 推送：

```bash
git push
```

4. 到 GitHub 发 PR：

```text
feature/redesign-home-hero -> upstream/main
```

## 不要这样做

不要从 `origin/main` 直接开 PR 给 upstream。

`origin/main` 是中国站部署主线，不是干净镜像分支。
