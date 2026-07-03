// src/app/page.tsx
import Container from '@/components/Container';
import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import BenefitCard from '@/components/BenefitCard';
import ContactForm from '@/components/ContactForm';
import { SERVICES } from '@/constants/services';
import { BENEFITS } from '@/constants/benefits';

export default function Home() {
  return (
    <>
      <section className="bg-secondary text-white px-8 py-20">
         <Container>
        <h1 className="text-4xl font-bold max-w-xl mb-4">
          Строительство домов и фундаментные работы под ключ
        </h1>
        <p className="text-gray-300 max-w-lg">
          Витебск и Витебская область. Собственная техника, кредиты по 240 и 95 Указу.
        </p>
        </Container>
      </section>

      <section className="px-8 py-16">
         <Container>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-secondary">Наши услуги</h2>
          <Link href="/uslugi" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
            Все услуги →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        </Container>
      </section>

      <section className="px-8 py-16 bg-gray-50">
         <Container>
        <h2 className="text-2xl font-bold text-secondary mb-8">Почему выбирают нас</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BENEFITS.map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} />
          ))}
        </div>
        </Container>
      </section>

      <section className="px-8 py-16">
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