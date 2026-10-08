# Nutri-Aid Trust website: handoff briefing

Read this first. It is written for a person or an AI assistant picking up the site. `README.md` has the technical how-to; this file has the decisions and the open work.

## What this is
A static website (plain HTML, CSS, JS, no build step) for Nutri-Aid Trust (NAT), a Zambian agribusiness and rural-livelihoods NGO founded 7 July 2007, based at the YWCA Building, Nationalist Road, opposite UTH, Lusaka. Contact: info@nutriaidtrust.org, 0572241411. Careers: careers@nutriaidtrust.org.

Pages: `index`, `about`, `strategy`, `projects`, `impact`, `news`, `leadership`, `gallery`, `careers`, `contact`. Shared header and footer are copied into every page, so a change to the menu or footer must be made in all ten files.

## Where things live
- Colours and fonts: top of `assets/css/style.css` (`:root`). Brand: leaf green `#5aa81e`, red `#c00000`.
- Gallery, contact, careers, leadership and other newer styles: `assets/css/extra.css`.
- Gallery photos: `assets/img/gallery/` (a full image plus a `-sm` 640px thumbnail). To add one, copy a `<figure class="reveal gcard">` block in `gallery.html` and set `data-cat` to gardens, crops, people or livestock.
- Staff portraits: `assets/img/team/`, shown on `leadership.html`.
- Contact and careers email addresses: `CONTACT_EMAIL` in `assets/js/contact.js`, `CAREERS_EMAIL` in `assets/js/careers.js`.
- News feed: `assets/js/news.js` (settings at the top).
- Strategy PDF: edit `docs-src/strategic-plan-summary.html`, then re-export to `assets/downloads/` as a PDF. `docs-src` is not published.

## Publishing flow
- The working branch is `claude/nutri-aid-redesign-nxxmr7`, with pull request #1 into `main`.
- Every push to a `claude/**` or `staging` branch uploads automatically to the **staging** folder on the FTP server (`staging.nutriaidtrust.org`, marked noindex) and rebuilds the GitHub Pages preview.
- A push to `main` uploads to the **live** folder, but only when the `FTP_LIVE_DIR` secret exists. **Keep `FTP_LIVE_DIR` unset until the owner approves launch.** Until then a push to `main` skips the upload.
- The FTP server supports plain FTP only. Use a restricted account limited to `/staging` where possible, and create one for live before launch.
- The main domain still forwards to the old Bolt site. Do not change DNS without the owner's approval. Keep the Bolt site until the real domain checks out.
- Secrets (FTP login) live only in GitHub (Settings, Secrets and variables, Actions). Never paste them into a chat or commit them.

## Launch notes
- `404.html`, and (live only) `robots.txt` and `sitemap.xml`, are generated or shipped by the build. Sitemap address defaults to `https://nutriaidtrust.org`; confirm with or without `www` before launch.
- The host needs `ErrorDocument 404 /404.html` added to the live `.htaccess` (edit the existing file, never overwrite it).

## Decisions already made (do not reverse without asking the owner)
- The logo stays exactly as it is.
- Mission wording is the original: "We exist to develop, strengthen and build capacity of the agricultural based SMEs in order to feed into a sustainable climate smart agricultural production and improve food and nutrition security impacting into the farming community."
- The home page headline numbers (250,000 farmers, 1,500 agro-dealers, 10 provinces, 500+ demos, 250 field days) stay as they are, even though the questionnaire quotes lower figures. The owner chose to keep them.
- Left out for now: Board of Trustees, Financials and reports, any partner logos, budgets, impact statistics and testimonials. Donors can be sensitive about published figures, so publish none without the Country Director's approval.
- Project dates are shown only for active projects, because the source documents disagree on older ones.
- The strategic plan is published only as a public summary (page and PDF). The internal SWOT, budget, risk and succession sections stay out.
- Photo consent: the owner confirmed full consent for all photos supplied.

## Open items
1. **News page:** the Facebook Page address is set in `assets/js/news.js` (`https://www.facebook.com/profile.php?id=61591791951338`); check the live timeline actually appears on staging, because Facebook's embed only works for public Pages. Still needs the LinkedIn company page address. LinkedIn has no free live feed. Embedded posts can be added through "Embed this post".
2. **Leadership:** all six senior team members now have portraits. Bios are still missing for Mercy Kanswata, Marrian Kafuni and Jeff Saminganja; their cards show name and title only until the owner supplies text. Mutinta Nketana (board member) has a photo on file with the owner but is not on the site until the Board of Trustees page is decided. Confirm the spelling of Marrian/Marian Kafuni. Evans's surname is Bwembya on his CV and Bwenbya in an earlier list; the site uses Bwembya.
3. **Board of Trustees:** names, roles and photos needed. The file named `Board_Members.docx` was actually a project-experience table, with no trustee names.
4. **Careers form:** a static site cannot accept file uploads, so applicants attach their CV in the email that opens. Real uploads would need a small server script.
5. **Financials and annual reports:** deferred. Needs approved PDFs, approved by the Country Director.
6. **Headline numbers:** revisit with the owner before launch.
7. **Restricted FTP accounts:** create one for staging and one for live, then add `FTP_LIVE_DIR` only at launch.
8. **Email addresses:** separate careers, partnerships and finance addresses were left for later.

## Working rules
- Check changes on staging before anything goes live.
- Use only facts supplied by the organisation. Do not invent statistics, partners, dates or quotes.
- Keep text plain and accessible. Check pages at desktop (1440px) and phone (390px) width.
- Don't remove or rename the shared nav and footer structure without updating every page.
