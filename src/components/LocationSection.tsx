import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, AlertTriangle } from 'lucide-react';
import { BrandingSettings, GoogleMapsSettings } from '../types';
import { buildGoogleMapsEmbedUrl } from '../utils/googleMaps';

interface LocationSectionProps {
  branding: BrandingSettings;
  googleMaps: GoogleMapsSettings;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ branding, googleMaps }) => {
  const isKeyMissing = !googleMaps.apiKey || googleMaps.apiKey.trim() === '';
  const isKeyInvalid = googleMaps.connectionStatus === 'INVALID API KEY';
  const isApiNotEnabled = googleMaps.connectionStatus === 'API NOT ENABLED';
  const isBillingMissing = googleMaps.connectionStatus === 'BILLING NOT ENABLED';
  const isDomainError = googleMaps.connectionStatus === 'DOMAIN RESTRICTION ERROR';

  return (
    <section id="location" className="py-28 bg-[#16070B] relative border-t border-[#421620]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Info Column */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-3">
                Visit Our Sanctuary
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl text-[#F3EFEA] mb-4">
                {googleMaps.businessName || branding.businessName}
              </h2>
              <p className="text-[#F3EFEA]/70 text-sm font-light leading-relaxed">
                Conveniently located in {googleMaps.address || branding.address}, our luxury studio is your private oasis away from the bustling city rhythm.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-[#421620]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-editorial text-xl text-[#F3EFEA]">Studio Address</h4>
                  <p className="text-xs text-[#F3EFEA]/70 mt-1 leading-relaxed">
                    {googleMaps.address || branding.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-editorial text-xl text-[#F3EFEA]">Operating Hours</h4>
                  <p className="text-xs text-[#F3EFEA]/70 mt-1 leading-relaxed">
                    {branding.openingHours}<br />
                    Appointments & Walk-ins welcome
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] shrink-0 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-editorial text-xl text-[#F3EFEA]">Direct Concierge</h4>
                  <p className="text-xs text-[#C5A059] mt-1 font-semibold tracking-wider">
                    {branding.whatsappNumber}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${branding.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C5A059] hover:bg-[#b08b47] text-[#16070B] font-semibold text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all shadow-lg flex items-center gap-2"
              >
                <span>WhatsApp Concierge</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={googleMaps.googleMapsUrl || branding.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#F3EFEA]/20 hover:border-[#C5A059] text-[#F3EFEA] hover:text-[#C5A059] font-medium text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all flex items-center gap-2"
              >
                <span>Buka di Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Map / Embed Column */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] bg-[#220A10] border border-[#421620] overflow-hidden shadow-2xl flex flex-col justify-center">
              
              {isKeyMissing ? (
                <div className="p-8 text-center space-y-3 bg-[#16070B] h-full flex flex-col items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-yellow-400 mx-auto" />
                  <p className="text-xs text-[#F3EFEA]/80 font-medium leading-relaxed">
                    Google Maps belum dikonfigurasi. Tambahkan VITE_GOOGLE_MAPS_API_KEY pada environment.
                  </p>
                </div>
              ) : isKeyInvalid ? (
                <div className="p-8 text-center space-y-3 bg-[#16070B] h-full flex flex-col items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-red-400 mx-auto" />
                  <p className="text-xs text-red-400 font-medium leading-relaxed">
                    Google Maps API Key tidak valid.
                  </p>
                </div>
              ) : isApiNotEnabled ? (
                <div className="p-8 text-center space-y-3 bg-[#16070B] h-full flex flex-col items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-red-400 mx-auto" />
                  <p className="text-xs text-red-400 font-medium leading-relaxed">
                    Maps Embed API belum diaktifkan pada Google Cloud Project.
                  </p>
                </div>
              ) : isBillingMissing ? (
                <div className="p-8 text-center space-y-3 bg-[#16070B] h-full flex flex-col items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-red-400 mx-auto" />
                  <p className="text-xs text-red-400 font-medium leading-relaxed">
                    Google Cloud Billing belum aktif.
                  </p>
                </div>
              ) : isDomainError ? (
                <div className="p-8 text-center space-y-3 bg-[#16070B] h-full flex flex-col items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-orange-400 mx-auto" />
                  <p className="text-xs text-orange-400 font-medium leading-relaxed">
                    API Key dibatasi oleh domain/referrer. Periksa Application Restrictions.
                  </p>
                </div>
              ) : (
                <iframe
                  src={buildGoogleMapsEmbedUrl(googleMaps)}
                  title={googleMaps.businessName}
                  className="w-full h-full border-0 filter brightness-90 contrast-110"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              )}
              
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-[#16070B]/90 backdrop-blur-md border border-[#C5A059]/30 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059]">{googleMaps.businessName}</div>
                  <div className="font-editorial text-xl text-[#F3EFEA]">{googleMaps.address.split(',')[0]}</div>
                </div>
                <a
                  href={googleMaps.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C5A059] text-[#16070B] px-4 py-2 text-xs uppercase tracking-wider font-semibold"
                >
                  Map View
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
