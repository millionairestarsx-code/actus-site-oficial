// Substitua pelo número oficial da ACTUS no formato: 55 + DDD + número, somente dígitos.
// Exemplo: 5585999999999
const ACTUS_WHATSAPP = "5585999999999";
const PLACEHOLDER = "5585999999999";

const message = "Olá ACTUS, quero conhecer uma solução de autoatendimento para minha empresa.";
const whatsappUrl = `https://wa.me/${ACTUS_WHATSAPP}?text=${encodeURIComponent(message)}`;

document.querySelectorAll(".js-whatsapp").forEach(link => {
  if (ACTUS_WHATSAPP === PLACEHOLDER) {
    link.setAttribute("href", "#contato");
    link.removeAttribute("target");
  } else {
    link.setAttribute("href", whatsappUrl);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
