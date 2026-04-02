"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Link from "next/dist/client/link";

interface Rule {
  id: string;
  name: string;
  desc: string;
  status: "Active" | "Draft" | "Paused";
  when: string;
  then: string;
  extra?: string;
  stats?: string;
  icon: string;
  iconBg: string;
}

const INIT_RULES: Rule[] = [
  {
    id: "1",
    name: "Order Status Lookup",
    desc: "Automatically fetch and display order tracking info",
    status: "Active",
    when: "Intent: track_order",
    then: "Call API: orders/track",
    extra: "Return tracking info",
    stats: "Used 847 times  ·  98% success rate  ·  Last triggered 2 min ago",
    icon: "📦",
    iconBg: "bg-orange-100",
  },
  {
    id: "2",
    name: "Payment Status Check",
    desc: "Check payment status and provide receipt",
    status: "Active",
    when: "Intent: check_payment",
    then: "Call API: payments/status",
    stats: "",
    icon: "💳",
    iconBg: "bg-blue-100",
  },
  {
    id: "3",
    name: "Return Request Handler",
    desc: "Process return requests automatically",
    status: "Draft",
    when: "Intent: request_return",
    then: "Escalate to human",
    stats: "",
    icon: "🔄",
    iconBg: "bg-gray-100",
  },
];

const STATUS_STYLE: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Draft:  "bg-gray-100 text-gray-500",
  Paused: "bg-yellow-100 text-yellow-700",
};

function NewRuleModal({ onClose, onSave }: { onClose: () => void; onSave: (r: Rule) => void }) {
  const [name, setName]   = useState("");
  const [desc, setDesc]   = useState("");
  const [when, setWhen]   = useState("");
  const [then, setThen]   = useState("");

  const save = () => {
    if (!name.trim()) return;
    onSave({
      id: String(Date.now()), name, desc, status: "Draft",
      when: when || "Intent: new_intent", then: then || "Take action",
      icon: "⚡", iconBg: "bg-purple-100",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-7">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Create New Automation Rule</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Rule Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Order Status Lookup"
              className="w-full border border-none bg-[#F9FAFB] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#14A085] focus:ring-2 focus:ring-[#14A085]/10" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="What does this rule do?"
              className="w-full border border-none rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#14A085] focus:ring-2 focus:ring-[#14A085]/10" />
          </div>

          {/* When → Then */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">When (Trigger)</label>
              <input value={when} onChange={(e) => setWhen(e.target.value)} placeholder="Intent: track_order"
                className="w-full border border-none rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#14A085] focus:ring-2 focus:ring-[#14A085]/10" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Then (Action)</label>
              <input value={then} onChange={(e) => setThen(e.target.value)} placeholder="Call API: orders/track"
                className="w-full border border-none rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#14A085] focus:ring-2 focus:ring-[#14A085]/10" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-7">
          <button onClick={onClose} className="px-5 py-2.5 border border-none rounded-xl text-sm text-gray-500 font-medium hover:border-gray-300 transition-colors">
            Cancel
          </button>
          <button onClick={save} className="px-6 py-2.5 bg-[#14A085] hover:bg-[#0d7a65] text-white font-semibold rounded-xl text-sm transition-colors">
            Create Rule
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AutomationPage() {
  const [rules, setRules]       = useState<Rule[]>(INIT_RULES);
  const [showModal, setModal]   = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const toggleStatus = (id: string) =>
    setRules((p) => p.map((r) =>
      r.id === id ? { ...r, status: r.status === "Active" ? "Paused" : "Active" } : r
    ));

  const deleteRule = (id: string) => setRules((p) => p.filter((r) => r.id !== id));

  return (
    <div className="flex h-screen gap-5 bg-[#F7FAFC] overflow-hidden">
      <Sidebar />
      {showModal && <NewRuleModal onClose={() => setModal(false)} onSave={(r) => setRules((p) => [...p, r])} />}

      <div className="mt-10 w-[78%]">
        <main className=" flex-1 overflow-y-auto px-6 lg:px-10 py-8" onClick={() => setMenuOpen(null)}>
        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Automation Rules</h1>
            <p className="text-sm text-gray-400 mt-0.5">Create automated responses and actions based on customer intents</p>
          </div>
          <button
            onClick={() => setModal(true)}
            className="flex items-center gap-2 bg-[#14A085] hover:bg-[#0d7a65] text-white font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            New Rule
          </button>
        </div>

        {/* Rules list */}
        <div className="space-y-4 max-w-7xl">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={`border-none rounded-2xl bg-white h p-5 py-12 transition-all ${
                rule.status === "Draft"
                  ? "border-none bg-gray-50 opacity-75"
                  : "border-none bg-white hover:border-gray-300"
              }`}
            >
              {/* Rule header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${rule.iconBg}`}>
                    {rule.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{rule.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{rule.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[rule.status]}`}>
                    {rule.status}
                  </span>
                  {/* 3-dot menu */}
                  <div className="relative">
                    <button
                      onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === rule.id ? null : rule.id); }}
                      className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
                      </svg>
                    </button>
                    {menuOpen === rule.id && (
                      <div className="absolute right-0 top-8 bg-white border border-none rounded-xl shadow-lg py-1 z-20 min-w-[140px]" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => { toggleStatus(rule.id); setMenuOpen(null); }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          {rule.status === "Active" ? "Pause" : "Activate"}
                        </button>
                        {/* <Link href={`/dashboard/automation/rules/${rule.id}`}> */}
                        <Link href={`/dashboard/automation/rules/`}>
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                            View Details
                          </button>
                        </Link>
                        {/* <Link href={`/dashboard/automation/rules/${rule.id}/edit`}> */}
                        <Link href={`/dashboard/automation/rules/`}>
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                            Edit
                          </button>
                        </Link>
                        <button onClick={() => { deleteRule(rule.id); setMenuOpen(null); }}
                          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* When → Then flow */}
              <div className={`flex items-center gap-2 flex-wrap px-4 py-3 rounded-xl text-xs ${
                rule.status === "Draft" ? "bg-gray-100" : "bg-gray-50"
              }`}>
                <span className="font-medium text-gray-500">When:</span>
                <span className={`font-semibold ${rule.status === "Draft" ? "text-gray-400" : "text-gray-700"}`}>
                  {rule.when}
                </span>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" className="text-gray-400">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-medium text-gray-500">Then:</span>
                <span className={`font-semibold ${rule.status === "Draft" ? "text-gray-400" : "text-gray-700"}`}>
                  {rule.then}
                </span>
                {rule.extra && (
                  <>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" className="text-gray-400">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className={`font-semibold ${rule.status === "Draft" ? "text-gray-400" : "text-gray-700"}`}>
                      {rule.extra}
                    </span>
                  </>
                )}
              </div>

              {/* Stats */}
              {rule.stats && (
                <p className="text-xs text-gray-400 mt-2.5 px-1">{rule.stats}</p>
              )}
            </div>
          ))}

          {/* Empty state */}
          {rules.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed rounded-2xl">
              <div className="text-4xl mb-3">⚡</div>
              <p className="text-sm font-medium text-gray-500 mb-1">No automation rules yet</p>
              <p className="text-xs text-gray-400 mb-5">Create your first rule to automate customer responses</p>
              <button onClick={() => setModal(true)} className="bg-[#14A085] hover:bg-[#0d7a65] text-white font-semibold rounded-xl px-6 py-2.5 text-sm transition-colors">
                Create First Rule
              </button>
            </div>
          )}
        </div>
      </main>
      </div>
    </div>
  );
}