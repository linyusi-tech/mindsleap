#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

retry() {
  local attempts="$1"
  shift

  local n=1
  until "$@"; do
    if (( n >= attempts )); then
      echo "Command failed after ${attempts} attempts: $*" >&2
      return 1
    fi

    local sleep_seconds=$(( n * 3 ))
    echo "Attempt ${n}/${attempts} failed. Retrying in ${sleep_seconds}s..." >&2
    sleep "$sleep_seconds"
    ((n++))
  done
}

current_branch="$(git branch --show-current)"

if [[ "$current_branch" != "main" ]]; then
  echo "Please switch to main before running this script. Current branch: $current_branch" >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree is not clean. Commit or stash your changes first." >&2
  git status --short
  exit 1
fi

echo "Fetching origin and upstream..."
retry 4 git -c http.version=HTTP/1.1 fetch origin --prune
retry 4 git -c http.version=HTTP/1.1 fetch upstream --prune

echo "Fast-forwarding local main to origin/main..."
git merge --ff-only origin/main

echo "Merging upstream/main into main..."
git merge --no-edit upstream/main

echo "Pushing main to origin to trigger CN deploy..."
retry 4 git -c http.version=HTTP/1.1 push origin main

echo
echo "Done. GitHub Actions should now deploy mindsleap.cn from origin/main."
echo "Check workflow runs at:"
echo "https://github.com/linyusi-tech/mindsleap/actions"
