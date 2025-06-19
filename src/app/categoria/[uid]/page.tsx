import { notFound } from 'next/navigation';
import { getCategoryByUid, getProductsByCategory } from '@/lib/prismic-api';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';

interface CategoryPageProps {
  params: {
    uid: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { uid } = params;

  // Buscar categoria e produtos
  const [category, products] = await Promise.all([
    getCategoryByUid(uid),
    getProductsByCategory(uid)
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header da Categoria */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{category.icon}</div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{category.name}</h1>
              <p className="text-xl text-gray-600">{category.description}</p>
            </div>
          </div>

          {category.image && (
            <div className="relative h-64 rounded-lg overflow-hidden mb-6">
              <Image
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"
                style={{ backgroundColor: `${category.color}20` }}
              />
            </div>
          )}
        </div>

        {/* Produtos da Categoria */}
        {products.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Produtos em {category.name}
              </h2>
              <p className="text-gray-600">
                {products.length} produto(s) encontrado(s)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">{category.icon}</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Em breve novos produtos
            </h3>
            <p className="text-gray-600 mb-6">
              Estamos trabalhando para trazer os melhores produtos de {category.name.toLowerCase()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

