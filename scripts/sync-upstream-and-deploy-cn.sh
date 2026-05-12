#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

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
git fetch origin --prune
git fetch upstream --prune

echo "Fast-forwarding local main to origin/main..."
git merge --ff-only origin/main

echo "Merging upstream/main into main..."
git merge --no-edit upstream/main

echo "Pushing main to origin to trigger CN deploy..."
git push origin main

echo
echo "Done. GitHub Actions should now deploy mindsleap.cn from origin/main."
echo "Check workflow runs at:"
echo "https://github.com/linyusi-tech/mindsleap/actions"
