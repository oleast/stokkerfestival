import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-2xl font-semibold text-ink">Stokkerfestivalen</p>
            <p className="mt-2 text-sm text-text-muted">Ole Anders sin 30-årsdag</p>
            <p className="mt-1 text-sm text-text-muted">22. august 2026 · Sørumsvegen 50</p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <Link
              href="/personvern"
              className="text-sm text-text-muted underline decoration-line underline-offset-4 hover:text-primary"
            >
              Personvernerklæring
            </Link>
            <a
              href="mailto:olestokk@gmail.com"
              className="text-sm text-text-muted hover:text-primary"
            >
              olestokk@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
