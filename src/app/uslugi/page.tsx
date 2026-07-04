// src/app/uslugi/page.tsx
import Container from '@/components/Container';
import UslugiHero from '@/components/UslugiHero';
import ServiceRow from '@/components/ServiceRow';
import { SERVICES } from '@/constants/services';

export default function ServicesPage() {
  return (
    <>
      <UslugiHero />

      {SERVICES.map((service, i) => (
        <section
          key={service.id}
          className={`py-16 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
        >
          <Container>
            <ServiceRow service={service} reversed={i % 2 === 1} />
          </Container>
        </section>
      ))}
    </>
  );
}