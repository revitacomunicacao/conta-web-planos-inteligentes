import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/SectionWrapper";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import SegmentsQueAtendemos from "@/components/SegmentsQueAtendemos";
import topoInternasPhoto from "@/assets/TopoInternas.jpg.jpeg";
import { useQuery } from "@tanstack/react-query";
import { fetchSobrePage, normalizeSobreContent } from "@/lib/sobrePageApi";

export default function Sobre() {
  const sobreQuery = useQuery({
    queryKey: ["page", "sobre"],
    queryFn: fetchSobrePage,
    staleTime: 60_000,
    retry: 1,
  });
  const content = sobreQuery.data ? normalizeSobreContent(sobreQuery.data) : null;

  return (
    <main>
      {content ? (
        <>
          {/* Hero */}
          <section className="relative overflow-hidden py-20">
            <div
              className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-90"
              style={{ backgroundImage: `url(${topoInternasPhoto})` }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

            <div className="container relative z-10">
              <div className="text-white">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                  <h1 className="heading-display text-4xl md:text-5xl mb-6">{content.banner.titulo}</h1>
                  {(content.banner.descricao ?? "")
                    .split(/\r?\n\r?\n/)
                    .filter(Boolean)
                    .map((p, idx) => (
                      <p key={idx} className={idx === 0 ? "text-lg leading-relaxed mb-4" : "text-lg leading-relaxed"}>
                        {p}
                      </p>
                    ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Segments */}
          <SegmentsQueAtendemos
            id="areas-de-atuacoes"
            title={content.areas.titulo}
            items={content.areas.items.map((x) => ({ title: x.titulo, iconKey: x.iconKey }))}
          />

          {/* CTA */}
          <SectionWrapper>
            <div className="text-center bg-gradient-to-br from-primary to-sky-light rounded-3xl p-10 md:p-16 text-primary-foreground">
              <h2 className="heading-display text-3xl md:text-4xl mb-4">{content.cta.titulo}</h2>
              <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">{content.cta.descricao}</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {content.cta.botao ? (
                  <Button asChild size="lg" className="rounded-full bg-background text-foreground hover:bg-background/90">
                    <a href={content.cta.botao.link} target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon className="w-5 h-5 mr-2" /> {content.cta.botao.texto}
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          </SectionWrapper>
        </>
      ) : sobreQuery.isLoading ? (
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
