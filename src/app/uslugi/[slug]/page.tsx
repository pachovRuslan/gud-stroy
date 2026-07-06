// src/app/uslugi/[slug]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import ContactForm from '@/components/ContactForm';
import { getServices, getServiceBySlug } from '@/sanity/data';
import { urlFor } from '@/sanity/image';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <section className="px-8 py-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
      <div>
        <div className="relative w-full h-80 rounded-lg overflow-hidden bg-gray-100 mb-6">
          {service.image && (
            <Image
              src={urlFor(service.image).width(1200).height(800).url()}
              alt={service.title}
              fill
              className="object-cover"
            />
          )}
        </div>

        <h1 className="text-2xl font-bold text-secondary mb-6">{service.title}</h1>

        <div className="mb-8">
          <h2 className="font-semibold text-secondary mb-3">Характеристики</h2>
          <table className="text-sm w-full">
            <tbody>
              {service.characteristics?.map((c) => (
                <tr key={c.label} className="border-b border-gray-100">
                  <td className="py-2 text-gray-500 w-1/3">{c.label}</td>
                  <td className="py-2 text-secondary font-medium">{c.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="font-semibold text-secondary mb-3">Описание</h2>
          <div className="prose prose-sm max-w-none text-gray-700">
            <PortableText value={service.fullDescription} />
          </div>
        </div>
      </div>

      <aside>
        <div className="sticky top-6">
          <ContactForm />
        </div>
      </aside>
    </section>
  );
}