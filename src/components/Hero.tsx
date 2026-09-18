import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, RefreshCw, Star } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  hoodieProduct: Product;
  onSelectProduct: (product: Product) => void;
  onOpenQuiz: () => void;
  onAddToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  hoodieProduct,
  onSelectProduct,
  onOpenQuiz,
  onAddToCart,
}) => {
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const angles = hoodieProduct.rotationalAngles || hoodieProduct.images;

  return (
    <section className="relative w-full pt-8 pb-20 overflow-hidden">
      {/* Subtle Google Glow Ambient Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[560px] pointer-events-none opacity-30 blur-[130px] google-glow-ambient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Collection Badge */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/[0.04] border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-slate-300">
              MERCHVERSE // DROP 01 • ESSENTIALS
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span>Mountain View Studio</span>
            <span>•</span>
            <span className="text-[#34A853]">Worldwide Fast Dispatch</span>
          </div>
        </div>

        {/* Hero Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Vision & Narrative */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h1 className="font-display font-black text-4xl sm:text-6xl xl:text-7xl tracking-tight text-white leading-[1.05]">
              Designed for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]">
                Creators.
              </span>{' '}
              <br />
              Inspired by <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBBC05] via-[#34A853] to-[#4285F4]">
                Innovation.
              </span>
            </h1>

            <p className="text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              We reimagined creator apparel from the molecular weave up. Heavyweight 460 GSM circular loopback fleece, 
              32 rescued ocean bottles, concealed earbud pockets, and encrypted digital provenance.
            </p>

            {/* Premium Material Specs Pill */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Garment Engineering</div>
                <div className="text-sm font-semibold text-white mt-0.5">
                  460 GSM Portuguese Terry Weave
                </div>
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-[#34A853]/15 text-[#34A853] border border-[#34A853]/30">
                  100% Certified Circularity
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onSelectProduct(hoodieProduct)}
                className="px-8 py-3.5 bg-white text-black hover:bg-slate-100 font-display font-semibold text-base rounded-2xl transition-all shadow-xl hover:shadow-white/20 flex items-center space-x-2 group"
              >
                <span>Shop The Gen-2 Hoodie</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-black" />
              </button>

              <button
                onClick={onOpenQuiz}
                className="px-6 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium text-base rounded-2xl border border-white/15 transition-all backdrop-blur-md flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-[#FBBC05]" />
                <span>Find Your Fit & Style</span>
              </button>
            </div>

            {/* Guarantee / Pillars */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#34A853]" />
                <span>32 Ocean Bottles</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-[#4285F4]" />
                <span>NFC Authenticated</span>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 text-[#FBBC05]" />
                <span>Circular Supply</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Product Showcase with 360 Rotator */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl p-1 bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-2xl">
              <div className="relative rounded-[22px] bg-[#12141c] overflow-hidden border border-white/10 p-6 sm:p-8">
                
                {/* Product Floating Badges */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#4285F4]/20 text-[#4285F4] border border-[#4285F4]/30">
                    FLAGSHIP ESSENTIAL
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-amber-400 font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-white">4.94</span>
                    <span className="text-slate-400">(482 Reviews)</span>
                  </div>
                </div>

                {/* Hero Interactive Image Angle Preview */}
                <div
                  onClick={() => onSelectProduct(hoodieProduct)}
                  className="relative aspect-square w-full rounded-2xl overflow-hidden cursor-pointer group bg-black/40"
                >
                  <img
                    src={angles[activeAngleIndex] || hoodieProduct.images[0]}
                    alt={hoodieProduct.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Glass Overlay Tag on Image */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-white">The Recycled Black Hoodie (Gen-2)</div>
                      <div className="text-slate-400 font-mono text-[11px]">460 GSM Heavyweight Loopback</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold font-mono text-sm">${hoodieProduct.price}</div>
                      <div className="text-[#34A853] text-[10px] font-mono">In Stock • Ready to Ship</div>
                    </div>
                  </div>

                  {/* 360 Indicator Icon */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-[11px] font-mono text-slate-300 flex items-center space-x-1.5">
                    <RefreshCw className="w-3 h-3 text-[#4285F4] animate-spin" style={{ animationDuration: '8s' }} />
                    <span>Interactive 360° Studio</span>
                  </div>
                </div>

                {/* Interactive Angle Switcher Controls */}
                <div className="mt-4 flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    {angles.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveAngleIndex(idx)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                          activeAngleIndex === idx
                            ? 'bg-[#4285F4] text-white font-bold'
                            : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {idx === 0 ? 'Front' : idx === 1 ? '45°' : idx === 2 ? 'Detail' : 'Drape'}
                      </button>
                    ))}
                  </div>

                  {/* Color Swatch Selection */}
                  <div className="flex items-center space-x-2">
                    {hoodieProduct.colors.map((color, idx) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColorIndex(idx)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          selectedColorIndex === idx ? 'border-[#4285F4] scale-110' : 'border-white/20'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onSelectProduct(hoodieProduct)}
                    className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white text-sm font-medium rounded-xl border border-white/15 transition-all text-center"
                  >
                    View Garment Anatomy
                  </button>
                  <button
                    onClick={() => onAddToCart(hoodieProduct, 1, 'L', hoodieProduct.colors[selectedColorIndex].name)}
                    className="w-full py-2.5 px-4 bg-[#4285F4] hover:bg-[#3367d6] text-white text-sm font-medium rounded-xl transition-all shadow-md shadow-[#4285F4]/30 text-center"
                  >
                    Add to Bag (${hoodieProduct.price})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
