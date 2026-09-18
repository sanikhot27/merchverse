import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { ga4 } from './services/ga4';

// Component Imports
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyThisHoodieMatters } from './components/WhyThisHoodieMatters';
import { FeaturedCollections } from './components/FeaturedCollections';
import { ProductDetailPage } from './components/ProductDetailPage';
import { SustainabilityStory } from './components/SustainabilityStory';
import { LimitedDrops } from './components/LimitedDrops';
import { MerchVerseRewards } from './components/MerchVerseRewards';
import { CreatorCommunity } from './components/CreatorCommunity';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AIShoppingAssistant } from './components/AIShoppingAssistant';
import { CreatorStyleQuizModal } from './components/CreatorStyleQuizModal';
import { AIGiftFinderModal } from './components/AIGiftFinderModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<'home' | 'product-detail'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [userArchetype, setUserArchetype] = useState<string>('systems-architect');

  // Modals State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isGiftFinderOpen, setIsGiftFinderOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Automatic Analytics pageview on initial mount and route restoration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/product/')) {
        const slug = path.replace('/product/', '');
        const found = PRODUCTS.find((p) => p.slug === slug || p.id === slug);
        if (found) {
          setSelectedProduct(found);
          setCurrentView('product-detail');
          ga4.logPageView(`${found.name} | MERCHVERSE`, `/product/${found.slug}`);
          ga4.logViewItem(found);
          return;
        }
      }
    }
    ga4.logPageView('MERCHVERSE | Designed for Creators. Inspired by Innovation.', '/');
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.view === 'product-detail' && e.state.slug) {
        const found = PRODUCTS.find((p) => p.slug === e.state.slug || p.id === e.state.slug);
        if (found) {
          setSelectedProduct(found);
          setCurrentView('product-detail');
          ga4.logPageView(`${found.name} | MERCHVERSE`, `/product/${found.slug}`);
          return;
        }
      }
      setCurrentView('home');
      ga4.logPageView('MERCHVERSE | Designed for Creators. Inspired by Innovation.', '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Product Selection Handler
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof window !== 'undefined') {
      window.history.pushState(
        { view: 'product-detail', slug: product.slug },
        '',
        `/product/${product.slug}`
      );
    }
    ga4.logPageView(`${product.name} | MERCHVERSE`, `/product/${product.slug}`);
    ga4.logViewItem(product);
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof window !== 'undefined') {
      window.history.pushState({ view: 'home' }, '', '/');
    }
    ga4.logPageView('MERCHVERSE | Designed for Creators. Inspired by Innovation.', '/');
  };

  // Add to Cart Handler
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    size?: string,
    colorName?: string
  ) => {
    const chosenSize = size || product.sizes[0] || 'M';
    const chosenColor = colorName
      ? product.colors.find((c) => c.name === colorName) || product.colors[0]
      : product.colors[0];

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === chosenSize &&
          item.selectedColor.name === chosenColor.name
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedSize: chosenSize,
            selectedColor: chosenColor,
          },
        ];
      }
    });

    ga4.logAddToCart(product, quantity, chosenSize, chosenColor.name);
    showToast(`Added "${product.name}" (${chosenSize}) to your bag`);
  };

  // Remove from Cart
  const handleRemoveFromCart = (index: number) => {
    const item = cartItems[index];
    if (item) {
      ga4.logRemoveFromCart(item.product, item.quantity);
      setCartItems((prev) => prev.filter((_, i) => i !== index));
      showToast(`Removed "${item.product.name}" from bag`);
    }
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  // Wishlist Toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`Removed "${product.name}" from wishlist`);
      } else {
        next.add(product.id);
        ga4.logWishlistAdd(product);
        showToast(`Saved "${product.name}" to wishlist`);
      }
      return next;
    });
  };

  // Begin Checkout
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    ga4.logBeginCheckout(cartItems, total);
  };

  // Clear Cart after purchase
  const handleClearCart = () => {
    setCartItems([]);
    setAppliedDiscount(0);
  };

  // Apply Rewards Voucher
  const handleApplyVoucher = (code: string, discount: number) => {
    setAppliedDiscount(discount);
    showToast(`Applied voucher ${code} (-$${discount}) to your cart!`);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const hoodieProduct = PRODUCTS.find((p) => p.isHeroFixProduct) || PRODUCTS[0];
  const dropProduct = PRODUCTS.find((p) => p.collection === 'limited-drops') || PRODUCTS[4];

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex flex-col font-sans selection:bg-[#4285F4] selection:text-white">
      
      {/* Clean Premium Navigation */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.size}
        onNavigateHome={handleNavigateHome}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          if (wishlistIds.size > 0) {
            showToast(`${wishlistIds.size} saved items in your wishlist`);
          } else {
            showToast("Your wishlist is empty. Tap the heart on any product to save it.");
          }
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onScrollToSection={(id) => {
          if (currentView !== 'home') {
            setCurrentView('home');
          }
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
          const sectionTitle = id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
          ga4.logPageView(`MERCHVERSE | ${sectionTitle}`, `/#${id}`);
        }}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentView === 'home' ? (
          <>
            {/* 1. Hero with 360 interactive product preview */}
            <Hero
              hoodieProduct={hoodieProduct}
              onSelectProduct={handleSelectProduct}
              onOpenQuiz={() => setIsQuizOpen(true)}
              onAddToCart={handleAddToCart}
            />

            {/* 2. Product Spotlight & Engineering Breakdown */}
            <WhyThisHoodieMatters
              hoodieProduct={hoodieProduct}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
            />

            {/* 3. Featured Collections Catalog with filter & sorting */}
            <FeaturedCollections
              products={PRODUCTS}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              userArchetype={userArchetype}
            />

            {/* 4. Limited Drops allocation with live countdown */}
            <LimitedDrops
              dropProduct={dropProduct}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
            />

            {/* 5. Sustainability Story (32 bottles, 5.4kg CO2) */}
            <SustainabilityStory
              onSelectHoodie={() => handleSelectProduct(hoodieProduct)}
            />

            {/* 6. Creator Loyalty Tier Program & Voucher Exchange */}
            <MerchVerseRewards
              onApplyVoucher={handleApplyVoucher}
            />

            {/* 7. Creator Community & Verified Lookbook */}
            <CreatorCommunity
              onSelectProduct={handleSelectProduct}
            />
          </>
        ) : (
          /* Master Product Detail Page View */
          <ProductDetailPage
            product={selectedProduct}
            onBack={handleNavigateHome}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.has(selectedProduct.id)}
            onSelectProduct={handleSelectProduct}
          />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Floating AI Stylist Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="p-3.5 rounded-full bg-gradient-to-tr from-[#4285F4] to-[#EA4335] text-white shadow-xl shadow-[#4285F4]/30 hover:scale-110 transition-all flex items-center justify-center group"
          title="Open AI Creator Stylist"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-2xl bg-[#141826] border border-[#4285F4]/40 text-white text-xs shadow-2xl flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#34A853]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
        appliedDiscount={appliedDiscount}
        onAddUpsell={(prod) => handleAddToCart(prod, 1)}
      />

      {/* One-Page Express Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedDiscount={appliedDiscount}
        onClearCart={handleClearCart}
      />

      {/* AI Creator Stylist Assistant Drawer */}
      <AIShoppingAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onSelectProduct={handleSelectProduct}
        onAddToCart={handleAddToCart}
      />

      {/* Creator Style Quiz Modal */}
      <CreatorStyleQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectProduct={handleSelectProduct}
        onAddToCart={handleAddToCart}
        onSaveArchetype={(archetype) => {
          setUserArchetype(archetype);
          showToast(`Personalized your store view for ${archetype}!`);
        }}
      />

      {/* AI Gift Finder Modal */}
      <AIGiftFinderModal
        isOpen={isGiftFinderOpen}
        onClose={() => setIsGiftFinderOpen(false)}
        onSelectProduct={handleSelectProduct}
        onAddToCart={handleAddToCart}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        onTrackSearch={(query, count) => ga4.logSearch(query, count)}
      />

    </div>
  );
}
