import React, { useState } from 'react';
import { BrandingSettings } from '../../types';
import { Upload, Check, Image as ImageIcon, AlertTriangle, RefreshCw } from 'lucide-react';
import { saveBrandingToFirestore, checkFirebaseConnection } from '../../utils/firebase';

interface BrandingLogoPanelProps {
  branding: BrandingSettings;
  onUpdateBranding: (branding: BrandingSettings) => void;
  onLogAction: (action: string, module: string) => void;
}

export const BrandingLogoPanel: React.FC<BrandingLogoPanelProps> = ({ branding, onUpdateBranding, onLogAction }) => {
  const [form, setForm] = useState<BrandingSettings>(branding);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [firebaseStatus, setFirebaseStatus] = useState<{ firebase: string; firestore: string; storage: string; auth: string } | null>(null);

  const handleTestFirebase = async () => {
    const status = await checkFirebaseConnection();
    setFirebaseStatus(status);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);
    try {
      // 1. Perform real Firestore write with merge: true
      await saveBrandingToFirestore(form);
      
      // 2. Update local React state & parent state
      onUpdateBranding(form);
      
      // 3. Log action
      onLogAction('Updated branding, logo & business configuration in Firestore', 'Branding');
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      console.error('Failed to save branding:', err);
      setErrorMessage(err.message || 'Gagal menyimpan ke Firestore. Periksa koneksi Firebase.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setForm(prev => ({ ...prev, logoUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setForm(prev => ({ ...prev, faviconUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#421620] pb-6">
        <div>
          <h2 className="font-editorial text-3xl text-[#F3EFEA]">Branding & Logo Management</h2>
          <p className="text-[#F3EFEA]/70 text-xs">Configure business identity, active logos, favicons, and contact details persisted directly to Firestore (`settings/branding`).</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleTestFirebase}
            className="border border-[#C5A059] text-[#C5A059] px-3 py-1.5 text-[10px] uppercase tracking-wider hover:bg-[#C5A059]/10"
          >
            Check Firebase Diagnostic
          </button>

          {saved && (
            <span className="text-xs text-green-400 flex items-center gap-1 font-semibold">
              <Check className="w-4 h-4" /> Branding berhasil disimpan.
            </span>
          )}
        </div>
      </div>

      {firebaseStatus && (
        <div className="bg-[#220A10] border border-[#C5A059]/30 p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[#F3EFEA]/50 block">Firebase:</span>
            <span className={firebaseStatus.firebase === 'CONNECTED' ? 'text-green-400 font-semibold' : 'text-red-400'}>{firebaseStatus.firebase}</span>
          </div>
          <div>
            <span className="text-[#F3EFEA]/50 block">Firestore:</span>
            <span className={firebaseStatus.firestore === 'CONNECTED' ? 'text-green-400 font-semibold' : 'text-red-400'}>{firebaseStatus.firestore}</span>
          </div>
          <div>
            <span className="text-[#F3EFEA]/50 block">Storage:</span>
            <span className={firebaseStatus.storage === 'CONNECTED' ? 'text-green-400 font-semibold' : 'text-red-400'}>{firebaseStatus.storage}</span>
          </div>
          <div>
            <span className="text-[#F3EFEA]/50 block">Auth:</span>
            <span className={firebaseStatus.auth === 'CONNECTED' ? 'text-green-400 font-semibold' : 'text-red-400'}>{firebaseStatus.auth}</span>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8 max-w-3xl">
        
        {/* Logo & Favicon Upload */}
        <div className="bg-[#220A10] p-6 border border-[#421620] space-y-6">
          <h3 className="font-editorial text-xl text-[#C5A059]">Active Logos & Favicon</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-[#C5A059] block">Main Studio Logo</label>
              <div className="aspect-[16/9] bg-[#16070B] border border-[#421620] flex items-center justify-center overflow-hidden relative group">
                {form.logoUrl ? (
                  <img src={form.logoUrl} alt="Logo preview" className="w-full h-full object-contain p-4" />
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon className="w-8 h-8 text-[#C5A059]/40 mx-auto mb-2" />
                    <span className="text-xs text-[#F3EFEA]/50">Rich Nana Text/Emblem Logo</span>
                  </div>
                )}
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-xs uppercase tracking-widest text-white">
                  <Upload className="w-4 h-4 mr-2" /> Upload Logo
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-[#C5A059] block">Browser Favicon</label>
              <div className="aspect-[16/9] bg-[#16070B] border border-[#421620] flex items-center justify-center overflow-hidden relative group">
                {form.faviconUrl ? (
                  <img src={form.faviconUrl} alt="Favicon preview" className="w-12 h-12 object-contain" />
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon className="w-6 h-6 text-[#C5A059]/40 mx-auto mb-1" />
                    <span className="text-xs text-[#F3EFEA]/50">Favicon Icon</span>
                  </div>
                )}
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-xs uppercase tracking-widest text-white">
                  <Upload className="w-4 h-4 mr-2" /> Upload Favicon
                  <input type="file" accept="image/*" onChange={handleFaviconUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="bg-[#220A10] p-6 border border-[#421620] space-y-6">
          <h3 className="font-editorial text-xl text-[#C5A059]">Business Identity & Location</h3>

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
              <label className="text-xs uppercase tracking-wider text-[#C5A059]">Tagline</label>
              <input
                type="text"
                value={form.tagline || ''}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none focus:border-[#C5A059]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#C5A059]">WhatsApp Number</label>
              <input
                type="text"
                value={form.whatsappNumber || ''}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none focus:border-[#C5A059]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#C5A059]">Instagram Handle</label>
              <input
                type="text"
                value={form.instagramHandle || ''}
                onChange={(e) => setForm({ ...form, instagramHandle: e.target.value })}
                className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none focus:border-[#C5A059]"
                required
              />
            </div>
          </div>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#C5A059]">Google Maps URL</label>
              <input
                type="url"
                value={form.googleMapsUrl || ''}
                onChange={(e) => setForm({ ...form, googleMapsUrl: e.target.value })}
                className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none focus:border-[#C5A059]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#C5A059]">Opening Hours</label>
              <input
                type="text"
                value={form.openingHours || ''}
                onChange={(e) => setForm({ ...form, openingHours: e.target.value })}
                className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none focus:border-[#C5A059]"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-[#C5A059] hover:bg-[#b08b47] text-[#16070B] font-semibold text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          <span>{saving ? 'Menyimpan ke Firestore...' : 'Save Branding & Logo'}</span>
        </button>
      </form>
    </div>
  );
};
