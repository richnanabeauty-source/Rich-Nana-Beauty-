import React, { useState } from 'react';
import { Sliders, Layout, Type, Palette, Sparkles, Monitor, Tablet, Smartphone, Eye, Check } from 'lucide-react';
import { SiteSection } from '../../types';

interface ElementInspectorProps {
  sections: SiteSection[];
  onUpdateSections: (sections: SiteSection[]) => void;
}

export const ElementInspector: React.FC<ElementInspectorProps> = ({ sections, onUpdateSections }) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>(sections[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'content' | 'layout' | 'style' | 'typography' | 'animation' | 'responsive'>('content');
  const [savedMessage, setSavedMessage] = useState(false);

  const currentSection = sections.find(s => s.id === selectedSectionId) || sections[0];

  const handleSave = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  if (!currentSection) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#421620] pb-6">
        <div>
          <h2 className="font-editorial text-3xl text-[#F3EFEA]">Element Inspector & Page Builder</h2>
          <p className="text-[#F3EFEA]/70 text-xs">Webflow / Elementor-like live property inspector for Rich Nana Beauty components.</p>
        </div>

        <div className="flex items-center gap-3">
          {savedMessage && (
            <span className="text-xs text-green-400 flex items-center gap-1">
              <Check className="w-4 h-4" /> Changes Applied Live
            </span>
          )}
          <button
            onClick={handleSave}
            className="bg-[#C5A059] hover:bg-[#b08b47] text-[#16070B] font-semibold text-xs uppercase tracking-wider px-6 py-2.5 transition-all"
          >
            Publish Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Section Selector & Tree */}
        <div className="lg:col-span-4 bg-[#220A10] border border-[#421620] p-6 space-y-4">
          <h3 className="font-editorial text-xl text-[#C5A059]">Page Elements Registry</h3>
          <div className="space-y-2">
            {sections.map((sec, idx) => (
              <div
                key={sec.id}
                onClick={() => setSelectedSectionId(sec.id)}
                className={`p-3.5 border cursor-pointer transition-all flex items-center justify-between ${selectedSectionId === sec.id ? 'bg-[#C5A059]/10 border-[#C5A059] text-[#C5A059]' : 'bg-[#16070B] border-[#421620] text-[#F3EFEA]/80 hover:border-[#C5A059]/40'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs opacity-50">#{idx + 1}</span>
                  <span className="font-medium text-xs uppercase tracking-wider">{sec.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${sec.visible ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Inspector Properties Panel */}
        <div className="lg:col-span-8 bg-[#220A10] border border-[#421620] p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#421620] pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059]">Inspecting Element</span>
              <h3 className="font-editorial text-2xl text-[#F3EFEA]">{currentSection.name}</h3>
            </div>

            {/* Inspector Tabs */}
            <div className="flex flex-wrap gap-1">
              {(['content', 'layout', 'style', 'typography', 'animation', 'responsive'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-wider transition-all border ${activeTab === tab ? 'bg-[#C5A059] text-[#16070B] border-[#C5A059] font-semibold' : 'bg-[#16070B] text-[#F3EFEA]/70 border-[#421620]'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6 pt-2">
            {activeTab === 'content' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#C5A059]">Section Title</label>
                  <input
                    type="text"
                    value={currentSection.title || currentSection.name}
                    onChange={(e) => {
                      const updated = sections.map(s => s.id === currentSection.id ? { ...s, title: e.target.value } : s);
                      onUpdateSections(updated);
                    }}
                    className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#C5A059]">Visibility Status</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={currentSection.visible}
                        onChange={(e) => {
                          const updated = sections.map(s => s.id === currentSection.id ? { ...s, visible: e.target.checked } : s);
                          onUpdateSections(updated);
                        }}
                        className="accent-[#C5A059]"
                      />
                      <span>Show on Public Website</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'layout' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#C5A059]">Container Width</label>
                  <select className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none">
                    <option>Max 7XL (1280px)</option>
                    <option>Max 5XL (1024px)</option>
                    <option>Full Width (100%)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#C5A059]">Vertical Padding</label>
                  <select className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none">
                    <option>Py-28 (Luxury Spacing)</option>
                    <option>Py-20 (Standard)</option>
                    <option>Py-12 (Compact)</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'style' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#C5A059]">Background Tone</label>
                  <select className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none">
                    <option>Deep Burgundy (#16070B)</option>
                    <option>Card Burgundy (#220A10)</option>
                    <option>Pure Black Overlay</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#C5A059]">Border Style</label>
                  <select className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none">
                    <option>Subtle Wine Border (#421620)</option>
                    <option>Champagne Gold Border (#C5A059/40)</option>
                    <option>No Border</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'typography' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#C5A059]">Heading Font Family</label>
                  <select className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none">
                    <option>Cormorant Garamond (Editorial Serif)</option>
                    <option>Plus Jakarta Sans (Modern Sans)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#C5A059]">Letter Spacing</label>
                  <select className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none">
                    <option>Tracking Tight (-0.02em)</option>
                    <option>Tracking Normal</option>
                    <option>Tracking Widest (0.25em)</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'animation' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#C5A059]">Entrance Animation</label>
                  <select className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none">
                    <option>Fade In Reveal</option>
                    <option>Slide Up Smooth</option>
                    <option>Zoom Scale Subtle</option>
                    <option>None</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#C5A059]">Duration</label>
                  <select className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none">
                    <option>700ms (Luxury Slow)</option>
                    <option>500ms (Standard)</option>
                    <option>300ms (Fast)</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'responsive' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 border-b border-[#421620] pb-4">
                  <button className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C5A059] font-semibold pb-2 border-b-2 border-[#C5A059]">
                    <Monitor className="w-4 h-4" /> Desktop (1024px+)
                  </button>
                  <button className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#F3EFEA]/60 pb-2">
                    <Tablet className="w-4 h-4" /> Tablet (768px)
                  </button>
                  <button className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#F3EFEA]/60 pb-2">
                    <Smartphone className="w-4 h-4" /> Mobile (375px)
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#C5A059]">Breakpoint Visibility</label>
                  <div className="grid grid-cols-3 gap-4">
                    <label className="flex items-center gap-2 text-xs text-[#F3EFEA]/80 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-[#C5A059]" /> Desktop
                    </label>
                    <label className="flex items-center gap-2 text-xs text-[#F3EFEA]/80 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-[#C5A059]" /> Tablet
                    </label>
                    <label className="flex items-center gap-2 text-xs text-[#F3EFEA]/80 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-[#C5A059]" /> Mobile
                    </label>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
