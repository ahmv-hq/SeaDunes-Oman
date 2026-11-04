import React from 'react';
import { clientReviews } from '../data/seadunesData';
import { Star, Quote } from 'lucide-react';

export default function ReviewsSection() {
  return (
    <section className="py-20 relative z-10 bg-[#030a16]/80 border-t border-white/5">
      <div className="padding-global">
        <div className="container-xl">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="badge-tag mb-2 block">Traveler Experiences</span>
              <h2 className="section-headline text-white">
                Trusted by Adventurers <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">Worldwide</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-white/70 font-semibold">4.9 / 5.0 Average Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clientReviews.map((rev, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-3xl p-7 flex flex-col justify-between group hover:border-sky-400/50 transition-all duration-300"
              >
                <div>
                  <Quote className="w-8 h-8 text-sky-400/40 mb-4" />
                  <p className="text-sm text-white/80 leading-relaxed font-light italic mb-6">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                      {rev.author}
                    </h4>
                    <span className="text-xs text-white/50">{rev.company}</span>
                  </div>
                  <span className="glass-pill !py-0.5 !px-2.5 text-[10px] text-sky-300 border-sky-400/30">
                    {rev.tour}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
