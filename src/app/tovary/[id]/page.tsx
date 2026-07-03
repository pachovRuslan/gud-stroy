import Container from '@/components/Container';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ContactForm from '@/components/ContactForm';
import { TOVARY, getServiceById } from '@/constants/tovary';


type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return TOVARY.map((s) => ({ id: s.id }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    notFound();
  }

  return (
    <section className="px-8 py-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        <Container>
      <div>
        <div className="relative w-full h-80 rounded-lg overflow-hidden bg-gray-100 mb-6">
          <Image src={service.image} alt={service.title} fill className="object-cover" />
        </div>

        <h1 className="text-2xl font-bold text-secondary mb-6">{service.title}</h1>

        <div className="mb-8">
          <h2 className="font-semibold text-secondary mb-3">Характеристики</h2>
          <table className="text-sm w-full">
            <tbody>
              {service.characteristics.map((c) => (
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
          <div className="flex flex-col gap-3 text-sm text-gray-700 leading-relaxed">
            {service.fullDescription.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      <aside>
        <div className="sticky top-6">
          <ContactForm />
        </div>
      </aside>
      </Container>
    </section>
  );
}