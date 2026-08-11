import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = 'https://гудстрой.бел';

export default function robots(): MetadataRoute.Robots {

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