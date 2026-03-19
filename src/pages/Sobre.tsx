import { motion } from "framer-motion";
import { Building, Factory, Hammer, Globe, Heart, Users, MessageCircle } from "lucide-react";
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
              <h1 className="heading-display text-4xl md:text-5xl mb-6">A Conta Web</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                A Conta Web realiza atendimento a empresas comerciais, industriais, serviços, construção civil e entidades do terceiro setor. Formando e profissionalizando a equipe de apoio ao cumprimento das obrigações acessórias em geral e seus reflexos. Visando as soluções contábeis e gerenciais.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Com uma equipe de contadores experientes e uma plataforma digital completa, oferecemos muito mais do que um escritório de contabilidade tradicional — entregamos uma experiência moderna, transparente e eficiente para empresas de todos os portes e segmentos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

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
