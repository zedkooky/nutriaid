(() => {
  const CAREERS_EMAIL = "info@nutriaidtrust.org";
  const form = document.getElementById("apply"), note = document.getElementById("note");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    note.className = "fnote";
    if (!d.get("name") || !/.+@.+\..+/.test(d.get("email"))) { note.classList.add("err"); note.textContent = "Please add your name and a valid email."; return; }
    const lines = [["Name", "name"], ["Email", "email"], ["Phone", "phone"], ["Position", "position"], ["Location", "location"], ["Availability", "availability"]]
      .filter(([, k]) => d.get(k)).map(([l, k]) => `${l}: ${d.get(k)}`).join("\n");
    const body = `${lines}\n\n${d.get("message") || ""}\n\n(Please attach your CV and cover letter.)`;
    location.href = `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent("Application: " + (d.get("position") || "General"))}&body=${encodeURIComponent(body)}`;
    note.textContent = "Thank you! Your email app should open. Please attach your CV and cover letter before sending.";
  });
})();
