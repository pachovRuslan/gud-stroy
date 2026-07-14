
import type { PortableTextBlock } from 'sanity';

export type SanityImage = {
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: unknown;
  crop?: unknown;
};

// Поле может отсутствовать в документе или быть пустым — отражаем это в типе,
// чтобы страницы корректно обрабатывали отсутствие данных.
export type SanityCharacteristic = { label: string; value: string };

export type SanityService = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  fullDescription: PortableTextBlock[] | null;
  highlights: string[] | null;
  characteristics: SanityCharacteristic[] | null;
  image: SanityImage | null;
  gallery?: SanityImage[] | null;
};

export type SanityProduct = {
  _id: string;
  title: string;
  description: string | null;
  image: SanityImage | null;
};
export type SanityProject = {
  _id: string;
  image: SanityImage;
  caption?: string;
};

export type SanityAboutPage = {
  title?: string;
  description: PortableTextBlock[];
};