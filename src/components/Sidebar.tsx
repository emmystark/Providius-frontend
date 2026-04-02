"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ProvidusLogo,
  DashboardIcon,
  ConversationsIcon,
  KnowledgeBaseIcon,
  AnalyticsIcon,
  AutomationIcon,
  SettingsIcon,
} from "./Icons";

const NAV = [
  { label: "Dashboard", href: "/dashboard", Icon: DashboardIcon },
  { label: "Conversations", href: "/dashboard/conversations", Icon: ConversationsIcon },
  { label: "Knowledge Base", href: "/dashboard/knowledge-base", Icon: KnowledgeBaseIcon },
  { label: "Analytics", href: "/dashboard/analytics", Icon: AnalyticsIcon },
  { label: "Automation", href: "/dashboard/automation", Icon: AutomationIcon },
  { label: "Settings", href: "/dashboard/settings", Icon: SettingsIcon },
];

// Helper to determine if a nav item should be active
const isNavActive = (href: string, currentPath: string): boolean => {
  if (href === "/dashboard/knowledge-base") {
    return currentPath === href || currentPath.startsWith(href + "/");
  }
  return currentPath === href;
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 rounded-3xl ml-6 mt-10 pl-2 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col h-[92%] sticky top-0">
      {/* Logo */}
      <div className="flex float-left w-60 right-[9%] top-[-2%] gap-2.5 px-0 py-0 absolute border-gray-100">
        <ProvidusLogo />
      </div>

      {/* Nav */}
      <nav className="flex-1 mt-20 p-0 z-50 px-3 py-4 space-y-0.5">
        {NAV.map(({ label, href, Icon }) => {
          const active = isNavActive(href, pathname);

          return (
            <Link key={href} href={href}>
              <div
                className={`flex h-12 items-center gap-3 px-5 py-2.5 rounded-xl text-md font-medium transition-colors cursor-pointer w-full ${
                  active
                    ? "bg-[#F0FDFA] text-[#0D9488]"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <div className="w-6">
                  <Icon
                    className={`transition-colors ${
                      active ? "text-[#0D9488]" : "text-gray-500"
                    }`}
                  />
                </div>
                <span>{label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Upgrade card */}
      <div className="mx-3 mb-4 rounded-2xl p-4 bg-[#0D9488] text-white">
        <p className="font-semibold text-sm mb-1">Upgrade to Pro</p>
        <p className="text-xs text-white/80 mb-3 leading-relaxed">
          Get unlimited conversations and advanced analytics
        </p>
        <button className="w-full bg-white text-[#0D9488] font-semibold text-xs py-2 rounded-lg hover:bg-white/90 transition-colors">
          Upgrade
        </button>
      </div>
    </aside>
  );
}