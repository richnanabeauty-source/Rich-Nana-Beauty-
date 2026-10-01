import React, { useState } from 'react';
import { X, Calendar, Clock, Phone, CheckCircle2 } from 'lucide-react';
import { ServiceItem } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  preselectedServiceName?: string;
  onAddBooking: (booking: {
    serviceName: string;
    clientName: string;
    clientPhone: string;
    clientEmail: string;
    date: string;
    time: string;
    notes?: string;
  }) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, services, preselectedServiceName, onAddBooking }) => {
  const [selectedService, setSelectedService] = useState(preselectedServiceName || (services[0]?.name ?? 'Gel Polish & Classic Manicure'));
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('11:00');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBooking({
      serviceName: selectedService,
      clientName,
      clientPhone,
      clientEmail,
      date,
      time,
      notes
    });
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(`Hello Rich Nana Beauty, I would like to book an appointment for *${selectedService}* on ${date || 'upcoming days'} at ${time}. Name: ${clientName || 'Guest'}. Phone: ${clientPhone || '-'}`);
    window.open(`https://wa.me/6281314188522?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12080A]/90 backdrop-blur-md bg-black/80 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#1A0B0E] border border-[#3B1C23] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#3B1C23]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium">Reservation</span>
            <h3 className="font-editorial text-2xl text-[#F3EFEA]">Your Beauty Appointment Awaits</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-[#F3EFEA]/60 hover:text-[#C5A059] p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-6 my-auto">
            <div className="w-16 h-16 bg-[#C5A059]/20 border border-[#C5A059] rounded-full flex items-center justify-center mx-auto text-[#C5A059]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-editorial text-3xl text-[#F3EFEA]">Appointment Request Received</h4>
            <p className="text-[#F3EFEA]/70 text-sm max-w-md mx-auto">
              Thank you, <strong className="text-white">{clientName}</strong>. We have saved your reservation for <strong className="text-[#C5A059]">{selectedService}</strong> on {date} at {time}. Our concierge will confirm via WhatsApp shortly.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs uppercase tracking-[0.2em] px-6 py-3.5 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Confirm via WhatsApp Now</span>
              </button>
              <button
                onClick={() => { setSubmitted(false); onClose(); }}
                className="w-full sm:w-auto border border-[#3B1C23] text-[#F3EFEA] hover:border-[#C5A059] text-xs uppercase tracking-[0.2em] px-6 py-3.5"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto p-6 md:p-8 space-y-6">
            
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#C5A059] font-medium">Select Service</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-[#12080A] border border-[#3B1C23] text-[#F3EFEA] p-3.5 text-sm focus:border-[#C5A059] outline-none"
                required
              >
                {services.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name} ({s.price})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#C5A059] font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sinta Dewi"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#12080A] border border-[#3B1C23] text-[#F3EFEA] p-3.5 text-sm focus:border-[#C5A059] outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#C5A059] font-medium">WhatsApp Phone</label>
                <input
                  type="tel"
                  placeholder="e.g. 08123456789"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-[#12080A] border border-[#3B1C23] text-[#F3EFEA] p-3.5 text-sm focus:border-[#C5A059] outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#C5A059] font-medium">Preferred Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#12080A] border border-[#3B1C23] text-[#F3EFEA] p-3.5 text-sm focus:border-[#C5A059] outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#C5A059] font-medium">Preferred Time</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#12080A] border border-[#3B1C23] text-[#F3EFEA] p-3.5 text-sm focus:border-[#C5A059] outline-none"
                  required
                >
                  <option value="10:00">10:00 AM</option>
                  <option value="11:30">11:30 AM</option>
                  <option value="13:00">01:00 PM</option>
                  <option value="14:30">02:30 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:30">05:30 PM</option>
                  <option value="19:00">07:00 PM</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#C5A059] font-medium">Special Requests or Notes (Optional)</label>
              <textarea
                rows={3}
                placeholder="Mention any specific nail art reference or requests..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#12080A] border border-[#3B1C23] text-[#F3EFEA] p-3 text-sm focus:border-[#C5A059] outline-none resize-none"
              />
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#3B1C23]">
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto text-xs uppercase tracking-wider text-[#25D366] hover:underline flex items-center justify-center gap-1.5 py-3"
              >
                <Phone className="w-4 h-4" />
                <span>Or Book Instantly via WhatsApp</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#C5A059] hover:bg-[#b08b47] text-[#12080A] font-semibold text-xs uppercase tracking-[0.2em] px-8 py-3.5 transition-all shadow-lg"
              >
                Submit Reservation
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
