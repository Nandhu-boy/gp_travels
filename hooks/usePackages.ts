'use client';
import { useState, useEffect } from 'react';
import { getAllPackages, getFeaturedPackages, getPackagesByCategory } from '@/lib/firestore';
import { TravelPackage, PackageCategory } from '@/types';

export function usePackages() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllPackages()
      .then(setPackages)
      .catch(() => setError('Failed to load packages'))
      .finally(() => setLoading(false));
  }, []);

  return { packages, loading, error };
}

export function useFeaturedPackages() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedPackages()
      .then(setPackages)
      .finally(() => setLoading(false));
  }, []);

  return { packages, loading };
}

export function usePackagesByCategory(category: PackageCategory | null) {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) { setLoading(false); return; }
    setLoading(true);
    getPackagesByCategory(category)
      .then(setPackages)
      .finally(() => setLoading(false));
  }, [category]);

  return { packages, loading };
}
