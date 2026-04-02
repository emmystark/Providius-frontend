'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import Sidebar from '@/components/Sidebar'

const CONTENT = `Return Policy FAQ
Our return policy allows customers to return items within 30 days of purchase. Items must be in original packaging and unused condition.

Q: How do I start a return?
A: Log into your account, go to 'Orders', and select 'Request Return'.

Q: What is the return policy?
A: You can return items within 30 days of receipt for a full refund.

Q: Can I exchange an item?
A: Yes, you can exchange items within the return period by selecting 'Request Exchange'.

Q: How long does it take to process a return?
A: Returns are typically processed within 5-7 business days after we receive the item.

Q: Are return shipping costs covered?
A: Return shipping is free for orders over $50.

Q: How long does it take to process a return?
A: Returns are typically processed within 5-7 business days.

Q: What if my item is damaged?
A: Contact customer service to initiate a return for damaged items.

Q: Can I return sale items?
A: Sale items can be returned as long as they are within the return window.

Q: Where do I send my return?
A: Returns should be sent to the address provided in your return label.`

const SUGGESTIONS = [
  { title: 'Clarify Return Window', desc: 'Users often ask if the 30 days starts from purchase or delivery date.', action: 'Apply Suggestion' },
  { title: 'Add International Policy', desc: 'You mention domestic shipping, but 15% of queries are about international returns.', action: 'Apply Suggestion' },
]

export default function ContentEditorPage() {
  const router = useRouter()
  const [content, setContent] = useState(CONTENT)

  return (
       <div className="flex gap-16 h-screen bg-[#F7FAFC]  overflow-hidden">
         <Sidebar />

     <div className="w-[76%]  mt-[4.3%]">
        
        {/* <div className="max-w-5xl"> */}
        {/* <div className="max-w-5xl"> */}
      <h2 className="text-2xl font-bold text-gray-900 mb-5">Content Editor</h2>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Editing: Return FAQ.md</span>
            <span className="px-2.5 py-0.5 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">Draft</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors">Cancel</button>
            <button className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl transition-colors">
              Save & Reprocess
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Editor */}
          <div className="flex-1 min-w-0">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full px-8 py-6 text-sm text-gray-700 leading-relaxed outline-none resize-none font-sans"
              style={{ minHeight: '70vh' }}
            />
          </div>

          {/* Divider */}
          <div className="w-px bg-gray-100 flex-shrink-0" />

          {/* AI Suggestions */}
          <div className="w-64 flex-shrink-0 p-5 bg-gray-50/50">
            <h4 className="text-sm font-bold text-brand-600 mb-4 flex items-center gap-2">
              <Sparkles size={14} /> AI Suggestions
            </h4>
            <div className="space-y-4">
              {SUGGESTIONS.map((s, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-900 mb-1.5">{s.title}</p>
                  <p className="text-xs text-gray-400 leading-relaxed mb-3">{s.desc}</p>
                  <button className="text-xs text-brand-500 font-semibold hover:text-brand-600 transition-colors">{s.action}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* </div> */}
    </div>
  )
}