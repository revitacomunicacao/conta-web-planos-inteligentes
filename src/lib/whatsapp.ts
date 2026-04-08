const WHATSAPP_NUMBER = "5534984348330";
const DEFAULT_MESSAGE = "Olá! Gostaria de saber mais sobre os serviços da Conta Web.";

export function getWhatsAppLink(message?: string) {
  const msg = encodeURIComponent(message || DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export function getWhatsAppPlanLink(planName: string) {
  return getWhatsAppLink(`Olá! Tenho interesse no plano ${planName} da Conta Web. Podemos conversar?`);
}
