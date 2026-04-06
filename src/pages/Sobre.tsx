import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/SectionWrapper";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";
import SegmentsQueAtendemos from "@/components/SegmentsQueAtendemos";
import topoInternasPhoto from "@/assets/TopoInternas.jpg.jpeg";

export default function Sobre() {
  return (
    <main className="pt-20">
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
              <h1 className="heading-display text-4xl md:text-5xl mb-6">A Conta Web</h1>
              <p className="text-lg leading-relaxed mb-4">
                A Conta Web é um escritório de contabilidade online, reconhecido pela confiança, agilidade e qualidade no atendimento aos seus clientes. Liderada por um gestor com mais de 40 anos de experiência, a empresa combina tradição e conhecimento com tecnologia e soluções modernas. Especializada em oferecer suporte completo para empresas, a Conta Web atua como uma parceira estratégica, proporcionando praticidade e eficiência por meio de um atendimento digital, sem abrir mão da proximidade e do cuidado com cada cliente.
              </p>
              <p className="text-lg leading-relaxed">
                Pensando em proporcionar a melhor experiência desde o início, a Conta Web oferece dois planos para a abertura de CNPJ, facilitando o caminho para quem deseja empreender com segurança e suporte profissional. A Conta Web analisa e avalia os impactos da Reforma Tributária para sua empresa, garantindo decisões mais seguras e estratégicas. Mais do que contabilidade, a Conta Web entrega tranquilidade, organização e resultados para quem busca crescer com inteligência e solidez no mercado. Deixa a burocracia com a Conta Web e foque no que realmente importa: o crescimento do seu negócio.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Segments */}
      <SegmentsQueAtendemos id="areas-de-atuacoes" />

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
