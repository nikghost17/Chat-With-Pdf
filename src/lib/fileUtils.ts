import { UploadedFile } from './types';

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const createUploadedFile = (file: File): UploadedFile => ({
  id: Date.now() + Math.random().toString(),
  name: file.name,
  size: file.size,
  uploadTime: new Date().toLocaleTimeString(),
  type: file.type,
  uploadedAt: new Date().toLocaleDateString(),
  url: URL.createObjectURL(file),
  file: file // Store the actual file object
});

export const filterPdfFiles = (files: FileList | File[]): File[] => {
  return Array.from(files).filter(file => file.type === 'application/pdf');
};