import { Link } from "react-router-dom";
import { MessageCircle, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import logo from "@/assets/logo conta web branco.png";
import { brandLogoImgClassName } from "@/lib/brandLogo";
import { getWhatsAppLink } from "@/lib/whatsapp";

const footerLinks = [
  {
    title: "Empresa",
    links: [
      { label: "Sobre Nós", to: "/sobre" },
      { label: "Contato", to: "/contato" },
      { label: "Planos", to: "/planos" },
    ],
  },
  {
    title: "Serviços",
    links: [
      { label: "Contabilidade Digital", to: "/servicos" },
      { label: "Gestão Fiscal", to: "/servicos" },
      { label: "Departamento Pessoal", to: "/servicos" },
      { label: "Abertura de Empresa", to: "/servicos" },
    ],
  },
  {
    title: "Plataforma",
    links: [
      { label: "Notas Fiscais", to: "/plataforma" },
      { label: "Cobrança", to: "/plataforma" },
      { label: "Conciliação Bancária", to: "/plataforma" },
      { label: "Contador IA", to: "/plataforma" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <img src={logo} alt="Conta Web" className={brandLogoImgClassName} />
            <p className="text-sm text-background/60 max-w-xs leading-relaxed">
              Contabilidade digital com tecnologia de ponta. Simplifique a gestão da sua empresa com planos acessíveis e atendimento humanizado.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors" aria-label="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-background mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-background/60 hover:text-background transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
