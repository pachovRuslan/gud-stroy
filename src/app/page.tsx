// src/app/page.tsx
import Link from 'next/link';
import Container from '@/components/Container';
import ServiceCarousel from '@/components/ServiceCarousel';
import AboutSnippet from '@/components/AboutSnippet';
import ServiceCard from '@/components/ServiceCard';
import BenefitCard from '@/components/BenefitCard';
import MaterialsBanner from '@/components/MaterialsBanner';
import StatCard from '@/components/StatCard';
import ContactForm from '@/components/ContactForm';
import { SERVICES } from '@/constants/services';
import { BENEFITS } from '@/constants/benefits';
import { STATS } from '@/constants/stats';
import { COMPANY } from '@/constants/company';

export default function Home() {
  return (
    <>
      <ServiceCarousel />

      {/* Возвращённая секция "О компании" */}
      <section className="py-16">
        <Container>
          <AboutSnippet />
        </Container>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-secondary">Наши услуги</h2>
            <Link href="/uslugi" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
              Все услуги →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="text-2xl font-bold text-secondary mb-8">Почему выбирают нас</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BENEFITS.map((benefit) => (
              <BenefitCard key={benefit.id} benefit={benefit} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 bg-gray-50">
        <Container>
          <MaterialsBanner />
        </Container>
      </section>

      <section className="py-16 bg-secondary">
        <Container>
          <h2 className="text-2xl font-bold text-white mb-8">{COMPANY.name} в цифрах</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="text-2xl font-bold text-secondary mb-8">Оставить заявку</h2>
          <div className="max-w-md">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}