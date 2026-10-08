# Nutri-Aid Trust — website

Static site (no build step). Open `index.html` or run `python -m http.server 4173`.

- `index.html` home · `projects.html` · `impact.html` · `leadership.html` · `gallery.html` · `about.html` · `strategy.html` · `news.html` · `careers.html` · `contact.html`
- `assets/css/style.css` — design tokens live at the top (`:root`); change colours/fonts there
- `assets/js/main.js` — menu, scroll reveal, count-up stats, filter chips
- Gallery: add a photo by copying a `<figure class="gcard">` block in `gallery.html` (full image + `-sm` thumbnail in `assets/img/gallery/`, `data-cat` = gardens, crops, people or livestock). Lightbox is `assets/js/gallery.js`; gallery and contact styles are in `assets/css/extra.css`.
- Contact form: the address is set in `CONTACT_EMAIL` at the top of `assets/js/contact.js`. Still to fill in: the `[Physical address, Lusaka]` placeholder on the contact page and in each footer.
- News feed: set `facebookPage` and `linkedinPage` (and optionally `linkedinPosts`) at the top of `assets/js/news.js`. Facebook shows the live Page timeline. LinkedIn has no free live feed, so it shows follow buttons plus any posts embedded via "Embed this post".
- Strategy PDF: `docs-src/strategic-plan-summary.html` is the source. Re-export it to `assets/downloads/` as a PDF after editing (the `docs-src` folder is not published).
- Placeholders are marked `[like this]` or striped image slots — replace with real content
- Fonts: Fraunces + Manrope (Google Fonts). Brand: leaf green `#5aa81e`, red `#c00000`

Deploy: GitHub Pages (Settings → Pages → main / root) or any static host.

## Staging and deployment
- **Preview (GitHub Pages):** Settings > Pages > Source = "GitHub Actions". Pushes to `staging` (or a `claude/**` branch) publish a noindex preview via `.github/workflows/pages-preview.yml`.
- **FTP:** `.github/workflows/ftp-deploy.yml` uploads over FTP. Pushes to `staging` / `claude/**` go to the staging folder (noindex), pushes to `main` go to the live folder, and the Actions tab can run either by hand (dry run by default).
- **Secrets** (Settings > Secrets and variables > Actions): `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_STAGING_DIR`, `FTP_LIVE_DIR` (both with a trailing slash), optional `FTP_PROTOCOL` (`ftp`, `ftps`) and `FTP_PORT`.
- The build step is `.github/scripts/build.sh staging|live`. It copies the site to `_site/` and, for staging, adds `noindex` and a blocking `robots.txt`.
- Go-live: check staging, point the domain's DNS at the FTP host, keep the Bolt site until the real domain checks out.
