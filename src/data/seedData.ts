import { ServiceItem, PortfolioItem, ReviewItem, PromotionItem, InteriorItem, SiteSection, SeoSettings } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 's-nail-1',
    category: 'nail',
    name: 'Gel Polish & Classic Manicure',
    duration: '60 mnt',
    price: 'Rp 150.000',
    description: 'Clean, glossy, and refined gel manicure with meticulous cuticle care and premium imported gel polish.',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=1000',
    featured: true,
    includes: ['Nail shaping & cuticle grooming', 'Base coat protection', 'Premium gel polish application', 'Cuticle nourishing oil & hand massage']
  },
  {
    id: 's-nail-2',
    category: 'nail',
    name: 'Premium Nail Art & Design',
    duration: '120 mnt',
    price: 'Rp 300.000',
    description: 'Bespoke artistic nail designs crafted by senior master nail artists with intricate details and charms.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=1000',
    featured: true,
    includes: ['Custom consultation & design sketch', 'Full manicure prep', 'Multi-layer premium nail art execution', 'Top coat sealing & gloss finish']
  },
  {
    id: 's-nail-3',
    category: 'nail',
    name: 'Full Tip Extension + Art',
    duration: '120 mnt',
    price: 'Rp 300.000',
    description: 'Seamless lightweight nail extensions providing elegant length and natural durability.',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=1000',
    featured: false,
    includes: ['High-grade tip application', 'Structural reinforcement', 'Shaping & smoothing', 'Gel color finish']
  },
  {
    id: 's-lash-1',
    category: 'eyelash',
    name: 'Cat Eye Eyelash Extension',
    duration: '105 mnt',
    price: 'Rp 266.000',
    description: 'Enchanting elongated lash mapping designed to lift and mesmerize with feather-light weight.',
    image: 'https://images.unsplash.com/photo-1583001931096-9593fcf5e3f9?auto=format&fit=crop&q=80&w=1000',
    featured: true,
    includes: ['Lash cleansing & protein prep', 'Custom cat-eye mapping', 'Premium Korean silk extensions', 'Aftercare coating']
  },
  {
    id: 's-lash-2',
    category: 'eyelash',
    name: 'Volume / Wispy Anime Lashes',
    duration: '120 mnt',
    price: 'Rp 321.000',
    description: 'Luxurious multi-dimensional volume fans creating dramatic yet soft ethereal density.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1000',
    featured: false,
    includes: ['Custom fan creation', 'Featherweight isolation technique', 'Long-retention medical grade adhesive', 'Lash brush & care kit']
  },
  {
    id: 's-lash-3',
    category: 'eyelash',
    name: 'Lash Lift & Tint',
    duration: '60 mnt',
    price: 'Rp 153.000',
    description: 'Natural natural lash enhancement boosting your own lashes with keratin lift and deep tint.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000',
    featured: false,
    includes: ['Keratin lash lifting lotion', 'Black pigment tinting', 'Vitamin conditioning serum']
  },
  {
    id: 's-brows-1',
    category: 'sulam_alis',
    name: 'Signature Brows / Powder Brows',
    duration: '180 mnt',
    price: 'Rp 471.000',
    description: 'Flawless semi-permanent brow embroidery creating soft powder makeup finish tailored to facial symmetry.',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=1000',
    featured: true,
    includes: ['Detailed brow mapping & golden ratio measurement', 'Numbing cream application', 'Organic mineral pigments', 'Touch-up consultation']
  },
  {
    id: 's-brows-2',
    category: 'sulam_alis',
    name: 'Mist Shading Alis',
    duration: '150 mnt',
    price: 'Rp 392.000',
    description: 'Gentle pixelated gradient shading for natural everyday groomed brow perfection.',
    image: 'https://images.unsplash.com/photo-1522337093268-232bab814046?auto=format&fit=crop&q=80&w=1000',
    featured: false,
    includes: ['Symmetry design', 'Gradient mist technique', 'Post-care healing ointment']
  },
  {
    id: 's-lips-1',
    category: 'sulam_bibir',
    name: 'Premium Lip Blush',
    duration: '180 mnt',
    price: 'Rp 464.000',
    description: 'Revitalize dull lips with youthful natural pink/peach tint, correcting dark tones seamlessly.',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=1000',
    featured: true,
    includes: ['Lip neutralization & contouring', 'Vitamin C infusion', 'Organic tinted blush pigment', 'Aftercare nourishment']
  },
  {
    id: 's-hair-1',
    category: 'hair',
    name: 'Smoothing / Keratin Treatment',
    duration: '150 mnt',
    price: 'Rp 442.000',
    description: 'Silky smooth anti-frizz treatment infusing deep moisture and mirror-like shine into every strand.',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=1000',
    featured: true,
    includes: ['Deep cleansing wash', 'Keratin amino infusion', 'Precision thermal sealing', 'Post-treatment serum']
  },
  {
    id: 's-hair-2',
    category: 'hair',
    name: 'Luxury Creambath & Hair Spa',
    duration: '75 mnt',
    price: 'Rp 208.000',
    description: 'Relaxing scalp massage with botanical botanical cream baths to nourish roots and relieve tension.',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=1000',
    featured: false,
    includes: ['Aromatherapy scalp massage', 'Steam nutrient penetration', 'Shoulder & neck relaxation', 'Blowdry finish']
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'p-1',
    title: 'Minimalist Milky Glaze & Gold Foil',
    category: 'gel',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=1000',
    serviceId: 's-nail-1',
    description: 'Soft milky nude base layered with delicate chrome gold flakes for timeless understated elegance.',
    featured: true
  },
  {
    id: 'p-2',
    title: 'Cat Eye Emerald Glamour',
    category: 'nails',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=1000',
    serviceId: 's-nail-2',
    description: 'Deep magnetic emerald green reflecting light with every gesture.',
    featured: true
  },
  {
    id: 'p-3',
    title: 'Ethereal Cat-Eye Lash Mapping',
    category: 'lashes',
    image: 'https://images.unsplash.com/photo-1583001931096-9593fcf5e3f9?auto=format&fit=crop&q=80&w=1000',
    serviceId: 's-lash-1',
    description: 'Precision curved lashes that open up the eyes with effortless grace.',
    featured: true
  },
  {
    id: 'p-4',
    title: 'Powder Brows & Golden Ratio Symmetry',
    category: 'brows_lips',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=1000',
    serviceId: 's-brows-1',
    description: 'Flawlessly shaped semi-permanent brows with soft powdery depth.',
    featured: true
  },
  {
    id: 'p-5',
    title: 'Rosy Lip Blush Tint',
    category: 'brows_lips',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=1000',
    serviceId: 's-lips-1',
    description: 'Natural fresh pink lips awakening your daily complexion.',
    featured: false
  },
  {
    id: 'p-6',
    title: 'Glassy French Tip Art',
    category: 'nail_art',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=1000',
    serviceId: 's-nail-3',
    description: 'Modern micro-french tips on flawless almond extensions.',
    featured: true
  },
  {
    id: 'p-7',
    title: 'Silky Smooth Keratin Infusion',
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=1000',
    serviceId: 's-hair-1',
    description: 'Glass-like hair reflection after our signature smoothing treatment.',
    featured: false
  },
  {
    id: 'p-8',
    title: 'Wispy Anime Lash Extensions',
    category: 'lashes',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1000',
    serviceId: 's-lash-2',
    description: 'Textured spike lashes for high-fashion editorial presence.',
    featured: true
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'r-1',
    author: 'Jessica W.',
    rating: 5,
    service: 'Gel Polish & Nail Art',
    comment: 'The absolute best beauty studio in Jakarta Timur! The place is pristine, incredibly luxurious, and my gel nails lasted over 4 weeks without a single chip. Obsessed!',
    date: '2 days ago',
    verified: true,
    source: 'google'
  },
  {
    id: 'r-2',
    author: 'Nabila Maharani',
    rating: 5,
    service: 'Sulam Alis & Lip Blush',
    comment: 'I was nervous about getting my brows done, but Rich Nana artists are true masters. So natural and painless. Saved me 20 minutes every morning!',
    date: '1 week ago',
    verified: true,
    source: 'google'
  },
  {
    id: 'r-3',
    author: 'Clarissa Putri',
    rating: 5,
    service: 'Cat Eye Eyelash Extension',
    comment: 'Feather light! I cannot even feel that I am wearing extensions. Received endless compliments at work. The studio vibe in Pulo Gadung is so relaxing.',
    date: '2 weeks ago',
    verified: true,
    source: 'google'
  }
];

export const INITIAL_PROMOTIONS: PromotionItem[] = [
  {
    id: 'promo-1',
    title: 'THE GILDED RADIANCE EDIT',
    subtitle: 'Seasonal Pampering Package',
    description: 'Combine our Signature Gel Manicure with a Cat-Eye Eyelash Extension and receive a complimentary Luxury Hair Creambath.',
    price: 'Rp 385.000',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1000',
    badge: 'LIMITED EDITION',
    active: true,
    status: 'active'
  }
];

export const INITIAL_INTERIOR: InteriorItem[] = [
  {
    id: 'int-1',
    title: 'The Serene Reception',
    area: 'reception',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
    description: 'Warm rose-gold lighting and calming burgundy tones welcoming you into tranquility.'
  },
  {
    id: 'int-2',
    title: 'Private Nail Lounge',
    area: 'nail_station',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000',
    description: 'Ergonomic plush seating equipped for immaculate precision and comfort.'
  },
  {
    id: 'int-3',
    title: 'Eyelash & Embroidery Suite',
    area: 'lash_area',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1000',
    description: 'Private, sanitized sanctuary for uninterrupted relaxation during treatments.'
  },
  {
    id: 'int-4',
    title: 'Hair & Spa Sanctuary',
    area: 'treatment_area',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=1000',
    description: 'State-of-the-art hair washing bays and treatment stations.'
  }
];

export const INITIAL_SECTIONS: SiteSection[] = [
  { id: 'sec-hero', name: 'Hero Banner', type: 'hero', visible: true, order: 1 },
  { id: 'sec-intro', name: 'Brand Intro', type: 'brand_intro', visible: true, order: 2 },
  { id: 'sec-services', name: 'Signature Services', type: 'services', visible: true, order: 3 },
  { id: 'sec-standard', name: 'The Rich Nana Standard', type: 'standard', visible: true, order: 4 },
  { id: 'sec-studio', name: 'Studio Experience', type: 'studio', visible: true, order: 5 },
  { id: 'sec-promo', name: 'Limited Beauty Edit', type: 'promotion', visible: true, order: 6 },
  { id: 'sec-portfolio', name: 'Editorial Portfolio', type: 'services' /* mapped */, visible: true, order: 7 },
  { id: 'sec-reviews', name: 'Client Reviews', type: 'reviews', visible: true, order: 8 },
  { id: 'sec-instagram', name: 'Instagram World', type: 'instagram', visible: true, order: 9 },
  { id: 'sec-location', name: 'Location & Studio', type: 'location', visible: true, order: 10 }
];

export const DEFAULT_SEO: SeoSettings = {
  title: 'Rich Nana Beauty | Mave-Level Premium Beauty Studio Pulo Gadung Jakarta Timur',
  description: 'Discover Mave-level luxury nail art, eyelashes, hair treatments, sulam alis, and sulam bibir at Rich Nana Beauty Studio, Pulo Gadung, Jakarta Timur.',
  ogTitle: 'Rich Nana Beauty | Premium Beauty Studio',
  ogDescription: 'Luxury nail art, lashes, hair care, and embroidery in Pulo Gadung, Jakarta Timur.',
  ogImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200',
  canonical: 'https://richnanabeauty.co.id'
};
