// src/app/kontakty/page.tsx
import { COMPANY } from '@/constants/company';
import Container from '@/components/Container';
import KontaktyHero from '@/components/KontaktyHero';
import ContactForm from '@/components/ContactForm';

export default function ContactsPage() {
  const mapSrc = `https://yandex.by/map-widget/v1/?ll=${COMPANY.mapCoordinates.lng}%2C${COMPANY.mapCoordinates.lat}&z=14`;

  return (
    <>
      <KontaktyHero />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <h2 className="font-semibold text-secondary mb-4">{COMPANY.name}</h2>
                <ul className="flex flex-col gap-3 text-sm">
                  <li className="flex gap-3">
                    <span className="text-gray-500 w-24 flex-shrink-0">Телефон</span>
                    <a href={`tel:${COMPANY.phone.replace(/\s|\(|\)|-/g, '')}`} className="text-primary font-medium">
                      {COMPANY.phone}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-500 w-24 flex-shrink-0">Email</span>
                    <a href={`mailto:${COMPANY.email}`} className="text-primary font-medium">
                      {COMPANY.email}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-500 w-24 flex-shrink-0">Адрес</span>
                    <span className="text-secondary">{COMPANY.address}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-500 w-24 flex-shrink-0">Режим работы</span>
                    <span className="text-secondary">{COMPANY.workHours}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-500 w-24 flex-shrink-0">Регион</span>
                    <span className="text-secondary">{COMPANY.region}</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg overflow-hidden border border-gray-200 h-72">
                <iframe
                  src={mapSrc}
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Карта расположения офиса"
                />
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-secondary mb-4">Оставить заявку</h2>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}