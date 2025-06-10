'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems, toggleCart } = useCart();

  return (
    <header className="bg-gradient-to-r background-default shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-full">
              <Image src="/images/logo.jpg" alt="Logo" width={100} height={100} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* <Link href="/" className="text-white hover:text-amber-200 transition-colors font-medium">
              Início
            </Link> */}
            <Link href="/" className="text-white hover:text-amber-200 transition-colors font-medium">
              Catálogo
            </Link>
            {/* <Link href="/sobre" className="text-white hover:text-amber-200 transition-colors font-medium">
              Sobre
            </Link> */}
            <Link href="/contato" className="text-white hover:text-amber-200 transition-colors font-medium">
              Contato
            </Link>
          </nav>

          {/* Cart and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <button
              onClick={toggleCart}
              className="cursor-pointer relative p-2 text-white hover:text-amber-200 transition-colors group"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8" />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold animate-pulse">
                  {getTotalItems()}
                </span>
              )}
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {getTotalItems() === 0 ? 'Carrinho vazio' : `${getTotalItems()} ${getTotalItems() === 1 ? 'item' : 'itens'}`}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white hover:text-amber-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-amber-500">
            <div className="flex flex-col space-y-2 pt-4">
              {/* <Link
                href="/"
                className="text-white hover:text-amber-200 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link> */}
              <Link
                href="/"
                className="text-white hover:text-amber-200 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Catálogo
              </Link>
              <Link
                href="/sobre"
                className="text-white hover:text-amber-200 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              {/* <Link
                href="/contato"
                className="text-white hover:text-amber-200 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link> */}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

