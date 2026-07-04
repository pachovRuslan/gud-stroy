import Container from '@/components/Container';
import Link from 'next/link';
import Image from 'next/image';
import { TOVARY } from '@/constants/tovary';
import TovaryHero from '@/components/TovaryHero';

export default function ServicesPage() {
  return (
    <>
      <TovaryHero />

      <section className="py-16">
        <Container>
        <section className="px-8 py-12">
      <Container>
        <h1 className="text-3xl font-bold text-secondary mb-2">Товары</h1>
        <p className="text-gray-600 mb-10">Продажа стройматериалов в Витебске и области</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TOVARY.map((service) => (
            <Link
              key={service.id}
              href={`/tovary/${service.id}`}
              className="flex gap-4 bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="relative w-32 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                <Image src={service.image} alt={service.title} fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary mb-1">{service.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{service.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
        </Container>
      </section>
    </>
    
  );
}