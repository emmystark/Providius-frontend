"use client";
import Link from "next/link";
import { useState } from "react";
// import { ProvidusLogo } from "@/components/Icons";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div className=" bg-gray-100 flex items-center justify-center">
      <div className="w-full  bg-white h-screen lg:h-[100vh] shadow-2xl overflow-hidden flex flex-col md:flex-row ">

        {/* ── Left teal panel ── */}
        <div  className="md:w-[50%] h-[430px] lg:h-screen pt-20 bg-[#0D9488] flex flex-col p-10 lg:p-16 lg:px-20 relative overflow-hidden bg-gradient-to-br from-[#0D9488] to-[#0D9488]-dark">
          {/* Logo */}
          <div className="lg:block hidden">
            <div className="flex items-center gap-2.5 mb-12">
            <img className="w-16 mt-10 ml-0 mx-[-60px] absolute" src="./logoa.png" alt="" />
          </div>
            <h3 className="text-4xl text-white font-bold ml-20 top-[-40%] relative mt-[-20]">Providius</h3>
          </div>

          {/* Headline */}
          <h1 className="text-white text-[1.7rem] lg:text-[2.8rem] font-bold leading-tight mb-4">
            Automate customer support<br />with AI intelligence
          </h1>
          <p className="text-white/80 text-[14px] lg:text-[17px] leading-relaxed mb-3">
            Reduce response time by 80% with RAG powered AI agents that understand your business.
          </p>

          {/* Photo card */}
          {/* <div className="flex-1 relative rounded-2xl overflow-hidden bg-white/10 min-h-[220px]"> */}



            {/* Placeholder image area with teal overlay feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D9488]/30 to-[#0D9488]-dark/60" />
            <img className="lg:w-[92%] h-40 object-cover rounded-xl lg:h-[80%]" src="./lady.png" alt="" />
            

            {/* Stats bar */}
            <div className="absolute bottom-10 w-[80%] lg:w-[63%] left-24 right-0 flex gap-10  m-10 ">
              {[
                { val: "98%", label: "Resolution Rate" },
                { val: "3s",  label: "Avg Response" },
                { val: "3s",  label: "Avg Response" },
              ].map((s, i) => (
                <div key={i} className="flex-1 px-4 py-3 h-20 w-[20%] rounded-xl relative mt-10 bg-[#FFFFFF1A]/10 backdrop-blur-xs ">
                  <p className="text-white font-bold text-xl   mb-0.5">{s.val}</p>
                  <p className="text-white/70 text-xs">{s.label}</p>
                </div>
              ))}
                
            </div>
          {/* </div> */}
        </div>

        {/* ── Right sign-in panel ── */}
        <div className="flex-1 flex text-md lg:text-xl flex-col bottom-2 top-[-20px] relative justify-center px-12 py-14 bg-[#F8FAFC]">
          <h2 className="text-[23px] lg:text-[39px]  font-bold  text-gray-900 mb-2 text-center">Welcome back</h2>
          <p className="text-gray-400 text-sm lg:text-lg lg:top-10 relative mb-9 text-center">Sign in to your workspace</p>

          <form action="/onboarding/workspace">
            <div className="space-y-5 max-w-sm w-full mt-0 lg:mt-16 mx-auto">
            <div>
              <label className="block lg:text-lg font-medium text-gray-700 mb-5">Email</label>
              <input
                type="email"
                className="w-full border-none border-gray-200 rounded-xl px-4 py-3 lg:py-4 text-lg text-gray-900 placeholder-gray-400 bg-white outline-none transition-all focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10"
                placeholder="you@company.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block lg:text-lg font-medium mt-10 text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                className="w-full border-none border-gray-200 rounded-xl px-4 py-3 lg:py-4 text-lg text-gray-900 placeholder-gray-400 bg-white outline-none transition-all focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10"
                placeholder="••••••••"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-gray-300 text-[#0D9488] focus:ring-[#0D9488]"
                />
                <span className="text-sm lg:text-lg text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm lg:text-sm font-medium text-[#0D9488] hover:text-[#0D9488]-dark transition-colors">
                Forgot password?
              </a>
            </div>

              <button type="submit" className="w-full bg-[#0D9488] hover:bg-[#0D9488]-dark mt-8 text-white font-semibold rounded-2xl px-6 transition-colors cursor-pointer py-3 lg:py-4 text-lg">Sign In</button>

            <p className="text-center mt-8 text-xs lg:text-sm text-gray-400">Secured by 256-bit SSL encryption</p>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}
