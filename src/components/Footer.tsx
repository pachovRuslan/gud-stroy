// src/components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import { COMPANY, SOCIAL_LINKS } from '@/constants/company';
import { getServices } from '@/sanity/data';
import Container from './Container';
import { ViberIcon, WhatsAppIcon, TelegramIcon, InstagramIcon } from './SocialIcons';

// Footer рендерится на каждой странице — ISR на час, чтобы не дёргать Sanity
// на каждом запросе и при этом подхватывать новые услуги в течение часа.
export const revalidate = 3600;

// Соцсети для подвала — те же, что в Header, но без MAX (в подвале обычно
// только основные). Заказчик может попросить добавить — просто расширим массив.
const SOCIALS = [
  { key: 'viber',     href: SOCIAL_LINKS.viber,     label: 'Viber',     Icon: ViberIcon,     color: '#7360F2' },
  { key: 'whatsapp',  href: SOCIAL_LINKS.whatsapp,  label: 'WhatsApp',  Icon: WhatsAppIcon,  color: '#25D366' },
  { key: 'telegram',  href: SOCIAL_LINKS.telegram,  label: 'Telegram',  Icon: TelegramIcon,  color: '#0088CC' },
  { key: 'instagram', href: SOCIAL_LINKS.instagram, label: 'Instagram', Icon: InstagramIcon, color: '#E1306C' },
] as const;

const FOOTER_NAV = [
  { href: '/o-nas',    label: 'О компании' },
  { href: '/uslugi',   label: 'Услуги' },
  { href: '/tovary',   label: 'Товары' },
  { href: '/kontakty', label: 'Контакты' },
];

const Footer = async () => {
  // Берём только первые 5 услуг — для блока ссылок.
  const services = await getServices();
  const footerServices = services.slice(0, 5);

  return (
    <footer className="bg-secondary text-gray-300">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Колонка 1: Логотип и краткое описание */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt={COMPANY.name}
                width={48}
                height={48}
                className="rounded-md"
              />
              <span className="text-lg font-bold text-white tracking-tight">
                {COMPANY.name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              {COMPANY.tagline}. Работаем с {COMPANY.experience} опыта.
            </p>
          </div>

          {/* Колонка 2: Навигация */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Навигация
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 3: Услуги (из Sanity) */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Услуги
            </h3>
            {footerServices.length > 0 ? (
              <ul className="flex flex-col gap-2.5 text-sm">
                {footerServices.map((service) => (
                  <li key={service._id}>
                    <Link
                      href={`/uslugi/${service.slug}`}
                      className="hover:text-white transition-colors"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="flex flex-col gap-2.5 text-sm">
                <li>
                  <Link href="/uslugi" className="hover:text-white transition-colors">
                    Все услуги
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Колонка 4: Контакты и соцсети */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Контакты
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm mb-6">
              <li>
                <a
                  href={`tel:${COMPANY.phone.replace(/\s|\(|\)|-/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li className="text-gray-400">{COMPANY.region}</li>
              <li className="text-gray-400">{COMPANY.workHours}</li>
            </ul>

            {/* Соцсети — как на siphaus.by, только круглые кнопки */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ key, href, label, Icon, color }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:border-white transition-colors"
                  style={{ color }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Нижняя строка — копирайт */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. Все права защищены.
          </p>
          <p className="text-gray-600">
            Строительство домов и фундаментные работы в Витебске и области
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
