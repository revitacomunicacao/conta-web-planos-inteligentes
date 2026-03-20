import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/SectionWrapper";
import { getWhatsAppLink } from "@/lib/whatsapp";
import topoInternasPhoto from "@/assets/TopoInternas.jpg.jpeg";

const contactInfo = [
  { icon: MessageCircle, label: "WhatsApp", value: "(00) 00000-0000", href: getWhatsAppLink() },
  { icon: Phone, label: "Telefone", value: "(00) 0000-0000", href: "tel:+5500000000000" },
  { icon: Mail, label: "E-mail", value: "contato@contaweb.com.br", href: "mailto:contato@contaweb.com.br" },
  { icon: MapPin, label: "Endereço", value: "Seu endereço aqui", href: "#" },
  { icon: Clock, label: "Horário", value: "Seg-Sex: 8h às 18h", href: "#" },
];

export default function Contato() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-90"
          style={{ backgroundImage: `url(${topoInternasPhoto})` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

        <div className="container relative z-10 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="heading-display text-4xl md:text-5xl mb-4">Fale Conosco</h1>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Estamos prontos para ajudar. Entre em contato pelo canal de sua preferência.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        <div className="max-w-3xl mx-auto space-y-8">
          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="rounded-2xl border-accent/30 bg-accent/5">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                  <MessageCircle className="w-8 h-8 text-accent" />
                </div>
                <h2 className="font-display font-bold text-2xl">Fale pelo WhatsApp</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  O jeito mais rápido de falar com nossos contadores. Atendimento humanizado e sem robôs.
                </p>
                <Button asChild size="lg" className="rounded-full bg-accent hover:bg-emerald-light text-accent-foreground">
                  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" /> Iniciar Conversa
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact info cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contactInfo.filter(c => c.label !== "WhatsApp").map((c) => (
              <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                <Card className="rounded-2xl hover:shadow-lg transition-shadow border-border/50 h-full">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <c.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{c.label}</p>
                      <p className="font-medium">{c.value}</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
