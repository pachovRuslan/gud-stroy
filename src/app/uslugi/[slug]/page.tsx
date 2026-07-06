// src/app/uslugi/[slug]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import Container from '@/components/Container';
import ContactForm from '@/components/ContactForm';
import { getServiceBySlug, getServices } from '@/sanity/data';
import { urlFor } from '@/sanity/image';
import type { SanityService } from '@/sanity/types';

type Props = {
  params: Promise<{ slug: string }>;
};

// Пререндериваем только те услуги, что реально есть в Sanity.
export async function generateStaticParams() {
  const services = await getServices();
  return services
    .filter((s) => Boolean(s.slug))
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: 'Услуга не найдена' };
  }

  return {
    title: service.title,
    description: service.shortDescription ?? undefined,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <section className="py-10">
      <Container>
        <ServiceDetail service={service} />
      </Container>
    </section>
  );
}

function ServiceDetail({ service }: { service: SanityService }) {
  const hasCharacteristics = service.characteristics && service.characteristics.length > 0;
  const hasDescription =
    service.fullDescription && service.fullDescription.length > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
      <div>
        {service.image && (
          <div className="relative w-full h-80 rounded-lg overflow-hidden bg-gray-100 mb-6">
            <Image
              src={urlFor(service.image).width(1200).height(800).url()}
              alt={service.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <h1 className="text-2xl font-bold text-secondary mb-6">{service.title}</h1>

        {hasCharacteristics && (
          <div className="mb-8">
            <h2 className="font-semibold text-secondary mb-3">Характеристики</h2>
            <table className="text-sm w-full">
              <tbody>
                {service.characteristics!.map((c) => (
                  <tr key={c.label} className="border-b border-gray-100">
                    <td className="py-2 text-gray-500 w-1/3">{c.label}</td>
                    <td className="py-2 text-secondary font-medium">{c.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {hasDescription && (
          <div>
            <h2 className="font-semibold text-secondary mb-3">Описание</h2>
            <div className="prose-sm flex flex-col gap-3 text-sm text-gray-700 leading-relaxed">
              <PortableText value={service.fullDescription!} />
            </div>
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
