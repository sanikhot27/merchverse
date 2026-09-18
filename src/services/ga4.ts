import { GA4EventLog, Product, CartItem } from '../types';

type GA4Listener = (event: GA4EventLog) => void;

class GA4TelemetryService {
  private static instance: GA4TelemetryService;
  private eventHistory: GA4EventLog[] = [];
  private listeners: Set<GA4Listener> = new Set();

  private constructor() {
    // Initial page view
    this.track('page_view', {
      page_location: typeof window !== 'undefined' ? window.location.href : 'https://merchverse.google.com',
      page_path: '/',
      page_title: 'MERCHVERSE | Designed for Creators. Inspired by Innovation.',
      source: 'ga4_campaign_recycled_hoodie_revamp',
    });
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
        client_timestamp: Date.now(),
        user_platform: 'web_desktop_creator',
      },
    };

    this.eventHistory.unshift(event);
    if (this.eventHistory.length > 100) {
      this.eventHistory.pop();
    }

    // Log to standard developer console
    console.groupCollapsed(`%c[Analytics] %c${eventName}`, 'color: #4285F4; font-weight: bold;', 'color: #34A853; font-weight: bold;');
    console.table(parameters);
    console.groupEnd();

    // Notify UI listeners
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
    this.track('page_view', {
      page_path: pagePath || (typeof window !== 'undefined' ? window.location.pathname : '/'),
      page_title: pageTitle || 'MERCHVERSE | Designed for Creators.',
      engagement_time_msec: Math.floor(Math.random() * 4500) + 1200,
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
          is_recycled_hoodie_target: product.id === 'google-recycled-black-hoodie-gen2',
        },
      ],
      attribution_experiment: 'gen2_interactive_storytelling_v2',
    });
  }

  public logAddToCart(product: Product, quantity: number = 1, size: string, color: string): void {
    this.track('add_to_cart', {
      currency: 'USD',
      value: product.price * quantity,
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
      value: product.price * quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          quantity,
        },
      ],
    });
  }

  public logWishlistAdd(product: Product): void {
    this.track('wishlist_add', {
      currency: 'USD',
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.collectionName,
        },
      ],
    });
  }

  public logBeginCheckout(items: CartItem[], totalValue: number): void {
    this.track('begin_checkout', {
      currency: 'USD',
      value: totalValue,
      coupon: totalValue > 150 ? 'CREATOR_EXPEDITED' : undefined,
      items: items.map((item) => ({
        item_id: item.product.id,
        item_name: item.product.name,
        item_variant: `${item.selectedColor.name} / ${item.selectedSize}`,
        price: item.product.price,
        quantity: item.quantity,
      })),
      checkout_step: 1,
      payment_options_available: ['google_pay', 'apple_pay', 'credit_card', 'merchverse_points'],
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
      ai_assisted: true,
    });
  }

  public logSignUp(method: string = 'google_one_tap'): void {
    this.track('sign_up', {
      method,
      reward_points_granted: 250,
      creator_tier: 'Bronze Artisan',
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
