
import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Услуга',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Краткое описание',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'fullDescription',
      title: 'Полное описание',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'highlights',
      title: 'Ключевые пункты (для страницы услуг)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'characteristics',
      title: 'Характеристики',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Название', type: 'string' },
            { name: 'value', title: 'Значение', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Главное фото',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Галерея',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'order',
      title: 'Порядок отображения',
      type: 'number',
    }),
  ],
});