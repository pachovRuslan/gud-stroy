// src/sanity/queries.ts
import { groq } from 'next-sanity';

export const SERVICES_QUERY = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    fullDescription,
    highlights,
    characteristics,
    image,
    gallery
  }
`;

export const SERVICE_BY_SLUG_QUERY = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    fullDescription,
    highlights,
    characteristics,
    image,
    gallery
  }
`;

export const PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(order asc, title asc) {
    _id,
    title,
    description,
    image
  }
`;

export const PRODUCT_BY_ID_QUERY = groq`
  *[_type == "product" && _id == $id][0] {
    _id,
    title,
    description,
    image
  }
`;