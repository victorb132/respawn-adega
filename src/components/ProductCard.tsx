'use client';

import { Product } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart, getItemQuantity } = useCart();

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product);

    // Simular um pequeno delay para feedback visual
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77V2z" />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }

    return stars;
  };

  const itemQuantity = getItemQuantity(product.id);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
      {/* Product Image */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {!imageError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Destaque
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Quantity in Cart */}
        {itemQuantity > 0 && (
          <div className="absolute top-3 right-3">
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {itemQuantity} no carrinho
            </span>
          </div>
        )}

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
              Fora de Estoque
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category and Brand */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-amber-600 font-medium capitalize">
            {product.subcategory}
          </span>
          <span className="text-sm text-gray-500">
            {product.brand}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Product Details */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <span>{product.volume}</span>
          {product.alcoholContent && (
            <span>{product.alcoholContent}% vol</span>
          )}
          <span>{product.origin}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviewCount} avaliações)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-2xl font-bold text-amber-600">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdding}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${product.inStock && !isAdding
            ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          {!product.inStock ? (
            'Indisponível'
          ) : isAdding ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Adicionando...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8" />
              </svg>
              {itemQuantity > 0 ? 'Adicionar Mais' : 'Adicionar ao Carrinho'}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

