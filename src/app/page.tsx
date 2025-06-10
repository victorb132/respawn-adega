import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 to-orange-100 py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  As Melhores
                  <span className="text-amber-600 block">Bebidas</span>
                  Para Você
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Descubra nossa seleção premium de cervejas artesanais, vinhos selecionados
                  e destilados de qualidade. Entrega rápida e segura.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/catalogo"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  Ver Catálogo
                </Link>
                <Link
                  href="/sobre"
                  className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  Saiba Mais
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-gray-600">Produtos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">24h</div>
                  <div className="text-gray-600">Entrega</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">5★</div>
                  <div className="text-gray-600">Avaliação</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Oferta Especial</h3>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">-30%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-32 bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg flex items-center justify-center">
                      <svg className="w-16 h-16 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900">Kit Degustação Premium</h4>
                    <p className="text-gray-600 text-sm">6 cervejas artesanais selecionadas</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-400 line-through">R$ 89,90</span>
                        <span className="text-xl font-bold text-amber-600 ml-2">R$ 62,93</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossas Categorias
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore nossa ampla variedade de bebidas cuidadosamente selecionadas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cervejas */}
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cervejas</h3>
                <p className="text-gray-600 mb-6">Artesanais, importadas e nacionais</p>
                <span className="text-amber-600 font-semibold group-hover:text-amber-700">Ver mais →</span>
              </div>
            </div>

            {/* Vinhos */}
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-purple-50 to-red-100 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vinhos</h3>
                <p className="text-gray-600 mb-6">Tintos, brancos e espumantes</p>
                <span className="text-red-600 font-semibold group-hover:text-red-700">Ver mais →</span>
              </div>
            </div>

            {/* Destilados */}
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-gray-50 to-blue-100 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Destilados</h3>
                <p className="text-gray-600 mb-6">Whisky, vodka, gin e cachaça</p>
                <span className="text-blue-600 font-semibold group-hover:text-blue-700">Ver mais →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que Escolher a DrinkShop?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Qualidade Garantida</h3>
              <p className="text-gray-600">Produtos selecionados e certificados</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Receba em até 24 horas</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Compra Segura</h3>
              <p className="text-gray-600">Pagamento 100% protegido</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Suporte 24/7</h3>
              <p className="text-gray-600">Atendimento sempre disponível</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para Descobrir Novos Sabores?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Explore nosso catálogo completo e encontre a bebida perfeita para cada momento
          </p>
          <Link
            href="/catalogo"
            className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 inline-block"
          >
            Explorar Catálogo
          </Link>
        </div>
      </section>
    </div>
  );
}

