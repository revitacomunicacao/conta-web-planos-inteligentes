import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/SectionWrapper";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { services as categories } from "@/lib/services";
import { serviceAnchor } from "@/lib/serviceAnchor";
import { MessageCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// (dados movidos para `src/lib/services.ts`)

export default function Servicos() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash?.replace(/^#/, "");
    if (!hash) return;

    // O elemento pode ainda não ter sido renderizado quando a rota muda.
    // Esperamos um tick para então rolar para a âncora correta.
    const t = window.setTimeout(() => {
      const el = document.getElementById(hash);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);

    return () => window.clearTimeout(t);
  }, [location.hash]);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 py-20 md:py-28">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="heading-display text-4xl md:text-5xl mb-4">Nossos Serviços</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A Conta Web realiza atendimento a empresas comerciais, industriais, serviços, construção civil e entidades do terceiro setor. Formando e profissionalizando a equipe de apoio ao cumprimento das obrigações acessórias em geral e seus reflexos, visando as soluções contábeis e gerenciais.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      {categories.map((cat, ci) => (
        <SectionWrapper key={cat.title} className={ci % 2 === 1 ? "bg-secondary/30" : ""}>
          <div className="mb-10">
            <h2 className="heading-display text-2xl md:text-3xl">{cat.title}</h2>
            {cat.desc && <p className="text-muted-foreground mt-2">{cat.desc}</p>}
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {cat.items.map((item) => (
              <motion.div key={item.title} variants={fadeUp}>
                <Card
                  id={serviceAnchor(item.title)}
                  className="h-full scroll-mt-24 rounded-2xl hover:shadow-lg transition-shadow border-border/50"
                >
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-display font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </SectionWrapper>
      ))}

      {/* CTA */}
      <SectionWrapper>
        <div className="text-center bg-gradient-to-br from-primary to-sky-light rounded-3xl p-10 md:p-16 text-primary-foreground">
          <h2 className="heading-display text-3xl md:text-4xl mb-4">Precisa de algo específico?</h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">
            Fale com nossos contadores e encontraremos a solução ideal para a sua empresa.
          </p>
          <Button asChild size="lg" className="rounded-full bg-background text-foreground hover:bg-background/90">
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" /> Falar com Contador
            </a>
          </Button>
        </div>
      </SectionWrapper>
    </main>
  );
}
