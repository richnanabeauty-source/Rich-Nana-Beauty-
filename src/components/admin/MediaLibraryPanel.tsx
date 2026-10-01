import React, { useState } from 'react';
import { ImageIcon, Upload, Trash2, Search, Tag, Check } from 'lucide-react';

interface MediaAsset {
  id: string;
  name: string;
  url: string;
  category: string;
  usage: string;
  size: string;
}

export const MediaLibraryPanel: React.FC = () => {
  const [assets, setAssets] = useState<MediaAsset[]>([
    { id: 'm-1', name: 'rich-nana-hero-studio.jpg', url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1000', category: 'Studio', usage: 'Hero Banner', size: '2.4 MB' },
    { id: 'm-2', name: 'gel-polish-manicure.jpg', url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=1000', category: 'Nails', usage: 'Services Grid', size: '1.8 MB' },
    { id: 'm-3', name: 'cat-eye-lashes.jpg', url: 'https://images.unsplash.com/photo-1583001931096-9593fcf5e3f9?auto=format&fit=crop&q=80&w=1000', category: 'Lashes', usage: 'Portfolio', size: '1.5 MB' },
    { id: 'm-4', name: 'sulam-alis-brows.jpg', url: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=1000', category: 'Brows', usage: 'Portfolio', size: '2.1 MB' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = assets.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.category.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#421620] pb-6">
        <div>
          <h2 className="font-editorial text-3xl text-[#F3EFEA]">Advanced Media Library</h2>
          <p className="text-[#F3EFEA]/70 text-xs">Manage high-resolution assets, original sources, optimized derivatives, and usage tracking.</p>
        </div>

        <label className="bg-[#C5A059] hover:bg-[#b08b47] text-[#16070B] font-semibold text-xs uppercase tracking-wider px-6 py-3 cursor-pointer flex items-center gap-2 transition-all">
          <Upload className="w-4 h-4" />
          <span>Upload New Asset</span>
          <input type="file" className="hidden" onChange={() => alert('Asset uploaded successfully and optimized for delivery.')} />
        </label>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#F3EFEA]/40" />
          <input
            type="text"
            placeholder="Search media files by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#220A10] border border-[#421620] text-[#F3EFEA] pl-10 pr-4 py-3 text-xs outline-none focus:border-[#C5A059]"
          />
        </div>
        <div className="text-xs text-[#F3EFEA]/60">
          Total Assets: <strong className="text-[#C5A059]">{assets.length}</strong> (Originals preserved)
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map(asset => (
          <div key={asset.id} className="bg-[#220A10] border border-[#421620] overflow-hidden flex flex-col justify-between group">
            <div className="relative aspect-[4/3] bg-[#16070B] overflow-hidden">
              <img src={asset.url} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-2 left-2 bg-[#16070B]/80 text-[#C5A059] px-2 py-0.5 text-[10px] uppercase tracking-wider border border-[#421620]">
                {asset.category}
              </span>
            </div>
            <div className="p-4 space-y-2">
              <div className="font-medium text-xs text-[#F3EFEA] truncate" title={asset.name}>{asset.name}</div>
              <div className="flex items-center justify-between text-[10px] text-[#F3EFEA]/50">
                <span>Usage: <strong className="text-[#C5A059]">{asset.usage}</strong></span>
                <span>{asset.size}</span>
              </div>
              <div className="pt-2 border-t border-[#421620] flex items-center justify-between">
                <span className="text-[10px] text-green-400">Original Protected</span>
                <button
                  onClick={() => setAssets(assets.filter(a => a.id !== asset.id))}
                  className="text-red-400 hover:text-red-300 p-1"
                  title="Delete Asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
