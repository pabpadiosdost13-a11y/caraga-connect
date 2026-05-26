import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bookmark, Building2, Clock, ExternalLink, Mail, Phone, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { getService, SERVICES } from "@/lib/mock-data";
import { ServiceCard } from "@/components/service-card";

export const Route = createFileRoute("/services/$id")({
  loader: ({ params }) => {
    const service = getService(params.id);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.service.name} — DOST Caraga` },
      { name: "description", content: loaderData?.service.shortDescription ?? "" },
    ],
  }),
  component: ServiceDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-foreground">Service not found</h1>
      <Link to="/services" className="mt-4 inline-block text-primary hover:underline">Back to catalog</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <button onClick={reset} className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Try again</button>
    </div>
  ),
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const related = SERVICES.filter((s) => s.id !== service.id && s.category === service.category).slice(0, 3);
  const [saved, setSaved] = useState(false);
  const [viewed, setViewed] = useState<string[]>([]);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("dost:saved") || "[]") as string[];
      setSaved(s.includes(service.id));
      const v = JSON.parse(localStorage.getItem("dost:viewed") || "[]") as string[];
      const nv = [service.id, ...v.filter((id) => id !== service.id)].slice(0, 12);
      localStorage.setItem("dost:viewed", JSON.stringify(nv));
      setViewed(nv);
    } catch {}
  }, [service.id]);

  const toggleSave = () => {
    try {
      const s = JSON.parse(localStorage.getItem("dost:saved") || "[]") as string[];
      const next = s.includes(service.id) ? s.filter((id) => id !== service.id) : [...s, service.id];
      localStorage.setItem("dost:saved", JSON.stringify(next));
      setSaved(next.includes(service.id));
    } catch {}
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Link to="/services" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to catalog
      </Link>

      <div className="mt-4 rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-medium text-primary">
              {service.category}
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {service.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">{service.description}</p>
          </div>
          <button
            onClick={toggleSave}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${saved ? "border-accent bg-accent-soft text-accent-foreground" : "border-border bg-secondary hover:bg-secondary/70 text-foreground"}`}
          >
            <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
            {saved ? "Saved" : "Save"}
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <InfoCell icon={<Tag className="h-4 w-4" />} label="Estimated fees" value={service.fees} />
          <InfoCell icon={<Clock className="h-4 w-4" />} label="Processing time" value={service.processingTime} />
          <InfoCell icon={<Building2 className="h-4 w-4" />} label="Office" value={service.office} />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Requirements</h2>
            <ul className="mt-3 space-y-2 text-sm text-foreground">
              {service.requirements.map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {r}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Contact</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2 text-foreground"><Phone className="h-4 w-4 text-muted-foreground" /> {service.contact.phone}</li>
              <li className="flex items-center gap-2 text-foreground"><Mail className="h-4 w-4 text-muted-foreground" /> {service.contact.email}</li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {service.tags.map((t) => (
                <span key={t} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-foreground">{t}</span>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-8 rounded-2xl border border-accent/40 bg-accent-soft p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">Ready to apply?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                We don't process bookings here — continue to the official DOST Caraga portal to submit your request.
              </p>
            </div>
            <a
              href={service.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] hover:opacity-90"
            >
              Proceed to Official Booking Portal
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-bold tracking-tight text-foreground">Related services</h2>
            <Link to="/services" className="text-sm font-medium text-primary hover:underline">
              See all <ArrowRight className="ml-1 inline h-4 w-4" />
            </Link>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {related.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
        </section>
      )}
      {viewed.length > 1 && (
        <p className="mt-10 text-xs text-muted-foreground">
          Tracking {viewed.length} recently viewed service{viewed.length === 1 ? "" : "s"} in your <Link to="/dashboard" className="text-primary hover:underline">journey dashboard</Link>.
        </p>
      )}
    </div>
  );
}

function InfoCell({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-secondary/40 p-4">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      <div className="mt-1.5 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}