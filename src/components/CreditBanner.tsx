// src/components/CreditBanner.tsx
import Link from 'next/link';
import { Wallet, FileCheck, Clock, Percent } from 'lucide-react';
import Container from './Container';

// Баннер «Кредитование» — большой, на всю ширину секции, с тёмным фоном
// и фирменным бордовым акцентом. Размещается на главной после секции
// «6 преимуществ» (по просьбе заказчика).
//
// Ссылка ведёт на /kreditovanie — отдельная страница будет добавлена позже.
// Пока что ссылка ведёт на #zayavka (форма заявки), чтобы не было 404.

const CREDIT_OPTIONS = [
  {
    Icon: FileCheck,
    title: '240 Указ',
    description: 'Льготное кредитование на строительство жилья под 5% годовых',
  },
  {
    Icon: Wallet,
    title: '95 Указ',
    description: 'Государственная поддержка для многодетных семей',
  },
  {
    Icon: Clock,
    title: 'Рассрочка 12 мес',
    description: 'Собственная рассрочка без участия банка, без процентов и переплат',
  },
  {
    Icon: Percent,
    title: 'Материнский капитал',
    description: 'Принимаем к оплате материнский капитал и любые кредиты банков',
  },
];

const CreditBanner = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Тёмный фон с градиентом — бордовый → тёмный */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-secondary" />

      {/* Декоративный фоновый паттерн */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <Container className="relative py-16 md:py-24">
        <div className="text-center mb-12">
          <span className="inline-block bg-white/15 text-white text-xs md:text-sm font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm">
            Способы оплаты
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Кредитование и рассрочка
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Стройте дом сейчас — платите потом. Работаем со всеми видами
            государственной поддержки и предлагаем собственную рассрочку
            без процентов и переплат.
          </p>
        </div>

        {/* Сетка с 4 вариантами оплаты */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {CREDIT_OPTIONS.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-colors"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 text-center">
                {title}
              </h3>
              <p className="text-sm text-white/80 text-center leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA-кнопки */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* TODO: когда будет готова страница /kreditovanie — заменить href */}
          <Link
            href="/kreditovanie"
            className="px-8 py-3.5 bg-white text-primary text-base md:text-lg font-semibold rounded hover:bg-gray-100 transition-all"
          >
            Подробнее о кредитовании
          </Link>
          <Link
            href="/#zayavka"
            className="px-8 py-3.5 bg-transparent border-2 border-white text-white text-base md:text-lg font-semibold rounded hover:bg-white/10 transition-all"
          >
            Оставить заявку
          </Link>
        </div>

        {/* Мелкий текст-уточнение */}
        <p className="text-xs text-white/50 text-center mt-8 max-w-3xl mx-auto">
          * Условия кредитования зависят от банка-партнёра и вашего финансового
          положения. Поможем оформить документы и подобрать оптимальную программу.
        </p>
      </Container>
    </section>
  );
};

export default CreditBanner;
