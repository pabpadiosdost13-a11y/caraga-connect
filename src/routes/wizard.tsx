import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, RefreshCw, Sparkles } from "lucide-react";
import { recommendServices, SERVICES } from "@/lib/mock-data";
import { ServiceCard } from "@/components/service-card";

const INDUSTRIES = ["Food Processing", "Agriculture", "Fisheries", "Manufacturing", "Handicrafts", "ICT"];
const CHALLENGES = ["Packaging", "Low production", "Product quality", "Certification", "Digital marketing", "Process improvement"];

export const Route = createFileRoute("/wizard")({
  head: () => ({
    meta: [
      { title: "Find the Right Help — DOST Caraga Wizard" },
      { name: "description", content: "Answer two questions and get personalized DOST Caraga service recommendations for your MSME." },
    ],
  }),
  component: WizardPage,
});

function WizardPage() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [industry, setIndustry] = useState("");
  const [challenge, setChallenge] = useState("");

  const reset = () => { setStep(0); setIndustry(""); setChallenge(""); };

  const result = step === 2 ? recommendServices(industry, challenge) : null;
  const recs = result ? result.serviceIds.map((id) => SERVICES.find((s) => s.id === id)!).filter(Boolean) : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <header className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Guided Recommendation
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Tell us about your business
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Two quick questions — we'll match you with the most relevant DOST Caraga services.
        </p>
      </header>

      <div className="mt-8 flex items-center justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all ${i <= step ? "w-10 bg-primary" : "w-6 bg-border"}`} />
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-soft)] sm:p-10">
        {step === 0 && (
          <div>
            <h2 className="text-xl font-bold text-foreground">What industry are you in?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Pick the closest match.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {INDUSTRIES.map((i) => (
                <button
                  key={i}
                  onClick={() => { setIndustry(i); setStep(1); }}
                  className={`rounded-2xl border p-4 text-left text-sm font-medium transition-all ${industry === i ? "border-primary bg-primary-soft text-primary" : "border-border bg-secondary/40 text-foreground hover:border-primary/40 hover:bg-secondary"}`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 1 && (
          <div>
            <button onClick={() => setStep(0)} className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
            <h2 className="mt-3 text-xl font-bold text-foreground">What challenge are you facing?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Industry: <span className="font-medium text-foreground">{industry}</span></p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {CHALLENGES.map((c) => (
                <button
                  key={c}
                  onClick={() => { setChallenge(c); setStep(2); }}
                  className={`rounded-2xl border p-4 text-left text-sm font-medium transition-all ${challenge === c ? "border-primary bg-primary-soft text-primary" : "border-border bg-secondary/40 text-foreground hover:border-primary/40 hover:bg-secondary"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Recommended for you
                </span>
                <h2 className="mt-3 text-xl font-bold text-foreground">{industry} · {challenge}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{result?.rationale}</p>
              </div>
              <button onClick={reset} className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary/70">
                <RefreshCw className="h-3.5 w-3.5" /> Restart
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {recs.map((s) => <ServiceCard key={s.id} service={s} />)}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-secondary/50 p-4">
              <p className="text-sm text-muted-foreground">
                Want to explore more? Browse the full catalog or ask our Smart Assistant.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link to="/services" className="rounded-xl bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-[var(--shadow-soft)] hover:bg-secondary">
                  Full catalog
                </Link>
                <Link to="/assistant" className="inline-flex items-center gap-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
                  Ask Assistant <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}