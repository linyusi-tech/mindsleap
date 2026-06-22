#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATE_DIR="$HOME/Library/Application Support/mindsleap-upstream-check"
LOG_DIR="$HOME/Library/Logs/mindsleap-upstream-check"
STATE_FILE="$STATE_DIR/upstream-main.sha"
REPORT_FILE="$STATE_DIR/latest-report.txt"
LOG_FILE="$LOG_DIR/check.log"

mkdir -p "$STATE_DIR" "$LOG_DIR"

log() {
  printf '[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" | tee -a "$LOG_FILE"
}

notify() {
  local title="$1"
  local body="$2"

  /usr/bin/osascript - "$title" "$body" <<'APPLESCRIPT' >/dev/null 2>&1 || true
on run argv
  display notification (item 2 of argv) with title (item 1 of argv)
end run
APPLESCRIPT
}

cd "$ROOT_DIR"

if ! git remote get-url upstream >/dev/null 2>&1; then
  log "Missing upstream remote in $ROOT_DIR"
  notify "MindsLeap upstream 检查失败" "没有找到 upstream remote。"
  exit 1
fi

log "Checking upstream/main..."
git -c http.version=HTTP/1.1 fetch upstream --prune >>"$LOG_FILE" 2>&1

upstream_sha="$(git rev-parse upstream/main)"
upstream_short="$(git rev-parse --short upstream/main)"
last_seen=""
if [[ -f "$STATE_FILE" ]]; then
  last_seen="$(cat "$STATE_FILE")"
fi

if [[ -z "$last_seen" ]]; then
  printf '%s\n' "$upstream_sha" > "$STATE_FILE"
  {
    printf 'Initialized upstream/main at %s\n' "$upstream_short"
    git log --oneline --max-count=5 upstream/main
  } > "$REPORT_FILE"
  log "Initialized upstream/main at $upstream_short"
  exit 0
fi

if [[ "$last_seen" == "$upstream_sha" ]]; then
  log "No upstream update. Current upstream/main: $upstream_short"
  exit 0
fi

last_short="$(git rev-parse --short "$last_seen" 2>/dev/null || printf '%s' "${last_seen:0:7}")"
{
  printf 'MindsLeap upstream/main updated: %s -> %s\n\n' "$last_short" "$upstream_short"
  printf 'Recent upstream commits:\n'
  git log --oneline --max-count=10 "${last_seen}..upstream/main" 2>/dev/null || git log --oneline --max-count=10 upstream/main
  printf '\nChanged files:\n'
  git diff --name-status "$last_seen..upstream/main" 2>/dev/null || true
} > "$REPORT_FILE"

printf '%s\n' "$upstream_sha" > "$STATE_FILE"
log "Upstream updated: $last_short -> $upstream_short. Report: $REPORT_FILE"
notify "MindsLeap upstream 有更新" "upstream/main: $last_short -> $upstream_short。告诉 Codex：同步 MindsLeap upstream。"
