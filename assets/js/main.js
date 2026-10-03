(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".site-header");
  const hero = document.querySelector(".hero-bg");

  // Header state + hero parallax (transform only, background layer only)
  const onScroll = () => {
    const y = scrollY;
    header.classList.toggle("scrolled", y > 40);
    if (hero && !reduce && y < innerHeight) hero.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const btn = document.querySelector(".menu-btn");
  const links = document.getElementById("nav-links");
  const setMenu = (open) => {
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    links.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  btn.addEventListener("click", () => setMenu(btn.getAttribute("aria-expanded") !== "true"));
  links.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
  addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // Count-up stats
  const fmt = new Intl.NumberFormat("en");
  const count = (el) => {
    const target = +el.dataset.count;
    if (reduce) { el.textContent = fmt.format(target); return; }
    const t0 = performance.now(), dur = 1800;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = fmt.format(Math.round(target * (1 - Math.pow(1 - p, 4))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const sio = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.querySelectorAll("[data-count]").forEach(count); sio.unobserve(en.target); } });
  }, { threshold: 0.4 });
  document.querySelectorAll(".stats-grid").forEach((el) => sio.observe(el));

  // Filter chips (projects / news / gallery)
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const items = document.querySelectorAll(group.dataset.filterGroup);
    group.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      group.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      items.forEach((it) => { it.hidden = chip.dataset.f !== "all" && it.dataset.cat !== chip.dataset.f; });
    });
  });
})();
