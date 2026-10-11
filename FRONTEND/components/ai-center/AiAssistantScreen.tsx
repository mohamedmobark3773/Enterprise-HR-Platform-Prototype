"use client";

import React, { useRef, useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/lib/context/AppContext";
import { Stage8Nav } from "@/components/stage8/Stage8Nav";
import { Stage8Kpis } from "@/components/stage8/Stage8Kpis";
import {
  answerQuery,
  assistantPrompts,
  type AssistantExchange,
} from "@/lib/ai-center/ai-center-data";

const kpis = [
  { label: "Models", value: "8" },
  { label: "Active predictions", value: "126" },
  { label: "Needs review", value: "9" },
  { label: "Avg confidence", value: "86.4%" },
];

const greeting: AssistantExchange = {
  id: "greeting",
  role: "assistant",
  text: "Ask about a specific entity (e.g. HM-104) or a topic such as cost, maintenance, inventory or risk. Answers come from seeded demo records only. (Demo output — NOT CONNECTED to a live model.)",
  citations: [],
};

export function AiAssistantScreen() {
  const { tr } = useApp();
  const [messages, setMessages] = useState<AssistantExchange[]>([greeting]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const send = (query: string) => {
    const text = query.trim();
    if (!text) return;
    const userMessage: AssistantExchange = { id: `u-${Date.now()}`, role: "user", text };
    const reply = answerQuery(text);
    setMessages((current) => [...current, userMessage, reply]);
    setInput("");
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  return (
    <>
      <Stage8Nav module="ai-center" />
      <PageTitle
        eyebrow="Stage 8 · AI Center"
        title="AI Assistant / AI Query Center"
        subtitle="Algeria operations · Q4 2026 · Updated 09:42 UTC+1"
        actions={
          <button className="secondary-button" type="button" onClick={() => setMessages([greeting])}>
            <Icon name="check" size={15} /> {tr("Clear conversation")}
          </button>
        }
      />

      <Stage8Kpis kpis={kpis} />

      <div className="stage8-assistant">
        <section className="stage8-chat">
          <div className="stage8-chat-head">
            <div>
              <h2>{tr("NEXUS AI Assistant")}</h2>
              <p>{tr("Demo output · NOT CONNECTED to a live model")}</p>
            </div>
            <Badge tone="violet">{tr("Demo")}</Badge>
          </div>

          <div className="stage8-chat-log" ref={scrollRef}>
            {messages.map((message) => (
              <div key={message.id} className={`stage8-bubble ${message.role}`}>
                <p>{message.role === "user" ? message.text : tr(message.text)}</p>
                {message.citations && message.citations.length > 0 && (
                  <div className="stage8-citations">
                    {message.citations.map((citation) => (
                      <em key={citation}>{citation}</em>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <form
            className="stage8-chat-input"
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
          >
            <Icon name="search" size={16} />
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about an entity or topic…"
              aria-label="Ask the assistant"
            />
            <button type="submit" className="stage8-primary">
              {tr("Send")}
            </button>
          </form>
        </section>

        <aside className="stage8-side">
          <section className="stage8-prompts">
            <h3>{tr("Suggested questions")}</h3>
            <div className="stage8-prompt-list">
              {assistantPrompts.map((prompt) => (
                <button key={prompt.id} type="button" onClick={() => send(prompt.prompt)}>
                  {tr(prompt.prompt)}
                </button>
              ))}
            </div>
          </section>
          <section className="stage8-ai-panel compact">
            <div className="stage8-ai-eyebrow">
              <Icon name="spark" size={14} /> {tr("Guardrails")}
            </div>
            <ul className="stage8-ai-lines">
              <li>{tr("Answers cite the source model and version.")}</li>
              <li>{tr("No live model call is made; results are seeded demo data.")}</li>
              <li>{tr("Predictions requiring human review are labelled.")}</li>
            </ul>
          </section>
        </aside>
      </div>
    </>
  );
}

export default AiAssistantScreen;
