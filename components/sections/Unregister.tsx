'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

type UnregisterState = 'idle' | 'loading' | 'success' | 'not-found' | 'error';

export default function Unregister() {
  const searchParams = useSearchParams();
  const prefillEmail = searchParams.get('avmeld') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState(prefillEmail);
  const [state, setState] = useState<UnregisterState>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');

    try {
      const response = await fetch('/api/unregister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setState('success');
        setMessage(data.message);
      } else if (response.status === 404) {
        setState('not-found');
        setMessage(data.error);
      } else {
        setState('error');
        setMessage(data.error || 'Noe gikk galt.');
      }
    } catch {
      setState('error');
      setMessage('Kunne ikke koble til serveren. Prøv igjen.');
    }
  }

  if (state === 'success') {
    return (
      <div id="avmelding" className="px-6 py-12">
        <div className="mx-auto max-w-2xl rounded-lg border border-border bg-background-alt p-6 text-center">
          <p className="text-lg text-text">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div id="avmelding" className="px-6 py-12">
      <div className="mx-auto max-w-2xl rounded-lg border border-border bg-background-alt p-6">
        <h3 className="text-lg font-semibold text-text">Avmelding</h3>
        <p className="mt-2 text-sm text-text-muted">
          Kan du likevel ikke komme? Skriv inn navn og e-post du meldte deg på med.
        </p>

        {state === 'not-found' && (
          <p className="mt-4 text-sm text-red-600">{message}</p>
        )}
        {state === 'error' && (
          <p className="mt-4 text-sm text-red-600">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ditt navn"
            aria-label="Navn"
            className="flex-1 rounded-lg border border-border bg-white px-4 py-2.5 text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="din@epost.no"
            aria-label="E-postadresse"
            className="flex-1 rounded-lg border border-border bg-white px-4 py-2.5 text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            disabled={state === 'loading'}
            className="rounded-lg border border-primary px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white disabled:opacity-50"
          >
            {state === 'loading' ? 'Avmelder...' : 'Meld av'}
          </button>
        </form>
      </div>
    </div>
  );
}
