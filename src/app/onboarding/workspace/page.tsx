"use client";
import { useState } from "react";
import Link from "next/link";
import Stepper from "@/components/Stepper";
// import { ChevronDownIcon } from "@/components/Icons";

const INDUSTRIES = [
  "E-commerce","SaaS / Software","Healthcare","Finance & Banking",
  "Education","Real Estate","Retail","Logistics","Hospitality","Other",
];
const VOLUMES = [
  "Under 100 / month","100–500 / month","500–2,000 / month",
  "2,000–10,000 / month","10,000+ / month",
];
const SIZES = ["1-5","6-20","21-50","50+"];

export default function WorkspacePage() {
  const [name, setName]       = useState("");
  const [industry, setIndustry] = useState("");
  const [size, setSize]       = useState("6-20");
  const [volume, setVolume]   = useState("");

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-start justify-center pt-16 pb-16 px-4">
      <form action="/onboarding/channels">
        <div className=" w-[58%] lg:w-[100%] lg:ml-0 ml-56 lg:max-w-[750px] bg-[#F8FAFC] rounded-2xl  mt-4 lg:mr-28 border-gray-100 px-12 py-12">
        <Stepper current={2} />

        <div className="center ml-10">
          <h2 className="text-2xl mt-12 font-bold text-gray-900 mb-1">Set up your workspace</h2>
        <p className="text-gray-400 text-sm mb-8">
          Tell us about your business to personalize your AI assistant
        </p>

        <div className="space-y-6">
          {/* Company Name */}
          <div>
            <label className="block text-md font-medium text-gray-700 mb-1.5">Company Name</label>
            <input
              type="text"
              className="w-full border-none border-gray-200 rounded-xl px-4 py-3 text-md text-gray-900 placeholder-gray-400 bg-white outline-none transition-all focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Acme Corporation"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-md font-medium text-gray-700 mb-1.5">Industry</label>
            <div className="relative">
              <select
                className={`w-full border-none border-gray-200 rounded-xl px-4 py-3 text-md bg-white outline-none transition-all focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10 appearance-none cursor-pointer pr-10 ${industry ? "text-gray-900" : "text-gray-400"}`}
                value={industry}
                required
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="" disabled>Select your industry</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {/* <ChevronDownIcon /> */}
              </div>
            </div>
          </div>

          {/* Team Size */}
          <div>
            <label className="block text-md font-medium text-gray-700 mb-2.5">Team Size</label>
            <div className="flex gap-3">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`flex-1 py-2.5 rounded-xl text-md font-medium border-none transition-all duration-150 ${
                    size === s
                      ? "border-[#14B8A6] bg-[#F0FDFA] text-[#0D9488] ring-1 ring-[#0D9488]"
                      : "border-gray-200 text-[#F7FAFC]0 hover:border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Volume */}
          <div>
            <label className="block text-md font-medium text-gray-700 mb-1.5">Monthly Support Volume</label>
            <div className="relative">
              <select
                className={`w-full border-none border-gray-200 rounded-xl px-4 py-3 text-md bg-white outline-none transition-all focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10 appearance-none cursor-pointer pr-10 ${volume ? "text-gray-900" : "text-gray-400"}`}
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
              >
                <option value="" disabled>Select estimated volume</option>
                {VOLUMES.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {/* <ChevronDownIcon /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <Link href="/">
            <button type="button" className="text-[#F7FAFC]0 hover:text-gray-700 font-medium text-md transition-colors cursor-pointer">Back</button>
          </Link>
         
            <button type="submit" className="bg-[#0D9488] hover:bg-[#0D9488]-dark text-white font-semibold rounded-xl px-8 py-3 text-md transition-colors cursor-pointer">Continue</button>
          
        </div>
        </div>
      </div>
      </form>
    </div>
  );
}
