import React from 'react';

export const BrandIntro: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-[#12080A] border-y border-[#3B1C23]/40 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-6">
          The Rich Nana Philosophy
        </span>

        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#F3EFEA] leading-tight mb-8">
          &ldquo;Beauty should feel effortless, personal, and profoundly transformative.&rdquo;
        </h2>

        <div className="w-16 h-[1px] bg-[#C5A059]/40 mx-auto mb-8" />

        <p className="text-[#F3EFEA]/70 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
          Located in the heart of Pulo Gadung, Jakarta Timur, Rich Nana Beauty was founded on a singular vision: to bring international Mave-level luxury craftsmanship to discerning clients. Every stroke of nail polish, every hair strand treatment, and every lash extension is executed with uncompromising precision and absolute hygiene.
        </p>

      </div>
    </section>
  );
};
