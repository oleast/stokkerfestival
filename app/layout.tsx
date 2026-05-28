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
  title: 'Stokkerfestivalen \u2013 22. august 2026',
  description:
    '30-\u00e5rsfest p\u00e5 g\u00e5rden. Grilling, basseng, spill og god stemning.',
  openGraph: {
    title: 'Stokkerfestivalen \u2013 22. august 2026',
    description:
      '30-\u00e5rsfest p\u00e5 g\u00e5rden. Grilling, basseng, spill og god stemning.',
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
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
