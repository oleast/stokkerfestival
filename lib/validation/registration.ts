import { z } from 'zod';

export const registrationSchema = z.object({
  name: z.string().min(1, 'Navn er påkrevd').max(100),
  email: z.email('Ugyldig e-postadresse').max(200),
  numberOfPeople: z.number().int().min(1, 'Minst 1 person').max(20, 'Maks 20 personer'),
  comment: z.string().max(200, 'Maks 200 tegn').optional().default(''),
  showOnGuestList: z.boolean().default(true),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const unregisterSchema = z.object({
  email: z.email('Ugyldig e-postadresse'),
  name: z.string().min(1, 'Navn er påkrevd'),
});
