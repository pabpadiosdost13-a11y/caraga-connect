import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Clock, Tag } from "lucide-react";
import type { Service } from "@/lib/mock-data";
import { CATEGORIES } from "@/lib/mock-data";

const TINT_CLASSES: Record<"blue" | "yellow" | "red", string> = {
  blue: "bg-primary-soft text-primary",
  yellow: "bg-accent-soft text-accent-foreground",
  red: "bg-brand-red/10 text-brand-red",
};

export function tintFor(category: string) {
  return CATEGORIES.find((c) => c.name === category)?.tint ?? "blue";
}

export function ServiceCard({ service }: { service: Service }) {
  const tint = tintFor(service.category);
  return (
    <Link
      to="/services/$id"
      params={{ id: service.id }}
      className="group relative flex h-full flex-col rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-card)]"
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${TINT_CLASSES[tint]}`}>
          {service.category}
        </span>
        {service.popular && (
          <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-semibold text-accent-foreground">
            Popular
          </span>
        )}
      </div>
      <h3 className="mt-3 text-base font-semibold leading-snug text-foreground">
        {service.name}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
        {service.shortDescription}
      </p>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><Building2 className="h-3.5 w-3.5" />{service.office.replace("DOST Caraga ", "")}</span>
        <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{service.processingTime}</span>
        <span className="inline-flex items-center gap-1"><Tag className="h-3.5 w-3.5" />{service.fees}</span>
      </div>
      <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}