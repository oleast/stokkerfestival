import { defineType, defineField } from 'sanity';

export const registration = defineType({
  name: 'registration',
  title: 'Påmelding',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'E-post',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'numberOfPeople',
      title: 'Antall personer',
      type: 'number',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'comment',
      title: 'Kommentar',
      type: 'string',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'showOnGuestList',
      title: 'Vis på gjestelisten',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'registeredAt',
      title: 'Registrert',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
});
