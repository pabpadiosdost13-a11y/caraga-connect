import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bookmark, Clock, Sparkles, Trash2 } from "lucide-react";
import { SERVICES } from "@/lib/mock-data";
import { ServiceCard } from "@/components/service-card";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Journey — DOST Caraga Navigator" },
      { name: "description", content: "Saved services, recently viewed, and suggested next steps tailored to your MSME." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [saved, setSaved] = useState<string[]>([]);
  const [viewed, setViewed] = useState<string[]>([]);

  useEffect(() => {
    try {
      setSaved(JSON.parse(localStorage.getItem("dost:saved") || "[]"));
      setViewed(JSON.parse(localStorage.getItem("dost:viewed") || "[]"));
    } catch {}
  }, []);

  const clear = (key: string, setter: (v: string[]) => void) => {
    localStorage.removeItem(key);
    setter([]);
  };

  const savedSvc = saved.map((id) => SERVICES.find((s) => s.id === id)).filter(Boolean) as typeof SERVICES;
  const viewedSvc = viewed.map((id) => SERVICES.find((s) => s.id === id)).filter(Boolean) as typeof SERVICES;
  const suggested = SERVICES.filter((s) => s.popular && !saved.includes(s.id) && !viewed.includes(s.id)).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">My Journey</span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Your MSME assistance dashboard
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Saved services and recently viewed items are stored on this device — no sign-in required.
        </p>
      </header>

      <Section
        icon={<Bookmark className="h-4 w-4" />}
        title="Saved services"
        empty="You haven't saved any services yet. Tap the Save button on a service to keep it here."
        items={savedSvc}
        onClear={savedSvc.length ? () => clear("dost:saved", setSaved) : undefined}
      />

      <Section
        icon={<Clock className="h-4 w-4" />}
        title="Recently viewed"
        empty="No recent activity yet. Browse the catalog to start."
        items={viewedSvc}
        onClear={viewedSvc.length ? () => clear("dost:viewed", setViewed) : undefined}
      />

      <Section
        icon={<Sparkles className="h-4 w-4" />}
        title="Suggested for your business"
        empty="Great — you've explored most popular services!"
        items={suggested}
      />

      <div className="mt-12 rounded-3xl border border-border/70 bg-[var(--gradient-soft)] p-8 text-center">
        <h2 className="text-xl font-bold text-foreground">Need a clearer next step?</h2>
        <p className="mt-1 text-sm text-muted-foreground">Get a personalized plan in 30 seconds.</p>
        <Link to="/wizard" className="mt-4 inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
          Run the wizard
        </Link>
      </div>
    </div>
  );
}

function Section({
  icon, title, empty, items, onClear,
}: { icon: React.ReactNode; title: string; empty: string; items: typeof SERVICES; onClear?: () => void }) {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-foreground">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary-soft text-primary">{icon}</span>
          {title}
        </h2>
        {onClear && (
          <button onClick={onClear} className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-destructive">
            <Trash2 className="h-3.5 w-3.5" /> Clear
          </button>
        )}
      </div>
      {items.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          {empty}
        </div>
      ) : (
        <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      )}
    </section>
  );
}