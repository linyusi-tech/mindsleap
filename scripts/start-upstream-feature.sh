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

if [[ $# -ne 1 ]]; then
  echo "Usage: ./scripts/start-upstream-feature.sh <branch-name>" >&2
  echo "Example: ./scripts/start-upstream-feature.sh update-about-copy" >&2
  exit 1
fi

input_branch="$1"

if [[ "$input_branch" == feature/* ]]; then
  feature_branch="$input_branch"
else
  feature_branch="feature/$input_branch"
fi

if [[ ! "$feature_branch" =~ ^feature/[A-Za-z0-9._/-]+$ ]]; then
  echo "Invalid branch name: $feature_branch" >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree is not clean. Commit or stash your changes first." >&2
  git status --short
  exit 1
fi

current_branch="$(git branch --show-current)"

if [[ "$current_branch" != "main" ]]; then
  echo "Please switch to main before creating a new upstream feature branch. Current branch: $current_branch" >&2
  exit 1
fi

if git show-ref --verify --quiet "refs/heads/$feature_branch"; then
  echo "Local branch already exists: $feature_branch" >&2
  exit 1
fi

echo "Fetching origin and upstream..."
retry 4 git -c http.version=HTTP/1.1 fetch origin --prune
retry 4 git -c http.version=HTTP/1.1 fetch upstream --prune

echo "Fast-forwarding local main to origin/main..."
git merge --ff-only origin/main

echo "Creating $feature_branch from upstream/main..."
git checkout -b "$feature_branch" upstream/main

echo "Pushing $feature_branch to origin..."
retry 4 git -c http.version=HTTP/1.1 push -u origin "$feature_branch"

echo
echo "Done. You are now on $feature_branch."
echo "Use this branch for upstream-targeted changes and open the PR from:"
echo "  $feature_branch -> upstream/main"
echo
echo "When you are ready to resume CN deploy work:"
echo "  git checkout main"
