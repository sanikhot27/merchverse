import React from 'react';
import { Globe, RefreshCw, ShieldCheck, Leaf, ArrowRight, Droplets, Wind, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface SustainabilityStoryProps {
  onSelectHoodie: () => void;
}

export const SustainabilityStory: React.FC<SustainabilityStoryProps> = ({ onSelectHoodie }) => {
  return (
    <section id="sustainability-story" className="py-24 bg-[#0a0c12] border-t border-white/5 relative overflow-hidden">
      {/* Subtle Green Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#34A853]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#34A853]/10 border border-[#34A853]/30 text-[#34A853] text-xs font-mono">
              <Leaf className="w-3.5 h-3.5" />
              <span>CIRCULAR SUPPLY CHAIN // MOONSHOT 2030</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Apparel without Environmental Debt.
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              True sustainability demands verifiable transparency rather than vague eco-friendly slogans. 
              MERCHVERSE transforms circular fashion into verifiable, traceable craftsmanship from rescued ocean plastics to finished thread.
            </p>

            {/* Impact Grid */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl sm:text-3xl font-display font-black text-[#34A853]">32</div>
                <div className="text-xs text-slate-300 font-semibold mt-1">Bottles Rescued</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">Per Gen-2 Hoodie</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl sm:text-3xl font-display font-black text-[#4285F4]">1,450L</div>
                <div className="text-xs text-slate-300 font-semibold mt-1">Water Saved</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">Closed-loop dyeing</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl sm:text-3xl font-display font-black text-[#FBBC05]">100%</div>
                <div className="text-xs text-slate-300 font-semibold mt-1">NFC Traceable</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">Digital certificate</div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onSelectHoodie}
                className="px-6 py-3 bg-[#34A853] hover:bg-[#2d8f47] text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-[#34A853]/20 flex items-center space-x-2"
              >
                <span>Inspect Recycled Circular Hoodie</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Visual Circular Steps */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#34A853]/20 text-[#34A853] flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Post-Consumer Coastal Recovery</h4>
                  <p className="text-xs text-slate-400">Certified retrieval from vulnerable coastlines across Indonesia and the Pacific Rim.</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#4285F4]/20 text-[#4285F4] flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Molecular Depolymerization</h4>
                  <p className="text-xs text-slate-400">Broken down into ultra-fine filaments and spun with California organic combed cotton.</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FBBC05]/20 text-[#FBBC05] flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">460 GSM Heavyweight Loopback Knit</h4>
                  <p className="text-xs text-slate-400">Woven in Portugal on vintage low-tension circular looms for supreme density.</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EA4335]/20 text-[#EA4335] flex items-center justify-center font-bold text-sm">
                  04
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Take-Back Circular Trade-In</h4>
                  <p className="text-xs text-slate-400">When worn for 5+ years, tap your NFC tag to ship back for 100% recycling + $30 MERCHVERSE credit.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
