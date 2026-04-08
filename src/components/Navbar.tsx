import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/whatsapp";
import logo from "@/assets/logo.png";
import { brandLogoImgClassName } from "@/lib/brandLogo";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/servicos", label: "Serviços" },
  { to: "/plataforma", label: "Plataforma" },
  { to: "/planos", label: "Planos" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <nav className="container flex items-center justify-between py-3 md:py-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Conta Web" className={brandLogoImgClassName} />
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-secondary",
                  pathname === l.to ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Button asChild className="rounded-full gap-2">
            <a
              href="https://contaweb.osayk.digital/#/cadastro"
              target="_blank"
              rel="noopener noreferrer"
            >
              <User className="w-4 h-4" />
              Área do Cliente
            </a>
          </Button>
          <Button asChild className="rounded-full gap-2 bg-accent hover:bg-emerald-light text-accent-foreground">
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              Falar com Contador
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b pb-4">
          <ul className="container flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    pathname === l.to ? "text-primary bg-secondary font-semibold" : "text-muted-foreground"
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 px-3">
              <Button asChild className="w-full rounded-full gap-2">
                <a
                  href="https://contaweb.osayk.digital/#/cadastro"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <User className="w-4 h-4" />
                  Área do Cliente
                </a>
              </Button>
            </li>
            <li className="mt-2 px-3">
              <Button asChild className="w-full rounded-full gap-2 bg-accent hover:bg-emerald-light text-accent-foreground">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  Falar com Contador
                </a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
