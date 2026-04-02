"use client";
import Sidebar from "@/components/Sidebar";
import { ExportIcon, PlusIcon } from "@/components/Icons";
import Link from "next/link";
import { useMemo } from "react";

/* ── Static data (replace with API calls) ── */


function useGreeting(name: string) {
  return useMemo(() => {
    const hour = new Date().getHours();
    let greeting: string;
    let emoji: string;
    if (hour >= 5 && hour < 12)       { greeting = "Good morning";   emoji = "☀️"; }
    else if (hour >= 12 && hour < 17) { greeting = "Good afternoon"; emoji = "🌤️"; }
    else if (hour >= 17 && hour < 21) { greeting = "Good evening";   emoji = "🌆"; }
    else                              { greeting = "Good night";      emoji = "🌙"; }
    return { text: `${greeting}, ${name}`, emoji };
  }, [name]);
}
 

const STATS = [
  { label: "Total Conversations", value: "2,847", change: "↑ 12.5% from last week", up: true,
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#14A085" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { label: "Resolution Rate", value: "94.2%", change: "↑ 3.1% improvement", up: true,
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#14A085" strokeWidth="1.8" strokeLinecap="round"/><polyline points="22 4 12 14.01 9 11.01" stroke="#14A085" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { label: "Escalation Rate", value: "5.8%", change: "↓ 2.3% reduction", up: false,
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="#F59E0B" strokeWidth="1.8"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round"/></svg> },
  { label: "Avg Response Time", value: "2.3s", change: "↓ 0.8s faster", up: false,
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#6366F1" strokeWidth="1.8"/><polyline points="12 6 12 12 16 14" stroke="#6366F1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
];

/* SVG area chart data */
// const TREND = [320, 380, 360, 500, 490, 520, 490];
// const DAYS  = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
// const W = 460, H = 140, PAD = 10;
// const maxV = Math.max(...TREND);
// const pts = TREND.map((v, i) => ({
//   x: PAD + (i / (TREND.length - 1)) * (W - PAD * 2),
//   y: PAD + (1 - v / maxV) * (H - PAD * 2),
// }));
// const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
// const area = `${pts[0].x},${H} ${polyline} ${pts[pts.length-1].x},${H}`;

const INTENTS = [
  { label: "Order Status",    pct: 42, color: "#14A085" },
  { label: "Product Inquiry", pct: 28, color: "#14A085" },
  { label: "Returns",         pct: 18, color: "#14A085" },
  { label: "Billing",         pct: 12, color: "#14A085" },
];

const ACTIVITY = [
  {
    type: "resolved",
    title: "AI resolved",
    desc: "a conversation about order tracking",
    sub: "Customer: john.doe@email.com · Order #12847",
    time: "2 min ago",
    iconBg: "bg-[#14B8A6]-light",
    icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#14A085" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    type: "escalated",
    title: "Escalated",
    desc: "to human agent - complex refund request",
    sub: "Assigned to Mike Chen · Priority: High",
    time: "8 min ago",
    iconBg: "bg-amber-50",
    icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="#F59E0B" strokeWidth="2"/></svg>,
  },
  {
    type: "kb",
    title: "Knowledge base updated",
    desc: "- 3 new articles indexed",
    sub: "Shipping Policy, Return FAQ, Size Guide",
    time: "1 hour ago",
    iconBg: "bg-indigo-50",
    icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/></svg>,
  },
];





const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Sample data - make this dynamic from your API/state
const rawData = [480, 520, 505, 580, 575, 600, 580]; // values for each day

const W = 700;
const H = 260;
const PAD = 40;

// Calculate points dynamically
const maxValue = Math.max(...rawData, 600); // or hardcode 600 if you want fixed scale

const dataPoints = rawData.map((value, i) => {
  const x = PAD + (i / (rawData.length - 1)) * (W - PAD * 1.8);
  const y = PAD + ((maxValue - value) / maxValue) * (H - PAD * 2);
  return { x, y };
});

const linePoints = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

const areaPoints = [
  `${dataPoints[0].x},${H - PAD}`,
  ...dataPoints.map((p) => `${p.x},${p.y}`),
  `${dataPoints[dataPoints.length - 1].x},${H - PAD}`,
].join(" ");

export default function DashboardPage() {
   const { text: greetingText, emoji } = useGreeting("Stark");
  return (
    <div className="flex h-screen bg-[#F7FAFC] overflow-hidden">
      <Sidebar />

      <main className="flex-1 px-6 overflow-y-auto">
        {/* Header */}
        <header className="bg-none mt-[3.7%] bg-[#FFFFFF1A]/10 backdrop-blur-sm  border-gray-100 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{greetingText} <span>{emoji}</span></h1>
            <p className="text-md text-gray-400 mt-0.5">{"Here's what's happening with your support today"}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border-gray-200 rounded-xl px-4 py-2.5 text-md text-gray-600 font-medium hover:bg-[#F7FAFC] transition-colors">
              <ExportIcon />
              Export
            </button>
            <Link href="/dashboard/channels/new">
              <button className="flex items-center gap-2 bg-[#0D9488] hover:bg-[#14B8A6]-dark text-white font-semibold rounded-xl px-5 py-2.5 text-md transition-colors cursor-pointer">
                <PlusIcon />
                New Channel
              </button>
            </Link>
          </div>
        </header>

        <div className="px-8 py-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-md text-gray-400">{s.label}</p>
                  <div className="w-8 h-8 rounded-lg bg-[#F7FAFC] flex items-center justify-center">
                    {s.icon}
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1.5">{s.value}</p>
                <p className={`text-xs font-medium ${s.up ? "text-[#14B8A6]" : "text-[#14B8A6]"}`}>
                  {s.change}
                </p>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
  {/* Conversation Trends - Dynamic Area Chart */}
  <div className="bg-white rounded-2xl border border-gray-100 p-6">
    <h3 className="font-semibold text-gray-900 text-base mb-6">Conversation Trends</h3>

    <div className="relative">
      {/* Chart Container */}
      <div className="h-[260px] relative">
        <svg viewBox="0 0 700 260" className="w-full h-full">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14A085" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#14A085" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid Lines */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line
              key={i}
              x1="40"
              y1={20 + (i / 6) * 200}
              x2="680"
              y2={20 + (i / 6) * 200}
              stroke="#f1f5f9"
              strokeWidth="1"
            />
          ))}

          {/* Area under the curve */}
          <polygon points={areaPoints} fill="url(#areaGrad)" />

          {/* Main Line */}
          <polyline
            points={linePoints}
            fill="none"
            stroke="#14A085"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points (dots) */}
          {dataPoints.map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="white"
              stroke="#14A085"
              strokeWidth="2.5"
            />
          ))}
        </svg>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-5 bottom-8 w-10 flex flex-col justify-between text-right text-xs text-gray-400 pr-3 pointer-events-none">
          {[600, 500, 400, 300, 200, 100, 0].map((value) => (
            <span key={value}>{value}</span>
          ))}
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between mt-2 px-10 text-xs text-gray-400">
        {DAYS.map((day, i) => (
          <span key={i}>{day}</span>
        ))}
      </div>
    </div>
  </div>

  {/* Top Intents - unchanged but improved spacing */}
  <div className="bg-white rounded-2xl border border-gray-100 p-6">
    <h3 className="font-semibold text-gray-900 text-base mb-5">Top Intents</h3>
    <div className="space-y-5">
      {INTENTS.map(({ label, pct }) => (
        <div key={label}>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-gray-700 font-medium">{label}</span>
            <span className="font-medium text-gray-600">{pct}%</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-[#14B8A6] transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-gray-900 text-base">Recent Activity</h3>
              <button className="text-md font-medium text-[#14B8A6] hover:text-[#14B8A6]-dark transition-colors">
                View all
              </button>
            </div>
            <div className="space-y-5">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${a.iconBg}`}>
                    {a.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-md text-gray-800">
                      <span className="font-semibold">{a.title}</span>{" "}
                      <span>{a.desc}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.sub}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0 mt-0.5">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
