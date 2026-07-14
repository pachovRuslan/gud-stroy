// src/sanity/schemaTypes/project.ts
import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Проект (фото объекта)',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Фото',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Подпись (необязательно)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Порядок отображения',
      type: 'number',
    }),
  ],
});