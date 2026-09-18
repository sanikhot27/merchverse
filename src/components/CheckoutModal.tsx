import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Lock, Sparkles, CreditCard, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { ga4 } from '../services/ga4';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedDiscount: number;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedDiscount,
  onClearCart,
}) => {
  const [email, setEmail] = useState('creator.builder@google.com');
  const [name, setName] = useState('Alex Rivera');
  const [address, setAddress] = useState('1600 Amphitheatre Pkwy, Mountain View, CA 94043');
  const [paymentMethod, setPaymentMethod] = useState<'google-pay' | 'card'>('google-pay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const finalSubtotal = Math.max(0, rawSubtotal - appliedDiscount);
  const tax = +(finalSubtotal * 0.08).toFixed(2);
  const shipping = 0; // Free for testing / express
  const total = +(finalSubtotal + tax + shipping).toFixed(2);

  const handleCompleteOrder = (method: string) => {
    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrderId = 'MV-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedOrderId);
      setIsProcessing(false);
      setOrderCompleted(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
      });

      // Dispatch order completion telemetry
      ga4.logPurchase(generatedOrderId, items, total, method);

      // Clear cart
      onClearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl bg-[#10121a] border border-white/10 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-[#141824] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="flex items-center space-x-1 p-1 bg-white/5 rounded-lg border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
              <span className="w-2 h-2 rounded-full bg-[#EA4335]"></span>
              <span className="w-2 h-2 rounded-full bg-[#FBBC05]"></span>
              <span className="w-2 h-2 rounded-full bg-[#34A853]"></span>
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-white">MERCHVERSE Express Checkout</h3>
              <p className="text-[10px] text-slate-400">Fast & Secure Encrypted Checkout</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {!orderCompleted ? (
            <div className="space-y-6">
              
              {/* Express Google Pay 1-Tap Hero Button */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#141d33] to-[#121626] border border-[#4285F4]/30 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#4285F4] font-semibold uppercase tracking-wider">
                    Recommended 1-Tap Checkout
                  </span>
                  <span className="text-slate-400 text-[11px] font-mono">Instant & Protected</span>
                </div>

                <button
                  onClick={() => handleCompleteOrder('google_pay_biometric')}
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-black hover:bg-slate-900 border border-white/20 rounded-2xl text-white font-medium text-sm transition-all flex items-center justify-center space-x-2 shadow-lg group"
                >
                  <span className="font-display font-bold">Buy with</span>
                  <div className="flex items-center space-x-0.5 font-bold font-display text-base">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                    <span className="text-white ml-1">Pay</span>
                  </div>
                </button>
              </div>

              <div className="relative text-center">
                <span className="bg-[#10121a] px-3 text-xs font-mono text-slate-500 uppercase">
                  Or Enter Shipping & Card Details
                </span>
                <div className="absolute inset-0 top-1/2 -z-10 border-t border-white/10" />
              </div>

              {/* One-Page Form Fields */}
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-slate-300 block mb-1">Creator Email (Order Updates & Digital NFC Key)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#4285F4]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#4285F4]"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Shipping Destination</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#4285F4]"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary & Pricing */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal ({items.length} items):</span>
                  <span className="text-white font-bold">${rawSubtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#34A853]">
                    <span>Creator Rewards Discount:</span>
                    <span>-${appliedDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Sales Tax (8%):</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Expedited Carbon-Neutral Shipping:</span>
                  <span className="text-[#34A853] font-bold">FREE ($0.00)</span>
                </div>
                <div className="flex justify-between text-sm font-sans font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Amount:</span>
                  <span className="font-mono text-base text-[#4285F4]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Complete Order Button */}
              <button
                onClick={() => handleCompleteOrder('credit_card_stripe')}
                disabled={isProcessing}
                className="w-full py-3.5 bg-[#4285F4] hover:bg-[#3367d6] text-white font-display font-semibold text-sm rounded-2xl transition-all shadow-xl shadow-[#4285F4]/30 flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {isProcessing ? 'Authorizing Cryptographic Payment...' : `Complete Order • $${total.toFixed(2)}`}
                </span>
              </button>

              <div className="text-center text-[11px] font-mono text-slate-500">
                256-Bit TLS Encryption • Free standard shipping & 30-day returns
              </div>
            </div>
          ) : (
            // Order Success State
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#34A853]/20 text-[#34A853] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#34A853]/20 text-[#34A853] border border-[#34A853]/30">
                  ORDER CONFIRMED & DISPATCH PREPARED
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white mt-2">
                  Welcome to the MERCHVERSE Guild.
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Order Confirmation: <span className="text-white font-bold">{orderId}</span>
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left text-xs space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Total Billed:</span>
                  <span className="font-mono font-bold text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Delivery To:</span>
                  <span className="text-white truncate max-w-[200px]">{address}</span>
                </div>
                <div className="flex justify-between text-[#34A853] font-mono pt-2 border-t border-white/5">
                  <span>Carbon Offset:</span>
                  <span>5.4kg CO2 Neutralized</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 bg-white text-black hover:bg-slate-200 font-semibold text-xs rounded-xl transition-all"
              >
                Return to MERCHVERSE Store
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
