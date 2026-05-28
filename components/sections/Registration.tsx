'use client';

import { useState } from 'react';
import { fireConfetti, ConfettiButton } from '@/components/ui/Confetti';
import { registrationSchema } from '@/lib/validation/registration';

type FormState = 'idle' | 'loading' | 'success' | 'duplicate' | 'error';

export default function Registration() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [comment, setComment] = useState('');
  const [showOnGuestList, setShowOnGuestList] = useState(true);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});
    setErrorMessage('');

    const data = { name, email, numberOfPeople, comment, showOnGuestList };

    // Client-side validation
    const result = registrationSchema.safeParse(data);
    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors as Record<string, string[]>);
      return;
    }

    setFormState('loading');

    try {
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.status === 201) {
        setFormState('success');
        fireConfetti();
      } else if (response.status === 409) {
        setFormState('duplicate');
        setErrorMessage(responseData.message);
      } else {
        setFormState('error');
        setErrorMessage(responseData.error || 'Noe gikk galt. Prøv igjen.');
      }
    } catch {
      setFormState('error');
      setErrorMessage('Kunne ikke koble til serveren. Prøv igjen.');
    }
  }

  if (formState === 'success') {
    return (
      <section id="pamelding" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-text md:text-4xl">🎉 Du er påmeldt!</h2>
          <p className="mt-4 text-lg text-text-muted">
            Fantastisk! Vi gleder oss til å se deg 22. august. Du får en bekreftelse på e-post.
          </p>
          <ConfettiButton />
        </div>
      </section>
    );
  }

  return (
    <section id="pamelding" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold text-text md:text-4xl">Meld deg på</h2>
        <p className="mt-4 text-lg text-text-muted">
          Fyll inn navnet ditt, så ses vi 22. august.
        </p>

        {formState === 'duplicate' && (
          <div className="mt-6 rounded-lg border border-accent bg-accent/10 p-4">
            <p className="font-medium text-text">😎 {errorMessage}</p>
          </div>
        )}

        {formState === 'error' && (
          <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4">
            <p className="text-red-800">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text">
              Navn *
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-white px-4 py-3 text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Ola Nordmann"
            />
            {fieldErrors.name && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.name[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text">
              E-post *
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-white px-4 py-3 text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="ola@eksempel.no"
            />
            {fieldErrors.email && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.email[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="numberOfPeople" className="block text-sm font-medium text-text">
              Antall personer
            </label>
            <input
              id="numberOfPeople"
              type="number"
              min={1}
              max={20}
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(parseInt(e.target.value) || 1)}
              className="mt-1 w-32 rounded-lg border border-border bg-white px-4 py-3 text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {fieldErrors.numberOfPeople && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.numberOfPeople[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-text">
              Noe vi bør vite?
            </label>
            <input
              id="comment"
              type="text"
              maxLength={200}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-white px-4 py-3 text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Allergier, ønsker, eller hemmeligheter..."
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="showOnGuestList"
              type="checkbox"
              checked={showOnGuestList}
              onChange={(e) => setShowOnGuestList(e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
            />
            <label htmlFor="showOnGuestList" className="text-sm text-text-muted">
              Vis navnet mitt på gjestelisten
            </label>
          </div>

          <button
            type="submit"
            disabled={formState === 'loading'}
            className="w-full rounded-lg bg-primary px-6 py-3.5 text-lg font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formState === 'loading' ? 'Melder på...' : 'Meld meg på'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          Allerede påmeldt?{' '}
          <a href="#avmelding" className="text-primary underline hover:no-underline">
            Meld av her
          </a>
        </p>
      </div>
    </section>
  );
}
