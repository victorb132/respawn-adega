'use client';

import { useState, useMemo } from 'react';
import { products, categories } from '@/data/products';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

export default function CatalogoPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  // Filtrar e ordenar produtos
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtro por busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filtro por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtro por preço
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  const handleAddToCart = (product: Product) => {
    // Aqui você implementaria a lógica do carrinho
    console.log('Produto adicionado ao carrinho:', product);
    alert(`${product.name} foi adicionado ao carrinho!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header do Catálogo */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Nosso Catálogo
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore nossa seleção completa de bebidas premium
            </p>
          </div>

          {/* Barra de Busca */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filtros e Ordenação */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Botão de Filtros Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </button>

            {/* Filtros Desktop */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-auto`}>
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Filtro por Categoria */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="all">Todas as Categorias</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                {/* Filtro por Preço */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Preço:</span>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-32"
                  />
                  <span className="text-sm text-gray-600">
                    R$ {priceRange[1]}
                  </span>
                </div>
              </div>
            </div>

            {/* Ordenação */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="name">Nome</option>
                <option value="price-low">Menor Preço</option>
                <option value="price-high">Maior Preço</option>
                <option value="rating">Melhor Avaliação</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Produtos */}
      <div className="container mx-auto px-4 py-8">
        {/* Resultados */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredProducts.length} produto(s)
            {searchQuery && ` para "${searchQuery}"`}
            {selectedCategory !== 'all' && ` em ${categories.find(c => c.id === selectedCategory)?.name}`}
          </p>
        </div>

        {/* Grid de Produtos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306m6 0V7a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2V6.306z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Tente ajustar os filtros ou buscar por outros termos
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setPriceRange([0, 500]);
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>

      {/* Categorias em Destaque */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore por Categoria
            </h2>
            <p className="text-xl text-gray-600">
              Encontre exatamente o que você procura
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-xl text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${selectedCategory === category.id
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${selectedCategory === category.id ? 'bg-white bg-opacity-20' : 'bg-amber-100'
                  }`}>
                  <svg className={`w-8 h-8 ${selectedCategory === category.id ? 'text-white' : 'text-amber-600'
                    }`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                <p className={`text-sm ${selectedCategory === category.id ? 'text-amber-100' : 'text-gray-600'
                  }`}>
                  {category.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

