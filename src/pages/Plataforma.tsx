import { motion } from "framer-motion";
import {
  Smartphone, Globe, QrCode, ArrowRight, CheckCircle2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/SectionWrapper";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getWhatsAppLink } from "@/lib/whatsapp";
import topoInternasPhoto from "@/assets/TopoInternas.jpg.jpeg";
import { useQuery } from "@tanstack/react-query";
import { fetchPlataformaPage, normalizePlataformaContent } from "@/lib/plataformaPageApi";
import { getLucideIcon } from "@/lib/lucideIconRegistry";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function Plataforma() {
  const plataformaQuery = useQuery({
    queryKey: ["page", "plataforma"],
    queryFn: fetchPlataformaPage,
    staleTime: 60_000,
    retry: 1,
  });
  const content = plataformaQuery.data ? normalizePlataformaContent(plataformaQuery.data) : null;

  return (
    <main>
      {content ? (
        <>
          {/* Hero */}
          <section className="relative overflow-hidden bg-foreground text-background py-20 md:py-28">
            <div
              className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-90"
              style={{ backgroundImage: `url(${topoInternasPhoto})` }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/15" />

            <div className="container relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
                    <Smartphone className="w-3.5 h-3.5" /> {content.banner.card}
                  </span>
                  <h1 className="heading-display text-4xl md:text-5xl text-background mb-4">{content.banner.titulo}</h1>
                  <p className="text-background/60 text-lg max-w-lg leading-relaxed mb-6">{content.banner.descricao}</p>
                  {content.banner.botao ? (
                    <Button asChild size="lg" className="rounded-full bg-primary hover:bg-sky-light">
                      <a href={content.banner.botao.link} target="_blank" rel="noopener noreferrer">
                        {content.banner.botao.texto} <ArrowRight className="w-4 h-4 ml-1" />
                      </a>
                    </Button>
                  ) : null}
                </motion.div>

                {/* Mockup (textos via API) */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="bg-background/5 border border-background/10 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-background/40">
                      <Globe className="w-4 h-4" />
                      app.contaweb.net.br
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {content.banner.cards.slice(0, 2).map((c, idx) => (
                        <div
                          key={`${c.titulo}-${idx}`}
                          className={idx === 0 ? "bg-primary/20 rounded-xl p-4" : "bg-accent/20 rounded-xl p-4"}
                        >
                          {idx === 0 ? (
                            <QrCode className="w-6 h-6 text-primary mb-2" />
                          ) : (
                            <span className="inline-flex">
                              <CheckCircle2 className="w-6 h-6 text-accent mb-2" />
                            </span>
                          )}
                          <p className="text-xs text-background/60">{c.titulo}</p>
                          <p className="text-lg font-bold text-background mt-1">{c.descricao}</p>
                        </div>
                      ))}
                    </div>
                    {content.banner.cards[2] ? (
                      <div className="bg-background/5 rounded-xl p-4 border border-background/10">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span className="text-xs text-background/60">{content.banner.cards[2].titulo}</span>
                        </div>
                        <p className="text-sm text-background/80">{content.banner.cards[2].descricao}</p>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Features */}
          <SectionWrapper>
            <div className="text-center mb-14">
              <h2 className="heading-display text-3xl md:text-4xl">{content.funcionalidades.titulo}</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">{content.funcionalidades.descricao}</p>
            </div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              {content.funcionalidades.items.map((f, idx) => {
                const Icon = getLucideIcon(f.iconKey);
                return (
                  <motion.div key={`${f.titulo}-${idx}`} variants={fadeUp}>
                    <Card className="h-full rounded-2xl hover:shadow-lg transition-shadow border-border/50">
                      <CardContent className="p-7">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            {Icon ? <Icon className="w-6 h-6 text-primary" /> : null}
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-display font-semibold text-lg">{f.titulo}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{f.descricao}</p>
                            <ul className="grid grid-cols-2 gap-1.5 pt-2">
                              {f.highlights.map((h, hi) => (
                                <li key={`${h}-${hi}`} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />
                                  {h}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </SectionWrapper>

          {/* CTA */}
          <SectionWrapper className="bg-secondary/30">
            <div className="text-center">
              <h2 className="heading-display text-3xl md:text-4xl mb-4">{content.cta.titulo}</h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">{content.cta.descricao}</p>
              {content.cta.botao ? (
                <Button asChild size="lg" className="rounded-full gap-2">
                  <a href={content.cta.botao.link} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="w-5 h-5" /> {content.cta.botao.texto}
                  </a>
                </Button>
              ) : null}
            </div>
          </SectionWrapper>
        </>
      ) : plataformaQuery.isLoading ? (
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
