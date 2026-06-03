import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://festival.stokkers.no'),
  title: 'Stokkerfestivalen | Ole Anders sin 30-årsdag',
  description:
    'Privat invitasjon til Ole Anders sin 30-årsdag på Sørumsvegen 50, 22. august 2026.',
  openGraph: {
    title: 'Stokkerfestivalen | Ole Anders sin 30-årsdag',
    description:
      'Privat invitasjon til Ole Anders sin 30-årsdag på Sørumsvegen 50, 22. august 2026.',
    type: 'website',
    url: 'https://festival.stokkers.no',
    locale: 'nb_NO',
    siteName: 'Stokkerfestivalen',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-paper text-ink antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
