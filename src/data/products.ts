import { Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'cerveja',
    name: 'Cervejas',
    description: 'Artesanais, importadas e nacionais',
    image: '/images/categories/cervejas.jpeg',
    subcategories: ['IPA', 'Pilsen', 'Weiss', 'Stout', 'Lager', 'Artesanal']
  },
  {
    id: 'vinho',
    name: 'Vinhos',
    description: 'Tintos, brancos e espumantes',
    image: '/images/categories/vinhos.jpeg',
    subcategories: ['Tinto', 'Branco', 'Rosé', 'Espumante', 'Frisante']
  },
  {
    id: 'destilado',
    name: 'Destilados',
    description: 'Whisky, vodka, gin e cachaça',
    image: '/images/categories/destilados.jpeg',
    subcategories: ['Whisky', 'Vodka', 'Gin', 'Cachaça', 'Rum', 'Tequila']
  },
  {
    id: 'sem-alcool',
    name: 'Sem Álcool',
    description: 'Refrigerantes, sucos e águas',
    image: '/images/categories/sem-alcool.jpeg',
    subcategories: ['Refrigerante', 'Suco', 'Água', 'Energético', 'Isotônico']
  }
];

export const products: Product[] = [
  // Cervejas
  {
    id: '1',
    name: 'Cerveja IPA Artesanal Hoppy',
    description: 'Uma IPA encorpada com notas cítricas e amargor equilibrado. Produzida com lúpulos selecionados e maltes especiais.',
    price: 12.90,
    originalPrice: 15.90,
    category: 'cerveja',
    subcategory: 'IPA',
    brand: 'Cervejaria Artesanal',
    alcoholContent: 6.5,
    volume: '355ml',
    origin: 'Brasil',
    image: '/images/products/cerveja-hoppy.jpeg',
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 124,
    tags: ['artesanal', 'ipa', 'citrica', 'premium']
  },
  {
    id: '2',
    name: 'Cerveja Pilsen Premium',
    description: 'Cerveja pilsen de alta qualidade, refrescante e com sabor suave. Perfeita para momentos de descontração.',
    price: 8.50,
    category: 'cerveja',
    subcategory: 'Pilsen',
    brand: 'Brewery Premium',
    alcoholContent: 4.8,
    volume: '350ml',
    origin: 'Brasil',
    image: '/images/products/cerveja-pilsen.jpeg',
    inStock: true,
    featured: false,
    rating: 4.3,
    reviewCount: 89,
    tags: ['pilsen', 'refrescante', 'suave']
  },
  {
    id: '3',
    name: 'Cerveja Weiss Tradicional',
    description: 'Cerveja de trigo alemã tradicional, com sabor frutado e refrescante. Ideal para acompanhar pratos leves.',
    price: 11.20,
    category: 'cerveja',
    subcategory: 'Weiss',
    brand: 'German Brew',
    alcoholContent: 5.2,
    volume: '500ml',
    origin: 'Alemanha',
    image: '/images/products/cerveja-weiss.jpeg',
    inStock: true,
    featured: true,
    rating: 4.6,
    reviewCount: 67,
    tags: ['weiss', 'trigo', 'alemã', 'frutada']
  },

  // Vinhos
  {
    id: '4',
    name: 'Vinho Tinto Cabernet Sauvignon',
    description: 'Vinho tinto encorpado com notas de frutas vermelhas e taninos macios. Safra 2020 de vinhedos selecionados.',
    price: 45.90,
    originalPrice: 52.90,
    category: 'vinho',
    subcategory: 'Tinto',
    brand: 'Vinícola Premium',
    alcoholContent: 13.5,
    volume: '750ml',
    origin: 'Chile',
    image: '/images/products/vinho-cabernet.jpeg',
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 156,
    tags: ['tinto', 'cabernet', 'encorpado', 'safra-2020']
  },
  {
    id: '5',
    name: 'Vinho Branco Chardonnay',
    description: 'Vinho branco elegante com notas florais e cítricas. Perfeito para acompanhar peixes e frutos do mar.',
    price: 38.50,
    category: 'vinho',
    subcategory: 'Branco',
    brand: 'Vinhos do Vale',
    alcoholContent: 12.8,
    volume: '750ml',
    origin: 'Argentina',
    image: '/images/products/vinho-chardonnay.jpeg',
    inStock: true,
    featured: false,
    rating: 4.4,
    reviewCount: 92,
    tags: ['branco', 'chardonnay', 'floral', 'citrico']
  },
  {
    id: '6',
    name: 'Espumante Brut Rosé',
    description: 'Espumante rosé delicado com bolhas finas e sabor refrescante. Ideal para celebrações especiais.',
    price: 65.00,
    category: 'vinho',
    subcategory: 'Espumante',
    brand: 'Champagne House',
    alcoholContent: 12.0,
    volume: '750ml',
    origin: 'França',
    image: '/images/products/espumante-brut-rose.jpeg',
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 203,
    tags: ['espumante', 'rose', 'celebração', 'premium']
  },

  // Destilados
  {
    id: '7',
    name: 'Whisky Single Malt 12 Anos',
    description: 'Whisky escocês single malt envelhecido por 12 anos em barris de carvalho. Sabor complexo e marcante.',
    price: 189.90,
    originalPrice: 220.00,
    category: 'destilado',
    subcategory: 'Whisky',
    brand: 'Highland Distillery',
    alcoholContent: 40.0,
    volume: '750ml',
    origin: 'Escócia',
    image: '/images/products/whisky-single-malt.jpeg',
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 87,
    tags: ['whisky', 'single-malt', '12-anos', 'escoces']
  },
  {
    id: '8',
    name: 'Gin Premium London Dry',
    description: 'Gin premium com botanicos selecionados, incluindo zimbro, coentro e casca de limão. Sabor clássico e refinado.',
    price: 95.50,
    category: 'destilado',
    subcategory: 'Gin',
    brand: 'London Spirits',
    alcoholContent: 42.0,
    volume: '700ml',
    origin: 'Inglaterra',
    image: '/images/products/gin-london-dry.jpeg',
    inStock: true,
    featured: false,
    rating: 4.5,
    reviewCount: 134,
    tags: ['gin', 'london-dry', 'botanicos', 'premium']
  },
  {
    id: '9',
    name: 'Cachaça Artesanal Envelhecida',
    description: 'Cachaça artesanal envelhecida em barris de madeira nobre. Sabor suave e aroma marcante da cana-de-açúcar.',
    price: 78.90,
    category: 'destilado',
    subcategory: 'Cachaça',
    brand: 'Alambique Tradicional',
    alcoholContent: 40.0,
    volume: '700ml',
    origin: 'Brasil',
    image: '/images/products/cachaca-artesanal.jpeg',
    inStock: true,
    featured: true,
    rating: 4.6,
    reviewCount: 76,
    tags: ['cachaça', 'artesanal', 'envelhecida', 'brasileira']
  },

  // Sem Álcool
  {
    id: '10',
    name: 'Água Mineral Premium',
    description: 'Água mineral natural de fonte cristalina. Rica em minerais essenciais e com pH equilibrado.',
    price: 3.50,
    category: 'sem-alcool',
    subcategory: 'Água',
    brand: 'Fonte Cristal',
    volume: '500ml',
    origin: 'Brasil',
    image: '/images/products/agua-mineral.jpeg',
    inStock: true,
    featured: false,
    rating: 4.2,
    reviewCount: 45,
    tags: ['agua', 'mineral', 'natural', 'cristalina']
  },
  {
    id: '11',
    name: 'Suco Natural de Laranja',
    description: 'Suco 100% natural de laranjas selecionadas. Sem conservantes ou açúcar adicionado.',
    price: 8.90,
    category: 'sem-alcool',
    subcategory: 'Suco',
    brand: 'Frutas do Campo',
    volume: '1L',
    origin: 'Brasil',
    image: '/images/products/suco-laranja.jpeg',
    inStock: true,
    featured: false,
    rating: 4.4,
    reviewCount: 62,
    tags: ['suco', 'natural', 'laranja', 'sem-conservantes']
  },
  {
    id: '12',
    name: 'Energético Premium',
    description: 'Bebida energética com taurina, cafeína e vitaminas do complexo B. Sabor refrescante de frutas vermelhas.',
    price: 6.50,
    category: 'sem-alcool',
    subcategory: 'Energético',
    brand: 'Energy Plus',
    volume: '250ml',
    origin: 'Brasil',
    image: '/images/products/energetico.jpeg',
    inStock: true,
    featured: false,
    rating: 4.1,
    reviewCount: 98,
    tags: ['energetico', 'taurina', 'cafeina', 'vitaminas']
  }
];

export const featuredProducts = products.filter(product => product.featured);

export const getProductsByCategory = (categoryId: string) => {
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

