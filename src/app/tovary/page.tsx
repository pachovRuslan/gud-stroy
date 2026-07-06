// src/app/tovary/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/Container';
import TovaryHero from '@/components/TovaryHero';
import { getProducts } from '@/sanity/data';
import { urlFor } from '@/sanity/image';

export default async function TovaryPage() {
  const products = await getProducts();

  return (
    <>
      <TovaryHero />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/tovary/${product._id}`}
                className="flex gap-4 bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="relative w-32 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                  {product.image && (
                    <Image
                      src={urlFor(product.image).width(300).height(220).url()}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-secondary mb-1">{product.title}</h3>
                  {product.description && (
                    <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}