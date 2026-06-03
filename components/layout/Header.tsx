'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#om-festen', label: 'Om festen' },
  { href: '#aktiviteter', label: 'Aktiviteter' },
  { href: '#galleri', label: 'Galleri' },
  { href: '#praktisk-info', label: 'Praktisk info' },
  { href: '#pamelding', label: 'Påmelding' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const solidHeader = scrolled || menuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solidHeader
          ? 'border-b border-line bg-paper/95 shadow-sm backdrop-blur-md'
          : 'bg-gradient-to-b from-black/35 to-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <a
          href="#"
          className={`text-lg font-semibold transition-colors duration-300 ${
            solidHeader ? 'text-ink' : 'text-white'
          }`}
        >
          Stokkerfestivalen
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`border-b border-transparent pb-1 text-sm transition-colors duration-300 hover:border-primary hover:text-primary ${
                solidHeader ? 'text-ink-soft' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pamelding"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/25"
          >
            Meld deg på
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`text-sm font-medium md:hidden ${
            solidHeader ? 'text-ink' : 'text-white'
          }`}
          aria-label={menuOpen ? 'Lukk meny' : 'Åpne meny'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? 'Lukk' : 'Meny'}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-line bg-paper px-6 py-5 shadow-soft md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-line pb-3 text-base text-ink hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pamelding"
              onClick={() => setMenuOpen(false)}
              className="rounded-md bg-primary px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Meld deg på
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
