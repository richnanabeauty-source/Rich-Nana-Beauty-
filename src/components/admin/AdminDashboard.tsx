import React, { useState } from 'react';
import { 
  X, LayoutDashboard, Scissors, Image as ImageIcon, Calendar, Star, 
  Tag, BarChart3, Settings, ShieldCheck, LogOut, Plus, Trash2, Edit, Check, Eye,
  Sliders, Code, Users, Database, Activity, HardDrive, Menu, MapPin, Palette, Cloud
} from 'lucide-react';
import { 
  ServiceItem, PortfolioItem, ReviewItem, PromotionItem, InteriorItem, 
  BookingRecord, SiteSection, SeoSettings, AnalyticsData, BrandingSettings, 
  ThemeSettings, MediaAsset, GoogleBusinessSettings, GoogleMapsSettings, ActivityLogItem 
} from '../../types';
import { ElementInspector } from './ElementInspector';
import { DeveloperModePanel } from './DeveloperModePanel';
import { MediaLibraryPanel } from './MediaLibraryPanel';
import { RBACPanel } from './RBACPanel';
import { DatabaseViewerPanel } from './DatabaseViewerPanel';
import { WebsiteHealthPanel } from './WebsiteHealthPanel';
import { BrandingLogoPanel } from './BrandingLogoPanel';
import { GoogleBusinessPanel } from './GoogleBusinessPanel';
import { OwnerLocationManager } from './OwnerLocationManager';
import { GoogleDriveIntegrationPanel } from './GoogleDriveIntegrationPanel';
import { GoogleMapsAdminPanel } from './GoogleMapsAdminPanel';

interface AdminDashboardProps {
  onClose: () => void;
  onLogout: () => void;
  services: ServiceItem[];
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  portfolio: PortfolioItem[];
  setPortfolio: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
  reviews: ReviewItem[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewItem[]>>;
  promotions: PromotionItem[];
  setPromotions: React.Dispatch<React.SetStateAction<PromotionItem[]>>;
  interior: InteriorItem[];
  setInterior: React.Dispatch<React.SetStateAction<InteriorItem[]>>;
  bookings: BookingRecord[];
  setBookings: React.Dispatch<React.SetStateAction<BookingRecord[]>>;
  sections: SiteSection[];
  setSections: React.Dispatch<React.SetStateAction<SiteSection[]>>;
  seo: SeoSettings;
  setSeo: React.Dispatch<React.SetStateAction<SeoSettings>>;
  branding: BrandingSettings;
  setBranding: React.Dispatch<React.SetStateAction<BrandingSettings>>;
  googleMaps: GoogleMapsSettings;
  setGoogleMaps: React.Dispatch<React.SetStateAction<GoogleMapsSettings>>;
  theme: ThemeSettings;
  setTheme: React.Dispatch<React.SetStateAction<ThemeSettings>>;
  googleBusiness: GoogleBusinessSettings;
  setGoogleBusiness: React.Dispatch<React.SetStateAction<GoogleBusinessSettings>>;
  logAction: (action: string, module: string) => void;
  analytics: AnalyticsData;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onClose, onLogout,
  services, setServices,
  portfolio, setPortfolio,
  reviews, setReviews,
  promotions, setPromotions,
  interior, setInterior,
  bookings, setBookings,
  sections, setSections,
  seo, setSeo,
  branding, setBranding,
  googleMaps, setGoogleMaps,
  theme, setTheme,
  googleBusiness, setGoogleBusiness,
  logAction,
  analytics
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'services' | 'portfolio' | 'bookings' | 'reviews' | 'promotions' | 'seo' | 'branding' | 'google' | 'locationMgr' | 'gmaps' | 'gdrive' | 'inspector' | 'developer' | 'media' | 'rbac' | 'database' | 'health'
  >('overview');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // New Service Form State
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('Rp ');
  const [newServiceDuration, setNewServiceDuration] = useState('60 mnt');
  const [newServiceCategory, setNewServiceCategory] = useState<'nail' | 'eyelash' | 'sulam_alis' | 'sulam_bibir' | 'hair'>('nail');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServiceImage, setNewServiceImage] = useState('https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=1000');

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName) return;
    const item: ServiceItem = {
      id: `s-${Date.now()}`,
      name: newServiceName,
      price: newServicePrice,
      duration: newServiceDuration,
      category: newServiceCategory,
      description: newServiceDesc || 'Professional treatment by master specialists.',
      image: newServiceImage,
      includes: ['Consultation', 'Premium execution', 'Aftercare consultation']
    };
    setServices([item, ...services]);
    logAction(`Created new service: ${newServiceName}`, 'Services');
    setNewServiceName('');
    setNewServiceDesc('');
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
    logAction('Deleted service item', 'Services');
  };

  const handleUpdateBookingStatus = (id: string, status: BookingRecord['status']) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
    logAction(`Updated booking status to ${status}`, 'Bookings');
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'branding', label: 'Branding & Logo', icon: Palette },
    { id: 'gmaps', label: 'Google Maps Embed', icon: MapPin },
    { id: 'google', label: 'Verified Google Rating', icon: Star },
    { id: 'gdrive', label: 'Google Drive Integration', icon: Cloud },
    { id: 'services', label: 'Services & Pricing', icon: Scissors },
    { id: 'portfolio', label: 'Portfolio & Gallery', icon: ImageIcon },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'promotions', label: 'Promotions', icon: Tag },
    { id: 'inspector', label: 'Element Inspector', icon: Sliders },
    { id: 'developer', label: 'Developer Mode', icon: Code },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'rbac', label: 'RBAC & Users', icon: Users },
    { id: 'database', label: 'Database Viewer', icon: Database },
    { id: 'health', label: 'Website Health', icon: Activity },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#16070B] text-[#F3EFEA] animate-fadeIn">
      
      {/* Top Bar */}
      <header className="bg-[#220A10] border-b border-[#421620] px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#F3EFEA] hover:text-[#C5A059] p-1"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="w-8 h-8 md:w-9 md:h-9 bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#C5A059] shrink-0">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div>
            <h1 className="font-editorial text-lg sm:text-xl md:text-2xl font-semibold tracking-wider text-[#F3EFEA] leading-tight">
              Rich Nana Owner Center
            </h1>
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#C5A059] block">
              Enterprise OS
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <button
            onClick={onLogout}
            className="border border-[#421620] hover:border-[#C5A059] text-[#F3EFEA]/70 hover:text-[#C5A059] text-[10px] md:text-xs uppercase tracking-wider px-3 md:px-4 py-2 transition-colors"
          >
            <span>Logout</span>
          </button>
          <button
            onClick={onClose}
            className="bg-[#C5A059] hover:bg-[#b08b47] text-[#16070B] font-semibold text-[10px] md:text-xs uppercase tracking-wider px-3 md:px-6 py-2 transition-colors"
          >
            Website
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[73px] left-0 right-0 z-50 bg-[#220A10] border-b border-[#421620] p-6 space-y-2 shadow-2xl max-h-[80vh] overflow-y-auto">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] mb-2">Navigation Menu</div>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as any); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider transition-colors text-left ${activeTab === item.id ? 'bg-[#C5A059] text-[#16070B] font-semibold' : 'text-[#F3EFEA]/80 bg-[#16070B]'}`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Desktop Sidebar Nav */}
        <aside className="w-64 bg-[#220A10]/60 border-r border-[#421620] p-6 space-y-1.5 hidden md:block overflow-y-auto">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] mb-3 px-3">Management Portal</div>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs uppercase tracking-wider transition-colors text-left ${activeTab === item.id ? 'bg-[#C5A059] text-[#16070B] font-semibold' : 'text-[#F3EFEA]/70 hover:bg-[#421620]/40'}`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-12">
          
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="font-editorial text-3xl text-[#F3EFEA] mb-2">Studio Performance & Analytics</h2>
                <p className="text-[#F3EFEA]/70 text-xs">Real-time engagement metrics across customer touchpoints in Pulo Gadung, Jakarta Timur.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#220A10] p-6 border border-[#421620]">
                  <div className="text-[10px] uppercase tracking-widest text-[#C5A059] mb-1">Total Visitors</div>
                  <div className="font-editorial text-4xl text-[#F3EFEA]">{analytics.visitors}</div>
                  <div className="text-[11px] text-[#F3EFEA]/40 mt-2">+14% this month</div>
                </div>

                <div className="bg-[#220A10] p-6 border border-[#421620]">
                  <div className="text-[10px] uppercase tracking-widest text-[#C5A059] mb-1">Page Views</div>
                  <div className="font-editorial text-4xl text-[#F3EFEA]">{analytics.pageViews}</div>
                  <div className="text-[11px] text-[#F3EFEA]/40 mt-2">Active session engagement</div>
                </div>

                <div className="bg-[#220A10] p-6 border border-[#421620]">
                  <div className="text-[10px] uppercase tracking-widest text-[#C5A059] mb-1">WhatsApp Clicks</div>
                  <div className="font-editorial text-4xl text-[#F3EFEA]">{analytics.whatsappClicks}</div>
                  <div className="text-[11px] text-[#F3EFEA]/40 mt-2">Direct booking inquiries</div>
                </div>

                <div className="bg-[#220A10] p-6 border border-[#421620]">
                  <div className="text-[10px] uppercase tracking-widest text-[#C5A059] mb-1">Online Reservations</div>
                  <div className="font-editorial text-4xl text-[#F3EFEA]">{bookings.length}</div>
                  <div className="text-[11px] text-[#C5A059] mt-2">Ready for confirmation</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'branding' && (
            <BrandingLogoPanel
              branding={branding}
              onUpdateBranding={setBranding}
              onLogAction={logAction}
            />
          )}

          {activeTab === 'gmaps' && (
            <GoogleMapsAdminPanel
              googleMaps={googleMaps}
              onUpdateGoogleMaps={setGoogleMaps}
              onLogAction={logAction}
            />
          )}

          {activeTab === 'google' && (
            <GoogleBusinessPanel
              googleBusiness={googleBusiness}
              onUpdateGoogle={setGoogleBusiness}
              onLogAction={logAction}
            />
          )}

          {activeTab === 'gdrive' && (
            <GoogleDriveIntegrationPanel />
          )}

          {activeTab === 'services' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#421620] pb-6">
                <div>
                  <h2 className="font-editorial text-3xl text-[#F3EFEA]">Services & Pricing Management</h2>
                  <p className="text-[#F3EFEA]/70 text-xs">Update official salon pricelist for Nails, Lashes, Sulam Alis, Sulam Bibir, and Hair.</p>
                </div>
              </div>

              {/* Add Service Form */}
              <form onSubmit={handleAddService} className="bg-[#220A10] p-6 border border-[#421620] space-y-4">
                <h3 className="font-editorial text-xl text-[#C5A059]">Add New Signature Service</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Service Name"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    className="bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs focus:border-[#C5A059] outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Price (e.g. Rp 250.000)"
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(e.target.value)}
                    className="bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs focus:border-[#C5A059] outline-none"
                    required
                  />
                  <select
                    value={newServiceCategory}
                    onChange={(e) => setNewServiceCategory(e.target.value as any)}
                    className="bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs focus:border-[#C5A059] outline-none"
                  >
                    <option value="nail">Nail</option>
                    <option value="eyelash">Eyelash</option>
                    <option value="sulam_alis">Sulam Alis</option>
                    <option value="sulam_bibir">Sulam Bibir</option>
                    <option value="hair">Hair</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Duration (e.g. 60 mnt)"
                    value={newServiceDuration}
                    onChange={(e) => setNewServiceDuration(e.target.value)}
                    className="bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs focus:border-[#C5A059] outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newServiceImage}
                    onChange={(e) => setNewServiceImage(e.target.value)}
                    className="bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs focus:border-[#C5A059] outline-none"
                  />
                </div>
                <textarea
                  placeholder="Service description..."
                  value={newServiceDesc}
                  onChange={(e) => setNewServiceDesc(e.target.value)}
                  className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs focus:border-[#C5A059] outline-none resize-none"
                  rows={2}
                />
                <button
                  type="submit"
                  className="bg-[#C5A059] hover:bg-[#b08b47] text-[#16070B] font-semibold text-xs uppercase tracking-wider px-6 py-3 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </form>

              {/* Service List Table */}
              <div className="bg-[#220A10] border border-[#421620] overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#16070B] text-[#C5A059] uppercase tracking-wider border-b border-[#421620]">
                    <tr>
                      <th className="p-4">Service</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Duration</th>
                      <th className="p-4">Price</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#421620]">
                    {services.map(s => (
                      <tr key={s.id} className="hover:bg-[#16070B]/40">
                        <td className="p-4 flex items-center gap-3">
                          <img src={s.image} alt={s.name} className="w-10 h-10 object-cover border border-[#421620]" />
                          <span className="font-semibold text-[#F3EFEA]">{s.name}</span>
                        </td>
                        <td className="p-4 uppercase tracking-wider text-[#C5A059]">{s.category}</td>
                        <td className="p-4 text-[#F3EFEA]/70">{s.duration}</td>
                        <td className="p-4 font-editorial text-base text-[#F3EFEA]">{s.price}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteService(s.id)}
                            className="text-red-400 hover:text-red-300 p-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="font-editorial text-3xl text-[#F3EFEA] mb-2">Customer Reservations</h2>
                <p className="text-[#F3EFEA]/70 text-xs">Manage incoming client bookings and appointment statuses.</p>
              </div>

              <div className="bg-[#220A10] border border-[#421620] overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#16070B] text-[#C5A059] uppercase tracking-wider border-b border-[#421620]">
                    <tr>
                      <th className="p-4">Client</th>
                      <th className="p-4">Service</th>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#421620]">
                    {bookings.map(b => (
                      <tr key={b.id} className="hover:bg-[#16070B]/40">
                        <td className="p-4 font-semibold text-[#F3EFEA]">{b.clientName}</td>
                        <td className="p-4 text-[#C5A059]">{b.serviceName}</td>
                        <td className="p-4 text-[#F3EFEA]/80">{b.date} at {b.time}</td>
                        <td className="p-4 text-[#F3EFEA]/70">{b.clientPhone}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider border ${b.status === 'confirmed' ? 'bg-green-500/10 text-green-400 border-green-500/30' : b.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          {b.status === 'pending' && (
                            <button
                              onClick={() => handleUpdateBookingStatus(b.id, 'confirmed')}
                              className="bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 uppercase text-[10px]"
                            >
                              Confirm
                            </button>
                          )}
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, 'completed')}
                            className="border border-[#421620] hover:border-[#C5A059] text-[#F3EFEA] px-3 py-1.5 uppercase text-[10px]"
                          >
                            Complete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-8 animate-fadeIn">
              <h2 className="font-editorial text-3xl text-[#F3EFEA] mb-2">Portfolio Curation</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {portfolio.map(item => (
                  <div key={item.id} className="bg-[#220A10] border border-[#421620] overflow-hidden flex flex-col justify-between">
                    <div className="aspect-square bg-[#16070B] overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-[#C5A059]">{item.category}</span>
                      <h4 className="font-editorial text-lg text-[#F3EFEA] line-clamp-1">{item.title}</h4>
                      <button
                        onClick={() => {
                          setPortfolio(portfolio.filter(p => p.id !== item.id));
                          logAction('Deleted portfolio item', 'Portfolio');
                        }}
                        className="text-xs text-red-400 hover:underline pt-2 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Item</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8 animate-fadeIn">
              <h2 className="font-editorial text-3xl text-[#F3EFEA] mb-2">Verified Reviews</h2>
              <div className="space-y-4">
                {reviews.map(r => (
                  <div key={r.id} className="bg-[#220A10] p-6 border border-[#421620] flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-editorial text-xl text-[#F3EFEA]">{r.author}</span>
                        <span className="text-xs text-[#C5A059]">({r.service})</span>
                        <span className="text-[10px] bg-[#C5A059]/20 text-[#C5A059] px-2 py-0.5 uppercase tracking-wider">{r.source}</span>
                      </div>
                      <p className="text-xs text-[#F3EFEA]/70">&ldquo;{r.comment}&rdquo;</p>
                    </div>
                    <button
                      onClick={() => {
                        setReviews(reviews.filter(rev => rev.id !== r.id));
                        logAction('Deleted review', 'Reviews');
                      }}
                      className="text-red-400 hover:text-red-300 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'promotions' && (
            <div className="space-y-8 animate-fadeIn">
              <h2 className="font-editorial text-3xl text-[#F3EFEA] mb-2">Promotions & Campaigns</h2>
              <div className="bg-[#220A10] p-6 border border-[#421620] space-y-4 max-w-xl">
                {promotions.map(p => (
                  <div key={p.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-[#C5A059]">{p.badge}</span>
                      <span className="font-editorial text-xl text-[#F3EFEA]">{p.price}</span>
                    </div>
                    <h3 className="font-editorial text-2xl text-[#F3EFEA]">{p.title}</h3>
                    <p className="text-xs text-[#F3EFEA]/70">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-8 animate-fadeIn">
              <h2 className="font-editorial text-3xl text-[#F3EFEA] mb-2">SEO & Structured Data</h2>
              <div className="bg-[#220A10] p-6 border border-[#421620] space-y-4 max-w-2xl">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#C5A059]">Page Title</label>
                  <input
                    type="text"
                    value={seo.title}
                    onChange={(e) => setSeo({ ...seo, title: e.target.value })}
                    className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#C5A059]">Meta Description</label>
                  <textarea
                    rows={3}
                    value={seo.description}
                    onChange={(e) => setSeo({ ...seo, description: e.target.value })}
                    className="w-full bg-[#16070B] border border-[#421620] text-[#F3EFEA] p-3 text-xs outline-none focus:border-[#C5A059]"
                  />
                </div>
                <button
                  onClick={() => {
                    alert('SEO settings saved successfully!');
                    logAction('Updated SEO settings', 'SEO');
                  }}
                  className="bg-[#C5A059] text-[#16070B] font-semibold text-xs uppercase tracking-wider px-6 py-3"
                >
                  Save SEO Settings
                </button>
              </div>
            </div>
          )}

          {activeTab === 'inspector' && (
            <ElementInspector sections={sections} onUpdateSections={setSections} />
          )}

          {activeTab === 'developer' && (
            <DeveloperModePanel />
          )}

          {activeTab === 'media' && (
            <MediaLibraryPanel />
          )}

          {activeTab === 'rbac' && (
            <RBACPanel />
          )}

          {activeTab === 'database' && (
            <DatabaseViewerPanel />
          )}

          {activeTab === 'health' && (
            <WebsiteHealthPanel />
          )}

        </main>

      </div>
    </div>
  );
};
