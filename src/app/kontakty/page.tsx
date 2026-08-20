// src/app/kontakty/page.tsx
import { Phone, Mail, MapPin, Clock, Building2 } from 'lucide-react';
import { COMPANY } from '@/constants/company';
import Container from '@/components/Container';
import KontaktyHero from '@/components/KontaktyHero';
import ContactForm from '@/components/ContactForm';

const INFO_ROWS = [
  { icon: Phone, label: 'Телефон', value: COMPANY.phone, href: `tel:${COMPANY.phone.replace(/\s|\(|\)|-/g, '')}`, accent: true },
  { icon: Mail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}`, accent: true },
  { icon: MapPin, label: 'Адрес', value: COMPANY.address },
  { icon: Clock, label: 'Режим работы', value: COMPANY.workHours },
  { icon: Building2, label: 'Регион', value: COMPANY.region },
];

export default function ContactsPage() {
  const mapSrc = `https://yandex.by/map-widget/v1/?ll=${COMPANY.mapCoordinates.lng}%2C${COMPANY.mapCoordinates.lat}&z=14`;

  return (
    <>
      <KontaktyHero />

      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-3">
              <span className="w-1 h-3.5 bg-primary rounded-full" />
              Контакты
            </span>
<h2 className="text-3xl md:text-4xl font-extrabold text-secondary tracking-tight">
  Наши контакты
</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-7 mb-6">
                <h2 className="font-bold text-secondary text-lg mb-6">{COMPANY.name}</h2>
                <ul className="flex flex-col gap-5">
                  {INFO_ROWS.map(({ icon: Icon, label, value, href, accent }) => (
                    <li key={label} className="flex items-center gap-4">
                      <span className="w-10 h-10 flex-shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                        {href ? (
                          <a
                            href={href}
                            className={`text-sm font-semibold ${accent ? 'text-primary hover:text-primary-dark' : 'text-secondary'} transition-colors`}
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm font-semibold text-secondary">{value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[20px] overflow-hidden border border-gray-100 shadow-sm h-72">
                <iframe
                  src={mapSrc}
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Карта расположения офиса"
                />
              </div>
            </div>

            <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-7">
              <h2 className="font-bold text-secondary text-lg mb-1">Оставить заявку</h2>
              <p className="text-sm text-gray-500 mb-6">Перезвоним в течение 24 часов и ответим на все вопросы</p>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}