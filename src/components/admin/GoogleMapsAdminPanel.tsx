import React, { useState } from 'react';
import { GoogleMapsSettings } from '../../types';
import { MapPin, Check, AlertTriangle, ExternalLink, RefreshCw, Eye, Save, Globe } from 'lucide-react';
import { buildGoogleMapsEmbedUrl } from '../../utils/googleMaps';

interface GoogleMapsAdminPanelProps {
  googleMaps: GoogleMapsSettings;
  onUpdateGoogleMaps: (settings: GoogleMapsSettings) => void;
  onLogAction: (action: string, module: string) => void;
}

export const GoogleMapsAdminPanel: React.FC<GoogleMapsAdminPanelProps> = ({
  googleMaps,
  onUpdateGoogleMaps,
  onLogAction
}) => {
  const [form, setForm] = useState<GoogleMapsSettings>(googleMaps);
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateGoogleMaps(form);
    onLogAction('Updated Google Maps Platform integration settings', 'Google Maps');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleTestConnection = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      // Simulate test check
      if (!form.apiKey || form.apiKey.trim() === '') {
        const updated = { ...form, connectionStatus: 'NOT CONNECTED' as const };
        setForm(updated);
        onUpdateGoogleMaps(updated);
      } else if (form.apiKey.length < 20) {
        const updated = { ...form, connectionStatus: 'INVALID API KEY' as const };
        setForm(updated);
        onUpdateGoogleMaps(updated);
      } else {
        const updated = { ...form, connectionStatus: 'CONNECTED' as const };
        setForm(updated);
        onUpdateGoogleMaps(updated);
      }
      onLogAction('Tested Google Maps API connection', 'Google Maps');
    }, 1200);
  };

  const getStatusBadge = (status: GoogleMapsSettings['connectionStatus']) => {
    switch (status) {
      case 'CONNECTED':
        return <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/30 text-[10px] uppercase tracking-wider font-semibold">CONNECTED</span>;
      case 'NOT CONNECTED':
        return <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 text-[10px] uppercase tracking-wider font-semibold">NOT CONNECTED</span>;
      case 'INVALID API KEY':
        return <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/30 text-[10px] uppercase tracking-wider font-semibold">INVALID API KEY</span>;
      case 'API NOT ENABLED':
        return <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/30 text-[10px] uppercase tracking-wider font-semibold">API NOT ENABLED</span>;
      case 'BILLING NOT ENABLED':
        return <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/30 text-[10px] uppercase tracking-wider font-semibold">BILLING NOT ENABLED</span>;
      case 'DOMAIN RESTRICTION ERROR':
        return <span className="px-3 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/30 text-[10px] uppercase tracking-wider font-semibold">DOMAIN RESTRICTION ERROR</span>;
      default:
        return <span className="px-3 py-1 bg-gray-500/10 text-gray-400 border border-gray-500/30 text-[10px] uppercase tracking-wider font-semibold">{status}</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#421620] pb-6">
        <div>
          <h2 className="font-editorial text-3xl text-[#F3EFEA]">Google Maps Embed Integration</h2>
          <p className="text-[#F3EFEA]/70 text-xs">Configure official Google Maps Embed API settings, API keys, and location coordinates.</p>
        </div>

        <div className="flex items-center gap-3">
          {getStatusBadge(form.connectionStatus)}
          {saved && (
            <span className="text-xs text-green-400 flex items-center gap-1">
              <Check className="w-4 h-4" /> Saved Successfully
            </span>
          )}
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8 max-w-3xl">
        <div className="bg-[#220A10] p-6 md:p-8 border border-[#421620] space-y-6">
          <div className="flex items-center justify-between border-b border-[#421620] pb-4">
            <h3 className="font-editorial text-2xl text-[#C5A059] flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Maps Embed Settings</span>
            </h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
                className="w-4 h-4 accent-[#C5A059]"
              />
              <span className="text-xs uppercase tracking-wider text-[#F3EFEA]">Enable Google Maps</span>
            </label>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#C5A059]">Google Maps API Key (`VITE_GOOGLE_MAPS_API_KEY`)</label>
              <input
                type="text"
                value={form.apiKey || ''}
                onChange={(e) => setForm({ ...form, apiKey: e.target.value })}
                placeholder="AIzaSy..."
                className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs font-mono outline-none focus:border-[#C5A059]"
              />
              <p className="text-[11px] text-[#F3EFEA]/50">
                Leave empty or rely on environment variables if configured in .env. Maps Embed API is free with unlimited usage.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#C5A059]">Business Name</label>
                <input
                  type="text"
                  value={form.businessName || ''}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                  className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#C5A059]">Map Mode</label>
                <select
                  value={form.mapMode || 'place'}
                  onChange={(e) => setForm({ ...form, mapMode: e.target.value as any })}
                  className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none focus:border-[#C5A059]"
                >
                  <option value="place">Place (Pins specific business location)</option>
                  <option value="view">View (Panoramic map view)</option>
                  <option value="directions">Directions</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#C5A059]">Business Address</label>
              <input
                type="text"
                value={form.address || ''}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none focus:border-[#C5A059]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#C5A059]">Google Maps Place URL</label>
              <input
                type="url"
                value={form.googleMapsUrl || ''}
                onChange={(e) => setForm({ ...form, googleMapsUrl: e.target.value })}
                className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none focus:border-[#C5A059]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#C5A059]">Latitude</label>
                <input
                  type="text"
                  value={form.latitude || ''}
                  onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                  className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#C5A059]">Longitude</label>
                <input
                  type="text"
                  value={form.longitude || ''}
                  onChange={(e) => setForm({ ...form, longitude: e.target.value })}
                  className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#C5A059]">Zoom Level ({form.zoom})</label>
                <input
                  type="range"
                  min="10"
                  max="20"
                  value={form.zoom || 15}
                  onChange={(e) => setForm({ ...form, zoom: parseInt(e.target.value, 10) })}
                  className="w-full accent-[#C5A059] mt-3"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 items-center pt-2">
          <button
            type="submit"
            className="bg-[#C5A059] hover:bg-[#b08b47] text-[#16070B] font-semibold text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all shadow-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>

          <button
            type="button"
            onClick={handleTestConnection}
            disabled={testing}
            className="border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059]/10 text-xs uppercase tracking-[0.2em] px-6 py-4 transition-all flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${testing ? 'animate-spin' : ''}`} />
            <span>{testing ? 'Testing...' : 'Test Connection'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="border border-[#F3EFEA]/20 hover:border-[#C5A059] text-[#F3EFEA] hover:text-[#C5A059] text-xs uppercase tracking-[0.2em] px-6 py-4 transition-all flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            <span>Preview Map</span>
          </button>

          <a
            href={form.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#F3EFEA]/20 hover:border-[#C5A059] text-[#F3EFEA] hover:text-[#C5A059] text-xs uppercase tracking-[0.2em] px-6 py-4 transition-all flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Google Maps</span>
          </a>
        </div>
      </form>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#220A10] border border-[#421620] w-full max-w-3xl p-6 space-y-4 relative">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-2xl text-[#C5A059]">Google Maps Embed Preview</h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-[#F3EFEA]/70 hover:text-white text-xs uppercase tracking-wider"
              >
                Close
              </button>
            </div>

            <div className="aspect-[16/9] w-full bg-[#16070B] border border-[#421620] overflow-hidden relative">
              {form.apiKey ? (
                <iframe
                  src={buildGoogleMapsEmbedUrl(form)}
                  title="Google Maps Embed Preview"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <AlertTriangle className="w-8 h-8 text-yellow-400 mb-2" />
                  <p className="text-xs text-[#F3EFEA]/70">
                    Google Maps belum dikonfigurasi. Tambahkan VITE_GOOGLE_MAPS_API_KEY pada environment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
