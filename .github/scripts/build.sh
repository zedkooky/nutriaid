#!/usr/bin/env bash
# Copies the site into ./_site. Usage: build.sh staging|live
# Staging builds are marked noindex so search engines ignore them.
set -euo pipefail
MODE="${1:?usage: build.sh staging|live}"
rm -rf _site && mkdir _site
tar --exclude='./.git' --exclude='./.github' --exclude='./_site' --exclude='./docs-src' --exclude='./README.md' --exclude='./CLAUDE.md' --exclude='./.gitignore' -cf - . | tar -xf - -C _site
if [ "$MODE" = "staging" ]; then
  find _site -name '*.html' -exec sed -i 's|</head>|<meta name="robots" content="noindex, nofollow">\n</head>|' {} +
  printf 'User-agent: *\nDisallow: /\n' > _site/robots.txt
fi
echo "Built _site ($MODE): $(find _site -type f | wc -l) files"
