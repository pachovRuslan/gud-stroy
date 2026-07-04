// src/lib/queries.ts
// Слой доступа к данным Prismic. Здесь инкапсулированы все запросы и
// преобразование «сырых» документов в удобные для компонентов структуры.
// Если репозиторий ещё не наполнен — возвращаем фолбэк из defaults.ts,
// чтобы сайт оставался рабочим в dev-режиме.
import * as prismic from '@prismicio/client';
import { createClient } from './prismic';
import {
  DEFAULT_COMPANY,
  DEFAULT_HOMEPAGE,
  DEFAULT_BENEFITS,
  DEFAULT_STATS,
  DEFAULT_SERVICES,
} from './defaults';

// ---------- Типы данных для UI ----------

export type Service = {
  id: string;
  uid: string;
  title: string;
  shortDescription: string;
  fullDescription: string[];
  image: string | null;
  characteristics: { label: string; value: string }[];
  gallery: string[];
};

export type Benefit = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type Stat = {
  id: string;
  value: string;
  label: string;
};

export type Company = {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  region: string;
  address: string;
  experience: string;
  workHours: string;
  mapLat: number;
  mapLng: number;
  paymentOptions: string[];
};

export type Homepage = {
  heroTitle: string;
  heroText: string;
  aboutText: string[];
};

// ---------- Мапперы (документ → UI-тип) ----------

type ServiceDocument = prismic.PrismicDocument<
  {
    title: prismic.TitleField;
    shortDescription: prismic.KeyTextField;
    image: prismic.ImageField;
    characteristics: prismic.GroupField<{
      label: prismic.KeyTextField;
      value: prismic.KeyTextField;
    }>;
    fullDescription: prismic.GroupField<{
      paragraph: prismic.KeyTextField;
    }>;
    gallery: prismic.GroupField<{
      image: prismic.ImageField;
    }>;
  },
  'service'
>;

function mapService(doc: ServiceDocument): Service {
  const data = doc.data;
  return {
    id: doc.id,
    uid: doc.uid ?? '',
    title: prismic.asText(data.title),
    shortDescription: prismic.asText(data.shortDescription),
    fullDescription: (data.fullDescription ?? [])
      .map((p) => prismic.asText(p.paragraph))
      .filter(Boolean),
    image: prismic.asImageSrc(data.image, { w: 800, h: 600 }) ?? null,
    characteristics: (data.characteristics ?? [])
      .filter((c) => prismic.isFilled.keyText(c.label))
      .map((c) => ({
        label: prismic.asText(c.label),
        value: prismic.asText(c.value),
      })),
    gallery: (data.gallery ?? [])
      .map((g) => prismic.asImageSrc(g.image, { w: 800, h: 600 }))
      .filter((src): src is string => Boolean(src)),
  };
}

type BenefitDocument = prismic.PrismicDocument<
  {
    title: prismic.TitleField;
    description: prismic.KeyTextField;
    icon: prismic.SelectField<
      'ruler' | 'handshake' | 'credit-card' | 'file-check' | 'truck' | 'award'
    >;
  },
  'benefit'
>;

function mapBenefit(doc: BenefitDocument): Benefit {
  return {
    id: doc.id,
    title: prismic.asText(doc.data.title),
    description: prismic.asText(doc.data.description),
    icon: doc.data.icon ?? 'award',
  };
}

type StatDocument = prismic.PrismicDocument<
  {
    value: prismic.KeyTextField;
    label: prismic.KeyTextField;
  },
  'stat'
>;

function mapStat(doc: StatDocument): Stat {
  return {
    id: doc.id,
    value: prismic.asText(doc.data.value),
    label: prismic.asText(doc.data.label),
  };
}

type CompanyDocument = prismic.PrismicDocument<
  {
    name: prismic.KeyTextField;
    tagline: prismic.KeyTextField;
    phone: prismic.KeyTextField;
    email: prismic.KeyTextField;
    region: prismic.KeyTextField;
    address: prismic.KeyTextField;
    experience: prismic.KeyTextField;
    workHours: prismic.KeyTextField;
    mapLat: prismic.NumberField;
    mapLng: prismic.NumberField;
    paymentOptions: prismic.GroupField<{ option: prismic.KeyTextField }>;
  },
  'company'
>;

function mapCompany(doc: CompanyDocument): Company {
  const d = doc.data;
  return {
    name: prismic.asText(d.name) || 'ГУД-СТРОЙ',
    tagline: prismic.asText(d.tagline),
    phone: prismic.asText(d.phone),
    email: prismic.asText(d.email),
    region: prismic.asText(d.region),
    address: prismic.asText(d.address),
    experience: prismic.asText(d.experience),
    workHours: prismic.asText(d.workHours),
    mapLat: d.mapLat ?? 55.1904,
    mapLng: d.mapLng ?? 30.2049,
    paymentOptions: (d.paymentOptions ?? [])
      .map((p) => prismic.asText(p.option))
      .filter(Boolean),
  };
}

type HomepageDocument = prismic.PrismicDocument<
  {
    heroTitle: prismic.TitleField;
    heroText: prismic.KeyTextField;
    aboutText: prismic.GroupField<{ paragraph: prismic.KeyTextField }>;
  },
  'homepage'
>;

function mapHomepage(doc: HomepageDocument): Homepage {
  return {
    heroTitle: prismic.asText(doc.data.heroTitle),
    heroText: prismic.asText(doc.data.heroText),
    aboutText: (doc.data.aboutText ?? [])
      .map((p) => prismic.asText(p.paragraph))
      .filter(Boolean),
  };
}

// ---------- Публичные функции запросов ----------

export async function getServices(): Promise<Service[]> {
  try {
    const client = createClient();
    const docs = await client.getAllByType('service');
    const services = docs.map(mapService);
    return services.length > 0 ? services : DEFAULT_SERVICES;
  } catch {
    return DEFAULT_SERVICES;
  }
}

export async function getServiceByUID(
  uid: string
): Promise<Service | null> {
  try {
    const client = createClient();
    const doc = await client.getByUID('service', uid);
    return mapService(doc as ServiceDocument);
  } catch {
    // фолбэк: ищем среди дефолтных услуг по uid
    return DEFAULT_SERVICES.find((s) => s.uid === uid) ?? null;
  }
}

export async function getBenefits(): Promise<Benefit[]> {
  try {
    const client = createClient();
    const docs = await client.getAllByType('benefit');
    const benefits = docs.map(mapBenefit);
    return benefits.length > 0 ? benefits : DEFAULT_BENEFITS;
  } catch {
    return DEFAULT_BENEFITS;
  }
}

export async function getStats(): Promise<Stat[]> {
  try {
    const client = createClient();
    const docs = await client.getAllByType('stat');
    const stats = docs.map(mapStat);
    return stats.length > 0 ? stats : DEFAULT_STATS;
  } catch {
    return DEFAULT_STATS;
  }
}

export async function getCompany(): Promise<Company> {
  try {
    const client = createClient();
    const doc = await client.getSingle('company');
    return mapCompany(doc as CompanyDocument);
  } catch {
    return DEFAULT_COMPANY;
  }
}

export async function getHomepage(): Promise<Homepage> {
  try {
    const client = createClient();
    const doc = await client.getSingle('homepage');
    return mapHomepage(doc as HomepageDocument);
  } catch {
    return DEFAULT_HOMEPAGE;
  }
}
