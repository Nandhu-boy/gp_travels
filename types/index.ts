export interface TravelPackage {
  id: string;
  title: string;
  slug: string;
  category: PackageCategory;
  duration: string;          // e.g. "4D 3N"
  price: number;             // per person in INR
  originalPrice?: number;    // for discount display
  location: string;          // e.g. "Kannur, Kerala"
  description: string;       // short description
  longDescription: string;   // detailed markdown or HTML
  highlights: string[];      // key highlights list
  inclusions: string[];      // what's included
  exclusions: string[];      // what's not included
  itinerary: ItineraryDay[]; // day-wise plan
  images: string[];          // Firebase Storage URLs
  thumbnailImage: string;    // main image URL
  maxGroupSize: number;
  minAge?: number;
  difficulty?: 'Easy' | 'Moderate' | 'Challenging';
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  pdfUrl?: string;           // optional PDF download link
  createdAt: Date;
  updatedAt: Date;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals?: string[];          // e.g. ["Breakfast", "Lunch"]
  accommodation?: string;
}

export type PackageCategory =
  | 'Agrotourism'
  | 'Spiritual'
  | 'Workation'
  | 'Mystery'
  | 'Trek'
  | 'Adventure'
  | 'Festival'
  | 'Corporate'
  | 'Weekend';

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  packageName: string;
  packageId?: string;
  avatarUrl?: string;
  createdAt: Date;
}

export interface PackageReview {
  id: string;
  packageId: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface BookingInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  packageId?: string;
  packageName?: string;
  travelDate: string;
  groupSize: number;
  message: string;
  status: 'new' | 'contacted' | 'confirmed' | 'closed';
  createdAt: Date;
}

export interface AdminUser {
  uid: string;
  email: string;
  role: 'admin';
}