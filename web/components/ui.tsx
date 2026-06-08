"use client";

import { signOut } from "next-auth/react";

/**
 * Brand logo: a crossed claw-hammer + ring-spanner mark in a rounded badge,
 * with the "Kazi Connect" wordmark. Pass `light` on dark backgrounds to invert
 * the badge (white badge, acacia tools).
 */
export function Logo({ light = false }: { light?: boolean }) {
  const badge = light ? "#FFFFFF" : "#1A6B45"; // also used to "carve" notches
  const tool = light ? "#1A6B45" : "#FFFFFF";
  return (
    <span className="inline-flex items-center gap-2">
      <svg width="34" height="34" viewBox="0 0 48 48" aria-hidden="true" className="shrink-0">
        <rect x="2" y="2" width="44" height="44" rx="12" fill={badge} />
        {/* ring spanner */}
        <g transform="rotate(45 24 24)">
          <rect x="22" y="21" width="4" height="16" rx="2" fill={tool} />
          <circle cx="24" cy="15.5" r="6.6" fill={tool} />
          <circle cx="24" cy="15.5" r="2.7" fill={badge} />
        </g>
        {/* claw hammer */}
        <g transform="rotate(-45 24 24)">
          <rect x="22.2" y="20" width="3.6" height="16" rx="1.8" fill={tool} />
          <rect x="15.5" y="11.5" width="17" height="7.5" rx="2.2" fill={tool} />
          <path d="M15.5 13.3 l0 3.9 l3 -1.95 Z" fill={badge} />
        </g>
      </svg>
      <span
        className={`font-display text-lg font-bold tracking-tight ${
          light ? "text-white" : "text-ink"
        }`}
      >
        Kazi Connect
      </span>
    </span>
  );
}

export function Stars({ value, count }: { value: number; count: number }) {
  if (!count) return <span className="text-sm text-muted">No reviews yet</span>;
  const full = Math.round(value);
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <span className="text-gold">{"★".repeat(full)}</span>
      <span className="text-line">{"★".repeat(5 - full)}</span>
      <span className="text-muted">
        {value.toFixed(1)} ({count})
      </span>
    </span>
  );
}

export function Badge({
  children,
  tone = "acacia",
}: {
  children: React.ReactNode;
  tone?: "acacia" | "clay" | "muted";
}) {
  const tones = {
    acacia: "bg-acacia-soft text-acacia-dark",
    clay: "bg-clay-soft text-clay",
    muted: "bg-line/60 text-muted",
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-ghost text-sm">
      Sign out
    </button>
  );
}
