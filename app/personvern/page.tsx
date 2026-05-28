import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Personvernerklæring – Stokkerfestivalen',
  description: 'Informasjon om hvordan vi behandler personopplysninger.',
};

export default function Personvern() {
  return (
    <main className="px-6 py-20 md:py-28">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-text md:text-4xl">Personvernerklæring</h1>
        <p className="mt-4 text-text-muted">Sist oppdatert: mai 2026</p>

        <div className="mt-10 space-y-8 text-text-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-text">Hvem er ansvarlig?</h2>
            <p className="mt-2">
              Ole Anders Stokker er behandlingsansvarlig for personopplysningene som samles
              inn via denne nettsiden. Kontakt:{' '}
              <a href="mailto:olestokk@gmail.com" className="text-primary underline">
                olestokk@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text">Hvilke opplysninger samler vi?</h2>
            <p className="mt-2">Når du melder deg på Stokkerfestivalen, lagrer vi:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Navn</li>
              <li>E-postadresse</li>
              <li>Antall personer du melder på</li>
              <li>Eventuell kommentar (valgfritt)</li>
              <li>Om du ønsker å vises på gjestelisten (valgfritt)</li>
              <li>Tidspunkt for påmelding</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text">Formål</h2>
            <p className="mt-2">
              Opplysningene brukes utelukkende til å administrere arrangementet:
              registrere påmeldinger, sende bekreftelse på e-post, og vise fornavn på
              gjestelisten (kun om du har samtykket).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text">Gjestelisten</h2>
            <p className="mt-2">
              Hvis du krysser av for «Vis navnet mitt på gjestelisten», vil fornavnet ditt
              vises offentlig på nettsiden. Du kan når som helst melde deg av, og navnet
              forsvinner fra listen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text">Lagring og sikkerhet</h2>
            <p className="mt-2">
              Data lagres i Sanity (skybasert CMS med servere i EU/EØS). E-post sendes via
              Brevo, et fransk selskap som er GDPR-compliant. Ingen data deles med
              tredjeparter utover dette.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text">Sletting</h2>
            <p className="mt-2">
              Alle personopplysninger slettes etter arrangementet (22. august 2026). Du kan
              også melde deg av når som helst — da slettes opplysningene dine umiddelbart.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text">Dine rettigheter</h2>
            <p className="mt-2">Du har rett til:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Innsyn i opplysningene vi har om deg</li>
              <li>Korrigering av feilaktige opplysninger</li>
              <li>Sletting av opplysningene dine</li>
              <li>Å trekke samtykke for gjesteliste-visning</li>
            </ul>
            <p className="mt-2">
              Kontakt{' '}
              <a href="mailto:olestokk@gmail.com" className="text-primary underline">
                olestokk@gmail.com
              </a>{' '}
              for å utøve dine rettigheter.
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-primary underline hover:no-underline">
            ← Tilbake til forsiden
          </Link>
        </div>
      </article>
    </main>
  );
}
