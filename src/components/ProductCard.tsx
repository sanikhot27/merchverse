import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Sparkles, ArrowRight } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  userMatchScore?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  userMatchScore,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);

  const displayMatchScore = userMatchScore || product.matchScoreDefault;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl bg-[#12141c] border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col justify-between"
    >
      {/* Top Media Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-black/40 cursor-pointer" onClick={() => onSelect(product)}>
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {product.badge ? (
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md ${
              product.isHeroFixProduct
                ? 'bg-[#4285F4] text-white shadow-md shadow-[#4285F4]/40'
                : product.isBenchmarkProduct
                ? 'bg-[#FBBC05] text-black font-bold'
                : product.isLimitedDrop
                ? 'bg-[#EA4335] text-white'
                : 'bg-black/60 text-slate-200 border border-white/10'
            }`}>
              {product.badge}
            </span>
          ) : <span />}

          {/* AI Match Score Pill */}
          <div className="pointer-events-auto flex items-center space-x-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-[11px] font-mono text-white">
            <Sparkles className="w-3 h-3 text-[#FBBC05]" />
            <span className="font-bold">{displayMatchScore}%</span>
            <span className="text-[9px] text-slate-400">match</span>
          </div>
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute bottom-3 right-3 p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white transition-all hover:scale-110"
          title="Toggle Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#EA4335] text-[#EA4335]' : 'text-white'
            }`}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Collection & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
            <span>{product.collectionName.split('&')[0]}</span>
            <div className="flex items-center space-x-1 text-amber-400">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-white">{product.rating}</span>
              <span className="text-slate-500">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onSelect(product)}
            className="font-display font-bold text-base text-white hover:text-[#4285F4] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 mt-1 font-normal">
            {product.shortDescription}
          </p>
        </div>

        {/* Swatches & Pricing & CTA */}
        <div className="pt-2 border-t border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            {/* Swatches */}
            <div className="flex items-center space-x-1.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color);
                  }}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    selectedColor.name === color.name
                      ? 'border-[#4285F4] scale-125'
                      : 'border-white/20 hover:scale-110'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>

            {/* Price */}
            <div className="text-right">
              <span className="font-display font-bold text-white text-base">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="ml-1.5 text-xs text-slate-500 line-through font-mono">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onSelect(product)}
              className="py-2 px-3 bg-white/5 hover:bg-white/10 text-xs text-slate-200 font-medium rounded-xl border border-white/10 transition-all text-center flex items-center justify-center gap-1"
            >
              <span>Inspect</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={() => onAddToCart(product, 1, product.sizes[0] || 'One Size', selectedColor.name)}
              className="py-2 px-3 bg-[#4285F4] hover:bg-[#3367d6] text-xs text-white font-medium rounded-xl transition-all shadow-md shadow-[#4285F4]/20 flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
