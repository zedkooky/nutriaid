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
if [ "$MODE" = "live" ]; then
  # Live site: allow search engines and publish a sitemap. Set SITE_URL to change the address.
  SITE_URL="${SITE_URL:-https://nutriaidtrust.org}"; SITE_URL="${SITE_URL%/}"
  TODAY="$(date -u +%F)"
  {
    echo '<?xml version="1.0" encoding="UTF-8"?>'
    echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    for f in _site/*.html; do
      n="$(basename "$f")"; [ "$n" = "404.html" ] && continue
      if [ "$n" = "index.html" ]; then loc="$SITE_URL/"; else loc="$SITE_URL/$n"; fi
      echo "  <url><loc>$loc</loc><lastmod>$TODAY</lastmod></url>"
    done
    echo '</urlset>'
  } > _site/sitemap.xml
  # Host settings (404 page, www -> main domain, http -> https). Live only; staging never gets this file.
  grep -v '^#' docs-src/htaccess-snippet.txt | sed '/./,$!d' > _site/.htaccess
  printf 'User-agent: *\nDisallow: /staging/\nAllow: /\n\nSitemap: %s/sitemap.xml\n' "$SITE_URL" > _site/robots.txt
fi
echo "Built _site ($MODE): $(find _site -type f | wc -l) files"
