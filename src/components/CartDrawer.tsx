import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Plus } from 'lucide-react';
import { CartItem, Product } from '../types';
import { PRODUCTS } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  appliedDiscount: number;
  onAddUpsell: (product: Product) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedDiscount,
  onAddUpsell,
}) => {
  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const subtotal = Math.max(0, rawSubtotal - appliedDiscount);
  const shippingThreshold = 100;
  const freeShippingUnlocked = subtotal >= shippingThreshold;
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / shippingThreshold) * 100));

  // Upsell suggestion (e.g. Latent Space Cap or Nano Banana Tee if not already in cart)
  const upsellProduct = PRODUCTS.find(
    (p) => !items.some((i) => i.product.id === p.id) && p.price <= 50
  ) || PRODUCTS[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md h-full bg-[#10121a] border-l border-white/10 shadow-2xl flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-[#141824] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#4285F4]" />
            <h3 className="font-display font-bold text-base text-white">Your Creator Bag</h3>
            <span className="text-xs font-mono text-slate-400">({items.length} items)</span>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="p-3.5 bg-[#141b2e] border-b border-white/5 space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            {freeShippingUnlocked ? (
              <span className="text-[#34A853] font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Unlocked Free Express Worldwide Delivery!</span>
              </span>
            ) : (
              <span className="text-slate-300">
                Add ${(shippingThreshold - subtotal)} more for Free Express Delivery
              </span>
            )}
            <span className="text-slate-400 font-bold">{progressToFreeShipping}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                freeShippingUnlocked ? 'bg-[#34A853]' : 'bg-[#4285F4]'
              }`}
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto stroke-1" />
              <div className="text-white font-semibold text-base">Your Bag is Empty</div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore the Gen-2 Recycled Hoodie or our cult-favorite Nano Banana Tee to begin building your uniform.
              </p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}-${idx}`}
                className="p-3.5 rounded-2xl bg-[#141622] border border-white/5 flex gap-3.5 items-center"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover bg-black/40"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white text-xs truncate">{item.product.name}</h4>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {item.selectedColor.name} • Size {item.selectedSize}
                  </div>
                  <div className="text-xs font-mono font-bold text-white mt-1">
                    ${item.product.price}
                  </div>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => onRemoveItem(idx)}
                    className="text-slate-500 hover:text-[#EA4335] p-1 rounded"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center border border-white/10 bg-white/5 rounded-lg text-xs font-mono">
                    <button
                      onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                      className="px-2 py-0.5 text-slate-400 hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-1 text-white font-bold">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                      className="px-2 py-0.5 text-slate-400 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Smart Cart Upsell Recommendation */}
          {items.length > 0 && upsellProduct && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-white/[0.02] to-white/[0.04] border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-amber-400 font-semibold">
                <span>Pair with your order:</span>
                <span>${upsellProduct.price}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center space-x-2.5">
                  <img src={upsellProduct.images[0]} alt={upsellProduct.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="text-xs font-medium text-white line-clamp-1">{upsellProduct.name}</div>
                </div>
                <button
                  onClick={() => onAddUpsell(upsellProduct)}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono flex items-center space-x-1 shrink-0"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer & Checkout Button */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#12141d] space-y-3">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="text-white">${rawSubtotal.toFixed(2)}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-[#34A853]">
                  <span>Rewards Discount:</span>
                  <span>-${appliedDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-400">
                <span>Carbon Neutral Shipping:</span>
                <span className="text-[#34A853] font-semibold">{freeShippingUnlocked ? 'FREE' : '$9.00'}</span>
              </div>

              <div className="flex justify-between text-base font-bold font-sans text-white pt-2 border-t border-white/10">
                <span>Estimated Total:</span>
                <span className="font-mono text-lg">${(subtotal + (freeShippingUnlocked ? 0 : 9)).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 bg-[#4285F4] hover:bg-[#3367d6] text-white font-display font-semibold text-sm rounded-2xl transition-all shadow-xl shadow-[#4285F4]/30 flex items-center justify-center space-x-2"
            >
              <span>Proceed to Express Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
              <span>Encrypted with Google Cloud Security & 1-Tap Google Pay</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
