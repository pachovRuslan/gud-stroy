// src/components/AboutSnippet.tsx
import Image from 'next/image';
import Link from 'next/link';
import { COMPANY } from '@/constants/company';

const AboutSnippet = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
      <div>
        <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-3">
          <span className="w-1 h-3.5 bg-primary rounded-full" />
          О компании
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-5 leading-tight tracking-tight">
          {COMPANY.name} — это больше, чем строительство
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Группа компаний {COMPANY.name} основана в 2013г и прошла путь от маленького ИП, занимающего розничной торговлей строительными материалами, до строительной компании полного цикла, которая занимается малоэтажным строительством, строительством домов «под ключ», проектированием и управлением проектами.
        </p>
        <p className="text-gray-600 leading-relaxed mb-8">
          У компании собственный парк техники и оборудования, а также собственный склад строительных материалов для обеспечения полноценного и бесперебойного процесса строительства.
        </p>

        <div className="flex items-center gap-10 mb-8 pt-6 border-t border-gray-100">
          <div>
            <div className="text-2xl font-extrabold text-secondary">{COMPANY.experience}</div>
            <div className="text-xs text-gray-500 mt-0.5">на рынке</div>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div>
            <div className="text-2xl font-extrabold text-secondary">5</div>
            <div className="text-xs text-gray-500 mt-0.5">направлений работ</div>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div>
            <div className="text-2xl font-extrabold text-secondary">100%</div>
            <div className="text-xs text-gray-500 mt-0.5">свой парк техники</div>
          </div>
        </div>

        <Link
          href="/o-nas"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-sm shadow-primary/30"
        >
          Связаться с нами
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="relative w-full h-72 md:h-96">
        <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-gray-100 shadow-xl shadow-black/10">
          <Image src="/images/0.jpg" alt={COMPANY.name} fill className="object-cover" />
        </div>

        {/* Плавающая карточка — та же деталь, что на фото в About-секции в мокапе */}
        <div className="absolute -left-6 bottom-8 hidden sm:flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0" />
          <span className="text-sm font-semibold text-secondary leading-snug">
            Собственная техника<br />и склад материалов
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutSnippet;
