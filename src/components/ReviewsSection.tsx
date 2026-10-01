import React from 'react';
import { ReviewItem, GoogleBusinessSettings } from '../types';
import { Star, Quote, CheckCircle } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  googleBusiness: GoogleBusinessSettings;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, googleBusiness }) => {
  return (
    <section id="reviews" className="py-28 bg-[#220A10] border-y border-[#421620] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium">
                Verified Experiences
              </span>
              {googleBusiness.status === 'connected' && (
                <span className="text-[10px] bg-[#C5A059]/20 text-[#C5A059] px-2.5 py-0.5 uppercase tracking-widest border border-[#C5A059]/40">
                  Google Verified ★ {googleBusiness.rating.toFixed(1)} ({googleBusiness.reviewCount} Reviews)
                </span>
              )}
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#F3EFEA]">
              Words From Our Clients
            </h2>
          </div>

          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border border-[#C5A059]/40 hover:bg-[#C5A059]/10 text-[#C5A059] uppercase text-xs tracking-[0.2em] px-6 py-3.5 transition-all inline-flex items-center gap-2 self-start md:self-auto"
          >
            <span>View Google Reviews</span>
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map(review => (
            <div 
              key={review.id}
              className="bg-[#16070B] p-8 md:p-10 border border-[#421620] flex flex-col justify-between relative group hover:border-[#C5A059]/50 transition-colors"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#421620] group-hover:text-[#C5A059]/20 transition-colors" />

              <div className="space-y-6">
                <div className="flex items-center space-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                  ))}
                </div>

                <p className="text-[#F3EFEA]/80 text-sm md:text-base font-light italic leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#421620]/80 flex items-center justify-between">
                <div>
                  <div className="font-editorial text-xl text-[#F3EFEA] flex items-center gap-2">
                    <span>{review.author}</span>
                    {review.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-[#C5A059]" />
                    )}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-[#C5A059] mt-0.5">
                    {review.service}
                  </div>
                </div>

                <div className="text-[10px] text-[#F3EFEA]/40 uppercase tracking-widest">
                  {review.date}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
