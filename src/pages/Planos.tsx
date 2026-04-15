import { motion } from "framer-motion";
import { CheckCircle2, X, User } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/SectionWrapper";
import { getWhatsAppLink } from "@/lib/whatsapp";

import topoInternasPhoto from "@/assets/TopoInternas.jpg.jpeg";
import SegmentsQueAtendemos from "@/components/SegmentsQueAtendemos";
import { useQuery } from "@tanstack/react-query";
import { fetchPlanosPage, normalizePlanosContent } from "@/lib/planosPageApi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const compareFeatures = [
  { name: "Emissão de Notas Fiscais", mei: true, simples: true, presumido: true },
  { name: "Plataforma Conta Web", mei: "Básico", simples: "Completo", presumido: "Completo" },
  { name: "Apuração de Impostos", mei: true, simples: true, presumido: true },
  { name: "Obrigações Acessórias", mei: "Parcial", simples: true, presumido: true },
  { name: "Folha de Pagamento", mei: false, simples: "Até 3 func.", presumido: "Até 10 func." },
  { name: "eSocial / DCTFWEB", mei: false, simples: true, presumido: true },
  { name: "Consultoria Mensal", mei: false, simples: true, presumido: true },
  { name: "Planejamento Tributário", mei: false, simples: false, presumido: true },
  { name: "Recuperação Fiscal", mei: false, simples: false, presumido: true },
  { name: "Consultor Dedicado", mei: false, simples: false, presumido: true },
  { name: "Suporte", mei: "Chat", simples: "Prioritário", presumido: "Máximo" },
];

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <CheckCircle2 className="w-5 h-5 text-accent mx-auto" />;
  if (value === false) return <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />;
  return <span className="text-sm text-muted-foreground">{value}</span>;
}

export default function Planos() {
  const planosQuery = useQuery({
    queryKey: ["page", "planos"],
    queryFn: fetchPlanosPage,
    staleTime: 60_000,
    retry: 1,
  });
  const content = planosQuery.data ? normalizePlanosContent(planosQuery.data) : null;

  const scrollToPlans = () => {
    document.getElementById("planos-cards")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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

          <div>
            <SegmentsQueAtendemos
              title={content.areas.titulo}
              items={content.areas.items.map((x) => ({ title: x.titulo, iconKey: x.iconKey }))}
              onItemClick={scrollToPlans}
            />
          </div>

          {/* Plan cards */}
          <SectionWrapper id="planos-cards">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
              {content.plans.map((p) => {
                const popular = p.name.toLowerCase() === "simples nacional";
                const ctaHref = p.button?.link ?? "#";
                const ctaLabel = p.button?.texto ?? `Contratar ${p.name}`;
                return (
                  <motion.div key={p.name} variants={fadeUp}>
                    <Card
                      className={`relative h-full rounded-2xl ${
                        popular ? "border-primary shadow-xl scale-[1.02]" : "border-border/50"
                      }`}
                    >
                      {popular && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                          Mais Popular
                        </div>
                      )}
                      <CardContent className="p-7 space-y-5 flex flex-col h-full">
                        <div>
                          <h3 className="font-display font-bold text-xl">{p.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm text-muted-foreground">R$</span>
                          <span className="heading-display text-5xl">{p.price}</span>
                          <span className="text-sm text-muted-foreground">/mês</span>
                        </div>
                        <ul className="space-y-2.5 flex-1">
                          {p.included.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                              {f}
                            </li>
                          ))}
                          {p.notIncluded.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground/50">
                              <X className="w-4 h-4 mt-0.5 shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        {p.button ? (
                          <Button
                            asChild
                            className={`w-full rounded-full mt-4 ${
                              popular
                                ? "bg-primary hover:bg-sky-light"
                                : "bg-foreground hover:bg-navy-light text-background"
                            }`}
                          >
                            <a href={ctaHref} target="_blank" rel="noopener noreferrer">
                              <User className="w-4 h-4 mr-1" /> {ctaLabel}
                            </a>
                          </Button>
                        ) : null}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </SectionWrapper>

          {/* Comparison table (permanece hardcoded) */}
          <SectionWrapper className="bg-secondary/30">
            <div className="text-center mb-10">
              <h2 className="heading-display text-2xl md:text-3xl">Comparativo de Planos</h2>
            </div>
            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Funcionalidade</th>
                    <th className="text-center py-3 px-4 font-display font-semibold">MEI</th>
                    <th className="text-center py-3 px-4 font-display font-semibold text-primary">Simples Nacional</th>
                    <th className="text-center py-3 px-4 font-display font-semibold">Lucro Presumido</th>
                  </tr>
                </thead>
                <tbody>
                  {compareFeatures.map((f) => (
                    <tr key={f.name} className="border-b last:border-0">
                      <td className="py-3 px-4 font-medium">{f.name}</td>
                      <td className="py-3 px-4 text-center">
                        <CellValue value={f.mei} />
                      </td>
                      <td className="py-3 px-4 text-center bg-primary/5">
                        <CellValue value={f.simples} />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <CellValue value={f.presumido} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionWrapper>

          {/* CTA */}
          <SectionWrapper>
            <div className="text-center">
              <h2 className="heading-display text-2xl md:text-3xl mb-4">{content.cta.titulo}</h2>
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
      ) : planosQuery.isLoading ? (
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
