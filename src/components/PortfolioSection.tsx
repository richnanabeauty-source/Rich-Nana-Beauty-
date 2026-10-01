import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { X, ZoomIn } from 'lucide-react';

interface PortfolioSectionProps {
  portfolio: PortfolioItem[];
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ portfolio }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'nails', label: 'Nails' },
    { id: 'gel', label: 'Gel Polish' },
    { id: 'nail_art', label: 'Nail Art' },
    { id: 'lashes', label: 'Lashes' },
    { id: 'brows_lips', label: 'Brows & Lips' },
    { id: 'hair', label: 'Hair' }
  ];

  const filteredItems = activeFilter === 'all'
    ? portfolio
    : portfolio.filter(item => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-28 bg-[#12080A] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#3B1C23] pb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-3">
              Masterpiece Gallery
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#F3EFEA]">
              The Rich Nana Portfolio
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`text-xs uppercase tracking-[0.15em] px-4 py-2.5 transition-all duration-300 border ${activeFilter === filter.id ? 'bg-[#C5A059] text-[#12080A] border-[#C5A059] font-semibold' : 'bg-transparent text-[#F3EFEA]/70 border-[#3B1C23] hover:border-[#C5A059]/50'}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className={`group relative bg-[#1A0B0E] border border-[#3B1C23] overflow-hidden cursor-pointer ${idx % 3 === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}
            >
              <div className={`relative w-full h-full overflow-hidden bg-[#12080A] ${idx % 3 === 0 ? 'aspect-[4/5]' : 'aspect-square'}`}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#12080A]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] bg-[#12080A]/80 px-2.5 py-1 border border-[#3B1C23]">
                      {item.category.replace('_', ' ')}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#C5A059] text-[#12080A] flex items-center justify-center">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-editorial text-2xl text-[#F3EFEA]">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-[#F3EFEA]/70 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12080A]/95 backdrop-blur-md bg-black/80 animate-fadeIn">
          <div className="relative max-w-5xl w-full bg-[#1A0B0E] border border-[#3B1C23] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            <button 
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 text-[#F3EFEA] hover:text-[#C5A059] bg-[#12080A]/80 p-2.5 border border-[#3B1C23] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="lg:col-span-8 bg-[#12080A] flex items-center justify-center">
              <img 
                src={lightboxItem.image} 
                alt={lightboxItem.title} 
                className="max-h-[80vh] w-auto object-contain"
              />
            </div>

            <div className="lg:col-span-4 p-8 flex flex-col justify-between bg-[#1A0B0E] border-t lg:border-t-0 lg:border-l border-[#3B1C23]">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059]">
                  {lightboxItem.category.replace('_', ' ')}
                </span>
                <h3 className="font-editorial text-3xl text-[#F3EFEA]">
                  {lightboxItem.title}
                </h3>
                {lightboxItem.description && (
                  <p className="text-[#F3EFEA]/70 text-sm leading-relaxed">
                    {lightboxItem.description}
                  </p>
                )}
              </div>

              <div className="pt-6 border-t border-[#3B1C23] mt-8">
                <button
                  onClick={() => {
                    setLightboxItem(null);
                    const bookingEl = document.getElementById('booking');
                    if (bookingEl) bookingEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-[#C5A059] hover:bg-[#b08b47] text-[#12080A] font-semibold text-xs uppercase tracking-[0.2em] py-3.5 text-center transition-all"
                >
                  Book This Look
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
