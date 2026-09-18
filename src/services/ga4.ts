import { GA4EventLog, Product, CartItem } from '../types';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = 'G-NF1RRXQNBB';

type GA4Listener = (event: GA4EventLog) => void;

class GA4TelemetryService {
  private static instance: GA4TelemetryService;
  private eventHistory: GA4EventLog[] = [];
  private listeners: Set<GA4Listener> = new Set();

  private constructor() {
    // Service initialized
  }

  public static getInstance(): GA4TelemetryService {
    if (!GA4TelemetryService.instance) {
      GA4TelemetryService.instance = new GA4TelemetryService();
    }
    return GA4TelemetryService.instance;
  }

  public subscribe(listener: (logs: GA4EventLog[], latestEvent?: GA4EventLog) => void): () => void {
    const wrappedListener = (evt: GA4EventLog) => {
      listener([...this.eventHistory], evt);
    };
    this.listeners.add(wrappedListener);
    return () => {
      this.listeners.delete(wrappedListener);
    };
  }

  public getHistory(): GA4EventLog[] {
    return [...this.eventHistory];
  }

  public getLogs(): GA4EventLog[] {
    return [...this.eventHistory];
  }

  public clearHistory(): void {
    this.eventHistory = [];
  }

  public clearLogs(): void {
    this.eventHistory = [];
  }

  private track(eventName: GA4EventLog['eventName'], parameters: Record<string, any>): GA4EventLog {
    const event: GA4EventLog = {
      id: 'evt_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36),
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 }),
      eventName,
      parameters: {
        ...parameters,
        send_to: GA_MEASUREMENT_ID,
      },
    };

    this.eventHistory.unshift(event);
    if (this.eventHistory.length > 100) {
      this.eventHistory.pop();
    }

    // Forward to official Google Analytics 4 (gtag.js)
    if (typeof window !== 'undefined') {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, parameters);
      } else if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: eventName,
          ...parameters,
        });
      }
    }

    // Log to standard developer console
    console.groupCollapsed(`%c[GA4 Analytics: ${GA_MEASUREMENT_ID}] %c${eventName}`, 'color: #4285F4; font-weight: bold;', 'color: #34A853; font-weight: bold;');
    console.table(parameters);
    console.groupEnd();

    // Notify UI listeners if any
    this.listeners.forEach((listener) => {
      try {
        listener(event);
      } catch (err) {
        console.error('Error in GA4 telemetry listener', err);
      }
    });

    return event;
  }

  // GA4 Standard Event Implementations
  public logPageView(pageTitle?: string, pagePath?: string): void {
    const title = pageTitle || (typeof document !== 'undefined' ? document.title : 'MERCHVERSE | Designed for Creators. Inspired by Innovation.');
    const path = pagePath || (typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/');
    const location = typeof window !== 'undefined' ? window.location.origin + path : 'https://merchverse.google.com' + path;

    if (typeof document !== 'undefined' && pageTitle) {
      document.title = pageTitle.includes('MERCHVERSE') ? pageTitle : `${pageTitle} | MERCHVERSE`;
    }

    // Inform GA4 config about route/page change in SPA
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_title: title,
        page_location: location,
        page_path: path,
      });
    }

    this.track('page_view', {
      page_title: title,
      page_location: location,
      page_path: path,
    });
  }

  public logViewItem(product: Product): void {
    this.track('view_item', {
      currency: 'USD',
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.collectionName,
          price: product.price,
          quantity: 1,
        },
      ],
    });
  }

  public logAddToCart(product: Product, quantity: number = 1, size: string, color: string): void {
    this.track('add_to_cart', {
      currency: 'USD',
      value: +(product.price * quantity).toFixed(2),
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.collectionName,
          item_variant: `${color} / ${size}`,
          price: product.price,
          quantity,
        },
      ],
    });
  }

  public logRemoveFromCart(product: Product, quantity: number = 1): void {
    this.track('remove_from_cart', {
      currency: 'USD',
      value: +(product.price * quantity).toFixed(2),
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.collectionName,
          price: product.price,
          quantity,
        },
      ],
    });
  }

  public logWishlistAdd(product: Product): void {
    this.track('add_to_wishlist', {
      currency: 'USD',
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.collectionName,
          price: product.price,
          quantity: 1,
        },
      ],
    });
  }

  public logBeginCheckout(items: CartItem[], totalValue: number): void {
    this.track('begin_checkout', {
      currency: 'USD',
      value: totalValue,
      items: items.map((item) => ({
        item_id: item.product.id,
        item_name: item.product.name,
        item_category: item.product.collectionName,
        item_variant: `${item.selectedColor.name} / ${item.selectedSize}`,
        price: item.product.price,
        quantity: item.quantity,
      })),
    });
  }

  public logPurchase(orderId: string, items: CartItem[], totalValue: number, paymentMethod: string): void {
    this.track('purchase', {
      transaction_id: orderId,
      currency: 'USD',
      value: totalValue,
      tax: +(totalValue * 0.08).toFixed(2),
      shipping: 0.0,
      payment_type: paymentMethod,
      items: items.map((item) => ({
        item_id: item.product.id,
        item_name: item.product.name,
        item_category: item.product.collectionName,
        item_variant: `${item.selectedColor.name} / ${item.selectedSize}`,
        price: item.product.price,
        quantity: item.quantity,
      })),
    });
  }

  public logSearch(searchTerm: string, resultsCount: number): void {
    this.track('search', {
      search_term: searchTerm,
      results_count: resultsCount,
    });
  }

  public logSignUp(method: string = 'google_one_tap'): void {
    this.track('sign_up', {
      method,
    });
  }

  public logLogin(method: string = 'google_identity'): void {
    this.track('login', {
      method,
    });
  }

  public logNewsletterSignup(email: string): void {
    this.track('newsletter_signup', {
      email_domain: email.split('@')[1] || 'creator.io',
      source: 'footer_vip_drops',
    });
  }
}

export const ga4 = GA4TelemetryService.getInstance();
