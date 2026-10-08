# Nutri-Aid Trust — website

Static site (no build step). Open `index.html` or run `python -m http.server 4173`.

- `index.html` home · `projects.html` · `impact.html` · `leadership.html` · `gallery.html` · `contact.html`
- `assets/css/style.css` — design tokens live at the top (`:root`); change colours/fonts there
- `assets/js/main.js` — menu, scroll reveal, count-up stats, filter chips
- Gallery: add a photo by copying a `<figure class="gcard">` block in `gallery.html` (full image + `-sm` thumbnail in `assets/img/gallery/`, `data-cat` = gardens, crops, people or livestock). Lightbox is `assets/js/gallery.js`; gallery and contact styles are in `assets/css/extra.css`.
- Contact form: set `CONTACT_EMAIL` at the top of `assets/js/contact.js` (until then the form says it isn't connected). Replace the `[bracketed]` phone, address and email here and in each footer.
- Placeholders are marked `[like this]` or striped image slots — replace with real content
- Fonts: Fraunces + Manrope (Google Fonts). Brand: leaf green `#5aa81e`, red `#c00000`

Deploy: GitHub Pages (Settings → Pages → main / root) or any static host.
