import React, { useState } from 'react';
import { InteriorItem } from '../types';
import { MapPin, Sparkles } from 'lucide-react';

interface StudioSectionProps {
  interior: InteriorItem[];
}

export const StudioSection: React.FC<StudioSectionProps> = ({ interior }) => {
  const [activeArea, setActiveArea] = useState<string>('all');

  const areas = [
    { id: 'all', label: 'All Spaces' },
    { id: 'reception', label: 'Reception' },
    { id: 'nail_station', label: 'Nail Lounge' },
    { id: 'lash_area', label: 'Lash & Embroidery Suite' },
    { id: 'treatment_area', label: 'Hair Sanctuary' }
  ];

  const filteredInterior = activeArea === 'all'
    ? interior
    : interior.filter(item => item.area === activeArea);

  return (
    <section id="studio" className="py-28 bg-[#12080A] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Cinematic Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16 pb-8 border-b border-[#3B1C23]">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-3">
              Cinematic Architecture
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#F3EFEA]">
              The Studio
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between space-y-4">
            <div className="flex items-center gap-2 text-[#C5A059] text-sm uppercase tracking-widest">
              <MapPin className="w-4 h-4" />
              <span>Pulo Gadung, Jakarta Timur</span>
            </div>
            <p className="text-[#F3EFEA]/70 text-sm font-light text-left lg:text-right max-w-sm">
              A space meticulously designed for you to slow down, unwind, and emerge renewed.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {areas.map(area => (
            <button
              key={area.id}
              onClick={() => setActiveArea(area.id)}
              className={`text-xs uppercase tracking-[0.15em] px-4 py-2.5 transition-all duration-300 border ${activeArea === area.id ? 'bg-[#C5A059] text-[#12080A] border-[#C5A059] font-semibold' : 'bg-transparent text-[#F3EFEA]/70 border-[#3B1C23] hover:border-[#C5A059]/50'}`}
            >
              {area.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredInterior.map(item => (
            <div 
              key={item.id}
              className="group relative bg-[#1A0B0E] border border-[#3B1C23] overflow-hidden"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#12080A]">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12080A] via-[#12080A]/20 to-transparent opacity-90" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#C5A059] mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{item.area.replace('_', ' ')}</span>
                </div>
                <h3 className="font-editorial text-2xl text-[#F3EFEA] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#F3EFEA]/70 text-xs font-light max-w-lg">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
