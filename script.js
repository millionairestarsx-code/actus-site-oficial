const ACTUS_WHATSAPP = "5585999999999";
const message = "Olá ACTUS, quero conhecer a solução de autoatendimento.";
const whatsappUrl = `https://wa.me/${ACTUS_WHATSAPP}?text=${encodeURIComponent(message)}`;
document.querySelectorAll('.js-whatsapp').forEach(link => link.href = whatsappUrl);
