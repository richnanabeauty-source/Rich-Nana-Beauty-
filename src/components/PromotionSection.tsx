import React from 'react';
import { PromotionItem } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PromotionSectionProps {
  promotions: PromotionItem[];
  onOpenBookingWithService: (serviceName: string) => void;
}

export const PromotionSection: React.FC<PromotionSectionProps> = ({ promotions, onOpenBookingWithService }) => {
  const activePromo = promotions.find(p => p.active) || promotions[0];
  if (!activePromo) return null;

  return (
    <section className="py-24 bg-[#12080A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="relative bg-[#1A0B0E] border border-[#C5A059]/40 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Image */}
            <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto lg:h-full bg-[#12080A]">
              <img 
                src={activePromo.image} 
                alt={activePromo.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1A0B0E] via-transparent to-transparent opacity-80" />
            </div>

            {/* Content */}
            <div className="lg:col-span-6 p-8 md:p-12 lg:p-16 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none border border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059] text-xs uppercase tracking-[0.25em]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activePromo.badge}</span>
              </div>

              <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium block">
                {activePromo.subtitle}
              </span>

              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#F3EFEA]">
                {activePromo.title}
              </h2>

              <p className="text-[#F3EFEA]/70 text-sm md:text-base font-light leading-relaxed">
                {activePromo.description}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-[#3B1C23]">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#F3EFEA]/50">Special Package Price</div>
                  <div className="font-editorial text-3xl text-[#C5A059]">{activePromo.price}</div>
                </div>

                <button
                  onClick={() => onOpenBookingWithService(activePromo.title)}
                  className="bg-[#C5A059] hover:bg-[#b08b47] text-[#12080A] font-semibold text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all shadow-xl flex items-center gap-2 group"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
