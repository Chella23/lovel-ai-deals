export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  inStock: boolean;
  featured: boolean;
  asin: string;
  description: string;
  features: string[];
  specifications?: Record<string, string>;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: number;
  image: string;
  category: string;
  relatedProducts: number[];
}
