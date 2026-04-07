'use client';
import { useState, useEffect } from 'react';
import { getAllPackagesAdmin, getAllInquiries, updateInquiryStatus, deletePackage, updatePackage } from '@/lib/firestore';
import { TravelPackage, BookingInquiry } from '@/types';

export function useAdminPackages() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getAllPackagesAdmin()
      .then(setPackages)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    await deletePackage(id);
    load();
  };

  const toggleActive = async (pkg: TravelPackage) => {
    await updatePackage(pkg.id, { isActive: !pkg.isActive });
    load();
  };

  return { packages, loading, remove, toggleActive, reload: load };
}

export function useAdminInquiries() {
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getAllInquiries()
      .then(setInquiries)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: BookingInquiry['status']) => {
    await updateInquiryStatus(id, status);
    load();
  };

  return { inquiries, loading, setStatus, reload: load };
}
