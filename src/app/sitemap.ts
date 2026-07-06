// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getServices, getProducts } from '@/sanity/data';

// Базовый домен сайта. Замените на боевой при деплое.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gud-stroy.by';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, products] = await Promise.all([getServices(), getProducts()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/o-nas`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/uslugi`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/tovary`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/kontakty`, changeFrequency: 'yearly', priority: 0.5 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services
    .filter((s) => Boolean(s.slug))
    .map((s) => ({
      url: `${BASE_URL}/uslugi/${s.slug}`,
      lastModified: undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/tovary/${p._id}`,
    lastModified: undefined,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...productRoutes];
}
