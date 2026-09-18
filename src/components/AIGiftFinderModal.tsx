import React, { useState } from 'react';
import { Gift, X, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface AIGiftFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
}

export const AIGiftFinderModal: React.FC<AIGiftFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
}) => {
  const [recipient, setRecipient] = useState<string>('ai-engineer');
  const [budget, setBudget] = useState<number>(100);

  if (!isOpen) return null;

  const recipients = [
    { id: 'ai-engineer', label: 'AI Engineer / Researcher' },
    { id: 'frontend-dev', label: 'Frontend / UI Artisan' },
    { id: 'founder', label: 'Tech Founder / Executive' },
    { id: 'nomad', label: 'Remote Digital Nomad' },
  ];

  const matchedProducts = PRODUCTS.filter((p) => p.price <= budget);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="w-full max-w-xl rounded-3xl bg-[#10121a] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-[#141824] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-[#EA4335]/20 text-[#EA4335]">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-white">AI Creator Gift Finder</h3>
              <p className="text-[11px] text-slate-400 font-mono">Algorithmically Curated Techwear Packages</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Recipient Picker */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300">Who are you shopping for?</label>
            <div className="grid grid-cols-2 gap-2">
              {recipients.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRecipient(r.id)}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                    recipient === r.id
                      ? 'bg-[#4285F4] text-white border-[#4285F4]'
                      : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Maximum Budget:</span>
              <span className="text-[#34A853] font-bold">${budget} USD</span>
            </div>
            <input
              type="range"
              min={40}
              max={250}
              step={10}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-[#4285F4]"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>$40 (Accessories)</span>
              <span>$100 (Tees & Hoodies)</span>
              <span>$250 (Luxury Outerwear)</span>
            </div>
          </div>

          {/* Matches */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              {matchedProducts.length} Optimal Gift Matches Under ${budget}:
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {matchedProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-3 hover:border-white/20 transition-all"
                >
                  <div
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="flex items-center space-x-3 cursor-pointer flex-1"
                  >
                    <img src={prod.images[0]} alt={prod.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="text-xs font-bold text-white line-clamp-1">{prod.name}</div>
                      <div className="text-xs font-mono text-[#34A853] font-bold">${prod.price}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onAddToCart(prod, 1, prod.sizes[0] || 'M', prod.colors[0].name)}
                    className="px-3 py-1.5 bg-[#4285F4] hover:bg-[#3367d6] text-white text-xs font-medium rounded-xl flex items-center space-x-1 shrink-0"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Gift Bag</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
