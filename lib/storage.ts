import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadImage(
  file: File,
  path: string  // e.g. 'packages/package-id/image1.jpg'
): Promise<string> {
  const storageRef = ref(storage, path);
  const snap = await uploadBytes(storageRef, file);
  return await getDownloadURL(snap.ref);
}

export async function uploadMultipleImages(
  files: File[],
  folder: string
): Promise<string[]> {
  const uploads = files.map((file, i) =>
    uploadImage(file, `${folder}/${Date.now()}_${i}_${file.name}`)
  );
  return Promise.all(uploads);
}

export async function deleteImage(url: string): Promise<void> {
  const storageRef = ref(storage, url);
  await deleteObject(storageRef);
}

export async function uploadPDF(file: File, packageId: string): Promise<string> {
  return uploadImage(file, `packages/${packageId}/itinerary.pdf`);
}