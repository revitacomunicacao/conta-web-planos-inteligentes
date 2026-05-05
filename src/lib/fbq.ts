type FbqFn = (action: string, eventName: string, params?: Record<string, unknown>) => void;

function getFbq(): FbqFn | null {
  const w = window as unknown as { fbq?: FbqFn };
  return typeof w.fbq === "function" ? w.fbq : null;
}

export function trackLead(): void {
  try {
    getFbq()?.("track", "Lead");
  } catch {
    // no-op: tracking must never break navigation
  }
}

