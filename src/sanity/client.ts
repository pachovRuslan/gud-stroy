import { createClient } from 'next-sanity';
import { projectId, dataset, apiVersion } from './env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN включён обратно: для static export это бесплатно и быстрее.
  // Раньше было false — это лишняя нагрузка на Sanity API.
  useCdn: true,
});
