
export type Benefit = {
  id: string;
  title: string;
  description: string;
  icon: string; // имя иконки, если будешь использовать lucide-react или tabler
};

export const BENEFITS: Benefit[] = [
  {
    id: 'free-estimate',
    title: 'Бесплатный выезд сметчика',
    description: 'Наш специалист приедет на замер и составит смету без оплаты.',
    icon: 'ruler',
  },
  {
    id: 'direct-contracts',
    title: 'Прямые контракты с заводами',
    description: 'Работаем напрямую с производителями стройматериалов, без наценки посредников.',
    icon: 'handshake',
  },
  {
    id: 'financing',
    title: 'Кредиты и рассрочка',
    description: 'Работаем по 240 и 95 Указу, с материнским капиталом и собственной рассрочкой.',
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
    description: 'Мини-экскаватор, минипогрузчик, самосвал — не зависим от подрядчиков.',
    icon: 'truck',
  },
  {
    id: 'experience',
    title: '8–10 лет опыта',
    description: 'Опытная команда специалистов в каркасном и блочном домостроении.',
    icon: 'award',
  },
];