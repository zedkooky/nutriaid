(() => {
  // ---- Settings: fill these in, nothing else needs to change ----
  const NEWS = {
    // Full address of the Facebook Page, e.g. "https://www.facebook.com/YourPageName". Shows the live timeline.
    facebookPage: "",
    // Full address of the LinkedIn company page, e.g. "https://www.linkedin.com/company/your-company".
    linkedinPage: "",
    // LinkedIn does not offer a free live feed. To show posts, open a post on LinkedIn, choose
    // "..." > "Embed this post", and paste the iframe's src address here (one per post, newest first).
    linkedinPosts: [],
  };

  const el = (id) => document.getElementById(id);
  const note = (box, text) => { const p = document.createElement("p"); p.className = "feed-empty"; p.textContent = text; box.appendChild(p); };

  // Facebook Page plugin: live timeline, updates by itself
  const fbBox = el("fb-body");
  if (NEWS.facebookPage) {
    const w = Math.max(280, Math.min(500, fbBox.clientWidth || 500));
    const f = document.createElement("iframe");
    f.title = "Nutri-Aid Trust on Facebook";
    f.loading = "lazy"; f.height = "720"; f.width = String(w);
    f.setAttribute("scrolling", "no"); f.setAttribute("allow", "encrypted-media");
    f.src = "https://www.facebook.com/plugins/page.php?href=" + encodeURIComponent(NEWS.facebookPage) +
      "&tabs=timeline&width=" + w + "&height=720&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false";
    fbBox.appendChild(f);
    const a = el("fb-follow"); a.href = NEWS.facebookPage; a.hidden = false;
  } else {
    note(fbBox, "Our Facebook updates will appear here soon.");
  }

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
