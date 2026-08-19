// src/components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Container from './Container';
import { COMPANY, SOCIAL_LINKS } from '@/constants/company';
import { ViberIcon, WhatsAppIcon, TelegramIcon, MaxIcon, InstagramIcon } from './SocialIcons';

// CTA-кнопка ведёт на форму заявки: на главной — к якорю #zayavka,
// на остальных страницах — на главную с тем же якорем.
function CtaButton({ className = '', children }: { className?: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const href = pathname === '/' ? '/#zayavka' : '/#zayavka';
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

const NAV_ITEMS = [
  { href: '/o-nas', label: 'О нас' },
  { href: '/uslugi', label: 'Услуги' },
  { href: '/tovary', label: 'Товары' },
  { href: '/kontakty', label: 'Контакты' },
];

// Мессенджеры и соцсети для шапки (только десктоп).
// Используем собственные SVG-иконки для брендов, так как lucide-react v1.x
// убрал все brand-иконки.
const MESSENGERS = [
  { key: 'viber',     href: SOCIAL_LINKS.viber,     label: 'Viber',     Icon: ViberIcon,     color: '#7360F2' },
  { key: 'whatsapp',  href: SOCIAL_LINKS.whatsapp,  label: 'WhatsApp',  Icon: WhatsAppIcon,  color: '#25D366' },
  { key: 'telegram',  href: SOCIAL_LINKS.telegram,  label: 'Telegram',  Icon: TelegramIcon,  color: '#0088CC' },
  { key: 'max',       href: SOCIAL_LINKS.max,       label: 'MAX',       Icon: MaxIcon,       color: '#FF6B35' },
  { key: 'instagram', href: SOCIAL_LINKS.instagram, label: 'Instagram', Icon: InstagramIcon, color: '#E1306C' },
] as const;

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <Container className="flex items-center justify-between py-3 md:py-4 gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 flex-shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/images/logo.png"
            alt={COMPANY.name}
            width={48}
            height={48}
            className="rounded-md"
          />
          <span className="text-lg md:text-xl font-bold text-secondary tracking-tight hidden sm:inline">
            {COMPANY.name}
          </span>
        </Link>

        {/* Десктоп-меню */}
        <nav className="hidden md:flex gap-8 font-medium">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors whitespace-nowrap ${
                isActive(item.href) ? 'text-primary' : 'text-secondary hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {/* Мессенджеры и соцсети — компактные иконки возле телефона */}
          <div className="flex items-center gap-1.5">
            {MESSENGERS.map(({ key, href, label, Icon, color }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                style={{ color }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <a
            href={`tel:${COMPANY.phone.replace(/\s|\(|\)|-/g, '')}`}
            className="text-sm font-medium text-secondary hover:text-primary transition-colors whitespace-nowrap"
          >
            {COMPANY.phone}
          </a>
          <CtaButton className="px-6 py-2 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition-all whitespace-nowrap">
            Заказать расчет
          </CtaButton>
        </div>

        {/* Кнопка гамбургера — только на мобильных */}
        <button
          className="md:hidden p-2 flex-shrink-0"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          <span className="block w-6 h-0.5 bg-secondary mb-1.5" />
          <span className="block w-6 h-0.5 bg-secondary mb-1.5" />
          <span className="block w-6 h-0.5 bg-secondary" />
        </button>
      </Container>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`py-3 font-medium ${
                  isActive(item.href) ? 'text-primary' : 'text-secondary'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Мессенджеры в мобильном меню — крупнее, в строку */}
            <div className="flex items-center gap-3 py-3">
              {MESSENGERS.map(({ key, href, label, Icon, color }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  style={{ color }}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <a href={`tel:${COMPANY.phone.replace(/\s|\(|\)|-/g, '')}`}
              className="py-3 font-medium text-secondary"
            >
              {COMPANY.phone}
            </a>
            <CtaButton className="mt-2 px-6 py-3 bg-primary text-white font-semibold rounded text-center">
              Заказать расчет
            </CtaButton>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Header;
