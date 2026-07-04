// src/lib/prismic.ts
import * as prismic from '@prismicio/client';
import type { NextRequest } from 'next/server';

/**
 * Имя репозитория Prismic. Берётся из переменной окружения PRISMIC_REPOSITORY_NAME
 * (см. .env.local). Превращается в endpoint https://<имя>.cdn.prismic.io/api/v2.
 */
export const repositoryName =
  process.env.PRISMIC_REPOSITORY_NAME || 'gud-stroy';

/**
 * Access token для чтения API (если репозиторий приватный).
 * Для публичного репозитория можно оставить пустым.
 */
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

/**
 * Link Resolver — маппинг типа документа Prismic в URL на сайте.
 * Используется для рендера внутренних ссылок (PrismicNextLink) и для превью.
 *
 * @see https://prismic.io/docs/core-concepts/link-resolver-route-resolver
 */
export const linkResolver: prismic.LinkResolverFunction = (doc) => {
  switch (doc.type) {
    case 'service':
      return doc.uid ? `/uslugi/${doc.uid}` : '/uslugi';
    case 'homepage':
      return '/';
    default:
      return '/';
  }
};

/**
 * Route Resolver — альтернативный способ резолва URL с учётом вложенности.
 * Здесь не требуется (структура простая), оставляем совместимым с linkResolver.
 */
export const routeResolver: prismic.RouteResolver = {
  routes: [
    { type: 'homepage', path: '/' },
    { type: 'service', path: '/uslugi/:uid' },
  ],
};

/**
 * Фабрика Prismic-клиента.
 *
 * В Next.js App Router клиент создаётся на каждый запрос (в серверных
 * компонентах и route handlers), чтобы корректно работали превью и кеширование.
 *
 * @param config.request — объект запроса из route handler (нужен для auto-previews).
 *                         В серверных компонентах не передаётся.
 * @param config.fetchOptions — опции fetch Next.js (напр. { next: { tags: [...] } }).
 */
export function createClient({
  request,
  fetchOptions,
}: {
  request?: NextRequest;
  fetchOptions?: prismic.ClientConfig['fetchOptions'];
} = {}): prismic.Client {
  const client = prismic.createClient(repositoryName, {
    accessToken,
    fetchOptions,
    routes: routeResolver.routes,
  });

  // Включаем автоматическое превью, если есть объект запроса (route handler).
  // Метод enableAutoPreviewsFromReq предоставляется самим Prismic-клиентом.
  if (request) {
    client.enableAutoPreviewsFromReq(request);
  }

  return client;
}
