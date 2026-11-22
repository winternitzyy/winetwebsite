#!/usr/bin/env bash
# Publish whatever is committed on the current branch to the live site:
# push to staging, open a pull request into main, merge it, and wait for GitHub Pages to finish.
# Usage: tools/publish.sh "PR title" "PR body"
set -euo pipefail
REPO=winternitzyy/winetwebsite
TITLE=${1:?PR title}; BODY=${2:-}
git push -q origin HEAD
git push -q origin HEAD:staging
SHA=$(git rev-parse HEAD)
N=$(gh api "repos/$REPO/pulls" -f title="$TITLE" -f head=staging -f base=main -f body="$BODY" --jq .number)
echo "PR #$N: https://github.com/$REPO/pull/$N"
gh api -X PUT "repos/$REPO/pulls/$N/merge" -f merge_method=merge -f sha="$SHA" --jq .message
git fetch -q origin main
M=$(git rev-parse --short origin/main)
for _ in $(seq 1 30); do
  s=$(gh api "repos/$REPO/actions/runs?branch=main&per_page=1" --jq '.workflow_runs[0] | "\(.status) \(.conclusion) \(.head_sha[0:7])"' || true)
  case "$s" in "completed "*" $M") echo "Pages build: $s"; [[ $s == *success* ]] && exit 0 || exit 1;; esac
  sleep 15
done
echo "Pages build still running after 7 minutes: $s"; exit 1
