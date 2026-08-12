import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schema } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'ГУД-СТРОЙ',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "w0iooenl",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: '/studio',
  plugins: [structureTool({ structure }), visionTool()],
  schema,
});