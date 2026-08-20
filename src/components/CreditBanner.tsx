// src/components/CreditBanner.tsx
import Link from 'next/link';
import { Wallet, FileCheck, Clock, Percent } from 'lucide-react';
import Container from './Container';

// Баннер «Кредитование» — размещается на главной после секции «6 преимуществ».
// Визуально построен по тому же паттерну, что hero-карусель услуг:
// фото + тёмная подложка + скруглённая карточка. Так он не выглядит
// вставкой из другого сайта, а продолжает общий язык страницы.
//
// Ссылка ведёт на /kreditovanie — отдельная страница будет добавлена позже.
// Пока что вторая кнопка ведёт на #zayavka (форма заявки), чтобы не было 404.

const CREDIT_OPTIONS = [
  {
    Icon: FileCheck,
    title: '240 Указ',
    description: 'Льготное кредитование под 5% годовых',
  },
  {
    Icon: Wallet,
    title: '95 Указ',
    description: 'Поддержка для многодетных семей',
  },
  {
    Icon: Clock,
    title: 'Рассрочка 12 мес',
    description: 'Без банка, без процентов и переплат',
  },
  {
    Icon: Percent,
    title: 'Материнский капитал',
    description: 'Принимаем к оплате и кредиты банков',
  },
];

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CreditBanner = () => {
  return (
    <section className="pb-16 md:pb-24">
      <Container>
        <div
          className="relative overflow-hidden rounded-[32px] shadow-xl shadow-black/10 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/2.jpg')" }}
        >
          {/* Тёмная подложка поверх фото — тот же приём, что в hero-карусели услуг */}
          <div className="absolute inset-0 bg-secondary/90" />

          <div className="relative px-6 md:px-14 py-14 md:py-16">
            <div className="max-w-xl mb-10 md:mb-12">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-5">
                <span className="w-1 h-1 rounded-full bg-primary" />
                Способы оплаты
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                Кредитование и рассрочка
              </h2>
              <p className="text-base text-white/70 leading-relaxed">
                Стройте дом сейчас — платите потом. Работаем со всеми видами
                государственной поддержки и предлагаем собственную рассрочку
                без процентов и переплат.
              </p>
            </div>

            {/* Варианты оплаты — компактные глэсс-карточки, как бейджи в hero */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10 md:mb-12">
              {CREDIT_OPTIONS.map(({ Icon, title, description }) => (
                <div
                  key={title}
                  className="group flex items-start gap-3.5 bg-white/[0.06] backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/[0.1] hover:border-white/20 transition-all"
                >
                  <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white leading-snug">{title}</p>
                    <p className="text-xs text-white/60 leading-relaxed mt-0.5">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA-кнопки — тот же pill-стиль, что в Header/Hero/AboutSnippet */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* TODO: когда будет готова страница /kreditovanie — заменить href */}
              <Link
                href="/kredity"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white text-base font-semibold rounded-full hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-sm shadow-primary/40"
              >
                Подробнее о кредитовании
                <ArrowIcon />
              </Link>
              <Link
                href="/#zayavka"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-base font-semibold rounded-full hover:bg-white/15 transition-all"
              >
                Оставить заявку
              </Link>
            </div>

            {/* Мелкий текст-уточнение */}
            <p className="text-xs text-white/40 mt-8 max-w-2xl">
              * Условия кредитования зависят от банка-партнёра и вашего финансового
              положения. Поможем оформить документы и подобрать оптимальную программу.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CreditBanner;
