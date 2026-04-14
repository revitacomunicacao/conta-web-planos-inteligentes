import { Link } from "react-router-dom";

import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { getLucideIcon } from "@/lib/lucideIconRegistry";

type ParaQuemContaWebProps = {
  title: string;
  items: { label: string; iconKey: string | null }[];
  button: { texto: string; link: string } | null;
};

function toInternalPath(href: string) {
  try {
    const u = new URL(href);
    return `${u.pathname}${u.search}${u.hash}`;
  } catch {
    return href;
  }
}

export default function ParaQuemContaWeb({ title, items, button }: ParaQuemContaWebProps) {
  return (
    <SectionWrapper className="bg-secondary/30 !py-10 md:!py-14">
      <div className="text-center mb-10">
        <h2 className="heading-display text-2xl md:text-3xl">{title}</h2>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
        {items.map((s) => (
          (() => {
            const Icon = getLucideIcon(s.iconKey);
            return (
          <Link
            key={s.label}
            to={button?.link ? toInternalPath(button.link) : "/planos"}
            className="group text-center rounded-2xl p-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="w-16 h-16 rounded-2xl bg-card border flex items-center justify-center mx-auto mb-4 shadow-sm transition-colors group-hover:bg-primary/5 group-hover:border-primary/40">
              {Icon ? <Icon className="w-7 h-7 text-primary" /> : null}
            </div>
            <p className="text-sm font-medium">{s.label}</p>
          </Link>
            );
          })()
        ))}
      </div>

      <div className="mt-10 text-center">
        {button ? (
          <Button asChild className="rounded-full">
            <a href={button.link}>{button.texto}</a>
          </Button>
        ) : null}
      </div>
    </SectionWrapper>
  );
}

