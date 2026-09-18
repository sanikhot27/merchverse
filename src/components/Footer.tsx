import React, { useState } from 'react';
import { ShieldCheck, Send, Check } from 'lucide-react';
import { ga4 } from '../services/ga4';

interface FooterProps {
  onOpenAssistant?: () => void;
  onOpenQuiz?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAssistant,
  onOpenQuiz,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      ga4.logNewsletterSignup(email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#08090d] border-t border-white/10 text-slate-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter & Brand Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12 border-b border-white/5">
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 p-1 bg-white/5 rounded-lg border border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]"></span>
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">MERCHVERSE</span>
            </div>
            <p className="text-slate-400 text-sm max-w-md">
              Designed for Creators. Inspired by Innovation. Premium lifestyle apparel and hardware companions.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="text-white font-medium text-xs">
                Subscribe for private drop allocations & new season arrivals
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#4285F4]"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#4285F4] hover:bg-[#3367d6] text-white font-semibold rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-lg shadow-[#4285F4]/20"
                >
                  <span>{subscribed ? 'Subscribed!' : 'Subscribe'}</span>
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-[#34A853] font-mono">
                  Welcome to MERCHVERSE. Check your inbox for your 10% welcome voucher.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider">
              Collections
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#hero" className="hover:text-white transition-colors">The Gen-2 Recycled Hoodie</a></li>
              <li><a href="#featured-collections" className="hover:text-white transition-colors">Nano Banana Graphic Tee</a></li>
              <li><a href="#limited-drops" className="hover:text-white transition-colors">Vertex AI Flight Bomber</a></li>
              <li><a href="#featured-collections" className="hover:text-white transition-colors">DeepMind Structural Cap</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider">
              Customer Care
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#shipping" className="hover:text-white transition-colors">Shipping & Delivery</a></li>
              <li><a href="#returns" className="hover:text-white transition-colors">30-Day Returns & Exchanges</a></li>
              <li><a href="#sizing" className="hover:text-white transition-colors">Creator Fit Guide</a></li>
              <li><a href="#track" className="hover:text-white transition-colors">Order Tracking</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider">
              About MERCHVERSE
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#sustainability-story" className="hover:text-white transition-colors">Circular Supply & Materials</a></li>
              <li><a href="#story" className="hover:text-white transition-colors">Mountain View Design Lab</a></li>
              {onOpenQuiz && (
                <li>
                  <button onClick={onOpenQuiz} className="hover:text-white transition-colors text-left">
                    Creator Style Quiz
                  </button>
                </li>
              )}
              {onOpenAssistant && (
                <li>
                  <button onClick={onOpenAssistant} className="hover:text-white transition-colors text-left">
                    AI Stylist Concierge
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider">
              Our Commitments
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                <span>30-Day Hassle-Free Returns</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                <span>100% Certified Circularity</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                <span>Zero Flimsy Promotional Blends</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} MERCHVERSE. All rights reserved. Designed for Creators.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#supply" className="hover:text-slate-400 transition-colors">Supply Chain Disclosure</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
