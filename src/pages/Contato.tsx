import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/SectionWrapper";
import { getWhatsAppLink } from "@/lib/whatsapp";
import topoInternasPhoto from "@/assets/TopoInternas.jpg.jpeg";
import { useQuery } from "@tanstack/react-query";
import { fetchContatoPage, normalizeContatoContent } from "@/lib/contatoPageApi";

const contactInfo = [
  { icon: WhatsAppIcon, label: "WhatsApp", value: "(00) 00000-0000", href: getWhatsAppLink() },
  { icon: Phone, label: "Telefone", value: "(00) 0000-0000", href: "tel:+5500000000000" },
  { icon: Mail, label: "E-mail", value: "contato@contaweb.net.br", href: "mailto:contato@contaweb.net.br" },
  { icon: MapPin, label: "Endereço", value: "Seu endereço aqui", href: "#" },
  { icon: Clock, label: "Horário", value: "Seg-Sex: 8h às 18h", href: "#" },
];

export default function Contato() {
  const contatoQuery = useQuery({
    queryKey: ["page", "contato"],
    queryFn: fetchContatoPage,
    staleTime: 60_000,
    retry: 1,
  });
  const content = contatoQuery.data ? normalizeContatoContent(contatoQuery.data) : null;

  return (
    <main>
      {content ? (
        <>
          {/* Hero */}
          <section className="relative overflow-hidden py-20 md:py-28">
            <div
              className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-90"
              style={{ backgroundImage: `url(${topoInternasPhoto})` }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

            <div className="container relative z-10 text-center text-white">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="heading-display text-4xl md:text-5xl mb-4">{content.banner.titulo}</h1>
                <p className="text-lg text-white max-w-2xl mx-auto">{content.banner.descricao}</p>
              </motion.div>
            </div>
          </section>

          <SectionWrapper>
            <div className="max-w-3xl mx-auto space-y-8">
              {/* WhatsApp CTA */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card className="rounded-2xl border-accent/30 bg-accent/5">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                      <WhatsAppIcon className="w-8 h-8 text-accent" />
                    </div>
                    <h2 className="font-display font-bold text-2xl">{content.cta.titulo}</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">{content.cta.descricao}</p>
                    {content.cta.botao ? (
                      <Button
                        asChild
                        size="lg"
                        className="rounded-full bg-accent hover:bg-emerald-light text-accent-foreground"
                      >
                        <a href={content.cta.botao.link} target="_blank" rel="noopener noreferrer">
                          <WhatsAppIcon className="w-5 h-5 mr-2" /> {content.cta.botao.texto}
                        </a>
                      </Button>
                    ) : null}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </SectionWrapper>
        </>
      ) : contatoQuery.isLoading ? (
        <SectionWrapper className="py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-muted-foreground">Carregando conteúdo…</p>
          </div>
        </SectionWrapper>
      ) : (
        <SectionWrapper className="py-16">
          <div className="mx-auto max-w-2xl text-center space-y-4">
            <p className="text-muted-foreground">
              Não foi possível carregar o conteúdo agora. Tente novamente em instantes.
            </p>
            <Button asChild className="rounded-full">
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                Falar com um contador
              </a>
            </Button>
          </div>
        </SectionWrapper>
      )}
    </main>
  );
}
