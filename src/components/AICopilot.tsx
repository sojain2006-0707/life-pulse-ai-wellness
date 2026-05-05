import React, { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
};

const AICopilot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: "welcome",
    role: "assistant",
    content: "Hi! I'm your AI Copilot. Ask me about your mood trends, sleep, stress, or how to use the app.",
    timestamp: Date.now(),
  }]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages
            .filter((m) => m.role !== "system")
            .map(({ role, content }) => ({ role, content }))
            .concat({ role: "user", content: text }),
        }),
      });

      if (!res.ok) throw new Error(`Chat failed: ${res.status}`);
      const data = await res.json();
      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply ?? "(No response)",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, reply]);
    } catch (err: any) {
      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Sorry, I couldn't reach the chat service. ${err?.message ?? ""}`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, reply]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors px-5 py-3"
      >
        <Sparkles className="w-5 h-5" />
        <span className="font-medium">AI Copilot</span>
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-[92vw] max-w-md h-[70vh] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">LifePulse Copilot</span>
            </div>
            <button className="p-1 rounded hover:bg-gray-100" onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm shadow ${
                    m.role === "user" ? "bg-blue-600 text-white" : "bg-white border"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-xs text-gray-500">Thinking…</div>
            )}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask anything…"
              className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-3 py-2 text-sm font-medium disabled:opacity-50 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AICopilot;
