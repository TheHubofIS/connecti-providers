
export type Provider = {
  id: string;
  name: string;
  companyName: string;
  category: string;
  subcategory: string;
  description: string;
  city: string;
  services: string[];
  rating: number;
  reviewCount: number;
  priceLevel: string;
  languages: string[];
  image: string;
  verified: boolean;
  featured: boolean;
  available: boolean;
  
  // Additional properties needed for Provider cards and details
  title?: string;
  reviews?: number;
  location?: string;
  availability?: string;
  skills?: string[];
  hourlyRate?: number;
  responseTime?: string;
  completionRate?: number;
  
  // Extended professional information
  experience?: string;
  education?: string[];
  certifications?: string[];
  specialties?: string[];
  clients?: string[];
  approach?: string;
};
