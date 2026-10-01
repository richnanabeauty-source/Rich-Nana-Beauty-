import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { BrandingSettings } from '../types';

interface HeroProps {
  branding: BrandingSettings;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ branding, onOpenBooking }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#16070B]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#5C1D2D]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-8 text-left">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/5 text-[#C5A059] text-xs uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{branding.address}</span>
          </div>

          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#F3EFEA] leading-[1.05]">
            Beauty, <br />
            <span className="italic font-normal text-[#E2C075]">Refined.</span>
          </h1>

          <p className="text-[#F3EFEA]/70 text-base md:text-lg max-w-xl font-light leading-relaxed">
            Welcome to {branding.businessName}. An international-standard luxury sanctuary dedicated to pristine nail artistry, high-definition lashes, flawless embroidery, and restorative hair care in Jakarta Timur.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
            <button
              onClick={onOpenBooking}
              className="bg-[#C5A059] hover:bg-[#b08b47] text-[#16070B] font-semibold uppercase text-xs tracking-[0.25em] px-8 py-4 transition-all duration-300 shadow-xl shadow-[#C5A059]/10 flex items-center justify-center gap-3 group"
            >
              <span>Book An Appointment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#services"
              className="border border-[#F3EFEA]/20 hover:border-[#C5A059] text-[#F3EFEA] hover:text-[#C5A059] font-medium uppercase text-xs tracking-[0.25em] px-8 py-4 transition-all duration-300 text-center"
            >
              Explore Services
            </a>
          </div>

          {/* Key metrics / trust badge */}
          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-[#421620]/80 w-full max-w-lg">
            <div>
              <div className="font-editorial text-3xl md:text-4xl text-[#C5A059]">5.0</div>
              <div className="text-[11px] uppercase tracking-widest text-[#F3EFEA]/50 mt-1">Google Rating</div>
            </div>
            <div>
              <div className="font-editorial text-3xl md:text-4xl text-[#C5A059]">100%</div>
              <div className="text-[11px] uppercase tracking-widest text-[#F3EFEA]/50 mt-1">Sterilized Tools</div>
            </div>
            <div>
              <div className="font-editorial text-3xl md:text-4xl text-[#C5A059]">Mave</div>
              <div className="text-[11px] uppercase tracking-widest text-[#F3EFEA]/50 mt-1">Studio Standard</div>
            </div>
          </div>

        </div>

        {/* Right Column: Editorial Authentic Image Composition */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            
            {/* Decorative frame border */}
            <div className="absolute -inset-4 border border-[#C5A059]/30 translate-x-4 translate-y-4 pointer-events-none hidden sm:block" />
            
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl bg-[#220A10]">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1000"
                alt="Rich Nana Beauty Luxury Studio"
                className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16070B] via-transparent to-transparent opacity-60" />
              
              {/* Floating aesthetic card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#16070B]/85 backdrop-blur-md border border-[#C5A059]/30">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] mb-1 font-medium">Signature Experience</div>
                <div className="font-editorial text-xl text-[#F3EFEA]">Immaculate Gel Art & Lash Design</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
