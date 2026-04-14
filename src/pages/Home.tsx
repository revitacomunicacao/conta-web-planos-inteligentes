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
import ParaQuemContaWeb from "@/components/ParaQuemContaWeb";
import { CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchHomePage, normalizeHomeContent } from "@/lib/homePageApi";
import { getLucideIcon } from "@/lib/lucideIconRegistry";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Hero({
  card,
  texto1,
  tituloEmBranco,
  tituloEmAzul,
  texto2,
  botao,
}: {
  card: string;
  texto1: string;
  tituloEmBranco: string;
  tituloEmAzul: string;
  texto2: string;
  botao: { texto: string; link: string } | null;
}) {
  const texto1Lines = (texto1 ?? "").split(/\r?\n/);
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
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
            {card}
            </span>
            <p className="max-w-lg text-lg leading-relaxed text-white">
              {texto1Lines.map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < texto1Lines.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
            <h1 className="text-white heading-display text-4xl !leading-tight md:text-5xl lg:text-6xl">
              {tituloEmBranco} <span className="text-primary">{tituloEmAzul}</span>
            </h1>
            <div className="space-y-4 pt-2">
              <p className="text-lg leading-relaxed text-white">{texto2}</p>
              {botao ? (
                <Button asChild size="lg" className="rounded-full text-base">
                  <a href={botao.link}>{botao.texto}</a>
                </Button>
              ) : null}
            </div>
        </motion.div>
      </div>
    </section>
  );
}

function Metrics({ items }: { items: { value: string; label: string }[] }) {
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
            A Conta Web é uma contabilidade online que une tradição e tecnologia para simplificar a rotina da sua empresa.{" "}
            <br />
            Atuamos como parceiros estratégicos, oferecendo praticidade, eficiência e suporte contínuo com atendimento digital, próximo e sem burocracia.
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

function FAQ({ title, faqs }: { title: string; faqs: { pergunta: string; resposta: string }[] }) {
  return (
    <SectionWrapper className="bg-secondary/30">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="heading-display text-3xl md:text-4xl">{title}</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="rounded-xl border bg-card px-5"
            >
              <AccordionTrigger className="text-left text-sm font-medium hover:no-underline md:text-base">
                {faq.pergunta}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.resposta}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionWrapper>
  );
}

function CtaBanner({ title, descricao, button }: { title: string; descricao: string; button: { texto: string; link: string } | null }) {
  return (
    <SectionWrapper>
      <div className="rounded-3xl bg-gradient-to-br from-primary to-sky-light p-10 text-center text-primary-foreground md:p-16">
        <h2 className="heading-display mb-4 text-3xl md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-primary-foreground/80">
          {descricao}
        </p>
        {button ? (
          <Button
            asChild
            size="lg"
            className="rounded-full bg-background text-base text-foreground hover:bg-background/90"
          >
            <a href={button.link} target="_blank" rel="noopener noreferrer">
              {button.texto}
            </a>
          </Button>
        ) : null}
      </div>
    </SectionWrapper>
  );
}

function FreeCta({
  title,
  aberturas,
  botao1,
  botao2,
}: {
  title: string;
  aberturas: { iconKey: string | null; titulo: string; descricao: string }[];
  botao1: { texto: string; link: string } | null;
  botao2: { texto: string; link: string } | null;
}) {
  return (
    <SectionWrapper>
      <div className="rounded-3xl bg-gradient-to-br from-primary to-sky-light p-10 text-center text-primary-foreground md:p-16">
        <h2 className="heading-display mb-4 text-3xl md:text-4xl">{title}</h2>

        <div className="mx-auto mt-8 grid max-w-3xl gap-6 text-left">
          {aberturas.map((a) => {
            const Icon = getLucideIcon(a.iconKey) ?? CheckCircle2;
            return (
              <div key={a.titulo} className="flex items-start gap-3">
                <Icon className="w-6 h-6 text-background mt-0.5 shrink-0" />
                <div>
                  <p className="font-display font-bold text-lg">{a.titulo}</p>
                  <p className="text-primary-foreground/85">{a.descricao}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 justify-center max-w-3xl mx-auto">
          {botao1 ? (
            <Button asChild size="lg" className="rounded-full bg-background text-base text-foreground hover:bg-background/90">
              <a href={botao1.link} target="_blank" rel="noopener noreferrer">
                {botao1.texto}
              </a>
            </Button>
          ) : null}

          {botao2 ? (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full text-base text-foreground border-background/40 hover:text-accent-foreground"
            >
              <a href={botao2.link} target="_blank" rel="noopener noreferrer">
                {botao2.texto}
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default function Home() {
  const homeQuery = useQuery({
    queryKey: ["page", "home"],
    queryFn: fetchHomePage,
    staleTime: 60_000,
    retry: 1,
  });

  const content = homeQuery.data ? normalizeHomeContent(homeQuery.data) : null;

  return (
    <main>
      {content ? (
        <>
          <Hero
            card={content.hero.card}
            texto1={content.hero.texto1}
            tituloEmBranco={content.hero.tituloEmBranco}
            tituloEmAzul={content.hero.tituloEmAzul}
            texto2={content.hero.texto2}
            botao={content.hero.botao}
          />
          <Metrics items={content.metrics} />
          <ParaQuemContaWeb
            title={content.paraQuem.title}
            items={content.paraQuem.items}
            button={content.paraQuem.button}
          />
          <FreeCta
            title={content.conhecaOsPlanos.title}
            aberturas={content.conhecaOsPlanos.aberturas}
            botao1={content.conhecaOsPlanos.botao1}
            botao2={content.conhecaOsPlanos.botao2}
          />
          <FAQ title={content.faq.title} faqs={content.faq.items} />
          <CtaBanner title={content.cta.title} descricao={content.cta.descricao} button={content.cta.botao} />
        </>
      ) : homeQuery.isLoading ? (
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
