'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product, CartItem, CustomerInfo, DeliveryAddress } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  customerInfo: CustomerInfo | null;
}

interface CartContextType {
  state: CartState;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (productId: string) => number;
  updateCustomerInfo: (customerInfo: CustomerInfo) => void;
  updateDeliveryAddress: (address: DeliveryAddress) => void;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'LOAD_CART'; payload: { items: CartItem[]; customerInfo?: CustomerInfo } }
  | { type: 'UPDATE_CUSTOMER_INFO'; payload: { customerInfo: CustomerInfo } }
  | { type: 'UPDATE_DELIVERY_ADDRESS'; payload: { address: DeliveryAddress } };

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id
      );

      if (existingItemIndex > -1) {
        // Se o produto já existe, atualiza a quantidade
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        return { ...state, items: updatedItems };
      } else {
        // Se é um novo produto, adiciona ao carrinho
        return {
          ...state,
          items: [...state.items, { product, quantity }]
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload.productId)
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;

      if (quantity <= 0) {
        // Se a quantidade for 0 ou menor, remove o item
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== productId)
        };
      }

      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: []
      };
    }

    case 'TOGGLE_CART': {
      return {
        ...state,
        isOpen: !state.isOpen
      };
    }

    case 'LOAD_CART': {
      return {
        ...state,
        items: action.payload.items,
        customerInfo: action.payload.customerInfo || null
      };
    }

    case 'UPDATE_CUSTOMER_INFO': {
      return {
        ...state,
        customerInfo: action.payload.customerInfo
      };
    }

    case 'UPDATE_DELIVERY_ADDRESS': {
      return {
        ...state,
        customerInfo: state.customerInfo ? {
          ...state.customerInfo,
          address: action.payload.address
        } : null
      };
    }

    default:
      return state;
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
    customerInfo: null
  });

  // Carregar dados do localStorage quando o componente montar
  useEffect(() => {
    const savedCart = localStorage.getItem('drinkshop-cart');
    const savedCustomerInfo = localStorage.getItem('drinkshop-customer');

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        const parsedCustomerInfo = savedCustomerInfo ? JSON.parse(savedCustomerInfo) : null;
        dispatch({
          type: 'LOAD_CART',
          payload: {
            items: parsedCart,
            customerInfo: parsedCustomerInfo
          }
        });
      } catch (error) {
        console.error('Erro ao carregar carrinho do localStorage:', error);
      }
    }
  }, []);

  // Salvar no localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem('drinkshop-cart', JSON.stringify(state.items));
  }, [state.items]);

  // Salvar informações do cliente no localStorage
  useEffect(() => {
    if (state.customerInfo) {
      localStorage.setItem('drinkshop-customer', JSON.stringify(state.customerInfo));
    }
  }, [state.customerInfo]);

  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const updateCustomerInfo = (customerInfo: CustomerInfo) => {
    dispatch({ type: 'UPDATE_CUSTOMER_INFO', payload: { customerInfo } });
  };

  const updateDeliveryAddress = (address: DeliveryAddress) => {
    dispatch({ type: 'UPDATE_DELIVERY_ADDRESS', payload: { address } });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getItemQuantity = (productId: string) => {
    const item = state.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider value={{
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleCart,
      getTotalItems,
      getTotalPrice,
      getItemQuantity,
      updateCustomerInfo,
      updateDeliveryAddress
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};
