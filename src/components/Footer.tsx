import React from 'react';
import { ShieldCheck, Phone, Instagram, MapPin } from 'lucide-react';
import { BrandingSettings } from '../types';

interface FooterProps {
  branding: BrandingSettings;
  onOpenOwnerModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ branding, onOpenOwnerModal }) => {
  return (
    <footer className="bg-[#0A0305] border-t border-[#421620] text-[#F3EFEA] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#421620]/80">
        
        {/* Brand */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex flex-col items-start">
            <span className="font-editorial text-3xl font-semibold tracking-wider text-[#F3EFEA]">
              {branding.businessName}
            </span>
            <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase -mt-1 font-medium">
              Nail, Lash & Hair Studio
            </span>
          </div>

          <p className="text-xs text-[#F3EFEA]/60 font-light leading-relaxed max-w-sm">
            {branding.tagline}. Located in {branding.address}. Dedicated to pristine craftsmanship, absolute hygiene, and effortless elegance.
          </p>

          <div className="flex items-center space-x-4 pt-2">
            <a 
              href={`https://instagram.com/${branding.instagramHandle}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 border border-[#421620] hover:border-[#C5A059] hover:text-[#C5A059] flex items-center justify-center transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href={`https://wa.me/${branding.whatsappNumber}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 border border-[#421620] hover:border-[#C5A059] hover:text-[#C5A059] flex items-center justify-center transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a 
              href={branding.googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 border border-[#421620] hover:border-[#C5A059] hover:text-[#C5A059] flex items-center justify-center transition-colors"
            >
              <MapPin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-editorial text-xl text-[#C5A059]">Navigation</h4>
          <ul className="space-y-2.5 text-xs tracking-wider text-[#F3EFEA]/70 uppercase">
            <li><a href="#services" className="hover:text-[#C5A059] transition-colors">Services</a></li>
            <li><a href="#portfolio" className="hover:text-[#C5A059] transition-colors">Portfolio</a></li>
            <li><a href="#standard" className="hover:text-[#C5A059] transition-colors">Standard</a></li>
            <li><a href="#studio" className="hover:text-[#C5A059] transition-colors">Studio</a></li>
            <li><a href="#reviews" className="hover:text-[#C5A059] transition-colors">Reviews</a></li>
          </ul>
        </div>

        {/* Services Links */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-editorial text-xl text-[#C5A059]">Signature Menu</h4>
          <ul className="space-y-2.5 text-xs tracking-wider text-[#F3EFEA]/70 uppercase">
            <li><a href="#services" className="hover:text-[#C5A059] transition-colors">Gel Polish & Manicure</a></li>
            <li><a href="#services" className="hover:text-[#C5A059] transition-colors">Cat Eye Eyelash</a></li>
            <li><a href="#services" className="hover:text-[#C5A059] transition-colors">Sulam Alis & Brows</a></li>
            <li><a href="#services" className="hover:text-[#C5A059] transition-colors">Sulam Bibir Blush</a></li>
            <li><a href="#services" className="hover:text-[#C5A059] transition-colors">Hair Smoothing & Spa</a></li>
          </ul>
        </div>

        {/* Contact & Hours */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-editorial text-xl text-[#C5A059]">Studio Hours</h4>
          <p className="text-xs text-[#F3EFEA]/70 leading-relaxed">
            {branding.openingHours}<br />
            {branding.address}
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenOwnerModal}
              className="inline-flex items-center gap-1.5 text-xs text-[#C5A059] hover:underline uppercase tracking-wider font-semibold"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Owner CMS Portal</span>
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F3EFEA]/40 gap-4">
        <div>
          &copy; {new Date().getFullYear()} {branding.businessName}. All rights reserved. {branding.address}.
        </div>
        <div className="flex space-x-6 uppercase tracking-wider text-[10px]">
          <a href="#" className="hover:text-[#C5A059]">Privacy Policy</a>
          <a href="#" className="hover:text-[#C5A059]">Terms of Service</a>
          <a href="#" className="hover:text-[#C5A059]">Sanitization Protocol</a>
        </div>
      </div>
    </footer>
  );
};
