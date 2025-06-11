export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'cerveja' | 'vinho' | 'destilado' | 'sem-alcool';
  subcategory: string;
  brand: string;
  alcoholContent?: number;
  volume: string;
  origin: string;
  image: string;
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  subcategories: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  reference?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: DeliveryAddress;
}

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  brands: string[];
  alcoholContent: [number, number];
  inStock: boolean;
  featured: boolean;
}

