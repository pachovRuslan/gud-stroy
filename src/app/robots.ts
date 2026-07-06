// src/app/robots.ts
import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gud-stroy.by';

export default function robots(): MetadataRoute.Robots {
  // Sanity Studio не индексируется; всё остальное разрешено.
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
