import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onTrackSearch: (query: string, resultCount: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onTrackSearch,
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const matches = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.longDescription.toLowerCase().includes(q)
    );
    return matches;
  }, [query]);

  const handleSelect = (product: Product) => {
    if (query.trim()) {
      onTrackSearch(query, searchResults.length);
    }
    onSelectProduct(product);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl rounded-3xl bg-[#10121a] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 bg-[#141824] flex items-center space-x-3">
          <Search className="w-5 h-5 text-[#4285F4]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                onTrackSearch(query.trim(), searchResults.length);
              }
            }}
            placeholder="Search hoodies, tees, materials (460 GSM, Pima), or collections..."
            className="flex-1 bg-transparent text-white placeholder:text-slate-500 text-sm focus:outline-none"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results or Quick Suggestions */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-3">
          {!query.trim() ? (
            <div className="space-y-4">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Trending Creator Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Recycled Black Hoodie',
                  'Nano Banana Tee',
                  '460 GSM Loopback',
                  'Pixel Buds Pocket',
                  'Quantum Backpack',
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      const q = term.toLowerCase();
                      const count = PRODUCTS.filter(
                        (p) =>
                          p.name.toLowerCase().includes(q) ||
                          p.tagline.toLowerCase().includes(q) ||
                          p.collection.toLowerCase().includes(q)
                      ).length;
                      onTrackSearch(term, count);
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs font-mono">
              No creator artifacts found matching "{query}".
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-400">
                Found {searchResults.length} artifacts matching "{query}":
              </div>
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelect(product)}
                  className="p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#4285F4]/40 transition-all flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="text-xs font-bold text-white">{product.name}</div>
                      <div className="text-[11px] text-slate-400">{product.tagline}</div>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-[#34A853] font-bold">
                    ${product.price}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
