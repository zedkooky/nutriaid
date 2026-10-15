(() => {
  // ---- Settings: fill these in, nothing else needs to change ----
  const NEWS = {
    // Full address of the Facebook Page, e.g. "https://www.facebook.com/YourPageName". Shows the live timeline.
    facebookPage: "https://www.facebook.com/profile.php?id=61591791951338",
    // Full address of the LinkedIn company page, e.g. "https://www.linkedin.com/company/your-company".
    // true = try Facebook's live timeline box (it stayed blank for this page); false = show a link card.
    facebookEmbed: false,
    linkedinPage: "",
    // LinkedIn does not offer a free live feed. To show posts, open a post on LinkedIn, choose
    // "..." > "Embed this post", and paste the iframe's src address here (one per post, newest first).
    linkedinPosts: [],
  };

  const el = (id) => document.getElementById(id);
  const note = (box, text) => { const p = document.createElement("p"); p.className = "feed-empty"; p.textContent = text; box.appendChild(p); };

  // Facebook: a link card. (Facebook's live timeline box stayed blank for this page, so we link out instead.
  // To try the live timeline box again, set facebookEmbed to true above.)
  const fbBox = el("fb-body");
  if (NEWS.facebookPage && NEWS.facebookEmbed) {
    const w = Math.max(280, Math.min(500, fbBox.clientWidth || 500));
    const f = document.createElement("iframe");
    f.title = "Nutri-Aid Trust on Facebook";
    f.loading = "lazy"; f.height = "720"; f.width = String(w);
    f.setAttribute("scrolling", "no"); f.setAttribute("allow", "encrypted-media");
    f.src = "https://www.facebook.com/plugins/page.php?href=" + encodeURIComponent(NEWS.facebookPage) +
      "&tabs=timeline&width=" + w + "&height=720&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false";
    fbBox.appendChild(f);
  } else if (NEWS.facebookPage) {
    const card = document.createElement("div");
    card.className = "link-card";
    card.innerHTML =
      '<span class="link-card-ico" aria-hidden="true">f</span>' +
      "<h3>Latest from Nutri-Aid Trust</h3>" +
      "<p>See our newest photos, project updates and field stories on our Facebook page.</p>";
    const a = document.createElement("a");
    a.className = "btn btn-primary"; a.href = NEWS.facebookPage; a.target = "_blank"; a.rel = "noopener";
    a.innerHTML = 'Visit our Facebook page <span class="arr" aria-hidden="true">\u2192</span>';
    card.appendChild(a);
    fbBox.appendChild(card);
  } else {
    note(fbBox, "Our Facebook updates will appear here soon.");
  }
  if (NEWS.facebookPage && NEWS.facebookEmbed) { const a = el("fb-follow"); a.href = NEWS.facebookPage; a.hidden = false; }

  // LinkedIn: embedded posts you choose, plus a follow button
  const liBox = el("li-body");
  if (NEWS.linkedinPosts.length) {
    NEWS.linkedinPosts.forEach((src) => {
      const f = document.createElement("iframe");
      f.title = "Nutri-Aid Trust post on LinkedIn"; f.loading = "lazy"; f.src = src; f.height = "560"; f.width = "100%";
      f.setAttribute("allowfullscreen", ""); liBox.appendChild(f);
    });
  } else if (NEWS.linkedinPage) {
    note(liBox, "Follow Nutri-Aid Trust on LinkedIn for project updates, field stories and announcements.");
  } else {
    note(liBox, "Our LinkedIn updates will appear here soon.");
  }
  if (NEWS.linkedinPage) { const a = el("li-follow"); a.href = NEWS.linkedinPage; a.hidden = false; }
})();
