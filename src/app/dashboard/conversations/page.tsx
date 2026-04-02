"use client";
import { useState } from "react";
import { Search, Paperclip, Send, X, ChevronDown, Plus } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const CONVOS = [
  {
    id: "1",
    name: "Emma Wilson",
    preview: "Where's my order? I ordered 3 days ago...",
    time: "2m ago",
    channel: "WhatsApp",
    tag: "AI: Medium",
    tagColor: "bg-yellow-100 text-yellow-700",
    active: true,
  },
  {
    id: "2",
    name: "James Rodriguez",
    preview: "Thanks! That solved my problem.",
    time: "15m ago",
    channel: "",
    tag: "Resolved",
    tagColor: "bg-green-100 text-green-700",
    active: false,
  },
  {
    id: "3",
    name: "Sophia Chen",
    preview: "I need to change my shipping address...",
    time: "32m ago",
    channel: "Web Chat",
    tag: "Escalated",
    tagColor: "bg-red-100 text-red-700",
    active: false,
  },
  {
    id: "4",
    name: "Michael Brown",
    preview: "What's your return policy for sale items?",
    time: "1h ago",
    channel: "",
    tag: "AI: High",
    tagColor: "bg-blue-100 text-blue-700",
    active: false,
  },
];

const AI_MSGS = [
  {
    from: "user",
    text: "Hi, where's my order? I ordered 3 days ago and haven't received any updates.",
    time: "10:32 AM",
  },
  {
    from: "ai",
    text: "Hi Emma! I'd be happy to help you track your order. Could you please provide your order number?",
    time: "10:32 AM",
    conf: "92% confidence",
  },
  { from: "user", text: "It's order #12847", time: "10:33 AM" },
  {
    from: "ai",
    text: "Thanks! I found your order #12847. It's currently in transit and expected to arrive tomorrow by 5 PM. Here's the tracking link: track.providius.io/12847",
    time: "10:33 AM",
    conf: "88% confidence",
    sources: ["Order Database", "Shipping Policy"],
  },
  {
    from: "user",
    text: "But I paid for express shipping! It should have arrived yesterday.",
    time: "10:35 AM",
  },
];

const HUMAN_MSGS = [
  {
    from: "ai",
    text: "Thanks! I found your order #12847. It's currently in transit and expected to arrive tomorrow by 5 PM. Here's the tracking link: track.providius.io/12847",
    time: "10:33 AM",
    conf: "88% confidence",
    sources: ["Order Database", "Shipping Policy"],
  },
  {
    from: "human",
    text: "Hi Emma, this is Sarah I've taken over the chat. I can see your order #12847 is currently being processed at our warehouse. I'll expedite this for you right now.",
    time: "10:32 AM",
    agent: "Sarah Jenkins",
  },
];

/* ── Escalate Modal ─────────────────────────────────────────────────────── */
function EscalateModal({
  onClose,
  onEscalate,
}: {
  onClose: () => void;
  onEscalate: () => void;
}) {
  const [agent, setAgent] = useState("Sarah Jenkins (Support Lead)");
  const [note, setNote] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[440px] mx-4 p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          Escalate to Human Agent
        </h3>
        <p className="text-sm text-gray-400 mb-6">
          Transfer this conversation to a specialized team member.
        </p>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Agent
          </label>
          <div className="relative">
            <select
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
              className="w-full px-4 py-3 text-sm borderborder-none rounded-xl outline-none focus:border-brand-500 bg-gray-50 appearance-none pr-10"
            >
              <option>Sarah Jenkins (Support Lead)</option>
              <option>Mike Chen (Technical Lead)</option>
              <option>Emma Wilson (Senior Agent)</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        <div className="mb-7">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Internal Note{" "}
            <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <textarea
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add context for the agent..."
            className="w-full px-4 py-3 text-sm borderborder-none rounded-xl outline-none focus:border-brand-500 resize-none bg-gray-50"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-100 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onEscalate}
            className="flex-1 py-3 bg-[#14A085] hover:bg-[#0d7a65] text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Escalate
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function ConversationsPage() {
  const [filter, setFilter] = useState("All");
  const [compose, setCompose] = useState("");
  const [showEscalate, setShowEscalate] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const [note, setNote] = useState("");

  const msgs = escalated ? HUMAN_MSGS : AI_MSGS;

  function handleEscalate() {
    setEscalated(true);
    setShowEscalate(false);
  }

  return (
    <div className="flex h-screen gap-16 bg-[#F7FAFC] overflow-hidden">
      <Sidebar />

      {/* Conversation list */}
      <aside className="w-[23%] flex-shrink-0 mt-10 h-[92%] border-r border-gray-100 flex flex-col">
        {/* Search */}
        <div className="p-8 border-none bg-white border-gray-100">
          <div className="relative mb-3">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              placeholder="Search conversations..."
              className="w-full bg-gray-50 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none placeholder-gray-400"
            />
          </div>
          <div className="flex gap-1">
            {["All", "AI Active", "Escalated"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f ? "bg-brand-50 text-brand-600" : "text-gray-500 hover:bg-gray-100"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white overflow-y-auto scrollbar-thin divide-y divide-gray-50">
          {CONVOS.map((c) => (
            <div
              key={c.id}
              className={`px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors border-l-2 ${c.active ? "bg-brand-50/40 border-brand-400" : "border-transparent"}`}
            >
              <div className="flex items-start justify-between mb-1">
                <span className="text-sm font-semibold text-gray-900">
                  {c.name}
                </span>
                <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                  {c.time}
                </span>
              </div>
              <p className="text-xs text-gray-500 truncate mb-2">{c.preview}</p>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.tagColor}`}
                >
                  {c.tag}
                </span>
                {c.channel && (
                  <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {c.channel}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ── Chat thread ────────────────────────────────────────────────── */}
      <div className="w-[50%] h-[92%] mt-10 bg-white ">
        <div className="">
          {/* <main className="flex-1 bg-white h-[96%] flex flex-col overflow-hidden"> */}
        {/* Header */}
        {/* <div> */}
        <div className="px-6 py-3.5 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9  bg-[#14A085] rounded-full  hover:bg-[#0d7a65] flex items-center justify-center text-white text-sm font-bold">
              EW
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Emma Wilson</p>
              <p className="text-xs text-gray-400">
                WhatsApp · Customer since Jan 2024
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {escalated ? (
              <>
                <span className="flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="9"
                      cy="7"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  Human Active
                </span>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <div className="w-7 h-7 rounded-full  bg-[#14A085] hover:bg-[#0d7a65] flex items-center justify-center text-white text-xs font-bold">
                    SJ
                  </div>
                  Sarah Jenkins
                </div>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1.5 text-xs font-medium text-brand-600 bg-brand-50 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5  bg-[#14A085] hover:bg-[#0d7a65] rounded-full" /> AI
                  Active
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                  Confidence: 72%
                </span>
                <button
                  onClick={() => setShowEscalate(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-red-500 border border-red-200 px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors"
                >
                  <svg width="10" height="10" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="9"
                      cy="7"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  Escalate
                </button>
              </>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex">
          <div className="flex-1 h-[76%] overflow-y-auto scrollbar-thin px-6 py-5 space-y-4">
          {msgs.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from !== "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[72%]">
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.from === "human"
                      ? "bg-blue-500 text-white rounded-br-sm"
                      : msg.from === "ai"
                        ? " bg-[#14A085] text-white rounded-br-sm"
                        : "bg-white borderborder-none text-gray-800 rounded-bl-sm shadow-sm"
                  }`}
                >
                  {msg.text}
                  {"sources" in msg && msg.sources && (
                    <div className="mt-2 pt-2 border-t border-white/20 text-[11px]">
                      <p className="text-white/70 mb-0.5">📎 Sources used:</p>
                      <p className="text-green-200">
                        {(msg.sources as string[]).join(", ")}
                      </p>
                    </div>
                  )}
                </div>
                {/* <div
                  className={`flex items-center gap-1.5 mt-1 ${msg.from !== "user" ? "justify-end" : ""}`}
                >
                  <span className="text-[11px] text-gray-400">{msg.time}</span>
                  {"agent" in msg && msg.agent && (
                    <span className="text-[11px] text-gray-400">
                      · {msg.agent as string}
                    </span>
                  )} :
                  {"conf" in msg && msg.conf && (
                    <>
                      <span className="text-[11px] text-gray-300">·</span>
                      <span className="text-[11px] text-gray-400">
                        AI · {msg.conf as string}
                      </span>
                    </>
                  )}
                </div> */}
                {msg.from === "ai" && !escalated && (
                  <div className="flex justify-end gap-3 mt-1.5">
                    <button className="text-[11px] text-brand-500 font-medium hover:underline">
                      Improve response
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {escalated && (
            <div className="mt-2">
              <textarea
                placeholder="Suggestion for AI training"
                className="w-full borderborder-none rounded-xl px-4 py-3 text-sm text-gray-600 outline-none focus:border-brand-500 resize-none bg-gray-50"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* ── Internal Notes panel (human mode) ─────────────────────────── */}
      {escalated && (
        <aside className="w-[240px] mt-10 flex-shrink-0 border-l border-gray-100 bg-white p-4 overflow-y-auto">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4 flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <polyline
                points="14 2 14 8 20 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Internal Notes
          </h4>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-3">
            <p className="text-xs text-gray-700 leading-relaxed">
              Customer seems frustrated about shipping delay. Offer 10% discount
              code for next purchase.
            </p>
            <p className="text-[10px] text-brand-500 mt-2 font-medium">
              Sarah J · 2 min ago
            </p>
          </div>
          <button className="text-xs text-brand-500 font-medium hover:text-brand-600 flex items-center gap-1">
            <Plus size={12} /> Add Note
          </button>
        </aside>
      )}

      {showEscalate && (
        <EscalateModal
          onClose={() => setShowEscalate(false)}
          onEscalate={handleEscalate}
        />
      )}
        </div>

        {/* Bottom */}
        <div className="mt-48">
          {!escalated ? (
          <div className="px-5 py-3 border-t border-gray-100 flex-shrink-0">
            <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-xs text-amber-700 font-medium">
                  AI confidence dropped to 72%. Consider escalating to human
                  agent.
                </span>
              </div>
              <button
                onClick={() => setShowEscalate(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex-shrink-0 ml-4"
              >
                Escalate Now
              </button>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 borderborder-none rounded-xl px-4 py-2">
              <input
                placeholder="Type a message or let AI respond..."
                value={compose}
                onChange={(e) => setCompose(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Paperclip size={16} />
              </button>
              <button className="w-8 h-8 rounded-lg  bg-[#14A085] hover:bg-[#0d7a65] flex items-center justify-center text-white hover:bg-brand-600 transition-colors">
                <Send size={14} />
              </button>
            </div>
          </div>
        ) : (
          <div className="px-5 mt-72 py-3 border-t border-gray-100 flex-shrink-0">
            <div className="flex items-center justify-center py-1.5 mb-3">
              <span className="text-xs text-gray-400 flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2a10 10 0 100 20A10 10 0 0012 2z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 8v4l3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                AI Autopilot Disabled
              </span>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 borderborder-none rounded-xl px-4 py-2">
              <input
                placeholder="Type a message as Sarah Jenkins..."
                value={compose}
                onChange={(e) => setCompose(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
              <button className="text-gray-400 hover:text-gray-600">
                <Paperclip size={16} />
              </button>
              <button className="w-8 h-8 rounded-lg  bg-[#14A085] hover:bg-[#0d7a65] flex items-center justify-center text-white hover:bg-brand-600">
                <Send size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
        </div>

      {/* ── Internal Notes panel (human mode) ─────────────────────────── */}
      {/* {escalated && (
        <aside className="w-[240px] mt-10 flex-shrink-0 border-l border-gray-100 bg-gray-50 p-4 overflow-y-auto">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4 flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <polyline
                points="14 2 14 8 20 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Internal Notes
          </h4>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-3">
            <p className="text-xs text-gray-700 leading-relaxed">
              Customer seems frustrated about shipping delay. Offer 10% discount
              code for next purchase.
            </p>
            <p className="text-[10px] text-brand-500 mt-2 font-medium">
              Sarah J · 2 min ago
            </p>
          </div>
          <button className="text-xs text-brand-500 font-medium hover:text-brand-600 flex items-center gap-1">
            <Plus size={12} /> Add Note
          </button>
        </aside>
      )}

      {showEscalate && (
        <EscalateModal
          onClose={() => setShowEscalate(false)}
          onEscalate={handleEscalate}
        />
      )} */}
        </div>
    </div>
    // </div>
  );
}
