import React, { useState } from 'react';
import { 
  ArrowLeft, Star, Heart, Share2, Check, ShieldCheck, Sparkles, 
  RotateCw, Ruler, Layers, Cpu, Globe, ShoppingBag, Plus, 
  ChevronRight, AlertCircle, HelpCircle, CheckCircle2, UserCheck
} from 'lucide-react';
import { Product, ProductColor, CartItem } from '../types';
import { PRODUCTS } from '../data/products';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number, size: string, color: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onSelectProduct,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [is3DMode, setIs3DMode] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [activeFabricLayerIndex, setActiveFabricLayerIndex] = useState<number>(0);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  // Size Calculator State
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(74);
  const [fitPreference, setFitPreference] = useState<'tailored' | 'boxy' | 'oversized'>('boxy');

  const calculatedSize = (() => {
    if (fitPreference === 'oversized') {
      return weightKg > 80 ? '2XL' : weightKg > 70 ? 'XL' : 'L';
    }
    if (fitPreference === 'boxy') {
      return weightKg > 85 ? 'XL' : weightKg > 72 ? 'L' : 'M';
    }
    return weightKg > 80 ? 'L' : weightKg > 68 ? 'M' : 'S';
  })();

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  // Frequently bought together bundle (e.g. Hoodie + Nano Banana Tee)
  const bundleCompanion = PRODUCTS.find(p => p.id === 'nano-banana-tee') || PRODUCTS[1];
  const bundleDiscountedPrice = Math.round((product.price + bundleCompanion.price) * 0.85);

  const images = product.rotationalAngles && product.rotationalAngles.length > 0
    ? product.rotationalAngles
    : product.images;

  return (
    <div className="min-h-screen bg-[#0b0c10] py-8 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-xs sm:text-sm font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Curated Gallery</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-medium transition-all border border-white/10"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{shareCopied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Top Product Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Visual Stage & 360 Rotator */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square w-full rounded-3xl bg-[#12141c] border border-white/10 overflow-hidden shadow-2xl group">
              <img
                src={images[is3DMode ? rotationAngle : activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* 360 Mode Floating Toggle */}
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <button
                  onClick={() => setIs3DMode(!is3DMode)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold backdrop-blur-md flex items-center space-x-1.5 transition-all ${
                    is3DMode
                      ? 'bg-[#4285F4] text-white shadow-lg shadow-[#4285F4]/50'
                      : 'bg-black/60 text-slate-300 border border-white/15 hover:text-white'
                  }`}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${is3DMode ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                  <span>{is3DMode ? '360° Studio Active' : 'Enter 360° View'}</span>
                </button>
              </div>

              {/* Flagship Essential Badge */}
              {product.isHeroFixProduct && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#4285F4] text-white font-bold shadow-md shadow-[#4285F4]/40">
                    FLAGSHIP ESSENTIAL
                  </span>
                </div>
              )}

              {/* Bottom Angle Scrubbing Bar when in 360 Mode */}
              {is3DMode && (
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                    <span>Rotate Angle: {rotationAngle * 90}°</span>
                    <span className="text-[#4285F4]">Interactive Multi-Angle Inspector</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={images.length - 1}
                    value={rotationAngle}
                    onChange={(e) => setRotationAngle(Number(e.target.value))}
                    className="w-full accent-[#4285F4] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Front (0°)</span>
                    <span>45° Profile</span>
                    <span>90° Side</span>
                    <span>Back (180°)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery Row */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIs3DMode(false);
                    setActiveImageIndex(idx);
                  }}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all bg-black/40 ${
                    activeImageIndex === idx && !is3DMode
                      ? 'border-[#4285F4] scale-[1.02]'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Live Sustainability Impact Counter */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#111927] to-[#12211e] border border-[#34A853]/20 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#34A853]">
                  <Globe className="w-4 h-4 text-[#34A853]" />
                  <span className="font-semibold uppercase tracking-wider">Verifiable Sustainability Metrics</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-full">
                  NFC Traceable
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-xl sm:text-2xl font-display font-black text-white">
                    {product.sustainability.bottlesRecycled}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">Ocean Bottles Rescued</div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-xl sm:text-2xl font-display font-black text-[#34A853]">
                    {product.sustainability.co2OffsetKg} kg
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">Carbon Offset</div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-xl sm:text-2xl font-display font-black text-[#4285F4]">
                    {product.sustainability.waterSavedLiters} L
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">Freshwater Conserved</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Product Buy Box & Configuration */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title & Tagline */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                <span>{product.collectionName}</span>
                <div className="flex items-center space-x-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-white">{product.rating}</span>
                  <span className="text-slate-500">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-[#4285F4] font-medium mt-1">
                {product.tagline}
              </p>
            </div>

            {/* Price & Value Proposition */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className="font-display font-black text-3xl text-white">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-500 line-through font-mono">${product.originalPrice}</span>
                  )}
                </div>
                <div className="text-xs text-[#34A853] font-mono mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Free Express Delivery • 30-Day Easy Returns</span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-mono bg-[#4285F4]/15 text-[#4285F4] border border-[#4285F4]/30">
                  {product.matchScoreDefault}% Creator Fit
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {product.longDescription}
            </p>

            {/* Color Swatches */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">Color: <strong className="text-white">{selectedColor.name}</strong></span>
              </div>
              <div className="flex items-center space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl border transition-all ${
                      selectedColor.name === color.name
                        ? 'border-[#4285F4] bg-[#4285F4]/10 text-white'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: color.hex }} />
                    <span className="text-xs font-medium">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector with Creator Fit Calculator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">Size: <strong className="text-white">{selectedSize}</strong></span>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-[#4285F4] hover:underline flex items-center space-x-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Fit Calculator & Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      selectedSize === size
                        ? 'bg-white text-black shadow-lg shadow-white/20'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Creator Fit Calculator Drawer */}
              {showSizeGuide && (
                <div className="p-4 rounded-2xl bg-[#141824] border border-[#4285F4]/30 space-y-3 mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#FBBC05]" />
                      <span>Smart Creator Fit Recommendation</span>
                    </span>
                    <span className="text-[#34A853] font-mono font-bold">Recommended: {calculatedSize}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">Height: {heightCm} cm</label>
                      <input
                        type="range"
                        min={150}
                        max={205}
                        value={heightCm}
                        onChange={(e) => setHeightCm(Number(e.target.value))}
                        className="w-full accent-[#4285F4]"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Weight: {weightKg} kg</label>
                      <input
                        type="range"
                        min={45}
                        max={120}
                        value={weightKg}
                        onChange={(e) => setWeightKg(Number(e.target.value))}
                        className="w-full accent-[#4285F4]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10">
                    <span className="text-slate-400">Drape style:</span>
                    <div className="flex space-x-1">
                      {(['tailored', 'boxy', 'oversized'] as const).map((drape) => (
                        <button
                          key={drape}
                          onClick={() => setFitPreference(drape)}
                          className={`px-2 py-0.5 rounded capitalize text-[11px] font-mono ${
                            fitPreference === drape ? 'bg-[#4285F4] text-white' : 'bg-white/5 text-slate-400'
                          }`}
                        >
                          {drape}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedSize(calculatedSize);
                      setShowSizeGuide(false);
                    }}
                    className="w-full py-1.5 bg-[#4285F4] text-white text-xs font-semibold rounded-lg"
                  >
                    Apply Size {calculatedSize}
                  </button>
                </div>
              )}
            </div>

            {/* Quantity and Primary Action Buttons */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center space-x-3">
                {/* Quantity */}
                <div className="flex items-center border border-white/10 bg-white/5 rounded-2xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-9 flex items-center justify-center text-slate-300 hover:text-white font-mono"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-mono font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-9 flex items-center justify-center text-slate-300 hover:text-white font-mono"
                  >
                    +
                  </button>
                </div>

                {/* Add To Cart */}
                <button
                  onClick={() => onAddToCart(product, quantity, selectedSize, selectedColor.name)}
                  className="flex-1 py-3.5 px-6 bg-[#4285F4] hover:bg-[#3367d6] text-white font-display font-semibold text-base rounded-2xl transition-all shadow-xl shadow-[#4285F4]/30 flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Bag • ${(product.price * quantity)}</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isWishlisted
                      ? 'bg-[#EA4335]/20 border-[#EA4335] text-[#EA4335]'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#EA4335]' : ''}`} />
                </button>
              </div>

              {/* NFC Chip Feature Highlight */}
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center space-x-3 text-xs text-slate-300">
                <Cpu className="w-4 h-4 text-[#4285F4] shrink-0" />
                <span>Includes embedded encrypted NFC tag linking to digital certificate & VIP drops</span>
              </div>
            </div>

            {/* Frequently Bought Together Smart Bundle */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase text-[#FBBC05] tracking-widest font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Smart Bundle • 15% Savings</span>
                </h4>
                <span className="text-xs font-mono text-[#34A853]">Save ${(product.price + bundleCompanion.price - bundleDiscountedPrice)}</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#141622] border border-white/10 space-y-3">
                <div className="flex items-center space-x-3">
                  <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-xl object-cover" />
                  <span className="text-slate-400 font-bold">+</span>
                  <img src={bundleCompanion.images[0]} alt={bundleCompanion.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1 text-xs">
                    <div className="font-semibold text-white">The Mountain View Creator Uniform</div>
                    <div className="text-slate-400 text-[11px]">{product.name} + {bundleCompanion.name}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                  <div>
                    <span className="text-base font-bold text-white font-mono">${bundleDiscountedPrice}</span>
                    <span className="text-slate-500 line-through font-mono ml-2">${product.price + bundleCompanion.price}</span>
                  </div>
                  <button
                    onClick={() => {
                      onAddToCart(product, 1, selectedSize, selectedColor.name);
                      onAddToCart(bundleCompanion, 1, 'L', bundleCompanion.colors[0].name);
                    }}
                    className="px-3 py-1.5 bg-white text-black hover:bg-slate-200 font-semibold rounded-xl text-xs flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Bundle</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Deep Dive Section: 4-Layer Fabric Breakdown */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono uppercase text-[#4285F4] tracking-widest">Tactile Engineering</span>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Anatomy of the 460 GSM Circular Weave
            </h3>
            <p className="text-slate-400 text-sm">
              Each layer is engineered for structural longevity, breathability, and luxurious hand-feel. 
              Click each layer to inspect fiber density and micro-structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {product.fabricLayers.map((layer, idx) => (
              <div
                key={layer.title}
                onClick={() => setActiveFabricLayerIndex(idx)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                  activeFabricLayerIndex === idx
                    ? 'bg-[#151b2e] border-[#4285F4] shadow-xl shadow-[#4285F4]/10'
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">LAYER 0{idx + 1}</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-white/5 text-[#4285F4]">
                    {layer.percentage}
                  </span>
                </div>
                <h4 className="font-bold text-white text-base">{layer.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{layer.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Comparison Matrix (Gen-2 vs Standard Merch vs Benchmark) */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono uppercase text-[#FBBC05] tracking-widest">Garment Comparison</span>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Engineering Specs: Gen-2 vs Standard Industry Fleece
            </h3>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#12141c]">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-mono">
                  <th className="p-4 sm:p-5">Dimension</th>
                  <th className="p-4 sm:p-5 text-[#4285F4] font-bold bg-[#4285F4]/10">MERCHVERSE Gen-2 Hoodie</th>
                  <th className="p-4 sm:p-5 text-slate-400">Standard Promotional Fleece</th>
                  <th className="p-4 sm:p-5 text-[#FBBC05]">Nano Banana Tee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                <tr>
                  <td className="p-4 sm:p-5 font-sans font-semibold text-white">Fabric Weight & Density</td>
                  <td className="p-4 sm:p-5 text-white font-bold bg-[#4285F4]/10">460 GSM Loopback Heavyweight</td>
                  <td className="p-4 sm:p-5 text-slate-400">260 GSM (Thin, pills quickly)</td>
                  <td className="p-4 sm:p-5 text-slate-300">240 GSM Peruvian Pima</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-sans font-semibold text-white">Sustainable Circularity</td>
                  <td className="p-4 sm:p-5 text-[#34A853] font-bold bg-[#4285F4]/10">32 Bottles Rescued • NFC Verified</td>
                  <td className="p-4 sm:p-5 text-slate-400">Unverified "Recycled blend"</td>
                  <td className="p-4 sm:p-5 text-slate-300">Organic Pima + Silver Ion</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-sans font-semibold text-white">Pocket & Tech Utilities</td>
                  <td className="p-4 sm:p-5 text-white font-bold bg-[#4285F4]/10">Concealed Zipper Pixel Buds Pouch</td>
                  <td className="p-4 sm:p-5 text-slate-400">Standard open pouch (devices fall out)</td>
                  <td className="p-4 sm:p-5 text-slate-300">Seamless Torso Cut</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-sans font-semibold text-white">Branding Identity</td>
                  <td className="p-4 sm:p-5 text-white font-bold bg-[#4285F4]/10">Micro-Stitch Cuff Color Bar (Discreet)</td>
                  <td className="p-4 sm:p-5 text-slate-400">Loud promotional chest logo</td>
                  <td className="p-4 sm:p-5 text-slate-300">Tactile 3D Banana Emblem</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-sans font-semibold text-white">Digital Provenance</td>
                  <td className="p-4 sm:p-5 text-[#4285F4] font-bold bg-[#4285F4]/10">NTAG 424 Encrypted Digital Twin</td>
                  <td className="p-4 sm:p-5 text-slate-400">None (Paper tag)</td>
                  <td className="p-4 sm:p-5 text-slate-300">None</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Creator Reviews Section */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-[#34A853] tracking-widest">Community Feedback</span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
                Verified Creator & Developer Reviews
              </h3>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <UserCheck className="w-4 h-4 text-[#34A853]" />
              <span>100% Verified Community Purchases</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#141620] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-mono text-slate-500">2 days ago</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "I stopped wearing my $250 Japanese loopwheel hoodie after this arrived. The 460 GSM weight gives you that heavy, calming sensation when deep in code."
              </p>
              <div className="flex items-center space-x-3 pt-2 border-t border-white/5">
                <div className="w-8 h-8 rounded-full bg-[#4285F4]/20 text-[#4285F4] flex items-center justify-center font-bold text-xs">
                  ML
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Maya Lin</div>
                  <div className="text-[10px] text-slate-400">Principal AI Researcher</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#141620] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-mono text-slate-500">1 week ago</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "The hidden zippered pocket inside the kangaroo pouch is pure genius. My Pixel Buds don't fall out when I'm running to catch the Caltrain."
              </p>
              <div className="flex items-center space-x-3 pt-2 border-t border-white/5">
                <div className="w-8 h-8 rounded-full bg-[#FBBC05]/20 text-[#FBBC05] flex items-center justify-center font-bold text-xs">
                  KS
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Kenji Sato</div>
                  <div className="text-[10px] text-slate-400">Creative Technologist, Tokyo</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#141620] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-mono text-slate-500">2 weeks ago</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Tapped the NFC chip with my Pixel 9 Pro and verified the 32 recycled bottles certification immediately. This is how all apparel should be."
              </p>
              <div className="flex items-center space-x-3 pt-2 border-t border-white/5">
                <div className="w-8 h-8 rounded-full bg-[#34A853]/20 text-[#34A853] flex items-center justify-center font-bold text-xs">
                  SC
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Sarah Chen</div>
                  <div className="text-[10px] text-slate-400">Staff Frontend Architect</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
