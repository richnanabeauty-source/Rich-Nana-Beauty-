import React, { useState } from 'react';
import { BrandingSettings } from '../../types';
import { MapPin, Check, ExternalLink, Globe } from 'lucide-react';

interface OwnerLocationManagerProps {
  branding: BrandingSettings;
  onUpdateBranding: (branding: BrandingSettings) => void;
  onLogAction: (action: string, module: string) => void;
}

export const OwnerLocationManager: React.FC<OwnerLocationManagerProps> = ({ branding, onUpdateBranding, onLogAction }) => {
  const [form, setForm] = useState<BrandingSettings>(branding);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBranding(form);
    onLogAction('Updated Google Maps Location & Place ID settings', 'Location');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#421620] pb-6">
        <div>
          <h2 className="font-editorial text-3xl text-[#F3EFEA]">Owner Location & Google Maps Manager</h2>
          <p className="text-[#F3EFEA]/70 text-xs">Configure exact studio location, Google Place ID, and interactive map embed URL.</p>
        </div>

        {saved && (
          <span className="text-xs text-green-400 flex items-center gap-1">
            <Check className="w-4 h-4" /> Location Updated Successfully
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8 max-w-3xl">
        <div className="bg-[#220A10] p-6 md:p-8 border border-[#421620] space-y-6">
          <h3 className="font-editorial text-2xl text-[#C5A059] flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>Studio Location & Map Embed Settings</span>
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#C5A059]">Studio Address</label>
              <input
                type="text"
                value={form.address || ''}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none focus:border-[#C5A059]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#C5A059]">Google Place ID</label>
              <input
                type="text"
                value={form.googlePlaceId || ''}
                onChange={(e) => setForm({ ...form, googlePlaceId: e.target.value })}
                placeholder="e.g. ChIJ-verified-rich-nana-pulo-gadung"
                className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none focus:border-[#C5A059]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#C5A059]">Google Maps Embed URL / Iframe Source</label>
              <input
                type="text"
                value={form.googleMapsEmbedUrl || ''}
                onChange={(e) => setForm({ ...form, googleMapsEmbedUrl: e.target.value })}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs font-mono outline-none focus:border-[#C5A059]"
                required
              />
              <p className="text-[11px] text-[#F3EFEA]/50">Paste the valid Google Maps embed URL to render the live interactive map publicly.</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#C5A059]">Google Maps Direction Link</label>
              <input
                type="url"
                value={form.googleMapsUrl || ''}
                onChange={(e) => setForm({ ...form, googleMapsUrl: e.target.value })}
                className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none focus:border-[#C5A059]"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#C5A059] hover:bg-[#b08b47] text-[#16070B] font-semibold text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all shadow-lg"
        >
          Save Location & Map Settings
        </button>
      </form>
    </div>
  );
};
