
import { type SchemaTypeDefinition } from 'sanity';
import { service } from './service';
import { product } from './product';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [service, product],
};