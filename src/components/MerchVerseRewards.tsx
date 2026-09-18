import React, { useState } from 'react';
import { Award, Zap, Gift, Check, Sparkles, ArrowRight } from 'lucide-react';

interface MerchVerseRewardsProps {
  onApplyVoucher?: (code: string, discountAmount: number) => void;
}

export const MerchVerseRewards: React.FC<MerchVerseRewardsProps> = ({ onApplyVoucher }) => {
  const [points, setPoints] = useState<number>(850);
  const [claimedCode, setClaimedCode] = useState<string | null>(null);

  const tiers = [
    { name: 'Bronze Artisan', threshold: 0, perk: 'Complimentary stickers & NFC verification', active: true },
    { name: 'Silver Engineer', threshold: 500, perk: '10% recurring credit & VIP drop access', active: true },
    { name: 'Gold Creator', threshold: 1500, perk: 'Free express shipping & annual Google I/O jacket', active: false },
    { name: 'Titan Developer', threshold: 3000, perk: 'Custom 1-of-1 bespoke hardware sleeve', active: false },
  ];

  const vouchers = [
    { id: 'v10', code: 'CREATOR10', discount: 10, cost: 300, label: '$10 Off Any Artifact' },
    { id: 'v25', code: 'PRODIGY25', discount: 25, cost: 700, label: '$25 Off Over $100' },
    { id: 'v50', code: 'TITAN50', discount: 50, cost: 1400, label: '$50 Off Over $200' },
  ];

  const handleClaim = (v: typeof vouchers[0]) => {
    if (points >= v.cost) {
      setPoints(points - v.cost);
      setClaimedCode(v.code);
      if (onApplyVoucher) {
        onApplyVoucher(v.code, v.discount);
      }
      setTimeout(() => setClaimedCode(null), 4000);
    }
  };

  return (
    <section id="rewards-section" className="py-20 bg-[#0b0d14] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase text-[#FBBC05] tracking-widest">
              <Award className="w-3.5 h-3.5" />
              <span>COMMUNITY LOYALTY & REWARDS PROTOCOL</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-1">
              MerchVerse Creator Tier Program
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Earn points with every purchase, open-source PR contribution, and community lookbook submission. 
              Redeem for limited physicals and checkout vouchers.
            </p>
          </div>

          {/* Current Balance Pill */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-[#FBBC05]/20 text-[#FBBC05]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Your Creator Balance</div>
              <div className="text-lg font-bold font-mono text-white flex items-center gap-1">
                <span>{points}</span>
                <span className="text-xs text-[#FBBC05]">PTS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tiers Visual Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`p-5 rounded-3xl border transition-all ${
                t.active
                  ? 'bg-[#141826] border-[#4285F4]/40 shadow-lg shadow-[#4285F4]/5'
                  : 'bg-white/[0.02] border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className={t.active ? 'text-[#4285F4] font-bold' : 'text-slate-500'}>
                  {t.threshold} PTS
                </span>
                {t.active && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#34A853]/20 text-[#34A853] font-bold">
                    UNLOCKED
                  </span>
                )}
              </div>
              <h4 className="font-bold text-white text-base">{t.name}</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{t.perk}</p>
            </div>
          ))}
        </div>

        {/* Redeemable Vouchers */}
        <div className="p-6 rounded-3xl bg-[#12141c] border border-white/10 space-y-4">
          <h4 className="text-sm font-mono uppercase text-slate-300 font-semibold flex items-center gap-2">
            <Gift className="w-4 h-4 text-[#EA4335]" />
            <span>Instant Voucher Exchange (One-Click Cart Redemption)</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {vouchers.map((v) => {
              const canAfford = points >= v.cost;
              const isCurrentClaimed = claimedCode === v.code;
              return (
                <div
                  key={v.id}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-bold text-white text-sm">{v.label}</div>
                    <div className="text-xs font-mono text-slate-400 mt-0.5">Costs {v.cost} Points</div>
                  </div>

                  <button
                    onClick={() => handleClaim(v)}
                    disabled={!canAfford}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      isCurrentClaimed
                        ? 'bg-[#34A853] text-white'
                        : canAfford
                        ? 'bg-[#FBBC05] hover:bg-[#e5ac05] text-black shadow-md shadow-[#FBBC05]/20'
                        : 'bg-white/5 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {isCurrentClaimed ? 'Applied!' : canAfford ? 'Redeem' : 'Need Points'}
                  </button>
                </div>
              );
            })}
          </div>

          {claimedCode && (
            <div className="p-3 rounded-xl bg-[#34A853]/15 border border-[#34A853]/30 text-xs text-[#34A853] font-mono text-center">
              Voucher code <strong>{claimedCode}</strong> applied to your active checkout session!
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
