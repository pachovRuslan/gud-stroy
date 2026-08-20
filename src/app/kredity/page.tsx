// src/app/kreditovanie/page.tsx
import { FileCheck, Wallet, Clock, Percent } from 'lucide-react';
import Container from '@/components/Container';
import KredityHero from '@/components/KredityHero';
import ContactForm from '@/components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Кредитование и рассрочка — ГУДСТРОЙ Витебск',
  description:
    'Льготное кредитование по Указам №240 и №95, собственная рассрочка без банка и приём материнского капитала при строительстве дома в Витебске и области.',
};

// Статический контент — программы кредитования меняются редко,
// выносить в Sanity пока избыточно. Если заказчик попросит гибко
// редактировать — сделаем отдельный тип "creditProgram".
const PROGRAMS = [
  {
    id: '240',
    Icon: FileCheck,
    title: '240 Указ',
    subtitle: 'Льготное кредитование',
    description:
      'Государственная программа для граждан, состоящих на учёте нуждающихся в улучшении жилищных условий. Позволяет построить или реконструировать жильё по сниженной ставке.',
    terms: [
      'Ставка от 5% годовых',
      'Срок кредита — до 20 лет',
      'Первоначальный взнос от банка-партнёра',
      'Необходимость постановки на учёт нуждающихся',
    ],
  },
  {
    id: '95',
    Icon: Wallet,
    title: '95 Указ',
    subtitle: 'Поддержка многодетным семьям',
    description:
      'Дополнительные меры государственной поддержки при строительстве жилья для многодетных и приёмных семей — сниженная ставка и возможность погашения части долга за счёт государства.',
    terms: [
      'Льготная ставка для многодетных семей',
      'Частичное погашение долга государством',
      'Действует совместно с Указом №240',
      'Оформляется через банк-партнёр',
    ],
  },
  {
    id: 'rassrochka',
    Icon: Clock,
    title: 'Рассрочка на 12 месяцев',
    subtitle: 'Собственная программа компании',
    description:
      'Рассрочка от ГУД-СТРОЙ ВИТЕБСК без участия банка — без процентов, комиссий и переплат. Подходит, если у вас нет права на льготное кредитование или вы хотите оформить всё быстро, без сбора документов для банка.',
    terms: [
      'Без процентов и переплат',
      'Без справок о доходах и банка',
      'Первоначальный взнос — от 30%',
      'Фиксированный ежемесячный платёж',
    ],
  },
  {
    id: 'matkapital',
    Icon: Percent,
    title: 'Материнский капитал',
    subtitle: 'И банковские кредиты',
    description:
      'Принимаем к оплате семейный капитал, а также любые кредиты, оформленные вами в других банках. Поможем собрать документы для направления средств на строительство.',
    terms: [
      'Приём средств семейного капитала',
      'Работа с кредитами любых банков РБ',
      'Помощь в оформлении документов',
      'Консультация перед подачей заявления',
    ],
  },
];

const STEPS = [
  {
    title: 'Оставьте заявку',
    description: 'Заполните форму на сайте или позвоните — расскажем, какие программы подходят под вашу ситуацию.',
  },
  {
    title: 'Консультация специалиста',
    description: 'Разберём условия, посчитаем ежемесячный платёж и первоначальный взнос под ваш бюджет.',
  },
  {
    title: 'Подбор документов',
    description: 'Поможем собрать пакет документов для банка или оформления рассрочки — без лишних поездок.',
  },
  {
    title: 'Заключение договора',
    description: 'Подписываем договор и переходим к проектированию и строительству по согласованному графику.',
  },
];

export default function KreditovaniePage() {
  return (
    <>
      <KredityHero />

      <section className="pb-16 md:pb-24">
        <Container>
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-3">
              <span className="w-1 h-3.5 bg-primary rounded-full" />
              Программы
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4 tracking-tight">
              Способы оплаты строительства
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Работаем со всеми видами государственной поддержки и предлагаем
              собственную рассрочку без банка, процентов и переплат.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROGRAMS.map(({ id, Icon, title, subtitle, description, terms }) => (
              <div
                key={id}
                className="rounded-[20px] border border-gray-100 bg-white p-7 hover:shadow-lg hover:shadow-black/5 transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-bold text-secondary leading-snug">{title}</p>
                    <p className="text-xs text-gray-400">{subtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-5">{description}</p>

                <ul className="flex flex-col gap-2.5 pt-5 border-t border-gray-100">
                  {terms.map((term) => (
                    <li key={term} className="flex items-start gap-2.5 text-sm text-secondary">
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary">
                        <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Как оформить — шаги с нумерацией, тот же приём, что в BenefitCard */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-3">
              <span className="w-1 h-3.5 bg-primary rounded-full" />
              Процесс
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary tracking-tight">
              Как оформить
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((step, i) => (
              <div key={step.title} className="group relative rounded-[20px] border border-gray-100 bg-white p-7 overflow-hidden">
                <span className="absolute top-4 right-5 text-4xl font-extrabold text-primary/[0.08] leading-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm mb-5">
                  {i + 1}
                </div>
                <p className="relative font-bold text-secondary mb-2 leading-snug">{step.title}</p>
                <p className="relative text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA с формой заявки */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="rounded-[32px] bg-secondary px-6 md:px-14 py-14 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-5">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  Подберём программу
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                  Узнайте, на что вы имеете право
                </h2>
                <p className="text-white/70 leading-relaxed max-w-md">
                  Оставьте заявку — специалист посчитает ежемесячный платёж
                  и подберёт программу под вашу ситуацию бесплатно.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}