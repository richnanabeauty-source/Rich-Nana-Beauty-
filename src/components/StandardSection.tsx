import React from 'react';
import { ShieldCheck, Target, Heart } from 'lucide-react';

export const StandardSection: React.FC = () => {
  const standards = [
    {
      number: '01',
      title: 'HYGIENE',
      subtitle: 'Hospital-Grade Sterilization',
      description: 'Every metal tool undergoes ultrasonic cleansing and medical autoclave sterilization. Files and buffers are single-use only, ensuring 100% infection-free peace of mind.',
      icon: ShieldCheck
    },
    {
      number: '02',
      title: 'PRECISION',
      subtitle: 'Master Artisans',
      description: 'Our senior technicians undergo rigorous international training in nail geometry, symmetrical micro-blading, and featherweight lash isolation.',
      icon: Target
    },
    {
      number: '03',
      title: 'COMFORT',
      subtitle: 'Sanctuary of Serenity',
      description: 'Designed specifically for you to slow down. Enjoy ergonomic plush seating, calming aromatic ambiance, and complimentary premium beverages.',
      icon: Heart
    }
  ];

  return (
    <section id="standard" className="py-28 bg-[#1A0B0E] border-y border-[#3B1C23]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-3">
            Uncompromising Excellence
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#F3EFEA]">
            The Rich Nana Standard
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {standards.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx}
                className="bg-[#12080A] p-8 md:p-10 border border-[#3B1C23] hover:border-[#C5A059]/50 transition-all duration-500 flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-editorial text-4xl text-[#C5A059]">
                      {item.number}
                    </span>
                    <div className="w-10 h-10 rounded-none bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-[#12080A] transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-editorial text-2xl text-[#F3EFEA] mb-1">
                      {item.title}
                    </h3>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-[#C5A059] mb-4">
                      {item.subtitle}
                    </div>
                    <p className="text-[#F3EFEA]/70 text-sm font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-8 border-t border-[#3B1C23]/60 flex items-center justify-between text-[11px] uppercase tracking-widest text-[#F3EFEA]/40">
                  <span>Rich Nana Guarantee</span>
                  <span className="text-[#C5A059]">Verified</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
