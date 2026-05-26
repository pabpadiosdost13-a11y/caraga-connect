import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkles, User } from "lucide-react";
import { assistantReply, SERVICES } from "@/lib/mock-data";
import { ServiceCard } from "@/components/service-card";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Smart Assistant — DOST Caraga Navigator" },
      { name: "description", content: "Describe your business in plain language and the assistant will point you to the right DOST Caraga services." },
    ],
  }),
  component: AssistantPage,
});

type Msg = { role: "user" | "bot"; text: string; ids?: string[] };

const SUGGESTIONS = [
  "I make banana chips and want to sell in malls.",
  "We're a seaweed cooperative looking to add value.",
  "I need help getting FDA registration.",
  "Looking for equipment funding for my bakery.",
];

export default function AssistantPage() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi! I'm the DOST Caraga assistant. Tell me about your business — what you make, sell, or want to improve. I'll suggest services that can help." },
  ]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const reply = assistantReply(text);
    setMsgs((m) => [
      ...m,
      { role: "user", text },
      { role: "bot", text: reply.message, ids: reply.ids },
    ]);
    setInput("");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <header className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Smart Assistant
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Describe your business in plain language
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A lightweight, rule-based assistant that maps your needs to DOST Caraga services.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-border/70 bg-card p-4 shadow-[var(--shadow-soft)] sm:p-6">
        <div className="flex flex-col gap-4">
          {msgs.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${m.role === "user" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>
                {m.role === "user" ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
              </div>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary/70 text-foreground"}`}>
                <p>{m.text}</p>
                {m.ids && m.ids.length > 0 && (
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {m.ids.map((id) => {
                      const s = SERVICES.find((x) => x.id === id);
                      return s ? <ServiceCard key={id} service={s} /> : null;
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="flex items-center gap-2 rounded-2xl border border-border bg-background p-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. I want to package and sell my coconut sugar…"
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button type="submit" className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Send className="h-4 w-4" /> Send
          </button>
        </form>

        <div className="flex flex-wrap gap-2 pt-1">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => send(s)} className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs text-foreground hover:bg-secondary">
              {s}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Recommendations are informational. Official bookings happen on DOST Caraga portals.
      </p>
    </div>
  );
}