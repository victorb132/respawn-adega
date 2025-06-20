import * as prismic from '@prismicio/client';
import { createClient } from './prismic';
import {
  PrismicCategory,
  PrismicProduct,
  Category,
  Product,
  convertPrismicCategory,
  convertPrismicProduct
} from '@/types';

/**
 * Busca todas as categorias do Prismic
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const client = createClient();

    const response = await client.getAllByType('category', {
      orderings: [
        { field: 'my.category.sort_order', direction: 'asc' },
        { field: 'my.category.name', direction: 'asc' }
      ]
    });

    return response
      .map((category: any) => convertPrismicCategory(category as PrismicCategory))
      .filter((category): category is Category => category !== null);
  } catch (error) {
    console.error('Erro ao buscar categorias do Prismic:', error);
    // Fallback para dados mock em caso de erro
    return getFallbackCategories();
  }
}

/**
 * Busca todos os produtos do Prismic
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const client = createClient();

    // Buscar categorias primeiro para fazer a conversão correta
    const categories = await getCategories();

    const response = await client.getAllByType('product', {
      fetchLinks: ['category.name'],
      orderings: [
        { field: 'my.product.sort_order', direction: 'asc' },
        { field: 'my.product.name', direction: 'asc' }
      ]
    });

    return response
      .map((product: any) => convertPrismicProduct(product as PrismicProduct, categories))
      .filter((product): product is Product => product !== null);
  } catch (error) {
    console.error('Erro ao buscar produtos do Prismic:', error);
    // Fallback para dados mock em caso de erro
    return getFallbackProducts();
  }
}

/**
 * Busca produtos por categoria
 */
export async function getProductsByCategory(categoryUid: string): Promise<Product[]> {
  try {
    const client = createClient();
    const categories = await getCategories();

    const response = await client.getAllByType('product', {
      filters: [
        prismic.filter.at('my.product.category', categoryUid)
      ],
      fetchLinks: ['category.name'],
      orderings: [
        { field: 'my.product.sort_order', direction: 'asc' },
        { field: 'my.product.name', direction: 'asc' }
      ]
    });

    return response
      .map((product: any) => convertPrismicProduct(product as PrismicProduct, categories))
      .filter((product): product is Product => product !== null);
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria do Prismic:', error);
    return [];
  }
}

/**
 * Busca produtos em destaque
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const client = createClient();
    const categories = await getCategories();

    const response = await client.getAllByType('product', {
      filters: [
        prismic.filter.at('my.product.featured', true)
      ],
      fetchLinks: ['category.name'],
      orderings: [
        { field: 'my.product.sort_order', direction: 'asc' }
      ]
    });

    return response
      .map((product: any) => convertPrismicProduct(product as PrismicProduct, categories))
      .filter((product): product is Product => product !== null);
  } catch (error) {
    console.error('Erro ao buscar produtos em destaque do Prismic:', error);
    return [];
  }
}

/**
 * Busca categorias em destaque
 */
export async function getFeaturedCategories(): Promise<Category[]> {
  try {
    const client = createClient();

    const response = await client.getAllByType('category', {
      filters: [
        prismic.filter.at('my.category.featured', true)
      ],
      orderings: [
        { field: 'my.category.sort_order', direction: 'asc' }
      ]
    });

    return response
      .map((category: any) => convertPrismicCategory(category as PrismicCategory))
      .filter((category): category is Category => category !== null);
  } catch (error) {
    console.error('Erro ao buscar categorias em destaque do Prismic:', error);
    return [];
  }
}

/**
 * Busca um produto específico por UID
 */
export async function getProductByUid(uid: string): Promise<Product | null> {
  try {
    const client = createClient();
    const categories = await getCategories();

    const product = await client.getByUID('product', uid, {
      fetchLinks: ['category.name']
    });

    return convertPrismicProduct(product as PrismicProduct, categories);
  } catch (error) {
    console.error('Erro ao buscar produto por UID do Prismic:', error);
    return null;
  }
}

/**
 * Busca uma categoria específica por UID
 */
export async function getCategoryByUid(uid: string): Promise<Category | null> {
  try {
    const client = createClient();

    const category = await client.getByUID('category', uid);

    return convertPrismicCategory(category as PrismicCategory);
  } catch (error) {
    console.error('Erro ao buscar categoria por UID do Prismic:', error);
    return null;
  }
}

// Dados de fallback em caso de erro do Prismic
function getFallbackCategories(): Category[] {
  return [
    {
      id: 'cervejas',
      name: 'Cervejas',
      description: 'Cervejas artesanais e tradicionais',
      icon: '🍺',
      color: '#f59e0b',
      featured: true
    },
    {
      id: 'vinhos',
      name: 'Vinhos',
      description: 'Vinhos nacionais e importados',
      icon: '🍷',
      color: '#dc2626',
      featured: true
    },
    {
      id: 'destilados',
      name: 'Destilados',
      description: 'Whisky, vodka, gin e mais',
      icon: '🥃',
      color: '#7c2d12',
      featured: true
    }
  ];
}

function getFallbackProducts(): Product[] {
  return [
    {
      id: 'cerveja-ipa-artesanal',
      name: 'Cerveja IPA Artesanal',
      description: 'Cerveja IPA com lúpulo americano, amargor equilibrado e aroma cítrico.',
      price: 12.90,
      image: '/images/cerveja-ipa.jpg',
      category: 'Cervejas',
      rating: 4.5,
      alcoholContent: '5.2%',
      volume: '350ml',
      brand: 'Cervejaria Artesanal',
      origin: 'Brasil',
      featured: true,
      available: true,
      stock: 50
    },
    {
      id: 'vinho-tinto-cabernet',
      name: 'Vinho Tinto Cabernet Sauvignon',
      description: 'Vinho tinto encorpado com notas de frutas vermelhas e taninos macios.',
      price: 45.90,
      originalPrice: 55.90,
      image: '/images/vinho-tinto.jpg',
      category: 'Vinhos',
      rating: 4.8,
      alcoholContent: '13.5%',
      volume: '750ml',
      brand: 'Vinícola Premium',
      origin: 'Chile',
      featured: true,
      available: true,
      stock: 25
    }
  ];
}

