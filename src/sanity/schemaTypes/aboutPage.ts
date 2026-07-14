
import { defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Страница «О нас»',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Описание компании',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});