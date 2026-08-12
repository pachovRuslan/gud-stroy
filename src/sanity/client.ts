import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: "w0iooenl",
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
});