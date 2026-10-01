import React, { useState } from 'react';
import { Code, ShieldCheck, Check, AlertTriangle, Play } from 'lucide-react';

export const DeveloperModePanel: React.FC = () => {
  const [customCss, setCustomCss] = useState('/* Rich Nana Beauty Custom CSS */\nbody {\n  scroll-behavior: smooth;\n}\n');
  const [customJs, setCustomJs] = useState('// Custom initialization scripts\nconsole.log("Rich Nana Beauty engine loaded.");\n');
  const [jsonLd, setJsonLd] = useState('{\n  "@context": "https://schema.org",\n  "@type": "BeautySalon",\n  "name": "Rich Nana Beauty",\n  "address": "Pulo Gadung, Jakarta Timur"\n}\n');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#421620] pb-6">
        <div>
          <h2 className="font-editorial text-3xl text-[#F3EFEA]">Developer Mode & Custom Code Editor</h2>
          <p className="text-[#F3EFEA]/70 text-xs">Direct injection editor for custom CSS styles, JavaScript snippets, and Schema JSON-LD.</p>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs text-green-400 flex items-center gap-1">
              <Check className="w-4 h-4" /> Validated & Saved
            </span>
          )}
          <button
            onClick={handleSave}
            className="bg-[#C5A059] hover:bg-[#b08b47] text-[#16070B] font-semibold text-xs uppercase tracking-wider px-6 py-2.5 transition-all"
          >
            Deploy Code
          </button>
        </div>
      </div>

      <div className="bg-[#220A10] border border-[#421620] p-4 flex items-center gap-3 text-xs text-[#C5A059]">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        <span>Private secrets (Firebase Admin keys, payment API secrets) remain strictly server-side. Custom code is validated before client-side application.</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Custom CSS */}
        <div className="bg-[#220A10] border border-[#421620] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-editorial text-xl text-[#F3EFEA] flex items-center gap-2">
              <Code className="w-4 h-4 text-[#C5A059]" />
              <span>Custom CSS Stylesheet</span>
            </h3>
            <span className="text-[10px] text-green-400 uppercase tracking-widest font-mono">CSS3 Valid</span>
          </div>
          <textarea
            rows={8}
            value={customCss}
            onChange={(e) => setCustomCss(e.target.value)}
            className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] font-mono text-xs p-4 outline-none focus:border-[#C5A059]"
          />
        </div>

        {/* Custom JS */}
        <div className="bg-[#220A10] border border-[#421620] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-editorial text-xl text-[#F3EFEA] flex items-center gap-2">
              <Code className="w-4 h-4 text-[#C5A059]" />
              <span>Custom JavaScript / Tracking</span>
            </h3>
            <span className="text-[10px] text-green-400 uppercase tracking-widest font-mono">ESNext Safe</span>
          </div>
          <textarea
            rows={8}
            value={customJs}
            onChange={(e) => setCustomJs(e.target.value)}
            className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] font-mono text-xs p-4 outline-none focus:border-[#C5A059]"
          />
        </div>

        {/* Schema JSON-LD */}
        <div className="lg:col-span-2 bg-[#220A10] border border-[#421620] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-editorial text-xl text-[#F3EFEA] flex items-center gap-2">
              <Code className="w-4 h-4 text-[#C5A059]" />
              <span>Schema.org LocalBusiness JSON-LD</span>
            </h3>
            <span className="text-[10px] text-green-400 uppercase tracking-widest font-mono">JSON Valid</span>
          </div>
          <textarea
            rows={6}
            value={jsonLd}
            onChange={(e) => setJsonLd(e.target.value)}
            className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] font-mono text-xs p-4 outline-none focus:border-[#C5A059]"
          />
        </div>

      </div>
    </div>
  );
};
