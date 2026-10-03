/* Splash + motion helpers. Loaded after main.js. */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll progress line
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);
  const progress = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    bar.style.transform = `scaleX(${Math.min(1, scrollY / max)})`;
  };
  addEventListener("scroll", progress, { passive: true });

  // Word-by-word headline reveal (headings inside .reveal blocks)
  let k = 0;
  const split = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((t) => {
          if (!t.trim()) { frag.append(t); return; }
          const w = document.createElement("span");
          w.className = "w";
          const inner = document.createElement("span");
          inner.textContent = t;
          inner.style.setProperty("--k", k++);
          w.append(inner);
          frag.append(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) {
        split(n);
      }
    });
  };
  if (!reduce) {
    document.querySelectorAll(".reveal h2, h2.reveal").forEach((h) => { k = 0; split(h); });
  }

  // Normalise pillar icon path lengths so they can "draw"
  document.querySelectorAll(".pillar svg path").forEach((p) => p.setAttribute("pathLength", "1"));

  // Splash (home only; an inline <head> script sets .splash-active)
  const splash = document.getElementById("splash");
  if (!splash) return;
  const root = document.documentElement;
  const countEl = splash.querySelector(".splash-count");
  const DURATION = 2300;
  const t0 = performance.now();
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    splash.classList.add("open");
    root.classList.remove("splash-active");
    try { sessionStorage.setItem("nat-splash", "1"); } catch (e) { /* storage unavailable */ }
    setTimeout(() => splash.remove(), 1300);
  };
  const tick = (t) => {
    const p = Math.min((t - t0) / DURATION, 1);
    countEl.textContent = String(Math.round(p * 100)).padStart(3, "0");
    if (p < 1 && !done) requestAnimationFrame(tick); else finish();
  };
  requestAnimationFrame(tick);
  splash.addEventListener("click", finish);
  addEventListener("keydown", (e) => { if (e.key === "Escape" || e.key === "Enter") finish(); });
})();
