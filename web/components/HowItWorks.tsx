"use client";

const STEPS = [
  { n: "1", icon: "✍️", title: "Post the job", body: "Describe it in plain words — “leaking pipe in Kasarani”." },
  { n: "2", icon: "🧠", title: "AI scans", body: "The model reads your text and identifies the trade." },
  { n: "3", icon: "📊", title: "Best matches", body: "Workers are scored on skill, distance, rating & history." },
  { n: "4", icon: "🤝", title: "Hire", body: "Contact your top pick on WhatsApp and get it done." },
];

const PIPELINE = [
  { label: "Your request", sub: '"plumber in Kasarani"', bar: "bg-ink" },
  { label: "Trade detected", sub: "model → plumber", bar: "bg-clay" },
  { label: "Weighted scoring", sub: "skill · distance · rating · history", bar: "bg-acacia" },
  { label: "Ranked matches", sub: "top 5 pros", bar: "bg-gold" },
];

export function HowItWorks() {
  return (
    <div className="space-y-14">
      {/* step flow */}
      <div>
        <h2 className="mb-8 font-display text-3xl font-bold">From job to hire in four steps</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.n} className="relative">
              <div
                className="card h-full animate-fadeUp p-6"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-acacia-soft text-lg">
                    {s.icon}
                  </span>
                  <span className="font-display text-sm font-bold text-clay">STEP {s.n}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.body}</p>
              </div>
              {i < STEPS.length - 1 && (
                <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-2xl text-line md:block">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI pipeline explainer */}
      <div className="card overflow-hidden p-6 md:p-8">
        <h3 className="font-display text-xl font-semibold">How the AI matching works</h3>
        <p className="mt-1 text-sm text-muted">
          Your words become a trade, then a transparent score — no black box.
        </p>
        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-stretch">
          {PIPELINE.map((p, i) => (
            <div key={p.label} className="flex flex-1 items-center gap-3">
              <div
                className="flex-1 animate-fadeUp rounded-xl border border-line bg-paper/50 p-4"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <p className="font-display font-semibold">{p.label}</p>
                <p className="mt-0.5 text-xs text-muted">{p.sub}</p>
                <span
                  className={`mt-3 block h-1 rounded-full ${p.bar} animate-growX origin-left`}
                  style={{ animationDelay: `${i * 150 + 150}ms` }}
                />
              </div>
              {i < PIPELINE.length - 1 && <span className="hidden text-xl text-line md:block">→</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
