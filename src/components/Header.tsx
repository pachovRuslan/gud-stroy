// src/components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Container from './Container';
import { COMPANY } from '@/constants/company';

const NAV_ITEMS = [
  { href: '/o-nas', label: 'О нас' },
  { href: '/uslugi', label: 'Услуги' },
  { href: '/tovary', label: 'Товары' },
  { href: '/kontakty', label: 'Контакты' },
  
  
];

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

        <div className="hidden md:flex items-center gap-5">
          
            <a href={`tel:${COMPANY.phone.replace(/\s|\(|\)|-/g, '')}`}
            className="text-sm font-medium text-secondary hover:text-primary transition-colors whitespace-nowrap">
            {COMPANY.phone}
          </a>
          <button className="px-6 py-2 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition-all whitespace-nowrap">
            Заказать расчет
          </button>
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
            
             <a href={`tel:${COMPANY.phone.replace(/\s|\(|\)|-/g, '')}`}
              className="py-3 font-medium text-secondary"
            >
              {COMPANY.phone}
            </a>
            <button className="mt-2 px-6 py-3 bg-primary text-white font-semibold rounded">
              Заказать расчет
            </button>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Header;