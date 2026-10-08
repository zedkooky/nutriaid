(() => {
  const CONTACT_EMAIL = "info@nutriaidtrust.org";
  const form = document.getElementById("contact"), note = document.getElementById("note");
  const link = document.getElementById("info-email");
  if (CONTACT_EMAIL && link) { link.textContent = CONTACT_EMAIL; link.href = "mailto:" + CONTACT_EMAIL; }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    note.className = "fnote";
    if (!d.get("name") || !/.+@.+\..+/.test(d.get("email"))) { note.classList.add("err"); note.textContent = "Please add your name and a valid email."; return; }
    if (!CONTACT_EMAIL) { note.classList.add("err"); note.textContent = "This form is not connected yet. Please check back soon."; return; }
    const body = `Name: ${d.get("name")}\nEmail: ${d.get("email")}${d.get("org") ? `\nOrganisation: ${d.get("org")}` : ""}\n\n${d.get("message")}`;
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Nutri-Aid Trust: " + d.get("topic"))}&body=${encodeURIComponent(body)}`;
    note.textContent = "Thank you! Your email app should open to send the message.";
  });
})();
