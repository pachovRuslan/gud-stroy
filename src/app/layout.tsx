// src/app/layout.tsx
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'ГУД-СТРОЙ — строительство домов в Витебске',
  description: 'Строительство каркасных и блочных домов, фундаментные работы, аренда спецтехники в Витебске и области.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}