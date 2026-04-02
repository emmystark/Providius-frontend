"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

/* ── Sub-nav tabs ── */
const TABS = ["General", "Integrations", "Team Members", "Billing", "API Keys", "Notifications"];

/* ── Integrations data ── */
interface Integration {
  id: string;
  name: string;
  desc: string;
  status: "connected" | "disconnected";
  icon: React.ReactNode;
}

const COMM_CHANNELS: Integration[] = [
  {
    id: "whatsapp", name: "WhatsApp Business", desc: "Connect your WhatsApp Business account", status: "connected",
    icon: (
      <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.11-1.34A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.19 13.87c-.22.62-1.3 1.19-1.79 1.25-.49.06-.5.37-3.15-.9-2.65-1.27-4.25-4.3-4.38-4.5-.13-.2-.99-1.32-.99-2.52 0-1.2.62-1.79.85-2.04.23-.25.5-.31.66-.31h.48c.16 0 .37-.06.58.44l.83 2.23c.08.2.04.43-.07.59l-.48.66c-.11.15-.24.31-.1.6.13.3.62 1.08 1.33 1.75.93.84 1.7 1.12 1.98 1.24.28.12.45.1.62-.06l.43-.5c.17-.2.41-.26.66-.16l2.09 1c.24.11.24.22.24.36v.41z" fill="#25D366"/>
        </svg>
      </div>
    ),
  },
  {
    id: "webchat", name: "Web Chat Widget", desc: "Embed a chat widget on your website", status: "connected",
    icon: (
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="#3B82F6" strokeWidth="1.8"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="#3B82F6" strokeWidth="1.8"/>
        </svg>
      </div>
    ),
  },
  {
    id: "email", name: "Email Support", desc: "Automate your support inbox responses", status: "disconnected",
    icon: (
      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="#9CA3AF" strokeWidth="1.8"/>
          <path d="M3 7l9 7 9-7" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </div>
    ),
  },
  {
    id: "messenger", name: "Messenger", desc: "Connect Facebook Messenger", status: "disconnected",
    icon: (
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#0084FF">
          <path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.76 1.21 5.24 3.15 6.99V22l3.7-2.03c.98.27 2.02.42 3.15.42 5.52 0 10-4.27 10-9.5S17.52 2 12 2zm1.12 12.82l-2.56-2.72-4.98 2.72 5.48-5.82 2.62 2.72 4.92-2.72-5.48 5.82z"/>
        </svg>
      </div>
    ),
  },
];

const CRM_TOOLS: Integration[] = [
  {
    id: "hubspot", name: "HubSpot", desc: "Sync contacts and conversations", status: "connected",
    icon: (
      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF7A59">
          <path d="M15.5 8.5V6.25a1.75 1.75 0 10-3.5 0V8.5a4.5 4.5 0 102.5 8.06V14a1 1 0 112 0v2.56A6.5 6.5 0 1115.5 8.5z"/>
        </svg>
      </div>
    ),
  },
  {
    id: "salesforce", name: "Salesforce", desc: "Connect your Salesforce CRM", status: "disconnected",
    icon: (
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#00A1E0">
          <path d="M9.5 4.5a3.5 3.5 0 013.4 2.67A3 3 0 0116 10a3 3 0 01-.09.72A2.5 2.5 0 0117.5 13a2.5 2.5 0 01-2.5 2.5h-8A3 3 0 017 9.5a3 3 0 011.23-2.43A3.5 3.5 0 019.5 4.5z"/>
        </svg>
      </div>
    ),
  },
];

/* ── General settings ── */
function GeneralTab() {
  const [workspace, setWorkspace] = useState("Acme Corporation");
  const [email, setEmail]         = useState("admin@acme.com");
  const [timezone, setTimezone]   = useState("Africa/Lagos");
  const [language, setLanguage]   = useState("English");
  const [saved, setSaved]         = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">General Settings</h2>
        <p className="text-sm text-gray-400">Manage your workspace preferences</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Workspace Name</label>
          <input value={workspace} onChange={(e) => setWorkspace(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#14A085] focus:ring-2 focus:ring-[#14A085]/10" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#14A085] focus:ring-2 focus:ring-[#14A085]/10" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Timezone</label>
            <select value={timezone} onChange={(e) => setTimezone(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#14A085] bg-white appearance-none">
              <option>Africa/Lagos</option><option>UTC</option><option>America/New_York</option>
              <option>Europe/London</option><option>Asia/Singapore</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Language</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#14A085] bg-white appearance-none">
              <option>English</option><option>French</option><option>Spanish</option><option>Arabic</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button onClick={save} className="bg-[#14A085] hover:bg-[#0d7a65] text-white font-semibold rounded-xl px-6 py-2.5 text-sm transition-colors">
            {saved ? "✓ Saved" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Integrations tab ── */
function IntegrationsTab() {
  const [comm, setComm]   = useState<Integration[]>(COMM_CHANNELS);
  const [crm, setCrm]     = useState<Integration[]>(CRM_TOOLS);

  const toggleComm = (id: string) =>
    setComm((p) => p.map((i) => i.id === id ? { ...i, status: i.status === "connected" ? "disconnected" : "connected" } : i));

  const toggleCrm = (id: string) =>
    setCrm((p) => p.map((i) => i.id === id ? { ...i, status: i.status === "connected" ? "disconnected" : "connected" } : i));

  const IntegrationRow = ({ item, onToggle }: { item: Integration; onToggle: (id: string) => void }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-none">
      <div className="flex items-center gap-4">
        {item.icon}
        <div>
          <p className="text-sm font-semibold text-gray-900">{item.name}</p>
          {item.status === "connected"
            ? <p className="text-xs font-medium text-[#14A085] mt-0.5">Connected</p>
            : <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
          }
        </div>
      </div>
      {item.status === "connected" ? (
        <button onClick={() => onToggle(item.id)}
          className="text-sm font-medium text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-4 py-1.5 transition-colors hover:border-gray-300">
          Configure
        </button>
      ) : (
        <button onClick={() => onToggle(item.id)}
          className="bg-[#14A085] hover:bg-[#0d7a65] text-white font-semibold rounded-lg px-4 py-1.5 text-sm transition-colors">
          Connect
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Integrations</h2>
        <p className="text-sm text-gray-400">Connect your channels and third-party services</p>
      </div>

      {/* Communication Channels */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Communication Channels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {comm.map((item) => (
            <IntegrationRow key={item.id} item={item} onToggle={toggleComm} />
          ))}
        </div>
      </div>

      {/* CRM & Tools */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">CRM & Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {crm.map((item) => (
            <IntegrationRow key={item.id} item={item} onToggle={toggleCrm} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── AI Settings tab (Image 2) ── */
function AISettingsTab() {
  const [aiAuto, setAiAuto]     = useState(true);
  const [tone, setTone]         = useState("Friendly");
  const [confidence, setConf]   = useState(80);
  const [saved, setSaved]       = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const TONES = ["Friendly", "Professional", "Casual"];

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Configure your channel settings</h2>
        <p className="text-sm text-gray-400">Customize how your AI handles customer conversations on this channel</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
        {/* AI Behaviour */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-4">AI Behaviour</h3>
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
            <span className="text-sm text-gray-700">Use AI Auto - Response</span>
            <button type="button" onClick={() => setAiAuto((v) => !v)}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors duration-200 ${aiAuto ? "bg-[#14A085]" : "bg-gray-300"}`}>
              <span className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200 mt-0.5 ${aiAuto ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>

          <p className="text-sm text-gray-700 mb-3">Select response tone</p>
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            {TONES.map((t, i) => (
              <label key={t} className={`flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${i < TONES.length - 1 ? "border-b border-gray-100" : ""}`}>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${tone === t ? "border-[#14A085]" : "border-gray-300"}`}>
                  {tone === t && <div className="w-2 h-2 rounded-full bg-[#14A085]" />}
                </div>
                <input type="radio" name="tone" value={t} checked={tone === t} onChange={() => setTone(t)} className="sr-only" />
                <span className="text-sm text-gray-700">{t}</span>
              </label>
            ))}
          </div>
        </div>

        {/* AI Confidence Level */}
        <div className="pt-2">
          <h3 className="text-base font-semibold text-gray-900 mb-1">AI Confidence Level</h3>
          <p className="text-sm text-gray-400 mb-6">Adjust how much your AI should escalate to human agents versus automating responses.</p>

          <div className="relative mb-2">
            <div className="flex justify-end mb-1">
              <span className="text-xs text-gray-500">Escalate to Human Agent</span>
            </div>
            <div className="relative flex items-center">
              <div className="absolute -top-8 transition-all" style={{ left: `calc(${confidence}% - 20px)` }}>
                <span className="bg-[#14A085] text-white text-xs font-bold px-2 py-0.5 rounded">{confidence}%</span>
              </div>
              <input type="range" min={0} max={100} value={confidence} onChange={(e) => setConf(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #14A085 ${confidence}%, #e2e8f0 ${confidence}%)` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>More Escalation</span><span>More Automation</span>
            </div>
          </div>
        </div>

        {/* Escalation Rules */}
        <div className="pt-2">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Escalation Rules</h3>
          <p className="text-sm text-gray-500 mb-3">Assigned Human Agent</p>
          <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E6F7F4] flex items-center justify-center text-xs font-bold text-[#14A085]">EW</div>
              <span className="text-sm font-medium text-gray-800">Emma Wilson</span>
            </div>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-gray-400">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-xs text-gray-400 mt-2">If AI confidence is {confidence}% and below escalate to human agent assigned for this channel</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={save} className="bg-[#14A085] hover:bg-[#0d7a65] text-white font-semibold rounded-xl px-10 py-3 text-sm transition-colors">
          {saved ? "✓ Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}

/* ── Team Members tab ── */
function TeamMembersTab() {
  const [members] = useState([
    { name: "Emma Wilson",  email: "emma@acme.com",  role: "Admin",  avatar: "EW", status: "Active" },
    { name: "Mike Chen",    email: "mike@acme.com",   role: "Agent",  avatar: "MC", status: "Active" },
    { name: "Sara Okafor",  email: "sara@acme.com",   role: "Agent",  avatar: "SO", status: "Inactive" },
  ]);
  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Team Members</h2>
          <p className="text-sm text-gray-400">Manage your team and their permissions</p>
        </div>
        <button className="bg-[#14A085] hover:bg-[#0d7a65] text-white font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors flex items-center gap-2">
          <span>+</span> Invite Member
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-50">
          {members.map((m) => (
            <div key={m.email} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#E6F7F4] flex items-center justify-center text-xs font-bold text-[#14A085]">{m.avatar}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                  <p className="text-xs text-gray-400">{m.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${m.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{m.status}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{m.role}</span>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── API Keys tab ── */
function APIKeysTab() {
  const [keys] = useState([
    { name: "Production Key",   key: "sk-prod-••••••••••••••••3f9a", created: "Jan 10, 2024", last: "2 min ago" },
    { name: "Development Key",  key: "sk-dev-••••••••••••••••8c2b",  created: "Dec 5, 2023",  last: "3 days ago" },
  ]);
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (id: string) => { setCopied(id); setTimeout(() => setCopied(null), 1500); };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">API Keys</h2>
          <p className="text-sm text-gray-400">Manage your API credentials for backend integration</p>
        </div>
        <button className="bg-[#14A085] hover:bg-[#0d7a65] text-white font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors flex items-center gap-2">
          <span>+</span> New Key
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-50">
          {keys.map((k) => (
            <div key={k.name} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">{k.name}</p>
                <code className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">{k.key}</code>
              </div>
              <div className="flex items-center gap-3 text-right">
                <div>
                  <p className="text-xs text-gray-400">Created {k.created}</p>
                  <p className="text-xs text-gray-400">Last used {k.last}</p>
                </div>
                <button onClick={() => copy(k.name)} className="text-xs font-medium text-[#14A085] border border-[#14A085]/30 px-3 py-1.5 rounded-lg hover:bg-[#E6F7F4] transition-colors">
                  {copied === k.name ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-xs font-semibold text-amber-700 mb-1">⚠️ Keep your API keys secure</p>
        <p className="text-xs text-amber-600">Never expose API keys in client-side code. Use environment variables on your server.</p>
      </div>
    </div>
  );
}

/* ── Billing tab ── */
function BillingTab() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Billing</h2>
        <p className="text-sm text-gray-400">Manage your plan and payment details</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">Free Plan</p>
            <p className="text-xs text-gray-400 mt-0.5">1,000 conversations / month</p>
          </div>
          <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">Current Plan</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-[#14A085] rounded-full" style={{ width: "72%" }} />
        </div>
        <p className="text-xs text-gray-400 mb-5">720 of 1,000 conversations used this month</p>
        <button className="w-full bg-[#14A085] hover:bg-[#0d7a65] text-white font-semibold rounded-xl py-3 text-sm transition-colors">
          Upgrade to Pro — $49/month
        </button>
      </div>
    </div>
  );
}

/* ── Notifications tab ── */
function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    escalations: true, resolved: false, lowConfidence: true,
    weeklyReport: true, newConversation: false,
  });
  const toggle = (key: keyof typeof prefs) => setPrefs((p) => ({ ...p, [key]: !p[key] }));
  const items: { key: keyof typeof prefs; label: string; desc: string }[] = [
    { key: "escalations",    label: "Escalations",       desc: "Alert when AI escalates to human" },
    { key: "resolved",       label: "Resolved",          desc: "Alert when ticket is resolved" },
    { key: "lowConfidence",  label: "Low AI Confidence", desc: "Alert when confidence drops below threshold" },
    { key: "weeklyReport",   label: "Weekly Report",     desc: "Receive a weekly summary email" },
    { key: "newConversation",label: "New Conversations", desc: "Alert on every new incoming conversation" },
  ];
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Notifications</h2>
        <p className="text-sm text-gray-400">Choose when and how you receive alerts</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
        {items.map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="text-sm font-medium text-gray-900">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
            </div>
            <button type="button" onClick={() => toggle(key)}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors duration-200 ${prefs[key] ? "bg-[#14A085]" : "bg-gray-300"}`}>
              <span className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200 mt-0.5 ${prefs[key] ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main settings page ── */
const TAB_COMPONENTS: Record<string, React.FC> = {
  General: GeneralTab,
  Integrations: IntegrationsTab,
  "Team Members": TeamMembersTab,
  Billing: BillingTab,
  "API Keys": APIKeysTab,
  Notifications: NotificationsTab,
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Integrations");
  const ActiveComponent = TAB_COMPONENTS[activeTab] || GeneralTab;

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 overflow-hidden">
        {/* Settings sub-nav */}
        <nav className="w-48 flex-shrink-0 bg-white border-r border-gray-100 pt-8 px-3">
          <div className="space-y-0.5">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === tab
                    ? "text-[#14A085] font-medium bg-[#E6F7F4]"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-8 py-8">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
}