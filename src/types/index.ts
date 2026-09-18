export type Category = 
  | 'all'
  | 'creator-series'
  | 'ai-collection'
  | 'innovation'
  | 'sustainable'
  | 'workspace'
  | 'limited-drops';

export interface ProductColor {
  name: string;
  hex: string;
  bgClass: string;
}

export interface ProductReview {
  id: string;
  author: string;
  role: string;
  company?: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  creatorBadge?: string;
}

export interface FabricLayer {
  title: string;
  percentage: string;
  description: string;
  iconName: string;
}

export interface SustainabilityMetrics {
  bottlesRecycled: number;
  co2OffsetKg: number;
  waterSavedLiters: number;
  recycledPercentage: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  collection: Category;
  collectionName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  isHeroFixProduct?: boolean; // For Google Recycled Black Hoodie
  isBenchmarkProduct?: boolean; // For Nano Banana Tee
  isLimitedDrop?: boolean;
  dropRemaining?: number;
  dropTotal?: number;
  dropDate?: string;
  badge?: string;
  colors: ProductColor[];
  sizes: string[];
  images: string[];
  rotationalAngles?: string[]; // 360 preview angles
  shortDescription: string;
  longDescription: string;
  story: string;
  fabricLayers: FabricLayer[];
  sustainability: SustainabilityMetrics;
  features: string[];
  techSpecs: { label: string; value: string }[];
  matchScoreDefault: number;
  idealFor: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface GA4EventLog {
  id: string;
  timestamp: string;
  eventName: 
    | 'page_view'
    | 'view_item'
    | 'add_to_cart'
    | 'remove_from_cart'
    | 'wishlist_add'
    | 'begin_checkout'
    | 'purchase'
    | 'search'
    | 'sign_up'
    | 'login'
    | 'newsletter_signup';
  parameters: Record<string, any>;
}

export interface CreatorStory {
  id: string;
  name: string;
  handle: string;
  role: string;
  location: string;
  avatar: string;
  image: string;
  quote: string;
  itemWorn: string;
  productId: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    archetype: string;
    icon: string;
  }[];
}

export interface QuizResult {
  archetype: string;
  title: string;
  description: string;
  color: string;
  recommendedProductIds: string[];
}
