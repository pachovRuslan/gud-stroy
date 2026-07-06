// src/app/tovary/[id]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import ContactForm from '@/components/ContactForm';
import { getProductById, getProducts } from '@/sanity/data';
import { urlFor } from '@/sanity/image';
import type { SanityProduct } from '@/sanity/types';

type Props = {
  params: Promise<{ id: string }>;
};

// Пререндериваем только те товары, что реально есть в Sanity.
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p._id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return { title: 'Товар не найден' };
  }

  return {
    title: product.title,
    description: product.description ?? undefined,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <section className="py-10">
      <Container>
        <ProductDetail product={product} />
      </Container>
    </section>
  );
}

function ProductDetail({ product }: { product: SanityProduct }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
      <div>
        {product.image && (
          <div className="relative w-full h-80 rounded-lg overflow-hidden bg-gray-100 mb-6">
            <Image
              src={urlFor(product.image).width(1200).height(800).url()}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <h1 className="text-2xl font-bold text-secondary mb-6">{product.title}</h1>

        {product.description && (
          <div>
            <h2 className="font-semibold text-secondary mb-3">Описание</h2>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        )}
      </div>

      <aside>
        <div className="sticky top-6">
          <ContactForm />
        </div>
      </aside>
    </div>
  );
}
