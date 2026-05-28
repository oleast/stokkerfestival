import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background-alt px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="font-semibold text-text">Stokkerfestivalen</p>
            <p className="text-sm text-text-muted">22. august 2026 · Sørumsvegen 50</p>
          </div>
          <div className="flex flex-col items-center gap-2 md:items-end">
            <Link
              href="/personvern"
              className="text-sm text-text-muted underline hover:text-primary"
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
        <p className="mt-8 text-center text-xs text-text-muted/60">
          Laget med ❤️ og tvilsom kode
        </p>
      </div>
    </footer>
  );
}
