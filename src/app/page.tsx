// src/app/page.tsx
import type { Metadata } from 'next';
import CreditBanner from '@/components/CreditBanner';
import Container from '@/components/Container';
import ServiceCarousel from '@/components/ServiceCarousel';
import AboutSnippet from '@/components/AboutSnippet';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import BenefitCard from '@/components/BenefitCard';
import MaterialsBanner from '@/components/MaterialsBanner';
import ClientsCarousel from '@/components/ClientsCarousel';
import ContactForm from '@/components/ContactForm';
import { getServices, getProjects } from '@/sanity/data';
import { BENEFITS } from '@/constants/benefits';
import { ShieldCheck, Wallet, Truck, FileCheck, Award, Handshake } from 'lucide-react';

const BENEFIT_ICONS: Record<string, typeof Award> = {
  'free-estimate': ShieldCheck,
  'direct-contracts': Handshake,
  'financing': Wallet,
  'full-docs': FileCheck,
  'own-fleet': Truck,
  'experience': Award,
};

export const metadata: Metadata = {
  title: 'ГУДСТРОЙ Витебск — Строительство домов и фундаментные работы',
  description: 'Строительная компания ГУДСТРОЙ (Гуд строй) в Витебске. Строительство каркасных домов, фундаментные работы и аренда спецтехники в Витебске и области. Гарантия качества, доступные цены.',
  keywords: ['гуд строй', 'гудстрой', 'гуд-строй', 'гуд строй витебск', 'гудстрой витебск', 'строительство домов витебск'],
  openGraph: {
    title: 'ГУД СТРОЙ Витебск — Строительство домов',
    description: 'Строительство каркасных домов и фундаментные работы в Витебске.',
    url: 'https://гудстрой.бел',
    siteName: 'ГУДСТРОЙ',
    locale: 'ru_BY',
    type: 'website',
  },
};

export default async function Home() {
  const services = await getServices();
  const projects = await getProjects();

  // JSON-LD Микроразметка для Яндекса и Google
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'ГУДСТРОЙ',
    alternateName: ['Гуд строй', 'Гуд-Строй', 'Гудстрой Витебск', 'Gud Stroy'],
    url: 'https://гудстрой.бел',
    logo: 'https://гудстрой.бел/logo.png', // Проверьте путь к вашему логотипу
    telephone: '+375292951914',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Витебск',
      addressCountry: 'BY',
    },
    priceRange: '$$',
  };

  return (
    <>
      {/* Внедрение микроразметки Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Скрытый или явный главный H1 для семантики SEO (если в слайдере нет H1) */}
      <h1 className="sr-only">
        Строительная компания ГУДСТРОЙ (Гуд Строй) в Витебске — дома под ключ и фундаменты
      </h1>

      <ServiceCarousel services={services} />

      {/* Секция "О компании" */}
      <section className="py-20">
        <Container>
          <AboutSnippet />
        </Container>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8">Наши услуги</h2>
          <ProjectsShowcase projects={projects} />
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="inline-block bg-primary text-white text-lg md:text-xl font-bold tracking-wide px-6 py-3 rounded mb-4">
            6 ПРОСТЫХ ПРИЧИН
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-10">
            Почему выбирают нас
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, i) => (
              <BenefitCard
                key={benefit.id}
                benefit={benefit}
                Icon={BENEFIT_ICONS[benefit.id] ?? Award}
                shaded={i % 2 === 1}
              />
            ))}
          </div>
        </Container>
      </section>
      <CreditBanner />
      <section className="py-20 bg-gray-50">
        <Container>
          <MaterialsBanner />
        </Container>
      </section>

      {/* Карусель логотипов клиентов (вместо «ГУД-СТРОЙ в цифрах»).
          Логотипы предоставит заказчик — пока показываем placeholder-бренды. */}
      <ClientsCarousel />

      <section id="zayavka" className="py-16 scroll-mt-24">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8">Оставить заявку</h2>
          <div className="max-w-md">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}