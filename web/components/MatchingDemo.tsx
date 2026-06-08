"use client";

import { useMemo, useState } from "react";

// Mirrors the backend's weighted score so the demo is honest, not theatre.
const W = { skill: 0.4, distance: 0.25, rating: 0.2, completion: 0.15 };

function scoreOf(distKm: number, rating: number, years: number) {
  const skill = 1; // trade already matches in this illustration
  const proximity = Math.exp(-distKm / 8);
  const r = rating / 5;
  const completion = Math.min(1, 0.6 + years * 0.025);
  const total = W.skill * skill + W.distance * proximity + W.rating * r + W.completion * completion;
  return {
    total: Math.round(total * 100),
    parts: {
      skill: W.skill * skill,
      distance: W.distance * proximity,
      rating: W.rating * r,
      completion: W.completion * completion,
    },
  };
}

const COMPETITORS = [
  { name: "Wanjiku", ...scoreOf(11, 4.6, 6) },
  { name: "Kamau", ...scoreOf(6, 4.9, 12) },
];

function Slider({
  label, value, min, max, step, onChange, suffix,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; suffix: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium text-ink/80">{label}</span>
        <span className="font-display font-semibold text-acacia">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        className="kc-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export function MatchingDemo() {
  const [dist, setDist] = useState(2);
  const [rating, setRating] = useState(4.8);
  const [years, setYears] = useState(8);

  const you = useMemo(() => scoreOf(dist, rating, years), [dist, rating, years]);

  const board = useMemo(() => {
    const rows = [
      { name: "You (drag to tune)", total: you.total, you: true },
      ...COMPETITORS.map((c) => ({ name: c.name, total: c.total, you: false })),
    ];
    return rows.sort((a, b) => b.total - a.total);
  }, [you.total]);

  const partMax = { skill: 0.4, distance: 0.25, rating: 0.2, completion: 0.15 };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* controls */}
      <div className="card p-6">
        <p className="mb-4 text-sm text-muted">
          Adjust a worker&apos;s attributes and watch the match score recompute live —
          this is the exact formula the platform uses.
        </p>
        <div className="space-y-5">
          <Slider label="Distance from client" value={dist} min={0.5} max={30} step={0.5} suffix=" km" onChange={setDist} />
          <Slider label="Average rating" value={rating} min={1} max={5} step={0.1} suffix=" ★" onChange={setRating} />
          <Slider label="Years of experience" value={years} min={0} max={20} step={1} suffix=" yr" onChange={setYears} />
        </div>

        <div className="mt-6 rounded-xl bg-paper/70 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Match score</span>
            <span className="font-display text-3xl font-bold text-acacia">{you.total}%</span>
          </div>
          <div className="mt-3 space-y-1.5">
            {(["skill", "distance", "rating", "completion"] as const).map((k) => (
              <div key={k} className="flex items-center gap-2 text-xs">
                <span className="w-20 capitalize text-muted">{k}</span>
                <span className="h-1.5 flex-1 rounded-full bg-line">
                  <span
                    className="block h-1.5 rounded-full bg-acacia transition-all duration-300"
                    style={{ width: `${(you.parts[k] / partMax[k]) * 100}%` }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* live leaderboard */}
      <div className="card p-6">
        <p className="mb-4 text-sm text-muted">Live ranking against two other workers</p>
        <div className="space-y-3">
          {board.map((row, i) => (
            <div
              key={row.name}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all duration-300 ${
                row.you ? "border-acacia bg-acacia-soft" : "border-line bg-paper/50"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className={`font-medium ${row.you ? "text-acacia-dark" : ""}`}>{row.name}</span>
              </span>
              <span className="font-display text-lg font-bold">{row.total}%</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">
          Notice how closing the distance often beats a slightly higher rating — distance is
          weighted heavily because a nearby pro can actually show up.
        </p>
      </div>
    </div>
  );
}
