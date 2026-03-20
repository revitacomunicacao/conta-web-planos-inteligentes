import { motion } from "framer-motion";
import {
  Cpu,
  Factory,
  Globe,
  Handshake,
  HardHat,
  HeartPulse,
  Landmark,
  Lightbulb,
  Megaphone,
  Settings,
  Newspaper,
  Palette,
  Ruler,
  Scale,
  ShoppingCart,
  ShieldCheck,
  Sprout,
  Stethoscope,
  Store,
  Video,
  Users,
  Film,
  Building2,
  Wrench,
  Smile,
} from "lucide-react";

import SectionWrapper from "@/components/SectionWrapper";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const segments = [
  { icon: Ruler, label: "Escritórios de Arquitetura" },
  { icon: Video, label: "Youtubers / Influencers" },
  { icon: HardHat, label: "Escritórios de Engenharia" },
  { icon: Scale, label: "Escritórios de Advocacia" },
  { icon: Cpu, label: "Software Houses" },
  { icon: HeartPulse, label: "Clínicas de Fisioterapia" },
  { icon: Wrench, label: "Prestadores de Serviço" },
  { icon: ShieldCheck, label: "Corretoras de Seguro" },
  { icon: Palette, label: "Artistas" },
  { icon: Film, label: "Produtores de Conteúdo" },
  { icon: Lightbulb, label: "Empresas de Consultoria" },
  { icon: Handshake, label: "Representação Comercial" },
  { icon: ShoppingCart, label: "E-Commerces" },
  { icon: Factory, label: "Indústrias em Geral" },
  { icon: Store, label: "Franquias / Franchising" },
  { icon: Stethoscope, label: "Clínicas Médicas/Médicos" },
  { icon: Megaphone, label: "Agências de Publicidade" },
  { icon: Settings, label: "Indústrias de Transformação" },
  { icon: Smile, label: "Clínicas Odontológicas" },
  { icon: Landmark, label: "Holdings" },
  { icon: Store, label: "Comércios em Geral" },
  { icon: Sprout, label: "Produtores Rurais" },
];

export default function SegmentsQueAtendemos() {
  return (
    <SectionWrapper className="bg-secondary/30">
      <div className="text-center mb-10">
        <h2 className="heading-display text-2xl md:text-3xl">Áreas de atuações</h2>
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
  );
}

