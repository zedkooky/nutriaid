(() => {
  const lb = document.getElementById("lb");
  if (!lb) return;
  const img = document.getElementById("lbi"), cap = document.getElementById("lbc");
  const cards = [...document.querySelectorAll(".gcard")];
  const shown = () => cards.filter((c) => !c.hidden).map((c) => c.querySelector(".gbtn"));
  let i = 0, opener = null;
  const show = (n) => {
    const list = shown(); if (!list.length) return;
    i = (n + list.length) % list.length;
    img.src = list[i].dataset.src; img.alt = list[i].dataset.cap; cap.textContent = list[i].dataset.cap;
  };
  const open = (btn) => { opener = btn; lb.hidden = false; document.body.style.overflow = "hidden"; show(shown().indexOf(btn)); document.getElementById("lbx").focus(); };
  const close = () => { lb.hidden = true; document.body.style.overflow = ""; opener && opener.focus(); };
  cards.forEach((c) => c.querySelector(".gbtn").addEventListener("click", (e) => open(e.currentTarget)));
  document.getElementById("lbx").addEventListener("click", close);
  document.getElementById("lbp").addEventListener("click", () => show(i - 1));
  document.getElementById("lbn").addEventListener("click", () => show(i + 1));
  lb.addEventListener("click", (e) => e.target === lb && close());
  addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(i - 1);
    if (e.key === "ArrowRight") show(i + 1);
  });
})();
