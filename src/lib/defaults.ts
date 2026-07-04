// src/lib/defaults.ts
// Фолбэк-контент: используется, когда Prismic-документы ещё не созданы
// или запрос упал. Позволяет сайту рендериться в dev-режиме до наполнения
// админки, а также служит «seed»-данными при первоначальной настройке.
import type {
  Service,
  Benefit,
  Stat,
  Company,
  Homepage,
} from './queries';

export const DEFAULT_COMPANY: Company = {
  name: 'ГУД-СТРОЙ',
  tagline: 'Строительство домов и фундаментные работы в Витебске и области',
  phone: '+375 (29) XXX-XX-XX',
  email: 'info@gud-stroy.by',
  region: 'Витебск, Витебская область',
  address: 'г. Витебск, ул. ...',
  experience: '8–10 лет',
  workHours: 'Пн–Пт: 9:00–18:00',
  mapLat: 55.1904,
  mapLng: 30.2049,
  paymentOptions: [
    'Наличный и безналичный расчёт',
    'Кредит 240 Указ',
    'Кредит 95 Указ',
    'Материнский капитал',
    'Собственная рассрочка',
  ],
};

export const DEFAULT_HOMEPAGE: Homepage = {
  heroTitle: 'Строительство домов и фундаментные работы под ключ',
  heroText:
    'Витебск и Витебская область. Собственная техника, кредиты по 240 и 95 Указу.',
  aboutText: [],
};

export const DEFAULT_BENEFITS: Benefit[] = [
  {
    id: 'free-estimate',
    title: 'Бесплатный выезд сметчика',
    description: 'Наш специалист приедет на замер и составит смету без оплаты.',
    icon: 'ruler',
  },
  {
    id: 'direct-contracts',
    title: 'Прямые контракты с заводами',
    description:
      'Работаем напрямую с производителями стройматериалов, без наценки посредников.',
    icon: 'handshake',
  },
  {
    id: 'financing',
    title: 'Кредиты и рассрочка',
    description:
      'Работаем по 240 и 95 Указу, с материнским капиталом и собственной рассрочкой.',
    icon: 'credit-card',
  },
  {
    id: 'full-docs',
    title: 'Полное документальное сопровождение',
    description: 'Гарантия на работы, чёткое соблюдение оговорённых сроков.',
    icon: 'file-check',
  },
  {
    id: 'own-fleet',
    title: 'Собственная техника',
    description:
      'Мини-экскаватор, минипогрузчик, самосвал — не зависим от подрядчиков.',
    icon: 'truck',
  },
  {
    id: 'experience',
    title: '8–10 лет опыта',
    description: 'Опытная команда специалистов в каркасном и блочном домостроении.',
    icon: 'award',
  },
];

export const DEFAULT_STATS: Stat[] = [
  { id: 'experience', value: '8–10', label: 'лет опыта' },
  { id: 'projects', value: '47+', label: 'выполненных проектов' },
  { id: 'rating', value: '5.0', label: 'рейтинг на площадках' },
  { id: 'response', value: '~5 мин', label: 'среднее время ответа' },
];

export const DEFAULT_SERVICES: Service[] = [
  {
    id: 'frame-houses',
    uid: 'frame-houses',
    title: 'Строительство каркасных домов',
    shortDescription:
      'Дома под ключ, реконструкция деревянных домов. Собственная команда с опытом в каркасном домостроении.',
    fullDescription: [
      'Выполним строительство каркасного дома под ключ. Также выполним реконструкцию деревянного дома.',
      'Отличная команда специалистов, имеем опыт и компетенции в каркасном домостроении.',
      'Работаем со всеми кредитами банков, субсидией, 240 Указ и материнским капиталом.',
    ],
    image: '/images/frame-house.svg',
    characteristics: [
      { label: 'Тип работ', value: 'Строительство домов «под ключ»' },
      { label: 'Опыт работы', value: '8–10 лет' },
    ],
    gallery: ['/images/frame-house.svg', '/images/foundation.svg'],
  },
  {
    id: 'block-houses',
    uid: 'block-houses',
    title: 'Строительство домов из блоков',
    shortDescription:
      'Строительство и реконструкция домов «под ключ» с полным документальным сопровождением.',
    fullDescription: [
      'Выполним работы по строительству дома, реконструкции дома под ключ.',
      'Честные цены, бесплатный выезд специалиста-сметчика, прямые контракты с заводами.',
    ],
    image: '/images/block-house.svg',
    characteristics: [
      { label: 'Тип работ', value: 'Строительство домов «под ключ»' },
      { label: 'Опыт работы', value: '8–10 лет' },
    ],
    gallery: [],
  },
  {
    id: 'foundation',
    uid: 'foundation',
    title: 'Фундаментные работы',
    shortDescription:
      'Свайно-ростверковый, ленточный, плитный фундамент, блоки ФБС. Гидроизоляция и утепление фундамента.',
    fullDescription: [
      'Выполним устройство фундамента любой сложности.',
      'Свайно-ростверковый, ленточный, плитный фундамент, блоки ФБС.',
    ],
    image: '/images/foundation.svg',
    characteristics: [
      { label: 'Тип работ', value: 'Фундаментные работы' },
      { label: 'Опыт работы', value: '8–10 лет' },
    ],
    gallery: [],
  },
  {
    id: 'pile-drilling',
    uid: 'pile-drilling',
    title: 'Бурение свай',
    shortDescription:
      'Бурение мини-экскаватором, шнек 200/250 мм, глубина до 1,7 м. Копка траншей под фундамент.',
    fullDescription: [
      'Выполним работы по бурению свай мини-экскаватором.',
      'В наличии шнек 200 мм, 250 мм, глубина бурения до 1,7 м.',
    ],
    image: '/images/pile-drilling.svg',
    characteristics: [{ label: 'Тип работ', value: 'Земляные работы' }],
    gallery: [],
  },
  {
    id: 'excavator-rental',
    uid: 'excavator-rental',
    title: 'Аренда мини-экскаватора',
    shortDescription:
      'С опытным оператором: копка траншей под канализацию, воду, газ, электричество.',
    fullDescription: [
      'Предлагаем в аренду мини-экскаватор с опытным оператором.',
      'Копка траншей под канализацию, воду, газ, электричество.',
    ],
    image: '/images/excavator.svg',
    characteristics: [{ label: 'Тип работ', value: 'Аренда техники' }],
    gallery: [],
  },
];
