// src/app/uslugi/[slug]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import Container from '@/components/Container';
import ContactForm from '@/components/ContactForm';
import { getServices, getServiceBySlug } from '@/sanity/data';
import { urlFor } from '@/sanity/image';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

// Обязательно для output: 'export'. Next.js 16 имеет баг: если вернуть []
// (пустой массив), он падает с "missing generateStaticParams()".
// Поэтому если в Sanity нет услуг — возвращаем заглушку, которая приведёт
// к 404 (dynamicParams = false).
export async function generateStaticParams() {
  const services = await getServices();
  if (services.length === 0) {
    // Заглушка — страница будет сгенерирована, но dynamicParams = false
    // приведёт к 404 при попытке рендера.
    return [{ slug: '_placeholder' }];
  }
  return services.map((s) => ({ slug: s.slug }));
}

// Запрещаем генерацию страниц для slug'ов, которых нет в Sanity.
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  return {
    title: service?.title ? `${service.title} — ГУДСТРОЙ Витебск` : 'Услуга — ГУДСТРОЙ Витебск',
    description: service?.shortDescription || 'Закажите строительные услуги в Витебске от компании ГУДСТРОЙ.',
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <section className="pt-6 md:pt-8 pb-16 md:pb-24">
      <Container>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-gray-300">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <Link href="/uslugi" className="hover:text-primary transition-colors">Услуги</Link>
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-gray-300">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-secondary font-medium truncate">{service.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 lg:gap-12">
          <div>
            <div className="relative w-full h-72 md:h-[420px] rounded-[24px] overflow-hidden bg-gray-100 shadow-xl shadow-black/10 mb-8">
              {service.image && (
                <Image
                  src={urlFor(service.image).width(1200).height(800).url()}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-secondary mb-8 tracking-tight leading-tight">
              {service.title}
            </h1>

            {service.characteristics && service.characteristics.length > 0 && (
              <div className="mb-10">
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-4">
                  <span className="w-1 h-3.5 bg-primary rounded-full" />
                  Характеристики
                </span>
                <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm divide-y divide-gray-100">
                  {service.characteristics.map((c) => (
                    <div key={c.label} className="flex items-center justify-between gap-4 px-6 py-3.5">
                      <span className="text-sm text-gray-500">{c.label}</span>
                      <span className="text-sm font-bold text-secondary text-right">{c.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-4">
                <span className="w-1 h-3.5 bg-primary rounded-full" />
                Описание
              </span>
              <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed">
                <PortableText value={service.fullDescription} />
              </div>
            </div>
          </div>

          <aside>
            <div className="sticky top-24">
              <ContactForm />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}