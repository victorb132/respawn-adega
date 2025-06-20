import * as prismic from "@prismicio/client";

// Tipos originais mantidos para compatibilidade com carrinho
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  alcoholContent?: string;
  volume?: string;
  brand?: string;
  origin?: string;
  featured?: boolean;
  available?: boolean;
  stock?: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  image?: string;
  featured?: boolean;
}

// Novos tipos para Prismic
export interface PrismicCategory {
  uid: string | null;
  data: {
    name: prismic.KeyTextField;
    description: prismic.KeyTextField;
    icon: prismic.KeyTextField;
    color: prismic.KeyTextField;
    image: prismic.ImageField;
    featured: prismic.BooleanField;
    sort_order: prismic.NumberField;
  };
}

export interface PrismicProduct {
  uid: string | null;
  data: {
    name: prismic.KeyTextField;
    description: prismic.KeyTextField;
    price: prismic.NumberField;
    original_price: prismic.NumberField;
    category: prismic.LinkField;
    image: prismic.ImageField;
    gallery: prismic.GroupField<{
      image: prismic.ImageField;
    }>;
    rating: prismic.NumberField;
    alcohol_content: prismic.KeyTextField;
    volume: prismic.KeyTextField;
    brand: prismic.KeyTextField;
    origin: prismic.KeyTextField;
    featured: prismic.BooleanField;
    available: prismic.BooleanField;
    stock: prismic.NumberField;
    sort_order: prismic.NumberField;
    meta_title: prismic.KeyTextField;
    meta_description: prismic.KeyTextField;
  };
}

// Funções de conversão do Prismic para tipos locais
export function convertPrismicCategory(prismicCategory: PrismicCategory): Category | null {
  if (!prismicCategory.uid) {
    return null;
  }

  return {
    id: prismicCategory.uid,
    name: prismicCategory.data.name || '',
    description: prismicCategory.data.description || '',
    icon: prismicCategory.data.icon || '🍺',
    color: prismicCategory.data.color || '#f59e0b',
    image: prismicCategory.data.image?.url || undefined,
    featured: prismicCategory.data.featured || false,
  };
}

export function convertPrismicProduct(prismicProduct: PrismicProduct, categories: Category[] = []): Product | null {
  if (!prismicProduct.uid) {
    return null;
  }

  // Encontrar a categoria correspondente
  const categoryUid = prismicProduct.data.category?.uid;
  const category = categories.find(cat => cat.id === categoryUid);

  return {
    id: prismicProduct.uid,
    name: prismicProduct.data.name || '',
    description: prismicProduct.data.description || '',
    price: prismicProduct.data.price || 0,
    originalPrice: prismicProduct.data.original_price || undefined,
    image: prismicProduct.data.image?.url || '/placeholder-product.jpg',
    category: category?.name || 'Sem categoria',
    rating: prismicProduct.data.rating || 4.0,
    alcoholContent: prismicProduct.data.alcohol_content || undefined,
    volume: prismicProduct.data.volume || undefined,
    brand: prismicProduct.data.brand || undefined,
    origin: prismicProduct.data.origin || undefined,
    featured: prismicProduct.data.featured || false,
    available: prismicProduct.data.available !== false, // Default true
    stock: prismicProduct.data.stock || 0,
  };
}

// Tipos para carrinho e endereço (mantidos inalterados)
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
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
  address: Address;
}

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  brands: string[];
  alcoholContent: [number, number];
  inStock: boolean;
  featured: boolean;
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