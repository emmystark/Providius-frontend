"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const LOGS = [
  { ts: "2023-11-24 14:22:01", query: '"Where is my order?"',    response: '"Your order is in transit…"', status: "Success" },
  { ts: "2023-11-24 14:18:45", query: '"Track #ABC-123"',         response: "—",                          status: "Failed" },
  { ts: "2023-11-24 13:55:12", query: '"Where is order #9900?"', response: '"Delivered on Nov 22"',       status: "Success" },
  { ts: "2023-11-24 13:10:07", query: '"Order 77821 status"',    response: '"In transit, ETA tomorrow"',  status: "Success" },
];

export default function RuleDetailPage() {
  const router = useRouter();
  const [active, setActive]         = useState(true);
  const [triggerType, setTrigger]   = useState("Customer Intent");
  const [intentName, setIntent]     = useState("track_order");
  const [apiUrl, setApiUrl]         = useState("https://api.store.com/v1/orders/track");
  const [method, setMethod]         = useState("POST");
  const [saved, setSaved]           = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Rule details</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 font-medium">Activate</span>
            <button
              type="button"
              onClick={() => setActive((v) => !v)}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors duration-200 ${active ? "bg-[#14A085]" : "bg-gray-300"}`}
            >
              <span className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200 mt-0.5 ${active ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
            <button
              onClick={save}
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl px-5 py-2 text-sm transition-colors"
            >
              {saved ? "✓ Saved" : "Save & Publish"}
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
              </svg>
            </button>
          </div>
        </header>

        <div className="px-8 py-6 space-y-5 max-w-4xl">

          {/* When (Trigger) */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center text-base">⚡</div>
              <h2 className="text-base font-semibold text-gray-900">When (Trigger)</h2>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Trigger Type</label>
                <input
                  value={triggerType}
                  onChange={(e) => setTrigger(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#14A085] focus:ring-2 focus:ring-[#14A085]/10"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Intent Name</label>
                <input
                  value={intentName}
                  onChange={(e) => setIntent(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#14A085] focus:ring-2 focus:ring-[#14A085]/10"
                />
              </div>
            </div>
          </div>

          {/* Then (Actions) */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="#3B82F6" strokeWidth="2"/>
                    <path d="M12 8v4l3 3" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h2 className="text-base font-semibold text-gray-900">Then (Actions)</h2>
              </div>
              <button className="text-sm font-medium text-[#14A085] hover:text-[#0d7a65] transition-colors flex items-center gap-1">
                <span>+</span> Add Step
              </button>
            </div>

            {/* API config card */}
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gray-400 flex items-center justify-center">
                    <svg width="8" height="8" fill="white" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="4" rx="1"/><rect x="3" y="10" width="12" height="4" rx="1"/><rect x="3" y="17" width="8" height="4" rx="1"/></svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Call External API</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
                  </svg>
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Method + URL */}
                <div className="flex gap-3">
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:border-[#14A085] bg-white"
                  >
                    <option>POST</option><option>GET</option><option>PUT</option><option>DELETE</option>
                  </select>
                  <input
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#14A085] focus:ring-2 focus:ring-[#14A085]/10"
                  />
                </div>

                {/* Headers + Params */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2">Headers</p>
                    <div className="bg-gray-50 rounded-xl p-3 space-y-1">
                      <p className="text-xs text-gray-600 font-mono">Authorization: Bearer {"{api_key}"}</p>
                      <p className="text-xs text-gray-600 font-mono">Content-Type: application/json</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2">Parameters</p>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-600 font-mono">order_id: {"{user_input.order_id}"}</p>
                    </div>
                  </div>
                </div>

                {/* Response Mapping */}
                <div>
                  <p className="text-xs font-medium text-[#14A085] mb-2">Response Mapping Preview</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold bg-[#E6F7F4] text-[#14A085] px-2 py-0.5 rounded">status</span>
                    <span className="text-gray-400">·</span>
                    <span className="text-xs text-gray-600">mapped to {"{order_status}"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Execution Logs */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-gray-900">Execution Logs</h2>
              <button className="text-sm font-medium text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors">
                Export CSV
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["Timestamp", "Input Query", "AI Response", "Status", "Action"].map((h) => (
                      <th key={h} className="text-left text-xs font-medium text-gray-400 pb-3 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {LOGS.map((log, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-4 text-xs text-gray-500 whitespace-nowrap">{log.ts}</td>
                      <td className="py-3 pr-4 text-xs text-gray-700">{log.query}</td>
                      <td className="py-3 pr-4 text-xs text-gray-500">{log.response}</td>
                      <td className="py-3 pr-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                          log.status === "Success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${log.status === "Success" ? "bg-green-500" : "bg-red-500"}`} />
                          {log.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="text-xs font-medium text-[#14A085] hover:text-[#0d7a65] transition-colors">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}