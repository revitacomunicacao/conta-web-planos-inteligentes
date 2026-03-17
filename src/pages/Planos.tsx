import { motion } from "framer-motion";
import { CheckCircle2, X, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/SectionWrapper";
import { getWhatsAppPlanLink, getWhatsAppLink } from "@/lib/whatsapp";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const plans = [
  {
    name: "MEI",
    price: "89",
    desc: "Ideal para microempreendedores individuais",
    features: [
      "Apuração e emissão do DAS",
      "Declaração anual (DASN-SIMEI)",
      "Emissão de notas fiscais",
      "Plataforma Conta Web (básico)",
      "Suporte por chat",
      "Orientações fiscais",
    ],
    notIncluded: ["Folha de pagamento", "Consultoria mensal", "Consultor dedicado"],
    popular: false,
  },
  {
    name: "Simples Nacional",
    price: "199",
    desc: "Para pequenas empresas em crescimento",
    features: [
      "Tudo do plano MEI",
      "Apuração Simples Nacional",
      "Folha de pagamento (até 3 func.)",
      "Obrigações acessórias completas",
      "Plataforma Conta Web (completo)",
      "Consultoria mensal",
      "eSocial e DCTFWEB",
      "Suporte prioritário",
    ],
    notIncluded: ["Consultor dedicado"],
    popular: true,
  },
  {
    name: "Lucro Presumido",
    price: "399",
    desc: "Para empresas com faturamento robusto",
    features: [
      "Tudo do plano Simples",
      "IRPJ / CSLL / PIS / COFINS",
      "Folha de pagamento (até 10 func.)",
      "Planejamento tributário",
      "Recuperação de créditos fiscais",
      "Consultor dedicado",
      "Relatórios gerenciais",
      "Prioridade máxima no suporte",
      "Demonstrações contábeis",
    ],
    notIncluded: [],
    popular: false,
  },
];

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
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 py-20 md:py-28">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="heading-display text-4xl md:text-5xl mb-4">Planos e Preços</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Contabilidade completa com preço fixo mensal. Sem taxa de adesão, sem surpresas.
              Escolha o plano ideal para o seu negócio.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plan cards */}
      <SectionWrapper>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {plans.map((p) => (
            <motion.div key={p.name} variants={fadeUp}>
              <Card className={`relative h-full rounded-2xl ${p.popular ? "border-primary shadow-xl scale-[1.02]" : "border-border/50"}`}>
                {p.popular && (
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
                    {p.features.map((f) => (
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
                  <Button
                    asChild
                    className={`w-full rounded-full mt-4 ${p.popular ? "bg-primary hover:bg-sky-light" : "bg-foreground hover:bg-navy-light text-background"}`}
                  >
                    <a href={getWhatsAppPlanLink(p.name)} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-1" /> Contratar {p.name}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      {/* Comparison table */}
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
                  <td className="py-3 px-4 text-center"><CellValue value={f.mei} /></td>
                  <td className="py-3 px-4 text-center bg-primary/5"><CellValue value={f.simples} /></td>
                  <td className="py-3 px-4 text-center"><CellValue value={f.presumido} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <div className="text-center">
          <h2 className="heading-display text-2xl md:text-3xl mb-4">Não sabe qual plano escolher?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Nossos contadores ajudam você a encontrar o plano ideal para sua empresa. Sem compromisso.
          </p>
          <Button asChild size="lg" className="rounded-full gap-2">
            <a href={getWhatsAppLink("Olá! Preciso de ajuda para escolher o melhor plano.")} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5" /> Falar com Contador
            </a>
          </Button>
        </div>
      </SectionWrapper>
    </main>
  );
}
