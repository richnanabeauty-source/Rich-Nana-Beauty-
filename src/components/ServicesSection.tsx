import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
  onOpenBookingWithService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onSelectService, onOpenBookingWithService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'nail', label: 'Nails & Art' },
    { id: 'eyelash', label: 'Eyelash' },
    { id: 'sulam_alis', label: 'Sulam Alis' },
    { id: 'sulam_bibir', label: 'Sulam Bibir' },
    { id: 'hair', label: 'Hair Care' }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-28 bg-[#12080A] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#3B1C23] pb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-3">
              Mave-Level Artistry
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#F3EFEA]">
              Our Signature Services
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs uppercase tracking-[0.15em] px-4 py-2.5 transition-all duration-300 border ${activeCategory === cat.id ? 'bg-[#C5A059] text-[#12080A] border-[#C5A059] font-semibold' : 'bg-transparent text-[#F3EFEA]/70 border-[#3B1C23] hover:border-[#C5A059]/50'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services List / Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {filteredServices.map((service, index) => (
            <div 
              key={service.id}
              className="group relative bg-[#1A0B0E] border border-[#3B1C23] hover:border-[#C5A059]/60 transition-all duration-500 overflow-hidden flex flex-col justify-between"
            >
              {/* Image box */}
              <div 
                onClick={() => onSelectService(service)}
                className="relative aspect-[16/10] overflow-hidden bg-[#12080A] cursor-pointer"
              >
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B0E] via-transparent to-transparent opacity-80" />
                
                {/* Number Badge */}
                <div className="absolute top-4 left-4 bg-[#12080A]/80 backdrop-blur-md px-3 py-1 border border-[#3B1C23] text-xs font-editorial text-[#C5A059]">
                  0{index + 1}
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 bg-[#12080A]/80 backdrop-blur-md px-3 py-1 border border-[#3B1C23] text-[11px] uppercase tracking-wider text-[#F3EFEA]/80">
                  {service.duration}
                </div>
              </div>

              {/* Content box */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059]">
                      {service.category.replace('_', ' ')}
                    </span>
                    <span className="font-editorial text-2xl text-[#F3EFEA]">
                      {service.price}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectService(service)}
                    className="font-editorial text-2xl md:text-3xl text-[#F3EFEA] hover:text-[#C5A059] transition-colors cursor-pointer"
                  >
                    {service.name}
                  </h3>

                  <p className="text-[#F3EFEA]/70 text-sm font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#3B1C23] flex items-center justify-between">
                  <button
                    onClick={() => onSelectService(service)}
                    className="text-xs uppercase tracking-[0.2em] text-[#F3EFEA] hover:text-[#C5A059] transition-colors flex items-center gap-1 group/btn"
                  >
                    <span>View Details & Pricing</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => onOpenBookingWithService(service.name)}
                    className="bg-[#3B1C23] hover:bg-[#C5A059] hover:text-[#12080A] text-[#F3EFEA] text-xs uppercase tracking-[0.15em] px-4 py-2.5 transition-all"
                  >
                    Book
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
