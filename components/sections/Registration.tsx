'use client';

import { useState } from 'react';
import posthog from 'posthog-js';
import { fireConfetti, ConfettiButton } from '@/components/ui/Confetti';
import { registrationSchema } from '@/lib/validation/registration';

type FormState = 'idle' | 'loading' | 'success' | 'duplicate' | 'error';
type FieldName = 'name' | 'email' | 'numberOfPeople' | 'comment';
type FieldErrors = Partial<Record<FieldName, string[]>>;

const errorIds: Record<FieldName, string> = {
  name: 'name-error',
  email: 'email-error',
  numberOfPeople: 'numberOfPeople-error',
  comment: 'comment-error',
};

const inputClassName =
  'mt-2 w-full rounded-md border border-line bg-paper px-4 py-3 text-text placeholder:text-text-muted/50 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15';
const labelClassName = 'block text-sm font-medium text-ink';
const errorClassName = 'mt-2 text-sm text-red-700';

export default function Registration() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [comment, setComment] = useState('');
  const [showOnGuestList, setShowOnGuestList] = useState(true);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFieldErrors({});
    setErrorMessage('');
    setFormState('idle');

    const data = { name, email, numberOfPeople, comment, showOnGuestList };

    const result = registrationSchema.safeParse(data);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        name: errors.name,
        email: errors.email,
        numberOfPeople: errors.numberOfPeople,
        comment: errors.comment,
      });
      return;
    }

    posthog.capture('registration_submitted', {
      number_of_people: numberOfPeople,
      has_comment: !!comment,
      show_on_guest_list: showOnGuestList,
    });

    setFormState('loading');

    const distinctId = posthog.get_distinct_id();

    try {
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-POSTHOG-DISTINCT-ID': distinctId,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.status === 201) {
        posthog.identify(email, { name, email });
        setFormState('success');
        fireConfetti();
      } else if (response.status === 409) {
        posthog.capture('registration_duplicate_attempted', { email });
        setFormState('duplicate');
        setErrorMessage(responseData.message);
      } else {
        posthog.capture('registration_failed', { status: response.status });
        setFormState('error');
        setErrorMessage(responseData.error || 'Noe gikk galt. Prøv igjen.');
      }
    } catch (err) {
      posthog.captureException(err);
      posthog.capture('registration_failed', { error: 'network' });
      setFormState('error');
      setErrorMessage('Kunne ikke koble til serveren. Prøv igjen.');
    }
  }

  const nameError = fieldErrors.name?.[0];
  const emailError = fieldErrors.email?.[0];
  const numberOfPeopleError = fieldErrors.numberOfPeople?.[0];
  const commentError = fieldErrors.comment?.[0];

  if (formState === 'success') {
    return (
      <section id="pamelding" className="bg-paper px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl border-y border-line py-12 text-center" role="status" aria-live="polite">
          <p className="eyebrow">Påmelding</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-ink md:text-5xl">Du er påmeldt.</h2>
          <p className="mt-5 lead-text">
            Vi gleder oss til å se deg 22. august. Vi forsøker også å sende en bekreftelse på e-post.
          </p>
          <ConfettiButton />
        </div>
      </section>
    );
  }

  return (
    <section id="pamelding" className="bg-paper px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Svar</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-ink md:text-5xl">Meld deg på.</h2>
          <p className="mt-5 lead-text">
            Fyll inn det viktigste, så er du med. Det trenger ikke være mer formelt enn det.
          </p>
        </div>

        <div>
          {formState === 'duplicate' && (
            <div className="mb-6 rounded-md border border-accent bg-accent/10 p-4" role="alert">
              <p className="font-medium text-text">{errorMessage}</p>
            </div>
          )}

          {formState === 'error' && (
            <div className="mb-6 rounded-md border border-red-300 bg-red-50 p-4" role="alert">
              <p className="text-red-800">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 border-t border-line pt-6" aria-busy={formState === 'loading'}>
            <div>
              <label htmlFor="name" className={labelClassName}>
                Navn *
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={inputClassName}
                placeholder="Ola Nordmann"
                aria-invalid={!!nameError}
                aria-describedby={nameError ? errorIds.name : undefined}
              />
              {nameError && <p id={errorIds.name} className={errorClassName}>{nameError}</p>}
            </div>

            <div>
              <label htmlFor="email" className={labelClassName}>
                E-post *
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={inputClassName}
                placeholder="ola@eksempel.no"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? errorIds.email : undefined}
              />
              {emailError && <p id={errorIds.email} className={errorClassName}>{emailError}</p>}
            </div>

            <div>
              <label htmlFor="numberOfPeople" className={labelClassName}>
                Antall personer
              </label>
              <input
                id="numberOfPeople"
                type="number"
                min={1}
                max={20}
                value={numberOfPeople}
                onChange={(event) => setNumberOfPeople(Number.parseInt(event.target.value, 10) || 1)}
                className="mt-2 w-32 rounded-md border border-line bg-paper px-4 py-3 text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                aria-invalid={!!numberOfPeopleError}
                aria-describedby={numberOfPeopleError ? errorIds.numberOfPeople : undefined}
              />
              {numberOfPeopleError && (
                <p id={errorIds.numberOfPeople} className={errorClassName}>{numberOfPeopleError}</p>
              )}
            </div>

            <div>
              <label htmlFor="comment" className={labelClassName}>
                Noe vi bør vite?
              </label>
              <input
                id="comment"
                type="text"
                maxLength={200}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                className={inputClassName}
                placeholder="Allergier, ønsker eller annet praktisk"
                aria-invalid={!!commentError}
                aria-describedby={commentError ? errorIds.comment : undefined}
              />
              {commentError && <p id={errorIds.comment} className={errorClassName}>{commentError}</p>}
            </div>

            <div className="flex items-center gap-3">
              <input
                id="showOnGuestList"
                type="checkbox"
                checked={showOnGuestList}
                onChange={(event) => setShowOnGuestList(event.target.checked)}
                className="h-4 w-4 rounded border-line text-primary focus:ring-primary/20"
              />
              <label htmlFor="showOnGuestList" className="text-sm text-text-muted">
                Vis navnet mitt på gjestelisten
              </label>
            </div>

            <button
              type="submit"
              disabled={formState === 'loading'}
              className="w-full rounded-md bg-primary px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {formState === 'loading' ? 'Melder på...' : 'Meld meg på'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-text-muted">
            Allerede påmeldt?{' '}
            <a href="#avmelding" className="text-primary underline decoration-line underline-offset-4 hover:no-underline">
              Meld av her
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
