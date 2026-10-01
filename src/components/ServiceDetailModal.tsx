import React from 'react';
import { X, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenBookingWithService: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose, onOpenBookingWithService }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12080A]/9ontal backdrop-blur-md bg-black/70 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#1A0B0E] border border-[#3B1C23] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#3B1C23]">
          <div className="uppercase tracking-[0.2em] text-xs text-[#C5A059] font-medium">
            Signature Service Detail
          </div>
          <button 
            onClick={onClose}
            className="text-[#F3EFEA]/60 hover:text-[#C5A059] p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="aspect-[4/3] overflow-hidden bg-[#12080A] border border-[#3B1C23]">
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-[#C5A059]/10 text-[#C5A059] text-[10px] uppercase tracking-[0.25em]">
                {service.category.replace('_', ' ')}
              </span>
              <h3 className="font-editorial text-3xl md:text-4xl text-[#F3EFEA]">
                {service.name}
              </h3>
              <p className="text-[#F3EFEA]/70 text-sm leading-relaxed">
                {service.description}
              </p>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-[#C5A059]">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider">{service.duration}</span>
                </div>
                <div className="text-2xl font-editorial text-[#F3EFEA]">
                  {service.price}
                </div>
              </div>
            </div>
          </div>

          {service.includes && service.includes.length > 0 && (
            <div className="border-t border-[#3B1C23] pt-6">
              <h4 className="font-editorial text-xl text-[#F3EFEA] mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>What Is Included</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.includes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-[#12080A] p-3.5 border border-[#3B1C23]/60">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                    <span className="text-xs text-[#F3EFEA]/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-[#3B1C23] bg-[#12080A] flex items-center justify-between">
          <div className="text-xs text-[#F3EFEA]/50">
            Professional master touch in Pulo Gadung, Jakarta Timur
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenBookingWithService(service.name);
            }}
            className="bg-[#C5A059] hover:bg-[#b08b47] text-[#12080A] font-semibold text-xs uppercase tracking-[0.2em] px-8 py-3.5 transition-all shadow-lg"
          >
            Book This Service
          </button>
        </div>

      </div>
    </div>
  );
};
