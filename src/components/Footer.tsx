// src/components/Footer.tsx
import Link from 'next/link';
import { COMPANY } from '@/constants/company';
import Container from './Container';

const Footer = () => {
  return (
    <footer className="bg-secondary text-gray-300">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="text-xl font-bold text-white mb-3">{COMPANY.name}</div>
            <p className="text-sm leading-relaxed">{COMPANY.tagline}</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Контакты</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a href={`tel:${COMPANY.phone.replace(/\s|\(|\)|-/g, '')}`} className="hover:text-white transition-colors">
                  {COMPANY.phone}
                </a>
              </li>
              <li>{COMPANY.region}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Услуги</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/uslugi/frame-houses" className="hover:text-white transition-colors">Каркасные дома</Link></li>
              <li><Link href="/uslugi/foundation" className="hover:text-white transition-colors">Фундаментные работы</Link></li>
              <li><Link href="/uslugi/excavator-rental" className="hover:text-white transition-colors">Аренда техники</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-xs text-gray-500">
          © {new Date().getFullYear()} {COMPANY.name}. Все права защищены.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;