import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Nettstedsinnstillinger',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Heltebildet',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroAlt',
      title: 'Alternativ tekst for heltebildet',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'festivalDate',
      title: 'Festivaldato og -tid',
      type: 'datetime',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Undertittel',
      type: 'string',
    }),
    defineField({
      name: 'ogTitle',
      title: 'OG-tittel',
      type: 'string',
    }),
    defineField({
      name: 'ogDescription',
      title: 'OG-beskrivelse',
      type: 'text',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG-bilde',
      description: 'Valgfritt. Faller tilbake til heltebildet om tomt.',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Nettstedsinnstillinger' };
    },
  },
});
