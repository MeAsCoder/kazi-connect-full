"use client";

import { useEffect, useState } from "react";

/**
 * The brand "loading agent": an animated KC mark with a rotating ring and
 * cycling progress text. Used by app/loading.tsx (route transitions) and
 * inline while the AI matching runs.
 */
export function LoadingAgent({
  steps = ["Warming up the model…", "Reading your request…", "Scoring nearby pros…"],
  compact = false,
}: {
  steps?: string[];
  compact?: boolean;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % steps.length), 1100);
    return () => clearInterval(t);
  }, [steps.length]);

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${compact ? "py-6" : "py-20"}`}>
      <div className="relative grid place-items-center">
        <span className="absolute h-16 w-16 rounded-full border-2 border-acacia/20 border-t-acacia animate-ring" />
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-acacia font-display text-lg font-bold text-white animate-breathe">
          KC
        </span>
      </div>
      <p className="text-sm text-muted transition-opacity">{steps[i]}</p>
    </div>
  );
}
