import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, ShieldCheck } from 'lucide-react';
import { BrandingSettings } from '../types';

interface HeaderProps {
  branding: BrandingSettings;
  onOpenBooking: () => void;
  onOpenOwnerModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ branding, onOpenBooking, onOpenOwnerModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#16070B]/95 backdrop-blur-md py-4 border-b border-[#421620]/80 shadow-xl' : 'bg-gradient-to-b from-[#16070B]/80 to-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          {branding.logoUrl ? (
            <img src={branding.logoUrl} alt={branding.businessName} className="h-10 w-auto object-contain" />
          ) : (
            <div className="flex flex-col items-start">
              <span className="font-editorial text-2xl md:text-3xl font-semibold tracking-wider text-[#F3EFEA] group-hover:text-[#C5A059] transition-colors">
                {branding.businessName.split(' ')[0]} {branding.businessName.split(' ')[1] || ''}
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#C5A059] uppercase -mt-1 font-medium">
                Nail, Lash & Hair
              </span>
            </div>
          )}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-10">
          <a href="#services" className="text-sm tracking-widest uppercase text-[#F3EFEA]/80 hover:text-[#C5A059] transition-colors">Services</a>
          <a href="#portfolio" className="text-sm tracking-widest uppercase text-[#F3EFEA]/80 hover:text-[#C5A059] transition-colors">Portfolio</a>
          <a href="#standard" className="text-sm tracking-widest uppercase text-[#F3EFEA]/80 hover:text-[#C5A059] transition-colors">Standard</a>
          <a href="#studio" className="text-sm tracking-widest uppercase text-[#F3EFEA]/80 hover:text-[#C5A059] transition-colors">Studio</a>
          <a href="#reviews" className="text-sm tracking-widest uppercase text-[#F3EFEA]/80 hover:text-[#C5A059] transition-colors">Reviews</a>
          <a href="#location" className="text-sm tracking-widest uppercase text-[#F3EFEA]/80 hover:text-[#C5A059] transition-colors">Contact</a>
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center space-x-4">
          <a 
            href={`https://wa.me/${branding.whatsappNumber}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-wider text-[#C5A059] hover:text-white transition-colors px-3 py-2 flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
          
          <button
            onClick={onOpenBooking}
            className="bg-[#C5A059] hover:bg-[#b08b47] text-[#16070B] font-semibold text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-none transition-all duration-300 shadow-lg hover:shadow-[#C5A059]/20"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-[#F3EFEA] hover:text-[#C5A059] p-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#220A10] border-b border-[#421620] py-8 px-6 shadow-2xl flex flex-col space-y-6 animate-fadeIn">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-editorial tracking-wider text-[#F3EFEA] hover:text-[#C5A059]"
            >
              Services
            </a>
            <a 
              href="#portfolio" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-editorial tracking-wider text-[#F3EFEA] hover:text-[#C5A059]"
            >
              Portfolio
            </a>
            <a 
              href="#standard" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-editorial tracking-wider text-[#F3EFEA] hover:text-[#C5A059]"
            >
              The Rich Nana Standard
            </a>
            <a 
              href="#studio" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-editorial tracking-wider text-[#F3EFEA] hover:text-[#C5A059]"
            >
              Studio Experience
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-editorial tracking-wider text-[#F3EFEA] hover:text-[#C5A059]"
            >
              Reviews
            </a>
            <a 
              href="#location" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-editorial tracking-wider text-[#F3EFEA] hover:text-[#C5A059]"
            >
              Location & Hours
            </a>
          </nav>

          <div className="pt-4 border-t border-[#421620] flex flex-col space-y-3">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="w-full bg-[#C5A059] text-[#16070B] font-semibold uppercase text-xs tracking-[0.2em] py-3.5 text-center"
            >
              Book an Appointment
            </button>
            <a
              href={`https://wa.me/${branding.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border border-[#C5A059]/40 text-[#C5A059] hover:bg-[#C5A059]/10 uppercase text-xs tracking-[0.2em] py-3 text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenOwnerModal(); }}
              className="text-xs text-[#F3EFEA]/50 hover:text-[#C5A059] text-center pt-2 flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Owner CMS Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
