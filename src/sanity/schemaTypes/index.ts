import { type SchemaTypeDefinition } from 'sanity';
import { service } from './service';
import { product } from './product';
import { project } from './project';
import { aboutPage } from './aboutPage';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [service, product, project, aboutPage],
};