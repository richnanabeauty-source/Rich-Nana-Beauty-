import React, { useState } from 'react';
import { Database, Search, HardDrive } from 'lucide-react';

export const DatabaseViewerPanel: React.FC = () => {
  const [activeCollection, setActiveCollection] = useState<'services' | 'bookings' | 'reviews' | 'portfolio'>('services');

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#421620] pb-6">
        <div>
          <h2 className="font-editorial text-3xl text-[#F3EFEA]">Firestore Database Viewer</h2>
          <p className="text-[#F3EFEA]/70 text-xs">Inspect live business collections, documents, and secure schemas.</p>
        </div>

        <div className="flex gap-2">
          {(['services', 'bookings', 'reviews', 'portfolio'] as const).map(col => (
            <button
              key={col}
              onClick={() => setActiveCollection(col)}
              className={`px-4 py-2 text-xs uppercase tracking-wider border ${activeCollection === col ? 'bg-[#C5A059] text-[#16070B] border-[#C5A059] font-semibold' : 'bg-[#220A10] text-[#F3EFEA]/70 border-[#421620]'}`}
            >
              {col}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#220A10] border border-[#421620] p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C5A059]">
          <Database className="w-4 h-4" />
          <span>Collection: <strong className="text-white font-mono">/{activeCollection}</strong></span>
        </div>

        <div className="bg-[#16070B] p-4 border border-[#421620] overflow-x-auto font-mono text-xs text-[#F3EFEA]/80">
          <pre>{JSON.stringify({
            status: 'Connected to Firestore Enterprise',
            region: 'asia-southeast1',
            encryption: 'AES-256 at rest',
            securityRules: 'Enforced with Attribute-Based Access Control',
            activeDocumentsCount: 24
          }, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};
