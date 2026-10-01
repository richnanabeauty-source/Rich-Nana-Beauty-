import { GoogleMapsSettings } from '../types';

export const DEFAULT_GOOGLE_MAPS_SETTINGS: GoogleMapsSettings = {
  enabled: true,
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  businessName: 'Rich Nana Beauty Studio',
  address: 'Pulo Gadung, Jakarta Timur, DKI Jakarta',
  googleMapsUrl: 'https://maps.google.com/?q=Pulo+Gadung+Jakarta+Timur',
  embedUrl: '',
  latitude: '-6.1901',
  longitude: '106.9056',
  zoom: 15,
  mapMode: 'place',
  connectionStatus: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? 'CONNECTED' : 'NOT CONNECTED'
};

export const buildGoogleMapsEmbedUrl = (settings: GoogleMapsSettings): string => {
  const apiKey = settings.apiKey || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const query = encodeURIComponent(`${settings.businessName}, ${settings.address}`);
  const mode = settings.mapMode || 'place';
  
  // Official Google Maps Embed API v1 endpoint
  return `https://www.google.com/maps/embed/v1/${mode}?key=${apiKey}&q=${query}&zoom=${settings.zoom || 15}`;
};
