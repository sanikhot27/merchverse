import React from 'react';
import { Users, Sparkles, ShoppingBag, MapPin, Quote, ArrowRight } from 'lucide-react';
import { CREATOR_STORIES, PRODUCTS } from '../data/products';
import { Product } from '../types';

interface CreatorCommunityProps {
  onSelectProduct: (product: Product) => void;
}

export const CreatorCommunity: React.FC<CreatorCommunityProps> = ({ onSelectProduct }) => {
  return (
    <section id="community-gallery" className="py-24 bg-[#0a0c10] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase text-[#4285F4] tracking-widest">
            <Users className="w-3.5 h-3.5" />
            <span>GLOBAL CREATOR GUILD // STYLE & STORIES</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Worn by the Builders of the Future
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            From London design hubs and Tokyo creative studios to Mountain View hackathons. 
            See how the creator community styles MERCHVERSE.
          </p>
        </div>

        {/* Creator Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CREATOR_STORIES.map((story) => {
            const product = PRODUCTS.find((p) => p.id === story.productId) || PRODUCTS[0];
            return (
              <div
                key={story.id}
                className="rounded-3xl bg-[#12141c] border border-white/5 hover:border-white/15 transition-all duration-500 overflow-hidden flex flex-col justify-between group"
              >
                {/* Photo with Look Tag */}
                <div className="relative aspect-[4/5] overflow-hidden bg-black/40">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Creator Location Tag */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[11px] font-mono text-slate-300 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-[#EA4335]" />
                    <span>{story.location}</span>
                  </div>

                  {/* Shop Look Pill */}
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/15 text-xs text-white flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center space-x-2">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#4285F4]" />
                      <span className="font-semibold line-clamp-1">{story.itemWorn}</span>
                    </div>
                    <span className="font-mono text-[#34A853] font-bold">${product.price}</span>
                  </button>
                </div>

                {/* Creator Narrative & Bio */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    "{story.quote}"
                  </p>

                  <div className="flex items-center space-x-3 pt-3 border-t border-white/5">
                    <img
                      src={story.avatar}
                      alt={story.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/15"
                    />
                    <div>
                      <div className="font-bold text-white text-sm flex items-center gap-1.5">
                        <span>{story.name}</span>
                        <span className="text-[11px] text-[#4285F4] font-mono font-normal">{story.handle}</span>
                      </div>
                      <div className="text-xs text-slate-400">{story.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
