import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/SectionWrapper";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { serviceAnchor } from "@/lib/serviceAnchor";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { cn } from "@/lib/utils";
import topoInternasPhoto from "@/assets/TopoInternas.jpg.jpeg";
import { useQuery } from "@tanstack/react-query";
import { fetchServicosPage, normalizeServicosContent } from "@/lib/servicosPageApi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function Servicos() {
  const location = useLocation();
  const servicosQuery = useQuery({
    queryKey: ["page", "servicos"],
    queryFn: fetchServicosPage,
    staleTime: 60_000,
    retry: 1,
  });
  const content = servicosQuery.data ? normalizeServicosContent(servicosQuery.data) : null;

  useEffect(() => {
    const hash = location.hash?.replace(/^#/, "");
    if (!hash) return;

    // O elemento pode ainda não ter sido renderizado quando a rota muda.
    // Esperamos um tick para então rolar para a âncora correta.
    const t = window.setTimeout(() => {
      const el = document.getElementById(hash);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);

    return () => window.clearTimeout(t);
  }, [location.hash]);

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
                <p className="text-lg max-w-2xl mx-auto">{content.banner.descricao}</p>
              </motion.div>
            </div>
          </section>

          {/* Categories */}
          {content.categories.map((cat, ci) => (
            <SectionWrapper
              key={`${cat.title}-${ci}`}
              className={cn("py-12 md:py-16", ci % 2 === 1 ? "bg-secondary/30" : "")}
            >
              <div className="mb-5 md:mb-6">
                <h2 className="heading-display text-2xl md:text-3xl">{cat.title}</h2>
              </div>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
              >
                {cat.items.map((item, idx) => (
                  <motion.div key={`${cat.title}-${idx}`} variants={fadeUp}>
                    <Card
                      id={serviceAnchor(item.title || `${cat.title}-${idx}`)}
                      className="h-full scroll-mt-[var(--app-header-h,8rem)] rounded-2xl hover:shadow-lg transition-shadow border-border/50"
                    >
                      <CardContent className="p-4 md:p-5 space-y-2">
                        <h3 className="font-display font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </SectionWrapper>
          ))}

          {/* CTA */}
          <SectionWrapper className="pt-4 pb-14 md:pt-6 md:pb-20">
            <div className="text-center bg-gradient-to-br from-primary to-sky-light rounded-3xl p-10 md:p-16 text-primary-foreground">
              <h2 className="heading-display text-3xl md:text-4xl mb-4">{content.cta.titulo}</h2>
              <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">{content.cta.descricao}</p>
              {content.cta.botao ? (
                <Button asChild size="lg" className="rounded-full bg-background text-foreground hover:bg-background/90">
                  <a href={content.cta.botao.link} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="w-5 h-5 mr-2" /> {content.cta.botao.texto}
                  </a>
                </Button>
              ) : null}
            </div>
          </SectionWrapper>
        </>
      ) : servicosQuery.isLoading ? (
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
