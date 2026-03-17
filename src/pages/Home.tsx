import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Building2, Calculator, FileText, Users, BarChart3, Shield,
  CreditCard, Landmark, Receipt, Bot, RefreshCw, Zap, CheckCircle2, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import SectionWrapper from "@/components/SectionWrapper";
import { getWhatsAppLink, getWhatsAppPlanLink } from "@/lib/whatsapp";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Zap className="w-3.5 h-3.5" /> Contabilidade 100% Digital
            </span>
            <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl !leading-tight">
              Sua contabilidade no{" "}
              <span className="text-primary">piloto automático</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Planos acessíveis, plataforma inteligente e contadores de verdade.
              Abra sua empresa ou migre sua contabilidade sem dor de cabeça.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="rounded-full gap-2 text-base">
                <a href={getWhatsAppLink("Olá! Gostaria de abrir minha empresa com a Conta Web.")} target="_blank" rel="noopener noreferrer">
                  Abrir Empresa Grátis <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-base">
                <Link to="/planos">Ver Planos</Link>
              </Button>
            </div>
          </motion.div>

          {/* Platform Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="animate-float">
              <div className="bg-card rounded-2xl shadow-2xl border p-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <div className="w-3 h-3 rounded-full bg-accent/60" />
                  <span className="ml-2 text-xs text-muted-foreground">Conta Web — Dashboard</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Receita Mensal", value: "R$ 42.800", color: "bg-primary/10 text-primary" },
                    { label: "Notas Emitidas", value: "156", color: "bg-accent/10 text-accent" },
                    { label: "Impostos", value: "R$ 3.240", color: "bg-orange-100 text-orange-600" },
                  ].map((item) => (
                    <div key={item.label} className={`rounded-xl p-3 ${item.color}`}>
                      <p className="text-[10px] font-medium opacity-70">{item.label}</p>
                      <p className="text-lg font-bold mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-secondary rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Fluxo de Caixa</span>
                    <span>Últimos 6 meses</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-16">
                    {[40, 55, 45, 70, 60, 85].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-primary/70"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Metrics ─── */
function Metrics() {
  const items = [
    { value: "70%", label: "menos tempo com burocracia" },
    { value: "5.500+", label: "municípios com NF-e" },
    { value: "20+", label: "bancos integrados" },
    { value: "24h", label: "suporte disponível" },
  ];
  return (
    <section className="border-y bg-secondary/50">
      <div className="container py-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {items.map((m) => (
            <motion.div key={m.label} variants={fadeUp} className="text-center">
              <p className="heading-display text-3xl md:text-4xl text-primary">{m.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{m.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Services Bento ─── */
function ServicesBento() {
  const services = [
    { icon: Building2, title: "Abertura de Empresa", desc: "Abra seu CNPJ de forma rápida e sem burocracia. Cuidamos de tudo." },
    { icon: Calculator, title: "Contabilidade Digital", desc: "Simples Nacional, Lucro Presumido ou Lucro Real — tudo na nuvem." },
    { icon: FileText, title: "Gestão Fiscal", desc: "Apuração de impostos, obrigações acessórias e planejamento tributário." },
    { icon: Users, title: "Departamento Pessoal", desc: "Folha de pagamento, eSocial, admissão, férias e rescisão." },
    { icon: BarChart3, title: "Consultoria Empresarial", desc: "Orientação estratégica para o crescimento da sua empresa." },
    { icon: Shield, title: "IRPF", desc: "Declaração de Imposto de Renda para pessoa física com segurança." },
  ];

  return (
    <SectionWrapper>
      <div className="text-center mb-14">
        <h2 className="heading-display text-3xl md:text-4xl">Tudo que sua empresa precisa</h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          Serviços completos de contabilidade digital para você focar no que importa: o seu negócio.
        </p>
      </div>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {services.map((s) => (
          <motion.div key={s.title} variants={fadeUp}>
            <Card className="h-full hover:shadow-lg transition-shadow border-border/50 rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      <div className="text-center mt-10">
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/servicos">Ver todos os serviços <ArrowRight className="w-4 h-4 ml-1" /></Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}

/* ─── Platform Preview ─── */
function PlatformPreview() {
  const features = [
    { icon: CreditCard, title: "Gestão de Cobrança", desc: "PIX, boleto, cartão e cobrança recorrente integrados." },
    { icon: Landmark, title: "Integração Bancária", desc: "Conecte mais de 20 bancos para conciliação automática." },
    { icon: Receipt, title: "Notas Fiscais", desc: "Emissão de NFS-e, NF-e e NFC-e em mais de 5.500 municípios." },
    { icon: Bot, title: "Contador Virtual IA", desc: "Tire dúvidas contábeis instantaneamente com inteligência artificial." },
    { icon: RefreshCw, title: "Conciliação Inteligente", desc: "Reconciliação automática de extratos com lançamentos." },
    { icon: Shield, title: "Segurança & LGPD", desc: "Dados protegidos com criptografia e conformidade total." },
  ];

  return (
    <SectionWrapper className="bg-foreground text-background">
      <div className="text-center mb-14">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
          Plataforma Conta Web
        </span>
        <h2 className="heading-display text-3xl md:text-4xl text-background">
          Tecnologia que trabalha por você
        </h2>
        <p className="text-background/60 mt-3 max-w-xl mx-auto">
          Software próprio com tudo que você precisa para gerenciar finanças, emitir notas e acompanhar sua contabilidade em tempo real.
        </p>
      </div>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {features.map((f) => (
          <motion.div key={f.title} variants={fadeUp}>
            <div className="p-6 rounded-2xl bg-background/5 border border-background/10 hover:bg-background/10 transition-colors h-full">
              <f.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-display font-semibold text-background mb-2">{f.title}</h3>
              <p className="text-sm text-background/60 leading-relaxed">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="text-center mt-10">
        <Button asChild className="rounded-full bg-primary hover:bg-sky-light text-primary-foreground">
          <Link to="/plataforma">Conheça a Plataforma <ArrowRight className="w-4 h-4 ml-1" /></Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}

/* ─── Plans Preview ─── */
function PlansPreview() {
  const plans = [
    {
      name: "MEI",
      price: "89",
      desc: "Ideal para microempreendedores individuais",
      features: ["DAS mensal", "Declaração anual (DASN)", "Emissão de notas fiscais", "Suporte por chat"],
      popular: false,
    },
    {
      name: "Simples Nacional",
      price: "199",
      desc: "Para pequenas empresas em crescimento",
      features: ["Tudo do MEI +", "Folha de pagamento", "Apuração de impostos", "Obrigações acessórias", "Consultoria mensal", "Plataforma completa"],
      popular: true,
    },
    {
      name: "Lucro Presumido",
      price: "399",
      desc: "Para empresas com faturamento robusto",
      features: ["Tudo do Simples +", "IRPJ / CSLL", "PIS / COFINS", "Planejamento tributário", "Consultor dedicado", "Prioridade no suporte"],
      popular: false,
    },
  ];

  return (
    <SectionWrapper>
      <div className="text-center mb-14">
        <h2 className="heading-display text-3xl md:text-4xl">Planos que cabem no seu bolso</h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          Contabilidade completa a partir de R$ 89/mês. Sem taxa de adesão, sem surpresas.
        </p>
      </div>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
      >
        {plans.map((p) => (
          <motion.div key={p.name} variants={fadeUp}>
            <Card className={`relative h-full rounded-2xl ${p.popular ? "border-primary shadow-xl scale-[1.03]" : "border-border/50"}`}>
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  Mais Popular
                </div>
              )}
              <CardContent className="p-7 space-y-5">
                <div>
                  <h3 className="font-display font-bold text-xl">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-muted-foreground">R$</span>
                  <span className="heading-display text-4xl">{p.price}</span>
                  <span className="text-sm text-muted-foreground">/mês</span>
                </div>
                <ul className="space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button asChild className={`w-full rounded-full ${p.popular ? "bg-primary hover:bg-sky-light" : "bg-foreground hover:bg-navy-light text-background"}`}>
                  <a href={getWhatsAppPlanLink(p.name)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-1" /> Contratar
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      <div className="text-center mt-10">
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/planos">Comparar planos <ArrowRight className="w-4 h-4 ml-1" /></Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}

/* ─── FAQ ─── */
function FAQ() {
  const faqs = [
    { q: "Como funciona a contabilidade por planos?", a: "Em vez de contratar um escritório inteiro, você escolhe um plano mensal que inclui todos os serviços contábeis que sua empresa precisa. É mais simples, mais barato e 100% digital." },
    { q: "Posso abrir minha empresa com a Conta Web?", a: "Sim! Cuidamos de todo o processo de abertura do CNPJ, incluindo registro na Junta Comercial, Receita Federal, obtenção de alvarás e inscrições necessárias." },
    { q: "Qual a diferença para um escritório de contabilidade tradicional?", a: "Com a Conta Web você tem atendimento digital, plataforma para acompanhar tudo em tempo real, planos com preço fixo mensal e a mesma qualidade de um escritório — sem deslocamento ou papelada." },
    { q: "A plataforma substitui meu contador?", a: "Não. A plataforma é uma ferramenta complementar. Você tem contadores reais cuidando da sua contabilidade e a plataforma para gerenciar cobranças, emitir notas e acompanhar relatórios." },
    { q: "Posso migrar de outro contador?", a: "Sim! Realizamos toda a migração sem custos adicionais. Cuidamos da transição de forma segura e sem impacto nas suas operações." },
    { q: "Vocês atendem qual tipo de empresa?", a: "Atendemos empresas comerciais, industriais, de serviços, construção civil e terceiro setor. Desde MEI até Lucro Presumido e Lucro Real." },
  ];

  return (
    <SectionWrapper className="bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="heading-display text-3xl md:text-4xl">Perguntas Frequentes</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border px-5">
              <AccordionTrigger className="text-left font-medium text-sm md:text-base hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionWrapper>
  );
}

/* ─── CTA ─── */
function CtaBanner() {
  return (
    <SectionWrapper>
      <div className="text-center bg-gradient-to-br from-primary to-sky-light rounded-3xl p-10 md:p-16 text-primary-foreground">
        <h2 className="heading-display text-3xl md:text-4xl mb-4">
          Pronto para simplificar sua contabilidade?
        </h2>
        <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">
          Fale com um de nossos contadores e descubra o plano ideal para sua empresa.
        </p>
        <Button asChild size="lg" className="rounded-full bg-background text-foreground hover:bg-background/90 text-base">
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-5 h-5 mr-2" /> Falar com Contador
          </a>
        </Button>
      </div>
    </SectionWrapper>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <main>
      <Hero />
      <Metrics />
      <ServicesBento />
      <PlatformPreview />
      <PlansPreview />
      <FAQ />
      <CtaBanner />
    </main>
  );
}
