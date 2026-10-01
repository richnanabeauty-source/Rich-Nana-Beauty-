import { useState, useEffect } from 'react';
import { 
  ServiceItem, PortfolioItem, ReviewItem, PromotionItem, InteriorItem, 
  BookingRecord, SiteSection, SeoSettings, AnalyticsData, BrandingSettings, 
  ThemeSettings, MediaAsset, GoogleBusinessSettings, GoogleMapsSettings, ActivityLogItem 
} from '../types';
import { INITIAL_SERVICES, INITIAL_PORTFOLIO, INITIAL_REVIEWS, INITIAL_PROMOTIONS, INITIAL_INTERIOR, INITIAL_SECTIONS, DEFAULT_SEO } from '../data/seedData';
import { DEFAULT_GOOGLE_MAPS_SETTINGS } from '../utils/googleMaps';
import { fetchBrandingFromFirestore } from '../utils/firebase';

const STORAGE_KEYS = {
  SERVICES: 'rn_services_v2',
  PORTFOLIO: 'rn_portfolio_v2',
  REVIEWS: 'rn_reviews_v2',
  PROMOTIONS: 'rn_promotions_v2',
  INTERIOR: 'rn_interior_v2',
  BOOKINGS: 'rn_bookings_v2',
  SECTIONS: 'rn_sections_v2',
  SEO: 'rn_seo_v2',
  ANALYTICS: 'rn_analytics_v2',
  BRANDING: 'rn_branding_v2',
  THEME: 'rn_theme_v2',
  MEDIA: 'rn_media_v2',
  GOOGLE: 'rn_google_v2',
  GOOGLE_MAPS: 'rn_google_maps_v2',
  LOGS: 'rn_logs_v2',
  OWNER_AUTH: 'rn_owner_auth_v2'
};

export function useRichNanaStore() {
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
    return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS.map(r => ({ ...r, source: 'manual' as const }));
  });

  const [promotions, setPromotions] = useState<PromotionItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROMOTIONS);
    return saved ? JSON.parse(saved) : INITIAL_PROMOTIONS.map(p => ({ ...p, status: 'active' as const }));
  });

  const [interior, setInterior] = useState<InteriorItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INTERIOR);
    return saved ? JSON.parse(saved) : INITIAL_INTERIOR;
  });

  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return saved ? JSON.parse(saved) : [
      { id: 'b-1', clientName: 'Dewi Lestari', clientPhone: '+62 812-3456-7890', clientEmail: 'dewi@example.com', date: '2026-10-02', time: '14:00', status: 'confirmed', createdAt: '2026-10-01', serviceName: 'Gel Polish & Russian Manicure' },
      { id: 'b-2', clientName: 'Siti Rahma', clientPhone: '+62 813-9876-5432', clientEmail: 'siti@example.com', date: '2026-10-03', time: '11:30', status: 'pending', createdAt: '2026-10-01', serviceName: 'Cat Eye Eyelash Extension' }
    ];
  });

  const [sections, setSections] = useState<SiteSection[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SECTIONS);
    return saved ? JSON.parse(saved) : INITIAL_SECTIONS;
  });

  const [seo, setSeo] = useState<SeoSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SEO);
    return saved ? JSON.parse(saved) : DEFAULT_SEO;
  });

  const [branding, setBranding] = useState<BrandingSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BRANDING);
    return saved ? JSON.parse(saved) : {
      businessName: 'Rich Nana Beauty',
      tagline: 'Mave-Level Premium Beauty Studio',
      logoUrl: '',
      faviconUrl: '',
      whatsappNumber: '6281314188522',
      instagramHandle: 'rich_nana_beauty',
      address: 'Pulo Gadung, Jakarta Timur, DKI Jakarta',
      googleMapsUrl: 'https://maps.google.com/?q=Pulo+Gadung+Jakarta+Timur',
      googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.9056!3d-6.1901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTEnMjQuNCJTIDEwNsKwNTQnMjAuMiJF!5e0!3m2!1sen!2sid!4v1650000000000!5m2!1sen!2sid',
      googlePlaceId: 'ChIJ-verified-rich-nana-pulo-gadung',
      openingHours: 'Monday — Sunday: 10:00 AM – 20:00 PM'
    };
  });

  // Fetch branding from Firestore on mount
  useEffect(() => {
    fetchBrandingFromFirestore().then((remoteBranding) => {
      if (remoteBranding) {
        setBranding(remoteBranding);
      }
    }).catch(err => {
      console.log('Using local fallback branding:', err);
    });
  }, []);

  const [googleMaps, setGoogleMaps] = useState<GoogleMapsSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GOOGLE_MAPS);
    return saved ? JSON.parse(saved) : DEFAULT_GOOGLE_MAPS_SETTINGS;
  });

  const [theme, setTheme] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    return saved ? JSON.parse(saved) : {
      primaryColor: '#C5A059',
      accentColor: '#E2C075',
      backgroundColor: '#16070B',
      cardBackground: '#220A10',
      headingFont: 'Cormorant Garamond',
      bodyFont: 'Plus Jakarta Sans',
      containerWidth: '1280px',
      sectionSpacing: '112px'
    };
  });

  const [media, setMedia] = useState<MediaAsset[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MEDIA);
    return saved ? JSON.parse(saved) : [
      { id: 'm-1', name: 'rich-nana-hero-studio.jpg', url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1000', category: 'Studio', usage: 'Hero Banner', size: '2.4 MB', uploadedAt: '2026-10-01' },
      { id: 'm-2', name: 'gel-polish-manicure.jpg', url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=1000', category: 'Nails', usage: 'Services Grid', size: '1.8 MB', uploadedAt: '2026-10-01' }
    ];
  });

  const [googleBusiness, setGoogleBusiness] = useState<GoogleBusinessSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GOOGLE);
    return saved ? JSON.parse(saved) : {
      placeId: 'ChIJ-verified-rich-nana-pulo-gadung',
      rating: 5.0,
      reviewCount: 148,
      lastSynced: '2026-10-01 08:00',
      status: 'connected'
    };
  });

  const [logs, setLogs] = useState<ActivityLogItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
    return saved ? JSON.parse(saved) : [
      { id: 'l-1', user: 'Owner', action: 'System initialized successfully', module: 'System', timestamp: '2026-10-01 08:00' }
    ];
  });

  const [analytics, setAnalytics] = useState<AnalyticsData>({
    visitors: 1420,
    pageViews: 3890,
    serviceViews: 920,
    portfolioViews: 740,
    bookingClicks: 184,
    whatsappClicks: 310,
    instagramClicks: 450
  });

  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.OWNER_AUTH) === 'true';
  });

  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolio)); }, [portfolio]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PROMOTIONS, JSON.stringify(promotions)); }, [promotions]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.INTERIOR, JSON.stringify(interior)); }, [interior]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SECTIONS, JSON.stringify(sections)); }, [sections]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(seo)); }, [seo]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.BRANDING, JSON.stringify(branding)); }, [branding]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.GOOGLE_MAPS, JSON.stringify(googleMaps)); }, [googleMaps]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(theme)); }, [theme]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(media)); }, [media]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.GOOGLE, JSON.stringify(googleBusiness)); }, [googleBusiness]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs)); }, [logs]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.OWNER_AUTH, String(isOwnerLoggedIn)); }, [isOwnerLoggedIn]);

  const logAction = (action: string, module: string) => {
    const newLog: ActivityLogItem = {
      id: `l-${Date.now()}`,
      user: 'Owner',
      action,
      module,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const trackEvent = (type: keyof AnalyticsData) => {
    setAnalytics(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  const addBooking = (booking: Omit<BookingRecord, 'id' | 'createdAt' | 'status'>) => {
    const newRecord: BookingRecord = {
      ...booking,
      id: `b-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBookings(prev => [newRecord, ...prev]);
    trackEvent('bookingClicks');
    logAction(`New booking created for ${booking.serviceName}`, 'Bookings');
    return newRecord;
  };

  return {
    services, setServices,
    portfolio, setPortfolio,
    reviews, setReviews,
    promotions, setPromotions,
    interior, setInterior,
    bookings, setBookings,
    sections, setSections,
    seo, setSeo,
    branding, setBranding,
    googleMaps, setGoogleMaps,
    theme, setTheme,
    media, setMedia,
    googleBusiness, setGoogleBusiness,
    logs, logAction,
    analytics, trackEvent,
    isOwnerLoggedIn, setIsOwnerLoggedIn,
    addBooking
  };
}
