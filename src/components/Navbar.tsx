import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAssistant?: () => void;
  onOpenQuiz?: () => void;
  onNavigateHome?: () => void;
  onSelectCategory?: (cat: string) => void;
  onScrollToSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAssistant,
  onOpenQuiz,
  onNavigateHome = () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  onSelectCategory = () => {},
  onScrollToSection = () => {},
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar - Apple / Nike style */}
      <div className="bg-[#0e111a] border-b border-white/[0.06] py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-xs text-slate-300 font-medium tracking-wide">
          <span className="text-white font-semibold">New Creator Collection Available Now</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">Free shipping on orders over $75</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0b0c10]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5'
            : 'bg-[#0b0c10]/80 backdrop-blur-md border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-10">
            <button
              onClick={onNavigateHome}
              className="flex items-center space-x-3 group focus:outline-none"
            >
              {/* Google 4-Color Accent Dot Cluster */}
              <div className="flex items-center space-x-1 p-1.5 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-white/20 transition-all">
                <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
                <span className="w-2 h-2 rounded-full bg-[#EA4335]"></span>
                <span className="w-2 h-2 rounded-full bg-[#FBBC05]"></span>
                <span className="w-2 h-2 rounded-full bg-[#34A853]"></span>
              </div>
              <div className="text-left">
                <span className="font-display font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                  MERCH<span className="text-[#4285F4]">VERSE</span>
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-slate-400 font-mono">
                  Lifestyle Lab
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links - Clean, Spacious, E-commerce Focused */}
            <div className="hidden lg:flex items-center space-x-1">
              <button
                onClick={() => onScrollToSection('hoodie-breakdown')}
                className="px-3.5 py-2 text-sm text-slate-300 hover:text-white rounded-xl hover:bg-white/[0.04] transition-all font-medium"
              >
                The Gen-2 Hoodie
              </button>
              <button
                onClick={() => onScrollToSection('featured-collections')}
                className="px-3.5 py-2 text-sm text-slate-300 hover:text-white rounded-xl hover:bg-white/[0.04] transition-all font-medium"
              >
                Collections
              </button>
              <button
                onClick={() => onScrollToSection('sustainability-story')}
                className="px-3.5 py-2 text-sm text-slate-300 hover:text-white rounded-xl hover:bg-white/[0.04] transition-all font-medium"
              >
                Sustainability
              </button>
              <button
                onClick={() => onScrollToSection('limited-drops')}
                className="px-3.5 py-2 text-sm text-slate-300 hover:text-white rounded-xl hover:bg-white/[0.04] transition-all font-medium"
              >
                Limited Drops
              </button>
              <button
                onClick={() => onScrollToSection('community-gallery')}
                className="px-3.5 py-2 text-sm text-slate-300 hover:text-white rounded-xl hover:bg-white/[0.04] transition-all font-medium"
              >
                Community
              </button>
            </div>
          </div>

          {/* Right Action Icons: Search, Wishlist, Bag, Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Bar Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-2.5 text-xs text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] px-3.5 py-2 rounded-xl border border-white/10 transition-all"
              title="Search products and collections"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] font-mono bg-black/40 text-slate-400 rounded border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-slate-400 hover:text-[#EA4335] rounded-xl hover:bg-white/[0.04] transition-all"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute 1 top-1.5 right-1.5 bg-[#EA4335] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag / Cart */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center space-x-2 bg-[#4285F4] hover:bg-[#3367d6] text-white px-4 py-2 rounded-xl font-medium text-sm transition-all shadow-lg shadow-[#4285F4]/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span className="bg-white text-[#4285F4] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/[0.04]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#10121a] border-b border-white/10 px-4 pt-3 pb-5 mt-3 space-y-1">
            <button
              onClick={() => {
                onScrollToSection('hoodie-breakdown');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-white/[0.05] rounded-lg"
            >
              The Gen-2 Hoodie
            </button>
            <button
              onClick={() => {
                onScrollToSection('featured-collections');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-white/[0.05] rounded-lg"
            >
              Collections
            </button>
            <button
              onClick={() => {
                onScrollToSection('sustainability-story');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-white/[0.05] rounded-lg"
            >
              Sustainability
            </button>
            <button
              onClick={() => {
                onScrollToSection('limited-drops');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-white/[0.05] rounded-lg"
            >
              Limited Drops
            </button>
            <button
              onClick={() => {
                onScrollToSection('community-gallery');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-white/[0.05] rounded-lg"
            >
              Community Lookbook
            </button>
            {onOpenQuiz && (
              <button
                onClick={() => {
                  onOpenQuiz();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-sm text-[#4285F4] hover:bg-white/[0.05] rounded-lg font-medium"
              >
                Style Fit Quiz
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};
