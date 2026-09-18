import React, { useState, useEffect } from 'react';
import { Flame, Clock, ShieldCheck, ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface LimitedDropsProps {
  dropProduct: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
}

export const LimitedDrops: React.FC<LimitedDropsProps> = ({
  dropProduct,
  onSelectProduct,
  onAddToCart,
}) => {
  // Live Countdown State
  const [timeLeft, setTimeLeft] = useState({
    hours: 47,
    minutes: 38,
    seconds: 14,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const total = dropProduct.dropTotal || 500;
  const remaining = dropProduct.dropRemaining || 42;
  const percentageClaimed = Math.round(((total - remaining) / total) * 100);

  return (
    <section id="limited-drops" className="py-20 bg-[#0d0f17] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase text-[#EA4335] tracking-widest">
              <Flame className="w-3.5 h-3.5" />
              <span>FRONTIER ALLOCATIONS // EXCLUSIVE COMMEMORATIVE DROP</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-1">
              Limited Edition Creator Drops
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Strictly numbered collector physicals celebrating milestone technological breakthroughs. 
              Never reproduced once the drop allocation concludes.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center space-x-2 bg-black/60 border border-white/15 px-4 py-2.5 rounded-2xl">
            <Clock className="w-4 h-4 text-[#EA4335]" />
            <span className="text-xs font-mono text-slate-400">CLOSES IN:</span>
            <span className="text-sm font-mono font-bold text-white">
              {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>

        {/* Drop Feature Card */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#171926] via-[#151928] to-[#12141d] border border-[#EA4335]/40 p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Image Showcase */}
            <div className="lg:col-span-6 relative aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden bg-black/50 cursor-pointer" onClick={() => onSelectProduct(dropProduct)}>
              <img
                src={dropProduct.images[0]}
                alt={dropProduct.name}
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#EA4335] text-white shadow-lg shadow-[#EA4335]/40">
                  {dropProduct.badge || 'Strictly Limited #001/500'}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                <span className="text-white font-mono">Laser-Serialized Metal Hardware Tag</span>
                <span className="text-amber-400 font-bold font-mono">${dropProduct.price}</span>
              </div>
            </div>

            {/* Right Details & Allocation Meter */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold">
                  Drop Allocation 01 of 03
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
                  {dropProduct.name}
                </h3>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                  {dropProduct.longDescription}
                </p>
              </div>

              {/* Allocation Progress Bar */}
              <div className="space-y-2 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Allocation Progress:</span>
                  <span className="text-[#EA4335] font-bold">{remaining} of {total} Available ({percentageClaimed}% Claimed)</span>
                </div>

                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#EA4335] via-[#FBBC05] to-[#4285F4] rounded-full transition-all duration-500"
                    style={{ width: `${percentageClaimed}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-1">
                  <span>Tier 1 Whitelist (Claimed)</span>
                  <span>Public Allocation Closing</span>
                </div>
              </div>

              {/* Drop Perks */}
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#34A853]" />
                  <span>Physical + Digital Twin</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#FBBC05]" />
                  <span>Reversible Satin Weave</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onAddToCart(dropProduct, 1, 'L', dropProduct.colors[0].name)}
                  className="px-6 py-3 bg-[#EA4335] hover:bg-[#d43729] text-white font-semibold text-sm rounded-xl transition-all shadow-xl shadow-[#EA4335]/30 flex items-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Secure Allocation (${dropProduct.price})</span>
                </button>

                <button
                  onClick={() => onSelectProduct(dropProduct)}
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-sm font-medium rounded-xl border border-white/10 transition-all"
                >
                  Inspect Specifications
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
