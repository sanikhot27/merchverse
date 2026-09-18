import React, { useState } from 'react';
import { 
  Sparkles, Layers, ShieldCheck, Cpu, ArrowRight, Eye, ShoppingBag, 
  CheckCircle2, Droplets, Ruler, Check
} from 'lucide-react';
import { Product } from '../types';

interface WhyThisHoodieMattersProps {
  hoodieProduct: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
}

export const WhyThisHoodieMatters: React.FC<WhyThisHoodieMattersProps> = ({
  hoodieProduct,
  onSelectProduct,
  onAddToCart,
}) => {
  const [activeHotspot, setActiveHotspot] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'anatomy' | 'specs'>('anatomy');

  const hotspots = [
    {
      id: 0,
      title: '460 GSM Heavyweight Loopback Knit',
      subtitle: 'Architectural drape & warmth',
      description: 'Woven on low-tension circular looms in Portugal. Blends 32 rescued ocean bottles with California organic combed cotton to maintain shape season after season without pilling or sagging.',
      icon: Layers,
      highlight: '460 GSM Portuguese Terry',
    },
    {
      id: 1,
      title: 'Concealed Device & Earbud Pocket',
      subtitle: 'Engineered for mobile creators',
      description: 'Inside the kangaroo pouch sits a discreet YKK AquaGuard zippered pocket lined with scratch-resistant microfiber to securely cradle Pixel Buds, keys, and transit cards during commutes.',
      icon: ShieldCheck,
      highlight: 'Zero-Bounce Internal Security',
    },
    {
      id: 2,
      title: 'Encrypted NFC Digital Twin Chip',
      subtitle: 'Verifiable provenance & digital twin',
      description: 'An embedded NTAG 424 chip inside the lower hem allows you to tap with any modern smartphone to instantly verify material certification, care history, and unlock private creator drops.',
      icon: Cpu,
      highlight: 'Contactless Digital Twin',
    },
    {
      id: 3,
      title: 'Discreet Quad-Color Micro-Stitch',
      subtitle: 'Understated minimalist aesthetic',
      description: 'Zero loud logos across the chest. Instead, an ultra-refined 4-color micro-embroidered bar rests subtly inside your left wrist cuff—visible only when coding or checking your watch.',
      icon: Sparkles,
      highlight: 'Stealth Creator Emblem',
    },
  ];

  return (
    <section id="hoodie-breakdown" className="py-24 bg-[#0e1017] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 text-xs font-mono">
            <Layers className="w-3.5 h-3.5 text-[#4285F4]" />
            <span>GARMENT ENGINEERING // PRODUCT SPOTLIGHT</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Engineered Down to the Thread.
          </h2>

          <p className="text-slate-300 text-base leading-relaxed">
            Every seam, fiber, and pocket was pattern-drafted for daily creator wear. 
            Experience the architectural weight, tactical device storage, and verified circular textiles of the Gen-2 Hoodie.
          </p>
        </div>

        {/* Tab Toggle: Interactive Anatomy vs Garment Specs */}
        <div className="flex justify-center mt-10 mb-12">
          <div className="inline-flex p-1 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('anatomy')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'anatomy'
                  ? 'bg-[#4285F4] text-white shadow-lg shadow-[#4285F4]/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Interactive Garment Anatomy
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'specs'
                  ? 'bg-[#4285F4] text-white shadow-lg shadow-[#4285F4]/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Detailed Specifications
            </button>
          </div>
        </div>

        {/* Tab 1: Interactive Garment Anatomy */}
        {activeTab === 'anatomy' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Interactive Hotspot Selector Cards */}
            <div className="lg:col-span-6 space-y-3.5">
              {hotspots.map((item) => {
                const Icon = item.icon;
                const isActive = activeHotspot === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveHotspot(item.id)}
                    className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#151a28] border-[#4285F4] shadow-xl shadow-[#4285F4]/10 scale-[1.01]'
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2.5 rounded-2xl ${
                            isActive
                              ? 'bg-[#4285F4] text-white'
                              : 'bg-white/5 text-slate-400'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-base">
                            {item.title}
                          </h3>
                          <div className="text-xs text-slate-400 font-mono mt-0.5">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-xs font-mono px-3 py-1 rounded-full ${
                          isActive
                            ? 'bg-[#4285F4]/20 text-[#4285F4] border border-[#4285F4]/30 font-semibold'
                            : 'bg-white/5 text-slate-400'
                        }`}
                      >
                        {item.highlight}
                      </span>
                    </div>

                    {isActive && (
                      <div className="mt-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-slate-300 leading-relaxed animate-in fade-in duration-200">
                        {item.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Garment Stage with visual focus */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-[#12141c] border border-white/10 shadow-2xl relative group">
                <img
                  src={hoodieProduct.images[activeHotspot % hoodieProduct.images.length]}
                  alt="Garment feature showcase"
                  className="w-full h-full object-cover object-center transition-all duration-700"
                />

                {/* Glass Feature Card */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15 space-y-2 text-left">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#4285F4] font-bold">
                      FEATURE DETAIL 0{activeHotspot + 1}
                    </span>
                    <span className="text-white font-bold">${hoodieProduct.price}</span>
                  </div>
                  <h4 className="font-bold text-white text-base">
                    {hotspots[activeHotspot].title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {hotspots[activeHotspot].description}
                  </p>
                </div>
              </div>

              {/* Action Buttons Below Garment */}
              <div className="mt-4 flex items-center justify-between gap-4">
                <button
                  onClick={() => onSelectProduct(hoodieProduct)}
                  className="flex-1 py-3 px-5 bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm rounded-2xl border border-white/15 transition-all text-center flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Explore 360° Studio View</span>
                </button>

                <button
                  onClick={() => onAddToCart(hoodieProduct, 1, 'L', hoodieProduct.colors[0].name)}
                  className="flex-1 py-3 px-5 bg-[#4285F4] hover:bg-[#3367d6] text-white font-medium text-xs sm:text-sm rounded-2xl transition-all shadow-lg shadow-[#4285F4]/30 text-center flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • $98</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Detailed Specifications */}
        {activeTab === 'specs' && (
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#12141c] border border-white/10 p-6 sm:p-8 space-y-6">
            <div className="text-left">
              <h3 className="text-xl font-bold text-white">Garment Specifications & Comparison</h3>
              <p className="text-xs text-slate-400 mt-1">
                How the Gen-2 Creator Hoodie compares with standard retail promotional fleece.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-mono">
                    <th className="pb-3">Dimension</th>
                    <th className="pb-3 text-[#4285F4] font-bold">MERCHVERSE Gen-2</th>
                    <th className="pb-3 text-slate-400">Standard Merch Hoodie</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  <tr>
                    <td className="py-3.5 font-sans font-medium text-white">Fabric Weight</td>
                    <td className="py-3.5 text-white font-bold">460 GSM Heavyweight French Terry</td>
                    <td className="py-3.5 text-slate-400">240 - 280 GSM Standard Blend</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-sans font-medium text-white">Device Pocket</td>
                    <td className="py-3.5 text-white font-bold">Concealed Zipper Pixel Buds Pouch</td>
                    <td className="py-3.5 text-slate-400">Standard Open Pouch</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-sans font-medium text-white">Fiber Sourcing</td>
                    <td className="py-3.5 text-[#34A853] font-bold">32 Rescued Ocean Bottles + Organic Cotton</td>
                    <td className="py-3.5 text-slate-400">Standard Poly-Cotton</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-sans font-medium text-white">Authentication</td>
                    <td className="py-3.5 text-white font-bold">NTAG 424 Encrypted Digital Provenance</td>
                    <td className="py-3.5 text-slate-400">Paper Hangtag</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-sans font-medium text-white">Branding</td>
                    <td className="py-3.5 text-white font-bold">Stealth Wrist Cuff Micro-Stitch</td>
                    <td className="py-3.5 text-slate-400">Screenprinted Chest Logo</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => onSelectProduct(hoodieProduct)}
                className="px-8 py-3 bg-[#4285F4] hover:bg-[#3367d6] text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-[#4285F4]/30"
              >
                View Product Details & Sizing
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
