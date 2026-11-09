import React, { useState } from 'react';
import { faqs } from '../data/seadunesData';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-24 relative z-10">
      <div className="padding-global">
        <div className="container-xl max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="badge-tag mb-2 block">Clear Answers</span>
            <h2 className="section-headline text-white mb-4">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">Questions</span>
            </h2>
            <p className="text-white/60 text-sm font-light">
              Everything you need to know about our desert safety standards, equipment, booking guidelines, and itineraries.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={`glass-panel rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? 'border-sky-400/40 bg-white/[0.08]' : 'border-white/10'
                  }`}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-semibold text-sm sm:text-base text-white">
                      {faq.q}
                    </span>
                    <span className={`p-2 rounded-full bg-white/5 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-sky-500/20 text-sky-400' : 'text-white/60'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-white/70 leading-relaxed font-light border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
