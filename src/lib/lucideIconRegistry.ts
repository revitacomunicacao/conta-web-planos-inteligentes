import {
  Building2,
  CheckCircle2,
  Users,
  Wrench,
  CreditCard,
  Landmark,
  Receipt,
  Bot,
  RefreshCw,
  Shield,
  BarChart3,
  Plug,
} from "lucide-react";

const registry: Record<string, unknown> = {
  wrench: Wrench,
  users: Users,
  building2: Building2,
  checkcircle2: CheckCircle2,
  CheckCircle2: CheckCircle2,
  CreditCard: CreditCard,
  Landmark: Landmark,
  Receipt: Receipt,
  Bot: Bot,
  RefreshCw: RefreshCw,
  Shield: Shield,
  BarChart3: BarChart3,
  Plug: Plug,
};

export function getLucideIcon(iconKey: string | null) {
  if (!iconKey) return null;
  const direct = registry[iconKey];
  if (direct) return direct as typeof Wrench;
  const normalized = registry[iconKey.toLowerCase()];
  return (normalized ?? null) as typeof Wrench | null;
}

