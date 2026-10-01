import React, { useState } from 'react';
import { GoogleBusinessSettings } from '../../types';
import { MapPin, Star, RefreshCw, CheckCircle2, ExternalLink } from 'lucide-react';

interface GoogleBusinessPanelProps {
  googleBusiness: GoogleBusinessSettings;
  onUpdateGoogle: (google: GoogleBusinessSettings) => void;
  onLogAction: (action: string, module: string) => void;
}

export const GoogleBusinessPanel: React.FC<GoogleBusinessPanelProps> = ({ googleBusiness, onUpdateGoogle, onLogAction }) => {
  const [form, setForm] = useState<GoogleBusinessSettings>(googleBusiness);
  const [syncing, setSyncing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      const updated = {
        ...form,
        lastSynced: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'connected' as const
      };
      setForm(updated);
      onUpdateGoogle(updated);
      onLogAction('Synchronized verified Google Business Profile rating & reviews', 'Google');
      setSyncing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="border-b border-[#421620] pb-6">
        <h2 className="font-editorial text-3xl text-[#F3EFEA]">Google Maps & Verified Reviews Integration</h2>
        <p className="text-[#F3EFEA]/70 text-xs">Manage official Rich Nana Beauty Pulo Gadung location and sync verified Google Business ratings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl">
        
        {/* Left: Configuration */}
        <div className="lg:col-span-7 bg-[#220A10] p-6 md:p-8 border border-[#421620] space-y-6">
          <h3 className="font-editorial text-2xl text-[#C5A059]">Google Place Configuration</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#C5A059]">Google Place ID</label>
              <input
                type="text"
                value={form.placeId}
                onChange={(e) => setForm({ ...form, placeId: e.target.value })}
                className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none focus:border-[#C5A059]"
                required
              />
            </div>

            <div className="p-4 bg-[#16070B] border border-[#421620] space-y-2">
              <div className="text-[10px] uppercase tracking-widest text-[#C5A059]">Registered Address</div>
              <div className="text-xs text-[#F3EFEA]">Pulo Gadung, Jakarta Timur, DKI Jakarta, Indonesia</div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={handleSync}
                disabled={syncing}
                className="bg-[#C5A059] hover:bg-[#b08b47] text-[#16070B] font-semibold text-xs uppercase tracking-wider px-6 py-3.5 flex items-center gap-2 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                <span>{syncing ? 'Syncing with Google...' : 'Sync Google Rating'}</span>
              </button>

              {success && (
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Sync Successful
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Verified Status */}
        <div className="lg:col-span-5 bg-[#220A10] p-6 md:p-8 border border-[#421620] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059]">Verified Business Data</span>
            <div className="flex items-center gap-4">
              <div className="font-editorial text-5xl text-[#F3EFEA]">{form.rating.toFixed(1)}</div>
              <div>
                <div className="flex items-center space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                  ))}
                </div>
                <div className="text-xs text-[#F3EFEA]/70">Based on <strong className="text-white">{form.reviewCount}</strong> verified Google reviews</div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#421620] space-y-3">
            <div className="text-[10px] uppercase tracking-widest text-[#F3EFEA]/40">Last Synced: {form.lastSynced}</div>
            <a
              href="https://maps.google.com/?q=Pulo+Gadung+Jakarta+Timur"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border border-[#421620] hover:border-[#C5A059] text-[#F3EFEA] hover:text-[#C5A059] text-xs uppercase tracking-wider py-3 text-center flex items-center justify-center gap-2 transition-colors"
            >
              <span>View Google Maps Listing</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
