"use client";

import { useEffect, useRef, useState } from "react";
import type { PlanResponse, TripCard } from "@/lib/types";
import { ErrorBubble, ExperienceCard, FoodCard, StayCard } from "./cards";
import { SendIcon } from "./icons";

const THINKING_MS = 1400;
const SUGGESTION = "Plan a weekend in Kyoto for two";

type Message =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; text: string }
  | { id: number; role: "assistant"; cards: TripCard[]; prompt: string }
  | { id: number; role: "thinking" };

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function TripChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Hi! I can plan your Kyoto weekend, Fri 11 – Sun 13 Apr 2025. Tell me what you’re after and I’ll suggest a stay, an experience and a place to eat.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const nextId = useRef(1);
  const rowIndex = useRef(0); // which spreadsheet row the next successful reply uses
  const failPending = useRef(false); // ?fail=once → first request fails
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    failPending.current = new URLSearchParams(window.location.search).get("fail") === "once";
  }, []);

  useEffect(() => {
    const last = messages[messages.length - 1];
    // A card reply is tall — bring its top (the stay card) into view instead of the bottom.
    if (last && "cards" in last && last.cards.length > 1) {
      document.getElementById(`msg-${last.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  async function requestPlan(prompt: string) {
    setBusy(true);
    const thinkingId = nextId.current++;
    setMessages((m) => [...m, { id: thinkingId, role: "thinking" }]);

    const fail = failPending.current;
    failPending.current = false;

    let cards: PlanResponse;
    try {
      const [res] = await Promise.all([
        fetch("/api/plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, index: rowIndex.current, fail }),
        }),
        wait(THINKING_MS),
      ]);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      cards = (await res.json()) as PlanResponse;
    } catch {
      cards = [
        {
          cardType: "error",
          details: {
            message: "Sorry, I couldn’t put your Kyoto weekend together just now. Let’s give it another go.",
            buttonLabel: "Try again",
            buttonPosition: "",
            buttonAction: "",
          },
        },
      ];
    }

    if (cards[0]?.cardType !== "error") rowIndex.current += 1;

    setMessages((m) => m.map((msg) => (msg.id === thinkingId ? { id: thinkingId, role: "assistant", cards, prompt } : msg)));
    setBusy(false);
  }

  function send(text: string) {
    const prompt = text.trim();
    if (!prompt || busy) return;
    setInput("");
    setMessages((m) => [...m, { id: nextId.current++, role: "user", text: prompt }]);
    void requestPlan(prompt);
  }

  function retry(errorMsgId: number, prompt: string) {
    if (busy) return;
    setMessages((m) => m.filter((msg) => msg.id !== errorMsgId));
    void requestPlan(prompt);
  }

  const showSuggestion = !messages.some((m) => m.role === "user");

  return (
    <div className="mx-auto flex h-dvh w-full max-w-[1400px] flex-col">
      <header className="flex items-center gap-3 border-b border-neutral-200 bg-canvas/90 px-4 py-3 lg:px-8 backdrop-blur">
        <span className="h-2.5 w-2.5 rounded-full bg-coral" aria-hidden />
        <div>
          <h1 className="text-sm font-semibold">Kyoto trip planner</h1>
          <p className="text-xs text-muted">Fri 11 – Sun 13 Apr 2025 · 2 nights</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-8" aria-live="polite">
        <div className="space-y-5">
          {messages.map((msg) => {
            if (msg.role === "user") {
              return (
                <div key={msg.id} className="flex justify-end">
                  <p className="max-w-[80%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-sm text-white">{msg.text}</p>
                </div>
              );
            }
            if (msg.role === "thinking") {
              return (
                <div key={msg.id}>
                  <Label />
                  <div className="inline-flex items-center gap-2.5 rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
                    <span className="flex gap-1" aria-hidden>
                      <span className="think-dot h-1.5 w-1.5 rounded-full bg-neutral-500" />
                      <span className="think-dot h-1.5 w-1.5 rounded-full bg-neutral-500" />
                      <span className="think-dot h-1.5 w-1.5 rounded-full bg-neutral-500" />
                    </span>
                    <span className="text-xs text-muted">Planning your Kyoto weekend…</span>
                  </div>
                </div>
              );
            }
            if ("text" in msg) {
              return (
                <div key={msg.id}>
                  <Label />
                  <p className="max-w-[85%] lg:max-w-xl rounded-2xl rounded-tl-md bg-white px-4 py-3 text-sm leading-relaxed shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
                    {msg.text}
                  </p>
                </div>
              );
            }
            return (
              <div key={msg.id} id={`msg-${msg.id}`} className="scroll-mt-4">
                <Label />
                {/* Phone: cards top to bottom. Desktop: stay, experience, food left to right. */}
                <div className="flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-4">
                  {msg.cards.map((card, i) => (
                    <div key={card.cardType} className="rise" style={{ animationDelay: `${i * 140}ms` }}>
                      {card.cardType === "stay" && <StayCard d={card.details} />}
                      {card.cardType === "experience" && <ExperienceCard d={card.details} />}
                      {card.cardType === "food" && <FoodCard d={card.details} />}
                      {card.cardType === "error" && (
                        <ErrorBubble d={card.details} disabled={busy} onRetry={() => retry(msg.id, msg.prompt)} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>
      </main>

      <footer className="border-t border-neutral-200 bg-canvas px-4 pb-4 pt-3 lg:px-8">
        {showSuggestion && (
          <button
            type="button"
            onClick={() => send(SUGGESTION)}
            className="mb-2 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium hover:bg-neutral-50"
          >
            {SUGGESTION}
          </button>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 rounded-full border border-neutral-300 bg-white py-1.5 pl-4 pr-1.5 focus-within:border-neutral-500"
        >
          <label htmlFor="prompt" className="sr-only">
            Message
          </label>
          <input
            id="prompt"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for a Kyoto weekend plan…"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
          />
          <button
            type="submit"
            aria-label="Send"
            disabled={busy || !input.trim()}
            className="grid h-9 w-9 place-items-center rounded-full bg-coral text-white transition active:scale-95 disabled:bg-neutral-300"
          >
            <SendIcon className="h-4 w-4" />
          </button>
        </form>
      </footer>
    </div>
  );
}

function Label() {
  return <p className="mb-1.5 text-xs font-medium text-muted">Assistant</p>;
}
