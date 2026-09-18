import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';

interface FeaturedCollectionsProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  userArchetype?: string;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  userArchetype,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories: { id: Category; label: string; count: number }[] = [
    { id: 'all', label: 'All Artifacts', count: products.length },
    { id: 'creator-series', label: 'Creator Series', count: products.filter(p => p.collection === 'creator-series').length },
    { id: 'ai-collection', label: 'AI Collection', count: products.filter(p => p.collection === 'ai-collection').length },
    { id: 'innovation', label: 'Innovation', count: products.filter(p => p.collection === 'innovation').length },
    { id: 'sustainable', label: 'Sustainable', count: products.filter(p => p.collection === 'sustainable').length },
    { id: 'workspace', label: 'Workspace', count: products.filter(p => p.collection === 'workspace').length },
    { id: 'limited-drops', label: 'Limited Drops', count: products.filter(p => p.collection === 'limited-drops').length },
  ];

  const filteredProducts = useMemo(() => {
    let list = selectedCategory === 'all' 
      ? [...products] 
      : products.filter(p => p.collection === selectedCategory);

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, selectedCategory, sortBy]);

  return (
    <section id="featured-collections" className="py-20 bg-[#0b0c10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#4285F4] tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Lifestyle Catalog</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-1">
              Curated Collections for Builders
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Zero generic corporate promotional swag. Every item is pattern-crafted with technical textiles, 
              ergonomic pockets, and circular materials.
            </p>
          </div>

          {/* Sort Filter Dropdown */}
          <div className="flex items-center space-x-3">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#4285F4]"
            >
              <option value="featured" className="bg-[#12141c]">Featured & Match Score</option>
              <option value="price-asc" className="bg-[#12141c]">Price: Low to High</option>
              <option value="price-desc" className="bg-[#12141c]">Price: High to Low</option>
              <option value="rating" className="bg-[#12141c]">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Collection Pill Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-medium whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-white text-black font-semibold shadow-lg shadow-white/10'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === cat.id ? 'bg-black/10 text-black' : 'bg-white/10 text-slate-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.has(product.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
