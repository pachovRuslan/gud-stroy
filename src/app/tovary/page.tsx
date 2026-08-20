// src/app/tovary/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/Container';
import TovaryHero from '@/components/TovaryHero';
import ClientsCarousel from '@/components/ClientsCarousel';
import { getProducts } from '@/sanity/data';
import { urlFor } from '@/sanity/image';

export default async function TovaryPage() {
  const products = await getProducts();

  return (
    <>
      <TovaryHero />

      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-2xl mb-10 md:mb-12">
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-3">
              <span className="w-1 h-3.5 bg-primary rounded-full" />
              Каталог
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary tracking-tight">
              Стройматериалы
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/tovary/${product._id}`}
                className="group flex gap-5 bg-white rounded-[20px] border border-gray-100 p-5 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 hover:border-transparent transition-all duration-300"
              >
                <div className="relative w-32 h-28 flex-shrink-0 rounded-[14px] overflow-hidden bg-gray-100">
                  {product.image && (
                    <Image
                      src={urlFor(product.image).width(300).height(220).url()}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1 flex flex-col">
                  <h3 className="font-bold text-secondary mb-1.5 leading-snug">{product.title}</h3>
                  {product.description && (
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{product.description}</p>
                  )}
                  <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-primary text-sm font-semibold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    Подробнее
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ClientsCarousel title="Наши партнёры" />
    </>
  );
}