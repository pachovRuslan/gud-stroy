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
      {/* Верхняя CTA-полоса — та же пилюля-кнопка и акцент, что и в хэдере */}
      <div className="border-b border-white/10">
        <Container className="py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-primary font-semibold text-xs uppercase tracking-wider">
              Готовы обсудить проект?
            </span>
            <h3 className="text-white text-2xl md:text-3xl font-extrabold mt-2 tracking-tight">
              Рассчитаем стоимость за 1 день
            </h3>
          </div>
          <Link
            href="/#zayavka"
            className="px-7 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark hover:-translate-y-0.5 transition-all whitespace-nowrap shadow-sm shadow-primary/30 flex-shrink-0"
          >
            Заказать расчет
          </Link>
        </Container>
      </div>

      <Container className="py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Колонка 1: Логотип и краткое описание */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt={COMPANY.name}
                width={44}
                height={44}
                className="rounded-md"
              />
              <span className="text-lg font-bold text-white tracking-tight">
                {COMPANY.name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              {COMPANY.tagline}. Работаем с {COMPANY.experience} опыта.
            </p>

            {/* Соцсети — монохромные, брендовый цвет только на hover, как в хэдере */}
            <div className="flex items-center gap-2 mt-6">
              {SOCIALS.map(({ key, href, label, Icon, color }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  style={{ '--brand': color } as React.CSSProperties}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[var(--brand)] hover:border-transparent hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Колонка 2: Навигация */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-wider relative pl-3">
              <span className="absolute left-0 top-1 w-1 h-3.5 bg-primary rounded-full" />
              Навигация
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white hover:pl-1 transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 3: Услуги (из Sanity) */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-wider relative pl-3">
              <span className="absolute left-0 top-1 w-1 h-3.5 bg-primary rounded-full" />
              Услуги
            </h3>
            {footerServices.length > 0 ? (
              <ul className="flex flex-col gap-3 text-sm">
                {footerServices.map((service) => (
                  <li key={service._id}>
                    <Link
                      href={`/uslugi/${service.slug}`}
                      className="hover:text-white hover:pl-1 transition-all"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="flex flex-col gap-3 text-sm">
                <li>
                  <Link href="/uslugi" className="hover:text-white hover:pl-1 transition-all">
                    Все услуги
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Колонка 4: Контакты */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-wider relative pl-3">
              <span className="absolute left-0 top-1 w-1 h-3.5 bg-primary rounded-full" />
              Контакты
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={`tel:${COMPANY.phone.replace(/\s|\(|\)|-/g, '')}`}
                  className="text-white font-medium hover:text-primary transition-colors"
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
          </div>
        </div>

        {/* Нижняя строка — копирайт */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs text-gray-500">
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
