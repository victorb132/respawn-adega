'use client';

import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '@/lib/prismic-api';
import { Product, Category } from '@/types';
import ProductCard from '@/components/ProductCard';
import Loading from '@/components/Loading';

export default function CatalogoPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState('name');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Carregar dados do Prismic
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);

        setProducts(productsData);
        setCategories(categoriesData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Filtrar e ordenar produtos
  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice && product.available;
    });

    // Ordenar produtos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange([0, 200]);
    setSortBy('name');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Catálogo de Produtos</h1>
        </div>

        {/* Botão de Filtros */}
        <div className="mb-4">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 bg-[#00170d] text-white px-4 py-2 rounded-lg hover:bg-[#003d1f] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filtros
            <svg
              className={`w-4 h-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Filtros */}
        <div className={`bg-white rounded-lg shadow-md p-4 mb-6 transition-all duration-300 ${filtersOpen ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Busca */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar produtos
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Digite o nome do produto..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00170d] focus:border-transparent"
              />
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00170d] focus:border-transparent"
              >
                <option value="">Todas as categorias</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Faixa de Preço */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço: R$ {priceRange[0]} - R$ {priceRange[1]}
              </label>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="flex-1"
                />
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Ordenação */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00170d] focus:border-transparent"
              >
                <option value="name">Nome (A-Z)</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="rating">Melhor avaliação</option>
              </select>
            </div>
          </div>

          {/* Botão Limpar Filtros */}
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {filteredProducts.length} produto(s) encontrado(s)
            </span>
            <button
              onClick={clearFilters}
              className="text-[#00170d] hover:text-[#003d1f] font-medium text-sm"
            >
              Limpar filtros
            </button>
          </div>
        </div>

        {/* Grid de Produtos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros ou buscar por outros termos
            </p>
            <button
              onClick={clearFilters}
              className="bg-[#00170d] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#003d1f] transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        )}

        {/* Categorias em Destaque */}
        {categories.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Explore por Categoria
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${selectedCategory === category.name
                    ? 'border-[#00170d] bg-[#00170d]/10'
                    : 'border-gray-200 hover:border-[#00170d]/50 bg-white'
                    }`}
                  style={{
                    backgroundColor: selectedCategory === category.name
                      ? `${category.color}15`
                      : undefined
                  }}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="font-semibold text-gray-900">{category.name}</div>
                  <div className="text-sm text-gray-600">{category.description}</div>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

