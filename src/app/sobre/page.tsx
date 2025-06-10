import Link from "next/link";

export default function SobrePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br background-default py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Sobre a <span className="text-amber-600">Respawn Adega</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Há mais de 10 anos oferecendo as melhores bebidas com qualidade,
              variedade e atendimento excepcional para nossos clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  A Respawn Adega nasceu em 2025 com o sonho de democratizar o acesso a bebidas
                  de qualidade. Começamos como uma pequena loja física no centro da cidade,
                  com uma seleção cuidadosa de cervejas artesanais e vinhos especiais.
                </p>
                <p>
                  Com o passar dos anos, expandimos nosso catálogo e abraçamos a tecnologia
                  para levar nossa paixão por bebidas excepcionais diretamente até você.
                  Hoje, somos referência em qualidade e variedade no mercado online.
                </p>
                <p>
                  Nossa missão é simples: conectar pessoas aos melhores sabores do mundo,
                  oferecendo uma experiência de compra única e um atendimento personalizado
                  que faz toda a diferença.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br background-default rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-8 text-center">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-3xl font-bold text-amber-600">10+</div>
                      <div className="text-gray-600">Anos de Experiência</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-amber-600">500+</div>
                      <div className="text-gray-600">Produtos</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-amber-600">50k+</div>
                      <div className="text-gray-600">Clientes Satisfeitos</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-amber-600">24h</div>
                      <div className="text-gray-600">Entrega Rápida</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Os princípios que guiam nossa empresa e definem nossa cultura
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Qualidade</h3>
              <p className="text-gray-600">
                Selecionamos rigorosamente cada produto em nosso catálogo,
                garantindo que apenas as melhores bebidas cheguem até você.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Atendimento</h3>
              <p className="text-gray-600">
                Nossa equipe está sempre pronta para ajudar, oferecendo
                suporte personalizado e orientações especializadas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Agilidade</h3>
              <p className="text-gray-600">
                Processamos e entregamos seus pedidos com rapidez e segurança,
                para que você possa desfrutar logo dos seus produtos favoritos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossa Equipe
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conheça as pessoas apaixonadas que fazem a Respawn Adega acontecer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br background-default rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Carlos Silva</h3>
              <p className="text-amber-600 font-medium mb-2">Fundador & CEO</p>
              <p className="text-gray-600 text-sm">
                Sommelier certificado com mais de 15 anos de experiência no mercado de bebidas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ana Costa</h3>
              <p className="text-blue-600 font-medium mb-2">Diretora de Compras</p>
              <p className="text-gray-600 text-sm">
                Especialista em seleção de produtos e relacionamento com fornecedores internacionais.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-teal-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Roberto Lima</h3>
              <p className="text-green-600 font-medium mb-2">Gerente de Logística</p>
              <p className="text-gray-600 text-sm">
                Responsável por garantir que seus pedidos cheguem rapidamente e em perfeitas condições.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r background-default">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Faça Parte da Nossa História
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de clientes satisfeitos e descubra por que somos a escolha certa para suas bebidas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalogo"
              className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Explorar Produtos
            </Link>
            <Link
              href="/contato"
              className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Entre em Contato
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

