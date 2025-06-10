'use client';

import { useCart } from '@/contexts/CartContext';
import { generateOrderMessage, sendWhatsAppMessage } from '@/utils/whatsapp';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Cart() {
  const {
    state,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    getTotalItems,
    getTotalPrice
  } = useCart();

  const [isClearing, setIsClearing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Controlar animações de entrada e saída
  useEffect(() => {
    if (state.isOpen) {
      setIsVisible(true);
      // Pequeno delay para garantir que o elemento seja renderizado antes da animação
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      // Aguardar animação de saída antes de remover do DOM
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [state.isOpen]);

  // Prevenir scroll do body quando o carrinho estiver aberto
  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup quando o componente for desmontado
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [state.isOpen]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleClearCart = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearCart();
      setIsClearing(false);
    }, 300);
  };

  const handleWhatsAppOrder = () => {
    const message = generateOrderMessage(state.items, getTotalPrice());
    sendWhatsAppMessage(message);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Só fecha se clicou no overlay, não no conteúdo do carrinho
    if (e.target === e.currentTarget) {
      toggleCart();
    }
  };

  // Não renderizar se não estiver visível
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay com transição de opacidade controlada */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${isAnimating ? 'opacity-50' : 'opacity-0'
          }`}
        onClick={handleOverlayClick}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          opacity: isAnimating ? 1 : 0,
        }}
      />

      {/* Cart Sidebar com transição de transform controlada */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-in-out ${isAnimating ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{
          transform: isAnimating ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r background-default">
          <h2 className="text-xl font-bold text-white">
            Carrinho ({getTotalItems()})
          </h2>
          <button
            onClick={toggleCart}
            className="p-2 text-white hover:text-amber-200 transition-colors rounded-full hover:bg-white hover:bg-opacity-20"
            aria-label="Fechar carrinho"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {state.items.length === 0 ? (
            /* Empty Cart */
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Seu carrinho está vazio
              </h3>
              <p className="text-gray-500 mb-6">
                Adicione alguns produtos para começar suas compras
              </p>
              <button
                onClick={toggleCart}
                className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(80vh - 200px)' }}>
                {state.items.map((item) => (
                  <div key={item.product.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start gap-4">
                      {/* Product Image */}
                      <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">
                          {item.product.volume} • {item.product.brand}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                              aria-label="Diminuir quantidade"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-8 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                              aria-label="Aumentar quantidade"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-700 p-1 transition-colors rounded"
                            aria-label="Remover produto"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>

                        {/* Price */}
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            {formatPrice(item.product.price)} cada
                          </span>
                          <span className="font-bold text-amber-600">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="border-t border-gray-200 p-4 bg-white">
                {/* Clear Cart Button */}
                {state.items.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    disabled={isClearing}
                    className="w-full mb-4 py-2 px-4 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    {isClearing ? 'Limpando...' : 'Limpar Carrinho'}
                  </button>
                )}

                {/* Total */}
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-amber-600">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'}
                  </p>
                </div>

                {/* WhatsApp Order Button */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.749z" />
                  </svg>
                  Finalizar Pedido via WhatsApp
                </button>

                <p className="text-xs text-gray-500 text-center mt-2">
                  Você será redirecionado para o WhatsApp
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

