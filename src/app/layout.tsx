import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import { CartProvider } from "@/contexts/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Respawn Adega - Sua Loja de Bebidas Online",
  description: "A melhor seleção de bebidas: cervejas artesanais, vinhos selecionados, destilados premium e muito mais. Entrega rápida e segura.",
  keywords: "bebidas, cerveja, vinho, destilados, loja online, delivery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <CartProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Cart />
        </CartProvider>
      </body>
    </html>
  );
}
