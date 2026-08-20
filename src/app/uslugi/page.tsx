import Container from '@/components/Container';
import UslugiHero from '@/components/UslugiHero';
import ServiceRow from '@/components/ServiceRow';
import { getServices } from '@/sanity/data';

export const dynamic = 'force-static';

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <UslugiHero />

      {services.map((service, i) => (
        <section
          key={service._id}
          id={service.slug}
          className={`py-16 md:py-24 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} scroll-mt-24`}
        >
          <Container>
            <ServiceRow service={service} reversed={i % 2 === 1} />
          </Container>
        </section>
      ))}
    </>
  );
}