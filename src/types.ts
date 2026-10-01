export interface ServiceItem {
  id: string;
  category: 'nail' | 'eyelash' | 'sulam_alis' | 'sulam_bibir' | 'hair';
  name: string;
  duration: string;
  price: string;
  description: string;
  image: string;
  featured?: boolean;
  includes?: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'nails' | 'gel' | 'nail_art' | 'lashes' | 'hair' | 'brows_lips';
  image: string;
  serviceId?: string;
  description?: string;
  featured?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  service: string;
  comment: string;
  date: string;
  avatar?: string;
  verified: boolean;
  source: 'google' | 'manual';
}

export interface PromotionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  image: string;
  badge: string;
  active: boolean;
  status: 'draft' | 'scheduled' | 'active' | 'expired' | 'archived';
  startDate?: string;
  endDate?: string;
}

export interface InteriorItem {
  id: string;
  title: string;
  area: 'reception' | 'nail_station' | 'lash_area' | 'treatment_area' | 'waiting_area' | 'details';
  image: string;
  description: string;
}

export interface BookingRecord {
  id: string;
  serviceName: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface SiteSection {
  id: string;
  name: string;
  type: 'hero' | 'brand_intro' | 'services' | 'standard' | 'studio' | 'reviews' | 'promotion' | 'instagram' | 'location' | 'cta' | 'faq';
  visible: boolean;
  order: number;
  title?: string;
  subtitle?: string;
}

export interface BrandingSettings {
  businessName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  whatsappNumber: string;
  instagramHandle: string;
  address: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  googlePlaceId: string;
  openingHours: string;
}

export interface ThemeSettings {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  cardBackground: string;
  headingFont: string;
  bodyFont: string;
  containerWidth: string;
  sectionSpacing: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  category: string;
  usage: string;
  size: string;
  uploadedAt: string;
}

export interface GoogleBusinessSettings {
  placeId: string;
  rating: number;
  reviewCount: number;
  lastSynced: string;
  status: 'connected' | 'unconfigured' | 'error';
}

export interface GoogleMapsSettings {
  enabled: boolean;
  apiKey: string;
  businessName: string;
  address: string;
  googleMapsUrl: string;
  embedUrl: string;
  latitude: string;
  longitude: string;
  zoom: number;
  mapMode: 'place' | 'view' | 'directions';
  connectionStatus: 'CONNECTED' | 'NOT CONNECTED' | 'INVALID API KEY' | 'API NOT ENABLED' | 'BILLING NOT ENABLED' | 'DOMAIN RESTRICTION ERROR' | 'LOCATION NOT FOUND';
}

export interface ActivityLogItem {
  id: string;
  user: string;
  action: string;
  module: string;
  timestamp: string;
}

export interface AnalyticsData {
  visitors: number;
  pageViews: number;
  serviceViews: number;
  portfolioViews: number;
  bookingClicks: number;
  whatsappClicks: number;
  instagramClicks: number;
}

export interface SeoSettings {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonical: string;
}
