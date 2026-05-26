import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, SERVICES, type Category } from "@/lib/mock-data";
import { ServiceCard } from "@/components/service-card";

export const Route = createFileRoute("/services")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
    category: typeof search.category === "string" ? (search.category as string) : "",
  }),
  head: () => ({
    meta: [
      { title: "Service Catalog — DOST Caraga Navigator" },
      { name: "description", content: "Browse all DOST Caraga services for MSMEs — laboratory testing, packaging, SETUP, trainings, FabLab and more." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { q: initQ, category: initCat } = Route.useSearch();
  const [q, setQ] = useState(initQ);
  const [cat, setCat] = useState<string>(initCat);

  useEffect(() => { setQ(initQ); setCat(initCat); }, [initQ, initCat]);

  const results = useMemo(() => {
    const low = q.toLowerCase();
    return SERVICES.filter((s) => {
      const matchQ = !low ||
        s.name.toLowerCase().includes(low) ||
        s.shortDescription.toLowerCase().includes(low) ||
        s.tags.some((t) => t.toLowerCase().includes(low));
      const matchCat = !cat || s.category === cat;
      return matchQ && matchCat;
    });
  }, [q, cat]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Service Catalog</span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Find the DOST Caraga service you need
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Search and filter across all DOST Caraga services. Each card explains requirements, fees, and links you to the official booking portal.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3 shadow-[var(--shadow-soft)]">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search services, tags, or labs…"
            className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
          />
          {q && (
            <button onClick={() => setQ("")} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <SlidersHorizontal className="h-3.5 w-3.5" /> Filter:
        </span>
        <button
          onClick={() => setCat("")}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${cat === "" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/70"}`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.name}
            onClick={() => setCat(c.name)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${cat === c.name ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/70"}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-3 text-sm text-muted-foreground">
        {results.length} service{results.length === 1 ? "" : "s"} found
      </div>

      {results.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center">
          <p className="text-sm text-muted-foreground">No services match your search.</p>
          <Link to="/wizard" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
            Try the recommendation wizard →
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {results.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      )}
    </div>
  );
}