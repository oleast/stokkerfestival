import { defineType, defineField } from 'sanity';

export const galleryVideo = defineType({
  name: 'galleryVideo',
  title: 'Gallerivideo',
  type: 'document',
  fields: [
    defineField({
      name: 'file',
      title: 'Videofil',
      type: 'file',
      options: {
        accept: 'video/mp4,video/quicktime',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alternativ tekst',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Rekkefølge',
      type: 'number',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Miniatyrbilde',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'thumbnail',
    },
  },
});
