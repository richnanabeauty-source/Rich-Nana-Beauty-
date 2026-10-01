import React, { useState } from 'react';
import { useRichNanaStore } from './utils/store';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandIntro } from './components/BrandIntro';
import { ServicesSection } from './components/ServicesSection';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { StandardSection } from './components/StandardSection';
import { StudioSection } from './components/StudioSection';
import { ReviewsSection } from './components/ReviewsSection';
import { PromotionSection } from './components/PromotionSection';
import { PortfolioSection } from './components/PortfolioSection';
import { InstagramSection } from './components/InstagramSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { OwnerLoginModal } from './components/admin/OwnerLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ServiceItem } from './types';
import { Phone } from 'lucide-react';

export default function App() {
  const {
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
    analytics, trackEvent,
    isOwnerLoggedIn, setIsOwnerLoggedIn,
    addBooking
  } = useRichNanaStore();

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);
  const [ownerLoginModalOpen, setOwnerLoginModalOpen] = useState(false);

  const handleOpenBookingWithService = (serviceName?: string) => {
    setPreselectedService(serviceName);
    setBookingModalOpen(true);
    trackEvent('bookingClicks');
  };

  if (isOwnerLoggedIn) {
    return (
      <AdminDashboard
        onClose={() => setIsOwnerLoggedIn(false)}
        onLogout={() => setIsOwnerLoggedIn(false)}
        services={services}
        setServices={setServices}
        portfolio={portfolio}
        setPortfolio={setPortfolio}
        reviews={reviews}
        setReviews={setReviews}
        promotions={promotions}
        setPromotions={setPromotions}
        interior={interior}
        setInterior={setInterior}
        bookings={bookings}
        setBookings={setBookings}
        sections={sections}
        setSections={setSections}
        seo={seo}
        setSeo={setSeo}
        branding={branding}
        setBranding={setBranding}
        googleMaps={googleMaps}
        setGoogleMaps={setGoogleMaps}
        theme={theme}
        setTheme={setTheme}
        googleBusiness={googleBusiness}
        setGoogleBusiness={setGoogleBusiness}
        logAction={logAction}
        analytics={analytics}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#16070B] text-[#F3EFEA] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#C5A059]/30 selection:text-white relative">
      
      {/* Header */}
      <Header
        branding={branding}
        onOpenBooking={() => handleOpenBookingWithService()}
        onOpenOwnerModal={() => setOwnerLoginModalOpen(true)}
      />

      {/* Hero */}
      <Hero
        branding={branding}
        onOpenBooking={() => handleOpenBookingWithService()}
      />

      {/* Brand Intro */}
      <BrandIntro />

      {/* Services Section */}
      <ServicesSection
        services={services}
        onSelectService={(s) => setSelectedServiceDetail(s)}
        onOpenBookingWithService={handleOpenBookingWithService}
      />

      {/* The Rich Nana Standard */}
      <StandardSection />

      {/* Studio Experience */}
      <StudioSection interior={interior} />

      {/* Limited Promotion */}
      <PromotionSection
        promotions={promotions}
        onOpenBookingWithService={handleOpenBookingWithService}
      />

      {/* Editorial Portfolio */}
      <PortfolioSection portfolio={portfolio} />

      {/* Reviews Section */}
      <ReviewsSection 
        reviews={reviews} 
        googleBusiness={googleBusiness}
      />

      {/* Instagram Feed */}
      <InstagramSection branding={branding} />

      {/* Location Section */}
      <LocationSection 
        branding={branding} 
        googleMaps={googleMaps}
      />

      {/* Footer */}
      <Footer
        branding={branding}
        onOpenOwnerModal={() => setOwnerLoginModalOpen(true)}
      />

      {/* Floating WhatsApp Quick Action */}
      <aside aria-label="Quick Actions" className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
        <a
          href={`https://wa.me/${branding.whatsappNumber}?text=Hello%20Rich%20Nana%20Beauty,%20I%20would%20like%20to%20inquire%20about%20appointments.`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsappClicks')}
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
          title="Chat via WhatsApp"
        >
          <Phone className="w-6 h-6" />
        </a>
      </aside>

      {/* Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        services={services}
        preselectedServiceName={preselectedService}
        onAddBooking={addBooking}
      />

      <ServiceDetailModal
        service={selectedServiceDetail}
        onClose={() => setSelectedServiceDetail(null)}
        onOpenBookingWithService={handleOpenBookingWithService}
      />

      <OwnerLoginModal
        isOpen={ownerLoginModalOpen}
        onClose={() => setOwnerLoginModalOpen(false)}
        onLoginSuccess={() => setIsOwnerLoggedIn(true)}
      />

    </div>
  );
}
