import { motion } from "framer-motion";
import {
  Building2, FileText, Calculator, Users, BarChart3, Shield, RefreshCw, FileCheck,
  ClipboardList, Briefcase, Scale, Receipt, UserPlus, CalendarDays, DollarSign
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/SectionWrapper";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const categories = [
  {
    title: "Abertura e Gestão Empresarial",
    desc: "Suporte completo para todas as fases da sua empresa.",
    items: [
      { icon: Building2, title: "Abertura de Empresa", desc: "CNPJ, Junta Comercial, alvarás e todas as inscrições necessárias." },
      { icon: RefreshCw, title: "Alteração Contratual", desc: "Mudanças no contrato social, endereço, sócios e atividades." },
      { icon: FileCheck, title: "Encerramento de Empresa", desc: "Baixa completa junto a todos os órgãos competentes." },
      { icon: BarChart3, title: "Consultoria Empresarial", desc: "Orientação estratégica para o crescimento sustentável." },
      { icon: Shield, title: "IRPF", desc: "Declaração de Imposto de Renda Pessoa Física completa." },
    ],
  },
  {
    title: "Contabilidade",
    desc: "Escrituração e relatórios para todos os regimes tributários.",
    items: [
      { icon: Calculator, title: "Simples Nacional", desc: "Apuração do DAS, DEFIS e obrigações acessórias do regime." },
      { icon: Scale, title: "Lucro Presumido", desc: "IRPJ, CSLL, PIS, COFINS e todas as obrigações periódicas." },
      { icon: Briefcase, title: "Lucro Real", desc: "Escrituração completa, LALUR, ECF e demonstrações contábeis." },
    ],
  },
  {
    title: "Fiscal e Tributário",
    desc: "Gestão de impostos e obrigações com o fisco.",
    items: [
      { icon: Receipt, title: "Apuração de Impostos", desc: "Cálculo mensal de todos os tributos devidos pela empresa." },
      { icon: FileText, title: "Obrigações Acessórias", desc: "SPED Fiscal, EFD-Contribuições, DCTF, DIRF e demais." },
      { icon: DollarSign, title: "Recuperação Fiscal", desc: "Identificação de créditos tributários e recuperação de valores." },
      { icon: ClipboardList, title: "Planejamento Tributário", desc: "Análise do melhor regime e estratégias para redução de carga." },
    ],
  },
  {
    title: "Departamento Pessoal",
    desc: "Gestão completa de colaboradores e obrigações trabalhistas.",
    items: [
      { icon: UserPlus, title: "Admissão e Registro", desc: "Registro de empregados, contrato de trabalho e documentação." },
      { icon: Users, title: "Folha de Pagamento", desc: "Cálculo mensal, holerites, FGTS, INSS e IRRF." },
      { icon: CalendarDays, title: "Férias e 13º", desc: "Programação de férias, cálculo de 13º e provisões." },
      { icon: FileText, title: "Rescisão e Homologação", desc: "Cálculos rescisórios, TRCT e acompanhamento de homologações." },
      { icon: ClipboardList, title: "Obrigações Trabalhistas", desc: "eSocial, DCTFWEB, RAIS, CAGED e demais obrigações." },
    ],
  },
];

export default function Servicos() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 py-20 md:py-28">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="heading-display text-4xl md:text-5xl mb-4">Nossos Serviços</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Soluções contábeis completas para empresas de todos os portes e segmentos.
              Da abertura do CNPJ à gestão completa do seu departamento pessoal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      {categories.map((cat, ci) => (
        <SectionWrapper key={cat.title} className={ci % 2 === 1 ? "bg-secondary/30" : ""}>
          <div className="mb-10">
            <h2 className="heading-display text-2xl md:text-3xl">{cat.title}</h2>
            <p className="text-muted-foreground mt-2">{cat.desc}</p>
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
                <Card className="h-full rounded-2xl hover:shadow-lg transition-shadow border-border/50">
                  <CardContent className="p-6 space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
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
