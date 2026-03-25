import { Building2, Users, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";

const items = [
  { icon: Wrench, label: "Prestadores de serviços" },
  { icon: Users, label: "Profissionais Liberais" },
  { icon: Building2, label: "Pequenas e médias empresas" },
];

export default function ParaQuemContaWeb() {
  return (
    <SectionWrapper className="bg-secondary/30 !py-10 md:!py-14">
      <div className="text-center mb-10">
        <h2 className="heading-display text-2xl md:text-3xl">Para quem é a Conta Web?</h2>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
        {items.map((s) => (
          <div key={s.label} className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-card border flex items-center justify-center mx-auto mb-4 shadow-sm">
              <s.icon className="w-7 h-7 text-primary" />
            </div>
            <p className="text-sm font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/sobre#areas-de-atuacoes">Saiba mais</Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}

