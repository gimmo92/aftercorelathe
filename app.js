const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

const form = document.getElementById("demo-form");
const errorEl = document.getElementById("form-error");
const okEl = document.getElementById("form-ok");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorEl.textContent = "";

  if (!form.reportValidity()) return;
  if (form._honey.value) return;

  const payload = {
    _subject: "Demo Aftercore · Private AI on-premise",
    name: form.name.value.trim(),
    company: form.company.value.trim(),
    role: form.role.value.trim(),
    email: form.email.value.trim(),
    users: form.users.value,
    first_agent: form.first_agent.value,
    constraint: form.constraint.value,
  };

  form.classList.add("is-sending");
  try {
    const response = await fetch("https://formsubmit.co/ajax/gbasso@aftercore.ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("send-failed");
    form.classList.add("is-hidden");
    okEl.classList.add("is-visible");
  } catch (err) {
    const body = [
      `Nome: ${payload.name}`,
      `Azienda: ${payload.company}`,
      `Ruolo: ${payload.role}`,
      `Email: ${payload.email}`,
      `Utenti previsti: ${payload.users}`,
      `Primo agente: ${payload.first_agent}`,
      `Vincolo principale: ${payload.constraint}`,
    ].join("%0D%0A");
    window.location.href = `mailto:gbasso@aftercore.ai?subject=${encodeURIComponent(payload._subject)}&body=${body}`;
    errorEl.textContent = "Se la mail non si apre, scrivi a gbasso@aftercore.ai";
  } finally {
    form.classList.remove("is-sending");
  }
});
