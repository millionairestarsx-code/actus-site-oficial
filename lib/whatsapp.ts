export const WHATSAPP_NUMBER = "5585988060001";

function whatsappUrl(message: string) {
  const text = encodeURIComponent(message);
  const phone = WHATSAPP_NUMBER.replace(/\D/g, "");

  return phone
    ? `https://wa.me/${phone}?text=${text}`
    : `https://wa.me/?text=${text}`;
}

export const WHATSAPP_LINKS = {
  faleComActus: whatsappUrl(
    "Olá, vim pelo site da ACTUS e gostaria de falar com a equipe.",
  ),
  especialista: whatsappUrl(
    "Olá, gostaria de conversar com um especialista da ACTUS para entender qual solução é mais adequada para o meu negócio.",
  ),
  proposta: whatsappUrl(
    "Olá, gostaria de solicitar uma proposta comercial da ACTUS.",
  ),
} as const;
