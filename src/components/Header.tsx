// src/components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from './Container';

const NAV_ITEMS = [
  { href: '/o-nas', label: 'О нас' },
  { href: '/uslugi', label: 'Услуги' },
  { href: '/kontakty', label: 'Контакты' },
];

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <Container className="flex items-center justify-between py-4 md:py-6">
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold text-secondary tracking-tight"
          onClick={() => setMenuOpen(false)}
        >
          ГУД-СТРОЙ
        </Link>

        {/* Десктоп-меню */}
        <nav className="hidden md:flex gap-8 font-medium">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                isActive(item.href) ? 'text-primary' : 'text-secondary hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button className="hidden md:block px-6 py-2 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition-all">
          Заказать расчет
        </button>

        {/* Кнопка гамбургера — только на мобильных */}
        <button
          className="md:hidden p-2"
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