import { motion } from "framer-motion";
import { Target, Users, Lightbulb, Heart, Building, Factory, Hammer, Globe, MessageCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/SectionWrapper";
import { getWhatsAppLink } from "@/lib/whatsapp";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const values = [
  { icon: Target, title: "Tecnologia", desc: "Plataforma própria com ferramentas inteligentes para você gerenciar tudo em tempo real." },
  { icon: Users, title: "Atendimento Humanizado", desc: "Contadores de verdade sempre disponíveis para tirar dúvidas e orientar decisões." },
  { icon: Lightbulb, title: "Inovação", desc: "Investimos constantemente em IA e automação para simplificar sua contabilidade." },
  { icon: Heart, title: "Transparência", desc: "Planos com preço fixo, sem taxa de adesão e sem cobranças surpresa." },
];

const segments = [
  { icon: Building, label: "Comércio" },
  { icon: Factory, label: "Indústria" },
  { icon: Globe, label: "Serviços" },
  { icon: Hammer, label: "Construção Civil" },
  { icon: Heart, label: "Terceiro Setor" },
  { icon: Users, label: "Profissionais Liberais" },
];

export default function Sobre() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="heading-display text-4xl md:text-5xl mb-6">Sobre a Conta Web</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                A <strong className="text-foreground">Conta Web</strong> nasceu com a missão de democratizar a contabilidade no Brasil. Acreditamos que toda empresa, independente do porte, merece acesso a serviços contábeis de qualidade, com tecnologia de ponta e preços acessíveis.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Com uma equipe de contadores experientes e uma plataforma digital completa, oferecemos muito mais do que um escritório de contabilidade tradicional — entregamos uma experiência moderna, transparente e eficiente.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <SectionWrapper>
        <div className="mb-10">
          <h2 className="heading-display text-2xl md:text-3xl">Nossos Valores</h2>
          <p className="text-muted-foreground mt-2">O que nos move todos os dias.</p>
        </div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {values.map((v) => (
            <motion.div key={v.title} variants={fadeUp}>
              <Card className="h-full rounded-2xl border-border/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <v.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      {/* Segments */}
      <SectionWrapper className="bg-secondary/30">
        <div className="text-center mb-10">
          <h2 className="heading-display text-2xl md:text-3xl">Segmentos que Atendemos</h2>
          <p className="text-muted-foreground mt-2">Expertise em diversos setores da economia.</p>
        </div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto"
        >
          {segments.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-card border flex items-center justify-center mx-auto mb-3 shadow-sm">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <p className="text-sm font-medium">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <div className="text-center bg-gradient-to-br from-primary to-sky-light rounded-3xl p-10 md:p-16 text-primary-foreground">
          <h2 className="heading-display text-3xl md:text-4xl mb-4">Vamos trabalhar juntos?</h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">
            Conheça nossos planos e descubra como podemos simplificar a contabilidade da sua empresa.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="rounded-full bg-background text-foreground hover:bg-background/90">
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" /> Falar Conosco
              </a>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
