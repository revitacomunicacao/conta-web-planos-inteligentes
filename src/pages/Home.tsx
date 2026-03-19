import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionWrapper from "@/components/SectionWrapper";
import { getWhatsAppLink, getWhatsAppPlanLink } from "@/lib/whatsapp";
import fullbannerPhoto from "@/assets/fullbanner-contaweb.jpg.jpeg";
import servicesPhoto from "@/assets/home-services-photo.jpg";
import platformPhoto from "@/assets/home-platform-photo.jpg";
import { services as serviceCategories } from "@/lib/services";
import { serviceAnchor } from "@/lib/serviceAnchor";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Hero() {
  return (
    <section className="relative md:mt-20 overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Background image (substitui a coluna direita) */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url(${fullbannerPhoto})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
      <div className="container relative flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto w-full max-w-2xl space-y-6"
        >
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Contabilidade 100% Digital
            </span>
            <h1 className="text-white heading-display text-4xl !leading-tight md:text-5xl lg:text-6xl">
              Sua contabilidade no <span className="text-primary">piloto automático</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-white">
              A Conta Web realiza atendimento a empresas comerciais, industriais, serviços, construção civil e entidades do terceiro setor. Soluções contábeis e gerenciais com planos acessíveis e atendimento humano.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="rounded-full text-base">
                <a
                  href={getWhatsAppLink("Olá! Gostaria de abrir minha empresa com a Conta Web.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir Empresa Grátis
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-base">
                <Link to="/planos">Ver Planos</Link>
              </Button>
            </div>
        </motion.div>
      </div>
    </section>
  );
}

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
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {items.map((m) => (
            <motion.div key={m.label} variants={fadeUp} className="text-center">
              <p className="heading-display text-3xl text-primary md:text-4xl">{m.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServicesBento() {
  const services = serviceCategories.flatMap((cat) => cat.items);

  return (
    <SectionWrapper>
      <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="space-y-4">
          <h2 className="heading-display text-3xl md:text-4xl">Tudo que sua empresa precisa</h2>
          <p className="max-w-xl text-muted-foreground">
            A Conta Web realiza atendimento a empresas comerciais, industriais, serviços, construção civil e entidades do terceiro setor. Formando e profissionalizando a equipe de apoio ao cumprimento das obrigações acessórias em geral e seus reflexos, visando as soluções contábeis e gerenciais.
          </p>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/servicos">Ver todos os serviços</Link>
          </Button>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-border/60 shadow-xl">
          <img
            src={servicesPhoto}
            alt="Reunião entre contador e cliente da Conta Web para análise de documentos"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <h3 className="heading-display text-2xl md:text-3xl mb-6">Nossos Serviços</h3>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-5 sm:grid-cols-2 md:grid-cols-4"
      >
        {services.map((service) => (
          <motion.div key={service.title} variants={fadeUp} className="h-full">
            <Card className="h-full rounded-2xl border-border/50 transition-shadow hover:shadow-lg">
              <CardContent className="flex h-full flex-col space-y-3 p-6">
                <h3
                  className="font-display text-lg font-semibold leading-7 min-h-[5.25rem]"
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed text-muted-foreground flex-1"
                >
                  {service.shortDesc ?? service.desc}
                </p>
                <div className="mt-auto pt-2">
                  <Button asChild variant="outline" size="sm" className="rounded-full">
                    <Link to={`/servicos#${serviceAnchor(service.title)}`}>Saiba mais</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}

function PlatformPreview() {
  const features = [
    {
      title: "Gestão de cobrança",
      desc: "PIX, boleto, cartão e recorrência em uma operação centralizada.",
    },
    {
      title: "Integração bancária",
      desc: "Conecte contas e acompanhe conciliações com mais agilidade.",
    },
    {
      title: "Notas fiscais",
      desc: "Emita NFS-e, NF-e e NFC-e com apoio operacional contínuo.",
    },
    {
      title: "Contador virtual com IA",
      desc: "Respostas rápidas para dúvidas recorrentes e rotinas do dia a dia.",
    },
    {
      title: "Conciliação inteligente",
      desc: "Mais controle financeiro com menos trabalho manual.",
    },
    {
      title: "Segurança e LGPD",
      desc: "Proteção de dados e confiabilidade para a operação da empresa.",
    },
  ];

  return (
    <SectionWrapper className="bg-foreground text-background">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div className="overflow-hidden rounded-[2rem] border border-background/10 shadow-2xl">
          <img
            src={platformPhoto}
            alt="Profissional usando notebook e celular para acompanhar gestão financeira digital"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <span className="mb-4 inline-flex rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary">
            Plataforma Conta Web
          </span>
          <h2 className="heading-display text-3xl text-background md:text-4xl">
            Tecnologia que trabalha por você
          </h2>
          <p className="mt-3 max-w-xl text-background/70">
            Uma experiência digital completa para organizar cobranças, notas, finanças e o
            relacionamento com sua contabilidade em tempo real.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-background/10 bg-background/5 p-5"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-lg font-semibold text-background">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-background/65">{feature.desc}</p>
              </div>
            ))}
          </div>

          <Button asChild className="mt-8 rounded-full bg-primary text-primary-foreground hover:bg-sky-light">
            <Link to="/plataforma">Conheça a Plataforma</Link>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}

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
      <div className="mb-14 text-center">
        <h2 className="heading-display text-3xl md:text-4xl">Planos que cabem no seu bolso</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Contabilidade completa a partir de R$ 89/mês, com preço claro e suporte próximo.
        </p>
      </div>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3"
      >
        {plans.map((plan) => (
          <motion.div key={plan.name} variants={fadeUp}>
            <Card
              className={`relative h-full rounded-2xl ${
                plan.popular ? "scale-[1.03] border-primary shadow-xl" : "border-border/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Mais Popular
                </div>
              )}
              <CardContent className="space-y-5 p-7">
                <div>
                  <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-muted-foreground">R$</span>
                  <span className="heading-display text-4xl">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">/mês</span>
                </div>
                <ul className="space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`w-full rounded-full ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-sky-light"
                      : "bg-foreground text-background hover:bg-navy-light"
                  }`}
                >
                  <a href={getWhatsAppPlanLink(plan.name)} target="_blank" rel="noopener noreferrer">
                    Contratar
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-10 text-center">
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/planos">Comparar planos</Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Como funciona a contabilidade por planos?",
      a: "Em vez de contratar um escritório inteiro, você escolhe um plano mensal que inclui os serviços contábeis que sua empresa precisa. É mais simples, previsível e 100% digital.",
    },
    {
      q: "Posso abrir minha empresa com a Conta Web?",
      a: "Sim. Cuidamos de todo o processo de abertura do CNPJ, incluindo registros, inscrições e orientações para a operação começar corretamente.",
    },
    {
      q: "Qual a diferença para um escritório de contabilidade tradicional?",
      a: "Você tem preço mensal claro, atendimento digital, acompanhamento em tempo real e a mesma profundidade técnica de uma contabilidade consultiva.",
    },
    {
      q: "A plataforma substitui meu contador?",
      a: "Não. A plataforma complementa o atendimento contábil, trazendo mais autonomia para sua empresa enquanto os contadores cuidam da parte técnica.",
    },
    {
      q: "Posso migrar de outro contador?",
      a: "Sim. Fazemos a migração com acompanhamento e cuidamos da transição para evitar impacto na rotina da sua empresa.",
    },
    {
      q: "Vocês atendem qual tipo de empresa?",
      a: "Atendemos empresas comerciais, industriais, de serviços, construção civil e terceiro setor, desde MEI até regimes mais robustos.",
    },
  ];

  return (
    <SectionWrapper className="bg-secondary/30">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="heading-display text-3xl md:text-4xl">Perguntas Frequentes</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="rounded-xl border bg-card px-5"
            >
              <AccordionTrigger className="text-left text-sm font-medium hover:no-underline md:text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionWrapper>
  );
}

function CtaBanner() {
  return (
    <SectionWrapper>
      <div className="rounded-3xl bg-gradient-to-br from-primary to-sky-light p-10 text-center text-primary-foreground md:p-16">
        <h2 className="heading-display mb-4 text-3xl md:text-4xl">
          Pronto para simplificar sua contabilidade?
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-primary-foreground/80">
          Fale com um de nossos contadores e descubra o plano ideal para sua empresa.
        </p>
        <Button
          asChild
          size="lg"
          className="rounded-full bg-background text-base text-foreground hover:bg-background/90"
        >
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
            Falar com Contador
          </a>
        </Button>
      </div>
    </SectionWrapper>
  );
}

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
