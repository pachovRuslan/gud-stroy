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
    <>
      {/* Верхняя утилитарная полоса: соцсети, часы, телефон. Не залипает при скролле. */}
      <div className="hidden md:block bg-secondary text-white/70 text-sm">
        <Container className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-1.5">
            {MESSENGERS.map(({ key, href, label, Icon, color }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                style={{ '--brand': color } as React.CSSProperties}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-white/10 text-white/70 hover:bg-[var(--brand)] hover:text-white transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <span>{COMPANY.hours ?? 'Пн–Сб, 9:00–19:00'}</span>
            <span className="w-px h-3.5 bg-white/20" />
            <a
              href={`tel:${COMPANY.phone.replace(/\s|\(|\)|-/g, '')}`}
              className="text-white font-medium hover:text-primary transition-colors"
            >
              {COMPANY.phone}
            </a>
          </div>
        </Container>
      </div>

      {/* Основная шапка: логотип, меню-пилюля, одна кнопка действия. Залипает при скролле. */}
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
              width={44}
              height={44}
              className="rounded-md"
            />
            <span className="text-lg md:text-xl font-bold text-secondary tracking-tight hidden sm:inline">
              {COMPANY.name}
            </span>
          </Link>

          {/* Десктоп-меню: сегментированная пилюля вместо ряда ссылок */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-50 border border-black/[0.06] rounded-full p-1 font-semibold text-sm">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary text-white shadow-sm shadow-primary/40'
                    : 'text-secondary/70 hover:text-secondary hover:bg-black/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <CtaButton className="px-6 py-2.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark hover:-translate-y-0.5 transition-all whitespace-nowrap shadow-sm shadow-primary/30">
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
                    style={{ '--brand': color } as React.CSSProperties}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-neutral-50 text-secondary/70 hover:bg-[var(--brand)] hover:text-white transition-colors"
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
              <CtaButton className="mt-2 px-6 py-3 bg-primary text-white font-semibold rounded-full text-center">
                Заказать расчет
              </CtaButton>
            </Container>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
