
import Container from '@/components/Container';
import UslugiHero from '@/components/UslugiHero';
import ServiceRow from '@/components/ServiceRow';
import { getServices } from '@/sanity/data';

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <UslugiHero />

      {services.map((service, i) => (
        <section
          key={service._id}
          className={`py-16 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <Container>
            <ServiceRow service={service} reversed={i % 2 === 1} />
          </Container>
        </section>
      ))}
    </>
  );
}