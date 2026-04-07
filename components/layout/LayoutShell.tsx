'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { FloatingNature } from '@/components/ui/NatureScene';
import MascotHelper from '@/components/ui/MascotHelper';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {/* Floating nature animations — butterflies, leaves, birds */}
      <FloatingNature />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* Cartoon mascot helper — reacts per page */}
      <MascotHelper />
    </>
  );
}
