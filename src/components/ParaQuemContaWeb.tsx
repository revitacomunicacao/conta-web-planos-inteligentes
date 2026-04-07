import { Building2, Car, Users, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";

const items = [
  { icon: Wrench, label: "Prestadores de serviços" },
  { icon: Users, label: "Profissionais Liberais" },
  { icon: Building2, label: "Pequenas e médias empresas" },
  { icon: Car, label: "Motorista de aplicativos" },
];

export default function ParaQuemContaWeb() {
  return (
    <SectionWrapper className="bg-secondary/30 !py-10 md:!py-14">
      <div className="text-center mb-10">
        <h2 className="heading-display text-2xl md:text-3xl">Para quem é a Conta Web?</h2>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s) => (
          <Link
            key={s.label}
            to="/planos"
            className="group text-center rounded-2xl p-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="w-16 h-16 rounded-2xl bg-card border flex items-center justify-center mx-auto mb-4 shadow-sm transition-colors group-hover:bg-primary/5 group-hover:border-primary/40">
              <s.icon className="w-7 h-7 text-primary" />
            </div>
            <p className="text-sm font-medium">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button asChild className="rounded-full">
          <Link to="/planos">Saiba mais</Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}

