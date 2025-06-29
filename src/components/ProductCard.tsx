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
  const { addToCart, getItemQuantity, updateQuantity } = useCart();

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product);

    // Simular um pequeno delay para feedback visual
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const handleIncrement = () => {
    const currentQuantity = getItemQuantity(product.id);
    updateQuantity(product.id, currentQuantity + 1);
  };

  const handleDecrement = () => {
    const currentQuantity = getItemQuantity(product.id);
    if (currentQuantity > 0) {
      updateQuantity(product.id, currentQuantity - 1);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const itemQuantity = getItemQuantity(product.id);

  console.log(product);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
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
            <span className="bg-[#00170d] text-white px-2 py-1 rounded-full text-xs font-semibold">
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
        {!product.stock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
              Fora de Estoque
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category and Brand */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#00170d] font-medium capitalize">
            {product.category}
          </span>
          <span className="text-sm text-gray-500">
            {product.brand}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#00170d] transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Product Details */}
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
          <span>{product.volume}</span>
          {product.alcoholContent && (
            <span>{product.alcoholContent}% vol</span>
          )}
          <span>{product.origin}</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-xl font-bold text-[#00170d]">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        {/* Add to Cart Button / Quantity Control */}
        {itemQuantity === 0 ? (
          <button
            onClick={handleAddToCart}
            disabled={!product.stock || isAdding}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${product.stock && !isAdding
              ? 'bg-[#00170d] hover:bg-[#003d1f] text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            {!product.stock ? (
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
                Adicionar ao Carrinho
              </span>
            )}
          </button>
        ) : (
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-1">
            <button
              onClick={handleDecrement}
              className="w-8 h-8 flex items-center justify-center bg-[#00170d] text-white rounded-md hover:bg-[#003d1f] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>

            <span className="flex-1 text-center font-semibold text-gray-900">
              {itemQuantity}
            </span>

            <button
              onClick={handleIncrement}
              className="w-8 h-8 flex items-center justify-center bg-[#00170d] text-white rounded-md hover:bg-[#003d1f] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

