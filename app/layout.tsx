import type { Metadata } from 'next';
import './globals.css';
import LayoutShell from '@/components/layout/LayoutShell';

export const metadata: Metadata = {
  title: 'GP Travels | Tamil Nadu\'s Mood-Based Travel Brand',
  description: 'Experience Tamil Nadu like never before. Agrotourism, spiritual journeys, mystery treks, workations and more.',
  keywords: 'GP Travels, Thennadu Holidays, Tamil Nadu travel, agrotourism, mood based travel',
  openGraph: {
    title: 'GP Travels — Tamil Nadu\'s #1 Agrotourism & Mood-Based Travel Brand',
    description: 'Curated Tamil Nadu escapes. Experience, don\'t just explore.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
