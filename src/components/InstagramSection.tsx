import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { BrandingSettings } from '../types';

interface InstagramSectionProps {
  branding: BrandingSettings;
}

export const InstagramSection: React.FC<InstagramSectionProps> = ({ branding }) => {
  const instaImages = [
    'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1583001931096-9593fcf5e3f9?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600'
  ];

  const handleInstaUrl = `https://instagram.com/${branding.instagramHandle}`;

  return (
    <section className="py-24 bg-[#220A10] border-t border-[#421620]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        
        <div className="max-w-xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-[#C5A059] text-xs uppercase tracking-[0.3em]">
            <Instagram className="w-4 h-4" />
            <span>@{branding.instagramHandle}</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#F3EFEA]">
            Follow The Rich Nana World
          </h2>
          <p className="text-[#F3EFEA]/70 text-sm font-light">
            Daily dose of luxury nail inspiration, lash mapping, and studio backstage moments.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {instaImages.map((img, idx) => (
            <a
              key={idx}
              href={handleInstaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-[#16070B] border border-[#421620]"
            >
              <img 
                src={img} 
                alt="Instagram Rich Nana Beauty" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#C5A059]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white" />
              </div>
            </a>
          ))}
        </div>

        <a
          href={handleInstaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-[#C5A059]/40 hover:bg-[#C5A059] hover:text-[#16070B] text-[#C5A059] uppercase text-xs tracking-[0.2em] px-8 py-3.5 transition-all"
        >
          <span>Follow Us On Instagram</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

      </div>
    </section>
  );
};
