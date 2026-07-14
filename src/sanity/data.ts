// src/sanity/data.ts
import { client } from './client';
import {
  SERVICES_QUERY,
  SERVICE_BY_SLUG_QUERY,
  PRODUCTS_QUERY,
  PRODUCT_BY_ID_QUERY,
  PROJECTS_QUERY,
  ABOUT_PAGE_QUERY,
} from './queries';
import type { SanityService, SanityProduct } from './types';

export async function getServices(): Promise<SanityService[]> {
  return client.fetch(SERVICES_QUERY);
}

export async function getServiceBySlug(slug: string): Promise<SanityService | null> {
  return client.fetch(SERVICE_BY_SLUG_QUERY, { slug });
}

export async function getProducts(): Promise<SanityProduct[]> {
  return client.fetch(PRODUCTS_QUERY);
}

export async function getProductById(id: string): Promise<SanityProduct | null> {
  return client.fetch(PRODUCT_BY_ID_QUERY, { id });
}
export async function getProjects() {
  return client.fetch(PROJECTS_QUERY);
}

export async function getAboutPage() {
  return client.fetch(ABOUT_PAGE_QUERY);
}