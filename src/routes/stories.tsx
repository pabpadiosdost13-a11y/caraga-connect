import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Quote, Sparkles, TrendingUp } from "lucide-react";
import { STORIES } from "@/lib/mock-data";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Success Stories — DOST Caraga MSMEs" },
      { name: "description", content: "Real before-and-after stories from MSMEs across Caraga who scaled with DOST support." },
    ],
  }),
  component: StoriesPage,
});

function StoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Success Stories</span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          MSMEs that scaled with DOST Caraga
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          From local markets to national shelves — see what's possible with the right innovation support.
        </p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {STORIES.map((s) => (
          <article key={s.id} className="flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[var(--shadow-soft)]">
            <div className="relative h-40 bg-[var(--gradient-hero)]">
              <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_30%,oklch(0.88_0.17_92/0.6),transparent_50%),radial-gradient(circle_at_80%_70%,oklch(0.6_0.22_27/0.45),transparent_50%)]" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 text-xs font-medium text-white/90">
                <MapPin className="h-3.5 w-3.5" /> {s.province} · {s.industry}
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <h3 className="text-lg font-semibold text-foreground">{s.business}</h3>
              <p className="text-sm text-muted-foreground">Owner: <span className="font-medium text-foreground">{s.owner}</span></p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-secondary/60 p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Before</div>
                  <p className="mt-1 text-xs text-foreground">{s.before}</p>
                </div>
                <div className="rounded-xl bg-accent-soft p-3">
                  <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                    <TrendingUp className="h-3 w-3" /> After
                  </div>
                  <p className="mt-1 text-xs text-foreground">{s.after}</p>
                </div>
              </div>
              <blockquote className="relative mt-1 rounded-xl bg-primary-soft p-4 text-sm italic text-foreground">
                <Quote className="absolute right-3 top-3 h-4 w-4 text-primary/40" />
                "{s.quote}"
              </blockquote>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {s.services.map((svc) => (
                  <span key={svc} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-foreground">{svc}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-3xl border border-border/70 bg-[var(--gradient-soft)] p-8 text-center">
        <Sparkles className="mx-auto h-6 w-6 text-primary" />
        <h2 className="mt-2 text-xl font-bold text-foreground">Your story could be next.</h2>
        <p className="mt-1 text-sm text-muted-foreground">Find the DOST services that match your business — in just two questions.</p>
        <Link to="/wizard" className="mt-4 inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
          Start the wizard
        </Link>
      </div>
    </div>
  );
}