import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ExternalLink, Mail, MapPin, Phone, Clock } from "lucide-react";
import { OFFICES } from "@/lib/mock-data";

const PROVINCES = ["All", "Agusan del Norte", "Agusan del Sur", "Surigao del Norte", "Surigao del Sur", "Dinagat Islands"];

export const Route = createFileRoute("/directory")({
  head: () => ({
    meta: [
      { title: "Office & Facility Directory — DOST Caraga" },
      { name: "description", content: "Find DOST Caraga provincial offices, laboratories, and innovation centers across Caraga Region." },
    ],
  }),
  component: DirectoryPage,
});

function DirectoryPage() {
  const [province, setProvince] = useState("All");
  const filtered = useMemo(() => province === "All" ? OFFICES : OFFICES.filter((o) => o.province === province), [province]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Directory</span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          DOST Caraga offices & facilities
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Provincial Science & Technology Centers (PSTCs), laboratories, and innovation hubs across the region.
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {PROVINCES.map((p) => (
              <button
                key={p}
                onClick={() => setProvince(p)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${province === p ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/70"}`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="mt-5 space-y-4">
            {filtered.map((o) => (
              <article key={o.id} className="rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--shadow-soft)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{o.name}</h3>
                    <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {o.province} · {o.address}
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid gap-2 text-sm text-foreground sm:grid-cols-2">
                  <div className="inline-flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4" /> {o.hours}</div>
                  <div className="inline-flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /> {o.phone}</div>
                  <div className="inline-flex items-center gap-2 text-muted-foreground sm:col-span-2"><Mail className="h-4 w-4" /> {o.email}</div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {o.services.map((s) => (
                    <span key={s} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-foreground">{s}</span>
                  ))}
                </div>
                <a
                  href={o.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  Visit official portal <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </article>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[var(--shadow-soft)]">
            <div className="relative aspect-square w-full bg-[var(--gradient-soft)]">
              <div className="absolute inset-0 [background-image:radial-gradient(circle_at_30%_30%,oklch(0.48_0.18_255/0.18),transparent_40%),radial-gradient(circle_at_70%_60%,oklch(0.88_0.17_92/0.25),transparent_45%),radial-gradient(circle_at_50%_85%,oklch(0.6_0.22_27/0.18),transparent_40%)]" />
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 p-6">
                {["Surigao del Norte", "Dinagat Islands", "Agusan del Norte", "Surigao del Sur", "Agusan del Sur"].map((p, i) => (
                  <button
                    key={p}
                    onClick={() => setProvince(p)}
                    className={`m-2 flex items-end justify-start rounded-2xl border border-white/40 bg-white/70 p-3 text-left text-xs font-semibold text-foreground shadow-[var(--shadow-soft)] backdrop-blur transition-all hover:border-primary/50 hover:bg-white ${province === p ? "ring-2 ring-primary" : ""}`}
                    style={{ gridColumn: i % 2 === 0 ? "1" : "2", gridRow: Math.floor(i / 2) + 1 }}
                  >
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-primary" /> {p}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="border-t border-border/70 p-4 text-xs text-muted-foreground">
              Stylized Caraga Region map · click a province to filter
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}