import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, Sparkles, MapPin, ArrowRight, Building2, Lightbulb,
  ShieldCheck, Package, FlaskConical, GraduationCap, Rocket, Award,
  Factory, Repeat,
} from "lucide-react";
import { CATEGORIES, SERVICES, STORIES } from "@/lib/mock-data";
import { ServiceCard } from "@/components/service-card";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  FlaskConical, ShieldCheck, Package, Factory, Lightbulb, Sparkles,
  GraduationCap, Rocket, Repeat, Award,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DOST Caraga Navigator — Find the right innovation help for your MSME" },
      { name: "description", content: "Search DOST Caraga labs, trainings, SETUP funding, packaging and more — built for MSMEs in Caraga Region." },
    ],
  }),
  component: Index,
});

function Index() {
  const [q, setQ] = useState("");
  const popular = SERVICES.filter((s) => s.popular).slice(0, 6);
  const tintBg: Record<string, string> = {
    blue: "bg-primary-soft text-primary",
    yellow: "bg-accent-soft text-accent-foreground",
    red: "bg-brand-red/10 text-brand-red",
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[var(--gradient-hero)]" />
        <div className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(circle_at_25%_30%,oklch(0.88_0.17_92/0.3),transparent_50%),radial-gradient(circle_at_80%_70%,oklch(0.6_0.22_27/0.25),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center text-primary-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Department of Science and Technology — Caraga
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              The digital front door to <span className="text-accent">DOST Caraga</span> services for MSMEs
            </h1>
            <p className="mt-5 text-base text-white/85 sm:text-lg">
              Discover laboratories, trainings, SETUP funding, and innovation programs — all in one friendly place. We guide you to the right help, then send you to the official booking portal.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `/services?q=${encodeURIComponent(q)}`;
              }}
              className="mx-auto mt-8 flex max-w-2xl items-center gap-2 rounded-2xl border border-white/20 bg-white p-2 shadow-[var(--shadow-card)]"
            >
              <Search className="ml-3 h-5 w-5 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search services e.g. 'nutrition analysis', 'packaging', 'SETUP'"
                className="flex-1 bg-transparent px-2 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Search
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
              {["FDA", "Packaging", "SETUP funding", "Nutrition analysis", "FabLab"].map((t) => (
                <Link
                  key={t}
                  to="/services"
                  className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-white backdrop-blur hover:bg-white/20"
                >
                  {t}
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/wizard" className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-soft)] hover:opacity-90">
                <Lightbulb className="h-4 w-4" /> Find the right help in 30 seconds
              </Link>
              <Link to="/assistant" className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20">
                <Sparkles className="h-4 w-4" /> Ask the Smart Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Browse by category</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">Ten service areas covering every stage of your MSME journey.</p>
          </div>
          <Link to="/services" className="hidden text-sm font-medium text-primary hover:underline sm:inline-flex sm:items-center sm:gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((c) => {
            const Icon = ICONS[c.icon] ?? Sparkles;
            return (
              <Link
                key={c.name}
                to="/services"
                search={{ category: c.name } as any}
                className="group flex flex-col items-start gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-card)]"
              >
                <span className={`grid h-10 w-10 place-items-center rounded-xl ${tintBg[c.tint]}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-foreground">{c.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Most requested */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Most-requested services</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">What Caraga MSMEs are asking DOST for the most.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {popular.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      </section>

      {/* Wizard CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-[var(--gradient-soft)] p-8 sm:p-12">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                <Lightbulb className="h-3.5 w-3.5" /> Recommendation Engine
              </span>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Not sure what you need? We'll guide you.
              </h3>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Answer two simple questions about your business and we'll recommend the most relevant DOST Caraga services, labs, and programs.
              </p>
              <Link to="/wizard" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] hover:opacity-90">
                Start the guided wizard <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { t: "Food processor needing FDA?", s: "FDA Assistance + GMP + Nutrition" },
                { t: "Want better packaging?", s: "PLAC Packaging & Labeling" },
                { t: "Need equipment upgrade?", s: "SETUP zero-interest fund" },
                { t: "Prototyping a new product?", s: "FabLab Caraga + R&D" },
              ].map((x) => (
                <div key={x.t} className="rounded-xl border border-border/70 bg-card p-4 shadow-[var(--shadow-soft)]">
                  <div className="text-sm font-semibold text-foreground">{x.t}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{x.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stories preview */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">MSMEs we've helped grow</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">Real stories from Caraga entrepreneurs.</p>
          </div>
          <Link to="/stories" className="hidden text-sm font-medium text-primary hover:underline sm:inline-flex sm:items-center sm:gap-1">
            See all stories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {STORIES.map((s) => (
            <article key={s.id} className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-6 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {s.province} · {s.industry}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{s.business}</h3>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Before:</span> {s.before}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">After:</span> {s.after}
              </p>
              <blockquote className="mt-1 rounded-xl bg-accent-soft p-3 text-sm italic text-accent-foreground">
                "{s.quote}"
              </blockquote>
            </article>
          ))}
        </div>
      </section>

      {/* Provinces strip */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-[var(--shadow-soft)] sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-foreground">Serving all of Caraga Region</h3>
              <p className="mt-1 text-sm text-muted-foreground">Five provincial offices and shared regional facilities.</p>
            </div>
            <Link to="/directory" className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary/70">
              <Building2 className="h-4 w-4" /> Open directory
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {["Agusan del Norte", "Agusan del Sur", "Surigao del Norte", "Surigao del Sur", "Dinagat Islands"].map((p) => (
              <div key={p} className="rounded-xl border border-border/70 bg-secondary/40 p-4 text-sm font-medium text-foreground">
                <MapPin className="mb-2 h-4 w-4 text-primary" />
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
