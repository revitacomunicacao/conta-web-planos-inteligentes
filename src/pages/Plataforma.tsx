import { motion } from "framer-motion";
import {
  CreditCard, Landmark, Receipt, Bot, RefreshCw, Shield, BarChart3, Plug,
  Smartphone, Globe, QrCode, ArrowRight, CheckCircle2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/SectionWrapper";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getWhatsAppLink } from "@/lib/whatsapp";
import topoInternasPhoto from "@/assets/TopoInternas.jpg.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const features = [
  {
    icon: CreditCard,
    title: "Gestão de Cobrança",
    desc: "Emita cobranças via PIX, boleto bancário, cartão de crédito e débito. Configure cobranças recorrentes para mensalidades e assinaturas.",
    highlights: ["PIX instantâneo", "Boleto registrado", "Cartão de crédito/débito", "Cobrança recorrente"],
  },
  {
    icon: Landmark,
    title: "Integração Bancária",
    desc: "Conecte suas contas bancárias e tenha extrato em tempo real. Mais de 20 bancos integrados para conciliação automática.",
    highlights: ["20+ bancos", "Extrato em tempo real", "Conciliação automática", "Multi-contas"],
  },
  {
    icon: Receipt,
    title: "Notas Fiscais",
    desc: "Emissão de NFS-e, NF-e e NFC-e em mais de 5.500 municípios do Brasil. Automação completa do processo fiscal.",
    highlights: ["NFS-e / NF-e / NFC-e", "5.500+ municípios", "Emissão em lote", "Envio automático por e-mail"],
  },
  {
    icon: Bot,
    title: "Contador Virtual com IA",
    desc: "Tire dúvidas contábeis instantaneamente com nosso assistente de inteligência artificial, disponível 24 horas por dia.",
    highlights: ["Respostas instantâneas", "Disponível 24h", "Dúvidas contábeis e fiscais", "Sugestões inteligentes"],
  },
  {
    icon: RefreshCw,
    title: "Conciliação Inteligente",
    desc: "Reconciliação automática de extratos bancários com lançamentos contábeis. Economize horas de trabalho manual.",
    highlights: ["Reconciliação automática", "Sugestão de vínculos", "Detecção de divergências", "Relatórios"],
  },
  {
    icon: BarChart3,
    title: "Relatórios e Dashboards",
    desc: "Painéis visuais com indicadores financeiros em tempo real. DRE, fluxo de caixa e análises gerenciais sempre atualizadas.",
    highlights: ["DRE simplificado", "Fluxo de caixa", "Indicadores financeiros", "Exportação PDF/Excel"],
  },
  {
    icon: Plug,
    title: "Integração com ERPs",
    desc: "Conecte seu sistema de gestão (ERP) e sincronize dados automaticamente, eliminando retrabalho e erros de digitação.",
    highlights: ["APIs abertas", "Sincronização automática", "Múltiplos ERPs", "Webhooks"],
  },
  {
    icon: Shield,
    title: "Segurança e LGPD",
    desc: "Dados protegidos com criptografia de ponta a ponta e conformidade total com a Lei Geral de Proteção de Dados.",
    highlights: ["Criptografia", "LGPD compliant", "Backup automático", "Controle de acesso"],
  },
];

export default function Plataforma() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground text-background py-20 md:py-28">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-90"
          style={{ backgroundImage: `url(${topoInternasPhoto})` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/15" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
                <Smartphone className="w-3.5 h-3.5" /> Plataforma Conta Web
              </span>
              <h1 className="heading-display text-4xl md:text-5xl text-background mb-4">
                Gerencie sua empresa de qualquer lugar
              </h1>
              <p className="text-background/60 text-lg max-w-lg leading-relaxed mb-6">
                Software completo para gestão financeira, emissão de notas fiscais, cobrança e acompanhamento contábil em tempo real.
              </p>
              <Button asChild size="lg" className="rounded-full bg-primary hover:bg-sky-light">
                <a href={getWhatsAppLink("Olá! Quero conhecer a plataforma Conta Web.")} target="_blank" rel="noopener noreferrer">
                  Quero conhecer <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </motion.div>

            {/* Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-background/5 border border-background/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs text-background/40">
                  <Globe className="w-4 h-4" />
                  app.contaweb.com.br
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-primary/20 rounded-xl p-4">
                    <QrCode className="w-6 h-6 text-primary mb-2" />
                    <p className="text-xs text-background/60">Cobrança PIX</p>
                    <p className="text-lg font-bold text-background mt-1">R$ 1.250,00</p>
                  </div>
                  <div className="bg-accent/20 rounded-xl p-4">
                    <Receipt className="w-6 h-6 text-accent mb-2" />
                    <p className="text-xs text-background/60">NF emitidas</p>
                    <p className="text-lg font-bold text-background mt-1">47 hoje</p>
                  </div>
                </div>
                <div className="bg-background/5 rounded-xl p-4 border border-background/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-4 h-4 text-primary" />
                    <span className="text-xs text-background/60">Contador Virtual</span>
                  </div>
                  <p className="text-sm text-background/80">
                    "Sua empresa pode recuperar R$ 3.200 em créditos de PIS/COFINS dos últimos 5 anos."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <SectionWrapper>
        <div className="text-center mb-14">
          <h2 className="heading-display text-3xl md:text-4xl">Funcionalidades</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Tudo integrado em uma única plataforma para simplificar a gestão da sua empresa.
          </p>
        </div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={fadeUp}>
              <Card className="h-full rounded-2xl hover:shadow-lg transition-shadow border-border/50">
                <CardContent className="p-7">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <f.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display font-semibold text-lg">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                      <ul className="grid grid-cols-2 gap-1.5 pt-2">
                        {f.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="bg-secondary/30">
        <div className="text-center">
          <h2 className="heading-display text-3xl md:text-4xl mb-4">Quer ver a plataforma em ação?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Agende uma demonstração gratuita e veja como a Conta Web pode transformar a gestão da sua empresa.
          </p>
          <Button asChild size="lg" className="rounded-full gap-2">
            <a href={getWhatsAppLink("Olá! Gostaria de agendar uma demonstração da plataforma Conta Web.")} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="w-5 h-5" /> Agendar Demonstração
            </a>
          </Button>
        </div>
      </SectionWrapper>
    </main>
  );
}
