import { motion } from "framer-motion";

import SectionWrapper from "@/components/SectionWrapper";
import { cn } from "@/lib/utils";
import { getLucideIcon } from "@/lib/lucideIconRegistry";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function SegmentsQueAtendemos({
  title = "Áreas de atuações",
  items,
  compact = false,
  id,
  onItemClick,
}: {
  title?: string;
  items?: { title: string; iconKey: string | null }[];
  compact?: boolean;
  id?: string;
  onItemClick?: (label: string) => void;
}) {
  const segments = (items ?? []).slice().sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
  return (
    <SectionWrapper id={id} className={cn("bg-secondary/30", compact && "!py-10 md:!py-14")}>
      <div className="text-center mb-10">
        <h2 className="heading-display text-2xl md:text-3xl">{title}</h2>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto"
      >
        {segments.map((s, idx) => {
          const Icon = getLucideIcon(s.iconKey);
          return (
          <motion.div key={`${s.title}-${idx}`} variants={fadeUp} className="text-center">
            {onItemClick ? (
              <button
                type="button"
                onClick={() => onItemClick(s.title)}
                className="group w-full rounded-2xl p-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-card border flex items-center justify-center mx-auto mb-3 shadow-sm transition-colors group-hover:bg-primary/5 group-hover:border-primary/40">
                  {Icon ? <Icon className="w-7 h-7 text-primary" /> : null}
                </div>
                <p className="text-sm font-medium">{s.title}</p>
              </button>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-card border flex items-center justify-center mx-auto mb-3 shadow-sm">
                  {Icon ? <Icon className="w-7 h-7 text-primary" /> : null}
                </div>
                <p className="text-sm font-medium">{s.title}</p>
              </>
            )}
          </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}

