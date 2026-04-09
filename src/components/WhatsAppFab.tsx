import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function WhatsAppFab() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-accent hover:bg-emerald-light text-accent-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-105"
      aria-label="Fale conosco no WhatsApp"
    >
      <WhatsAppIcon className="w-6 h-6" />
    </a>
  );
}
