import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Hero({ onSimular }: { onSimular: () => void }) {
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
            Contabilidade online simples para pagar menos impostos com segurança
            </span>
            <p className="max-w-lg text-lg leading-relaxed text-white">
              Cuidamos de tudo para <br /> sua empresa com atendimento rápido e sem burocracia
            </p>
            <h1 className="text-white heading-display text-4xl !leading-tight md:text-5xl lg:text-6xl">
              Sua contabilidade no <span className="text-primary">piloto automático</span>
            </h1>
            <div className="space-y-4 pt-2">
              <p className="text-lg leading-relaxed text-white">Planos a partir de R$ 89,90</p>
              <Button asChild size="lg" className="rounded-full text-base">
                <button type="button" onClick={onSimular}>
                  Simular meu plano
                </button>
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

function FAQ() {
  const faqs = [
    {
      q: "Como faço a transição do meu contador atual para a Conta Web?",
      a: "Você deverá entrar em contato com o seu contador atual para comunicar formalmente o encerramento do vínculo contratual, bem como a sua intenção de migrar para um serviço de contabilidade online. É importante solicitar que ele providencie, dentro do prazo acordado, a entrega de toda a documentação da empresa, incluindo documentos legais e societários, livros fiscais e contábeis, folhas de pagamento, obrigações acessórias e demais registros pertinentes. Caso surja qualquer dúvida durante esse processo, nossa equipe de contadores online estará à disposição para oferecer todo o suporte necessário. Observação: Caso a migração ocorra ao longo do exercício, solicite ao contador anterior que realize o encerramento parcial das informações contábeis, com a devida transmissão das obrigações acessórias, como SPED ECD (caso houver), garantindo a correta transferência da responsabilidade técnica.",
    },
    {
      q: "Há necessidade de encaminhar toda a documentação física entregue pelo contador anterior para a Conta Web?",
      a: "Não se preocupe, não será necessário enviar a documentação física. Esses documentos devem permanecer sob sua guarda na empresa, conforme a legislação. Para facilitar o processo, solicitaremos apenas o envio de alguns documentos de forma digital (em PDF), diretamente pelo seu Ambiente Seguro em nosso portal. Com isso, conseguimos dar continuidade aos serviços com agilidade e segurança. Fique tranquilo, nossa equipe estará ao seu lado em cada etapa, orientando tudo o que for necessário para uma transição simples e sem burocracia.",
    },
    {
      q: "Como é feito o envio de documentos e a comunicação entre minha empresa e a Conta Web no dia a dia?",
      a: "A comunicação entre a sua empresa e a nossa contabilidade online será realizada de forma prática e ágil, por meio do Ambiente Seguro do cliente ou via WhatsApp, garantindo rapidez no atendimento e proximidade no dia a dia. Já o envio e recebimento de documentos ocorrerão de forma totalmente digital, através do Ambiente Seguro em nosso portal, utilizando arquivos em PDF, XML e outros formatos necessários, assegurando organização e segurança das informações.",
    },
    {
      q: "Quando posso começar a aproveitar os serviços da Conta Web na minha empresa?",
      a: "Você pode iniciar sua contabilidade online com a Conta Web de forma imediata! Assim que formalizarmos a contratação e recebermos as informações iniciais da sua empresa, nossa equipe já começa o processo de transição. Nosso objetivo é garantir uma migração rápida, organizada e sem impacto na rotina do seu negócio, cuidando de toda a parte burocrática para você. Quanto antes iniciarmos, mais rápido conseguimos estruturar sua contabilidade e gerar informações estratégicas para a sua empresa.",
    },
    {
      q: "É possível estruturar um plano exclusivo de contabilidade online e assessoria, totalmente adaptado às necessidades da minha empresa, além dos serviços padrão do orçamento?",
      a: "Sim! Na Conta Web, entendemos que cada empresa possui necessidades específicas, por isso oferecemos a possibilidade de estruturar um plano totalmente personalizado de contabilidade online e assessoramento. Além dos pacotes padrão, podemos adaptar nossos serviços de acordo com a realidade, o porte e os objetivos do seu negócio, garantindo uma solução mais estratégica, eficiente e alinhada ao que você realmente precisa. Nossa equipe fará uma análise do seu cenário para propor a melhor configuração de serviços, sempre buscando otimizar custos e potencializar resultados. Fale com um de nossos especialistas e descubra como podemos montar um plano sob medida para a sua empresa.",
    },
    {
      q: "Caso eu não me identifique com o modelo de contabilidade online, como funciona o processo de cancelamento dos serviços?",
      a: "Entendemos que a adaptação pode levar um tempo e estamos à disposição para te ajudar no que for necessário. Caso ainda opte pelo cancelamento, basta formalizar a solicitação com nossa equipe. Cuidaremos de todo o processo de forma rápida, segura e sem impacto para sua empresa.",
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

function FreeCta() {
  return (
    <SectionWrapper>
      <div className="rounded-3xl bg-gradient-to-br from-primary to-sky-light p-10 text-center text-primary-foreground md:p-16">
        <h2 className="heading-display mb-4 text-3xl md:text-4xl">Conheça os planos para abrir sua empresa</h2>

        <div className="mx-auto mt-8 grid max-w-3xl gap-6 text-left">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-background mt-0.5 shrink-0" />
            <div>
              <p className="font-display font-bold text-lg">Abertura grátis</p>
              <p className="text-primary-foreground/85">Na contratação do plano com permanência mínima de 12 meses</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-background mt-0.5 shrink-0" />
            <div>
              <p className="font-display font-bold text-lg">Abertura avulsa</p>
              <p className="text-primary-foreground/85">R$ 990,00 — sem fidelidade</p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 justify-center max-w-3xl mx-auto">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-background text-base text-foreground hover:bg-background/90"
          >
            <a
              href={getWhatsAppLink("Olá! Quero abrir minha empresa com a Conta Web. Pode me explicar como funciona a abertura grátis e a abertura avulsa?")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir empresa
            </a>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full text-base text-foreground border-background/40 hover:text-accent-foreground"
          >
            <a
              href={getWhatsAppLink("Olá! Quero falar com um contador sobre abrir minha empresa.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar com um contador
            </a>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}

function SimuladorMeuPlano() {
  const [area, setArea] = useState<string | null>(null);

  const areas = [
    { id: "prestadores", label: "Prestadores de serviços" },
    { id: "profissionais", label: "Profissionais Liberais" },
    { id: "pme", label: "Pequenas e médias empresas" },
  ];

  const plans = [
    {
      name: "MEI",
      price: "89,90",
      desc: "Ideal para microempreendedores individuais",
      features: ["DAS mensal", "Declaração anual (DASN)", "Emissão de notas fiscais", "Suporte por chat"],
      popular: false,
    },
    {
      name: "Simples Nacional",
      price: "199,00",
      desc: "Para pequenas empresas em crescimento",
      features: ["Tudo do MEI +", "Folha de pagamento", "Apuração de impostos", "Obrigações acessórias"],
      popular: true,
    },
    {
      name: "Lucro Presumido",
      price: "399,00",
      desc: "Para empresas com faturamento robusto",
      features: ["Tudo do Simples +", "IRPJ / CSLL", "Planejamento tributário", "Consultor dedicado"],
      popular: false,
    },
  ];

  const platformFeatures = [
    { title: "Gestão de cobrança", desc: "PIX, boleto, cartão e recorrência em uma operação centralizada." },
    { title: "Integração bancária", desc: "Conecte contas e acompanhe conciliações com mais agilidade." },
    { title: "Notas fiscais", desc: "Emita NFS-e, NF-e e NFC-e com apoio operacional contínuo." },
    { title: "Contador virtual com IA", desc: "Respostas rápidas para dúvidas recorrentes e rotinas do dia a dia." },
    { title: "Conciliação inteligente", desc: "Mais controle financeiro com menos trabalho manual." },
    { title: "Segurança e LGPD", desc: "Proteção de dados e confiabilidade para a operação da empresa." },
  ];

  const services = serviceCategories.flatMap((cat) => cat.items);

  const renderPlanSection = () => (
    <section className="mt-10">
      <div className="mb-6 text-center">
        <h2 className="heading-display text-3xl md:text-4xl">Planos para sua empresa</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Informações de valores e o que é ofertado para cada plano.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <Card
            key={p.name}
            className={`relative h-full rounded-2xl ${
              p.popular ? "border-primary shadow-xl scale-[1.02]" : "border-border/50"
            }`}
          >
            <CardContent className="space-y-5 p-7 flex flex-col h-full">
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  Mais Popular
                </div>
              )}

              <div>
                <h3 className="font-display font-bold text-xl">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">R$</span>
                <span className="heading-display text-5xl">{p.price}</span>
              </div>

              <ul className="space-y-2.5 pt-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );

  return (
    <section className="pt-10">
      {!area ? (
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="heading-display text-3xl md:text-4xl">Selecione sua área de atuação</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Isso ajuda a indicar o plano mais adequado para o seu contexto.
          </p>

          <div className="mt-8 mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
            {areas.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setArea(a.id)}
                className={[
                  "rounded-2xl border p-6 transition-colors text-left",
                  "hover:border-primary/70 hover:bg-primary/5",
                  area === a.id ? "border-primary bg-primary/5" : "border-border/50 bg-card",
                ].join(" ")}
              >
                <p className="font-display text-lg font-semibold">{a.label}</p>
                <p className="mt-2 text-sm text-muted-foreground">Clique para simular</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm text-muted-foreground">Área selecionada</p>
            <h3 className="heading-display text-2xl md:text-3xl mt-1">{areas.find((x) => x.id === area)?.label}</h3>
          </div>

          {renderPlanSection()}

          <section className="mt-14">
            <div className="text-center">
              <span className="mb-4 inline-flex rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary">
                Plataforma Conta Web
              </span>
              <h2 className="heading-display text-3xl md:text-4xl">Tecnologia que trabalha por você</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground/70">
                Software completo para organizar cobranças, notas, finanças e o acompanhamento contábil em tempo real.
              </p>
            </div>

            <div className="mt-8 mx-auto max-w-5xl grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {platformFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-border/50 bg-card p-5 text-left"
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <div className="text-center mb-8">
              <h2 className="heading-display text-3xl md:text-4xl">Nossos Serviços</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Confira os serviços disponíveis e veja informações completas para cada um.
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 md:grid-cols-4">
              {services.map((service) => (
                <Card key={service.title} className="h-full rounded-2xl border-border/50 transition-shadow hover:shadow-lg">
                  <CardContent className="flex h-full flex-col space-y-3 p-6">
                    <h3 className="font-display text-lg font-semibold leading-7">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground flex-1">
                      {service.shortDesc ?? service.desc}
                    </p>
                    <div className="mt-auto pt-2">
                      <Button asChild variant="outline" size="sm" className="rounded-full">
                        <Link to={`/servicos#${serviceAnchor(service.title)}`}>Saiba mais</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </>
      )}
    </section>
  );
}

export default function Home() {
  const [simOpen, setSimOpen] = useState(false);

  const handleSimular = () => setSimOpen(true);

  return (
    <>
      <main>
        <Hero onSimular={handleSimular} />
        <Metrics />
        <ParaQuemContaWeb />
        <FreeCta />
        <FAQ />
        <CtaBanner />
      </main>

      <Dialog open={simOpen} onOpenChange={setSimOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <div className="max-h-[90vh] overflow-y-auto p-6">
            <SimuladorMeuPlano />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
