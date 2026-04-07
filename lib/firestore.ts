import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc,
  deleteDoc, query, where, orderBy, limit, Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { TravelPackage, BookingInquiry, Testimonial } from '@/types';

// Helper: run a Firestore query with a timeout so it never blocks the UI
async function safeQuery<T>(fn: () => Promise<T>, fallback: T, timeoutMs = 5000): Promise<T> {
  try {
    const result = await Promise.race([
      fn(),
      new Promise<T>((_, reject) => setTimeout(() => reject(new Error('timeout')), timeoutMs)),
    ]);
    return result;
  } catch {
    return fallback;
  }
}

// ─── PACKAGES ──────────────────────────────────────────────
export async function getAllPackages(): Promise<TravelPackage[]> {
  return safeQuery(async () => {
    const q = query(
      collection(db, 'packages'),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as TravelPackage));
  }, []);
}

export async function getFeaturedPackages(): Promise<TravelPackage[]> {
  return safeQuery(async () => {
    const q = query(
      collection(db, 'packages'),
      where('isActive', '==', true),
      where('isFeatured', '==', true),
      limit(6)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as TravelPackage));
  }, []);
}

export async function getPackageById(id: string): Promise<TravelPackage | null> {
  return safeQuery(async () => {
    const snap = await getDoc(doc(db, 'packages', id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as TravelPackage;
  }, null);
}

export async function getPackagesByCategory(category: string): Promise<TravelPackage[]> {
  return safeQuery(async () => {
    const q = query(
      collection(db, 'packages'),
      where('isActive', '==', true),
      where('category', '==', category)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as TravelPackage));
  }, []);
}

export async function createPackage(data: Omit<TravelPackage, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'packages'), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return ref.id;
}

export async function updatePackage(id: string, data: Partial<TravelPackage>): Promise<void> {
  await updateDoc(doc(db, 'packages', id), {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function deletePackage(id: string): Promise<void> {
  await deleteDoc(doc(db, 'packages', id));
}

// ─── ADMIN: ALL PACKAGES (including inactive) ──────────────
export async function getAllPackagesAdmin(): Promise<TravelPackage[]> {
  return safeQuery(async () => {
    const q = query(collection(db, 'packages'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as TravelPackage));
  }, []);
}

// ─── BOOKING INQUIRIES ─────────────────────────────────────
export async function createInquiry(data: Omit<BookingInquiry, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'inquiries'), {
    ...data,
    status: 'new',
    createdAt: Timestamp.now(),
  });
  return ref.id;
}

export async function getAllInquiries(): Promise<BookingInquiry[]> {
  return safeQuery(async () => {
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as BookingInquiry));
  }, []);
}

export async function updateInquiryStatus(id: string, status: BookingInquiry['status']): Promise<void> {
  await updateDoc(doc(db, 'inquiries', id), { status });
}

// ─── TESTIMONIALS ──────────────────────────────────────────
export async function getTestimonials(): Promise<Testimonial[]> {
  return safeQuery(async () => {
    const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Testimonial));
  }, []);
}
