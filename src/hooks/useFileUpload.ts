import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabaseConfig';
import { UploadedFile } from '../lib/types';

export const useFileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFiles = useCallback(async (files: File[]): Promise<UploadedFile[]> => {
    if (files.length === 0) return [];

    setIsUploading(true);
    const newFiles: UploadedFile[] = [];

    try {
      for (const file of files) {
        if (file.type === 'application/pdf') {
          const timestamp = Date.now();
          const filePath = `uploads/${timestamp}_${file.name}`;

          const { error: uploadError } = await supabase.storage
            .from('new-bucket')
            .upload(filePath, file, {
              contentType: file.type,
              upsert: false,
            });

          if (uploadError) {
            console.error('Supabase upload error:', uploadError.message);
            continue;
          }

          const { data } = supabase.storage
            .from('new-bucket')
            .getPublicUrl(filePath);

          const publicUrl = data?.publicUrl || URL.createObjectURL(file); // fallback

          const uploadedFile: UploadedFile = {
            id: timestamp.toString() + Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toLocaleDateString(),
            url: publicUrl,
            file: file
          };
          console.log('PDF URL:', publicUrl);
          newFiles.push(uploadedFile);
        }
      }

      setUploadedFiles(prev => [...prev, ...newFiles]);
      return newFiles;
    } catch (error) {
      console.error('Error uploading files:', error);
      return [];
    } finally {
      setIsUploading(false);
    }
  }, []);



  const fetchFiles = async (): Promise<UploadedFile[]> => {
  const allFiles: UploadedFile[] = [];
  const timestamp = Date.now();
  // Step 1: List top-level folders in the bucket
  const { data: folders, error: folderError } = await supabase
    .storage
    .from('new-bucket')
    .list('', { limit: 100, offset: 0 });

  if (folderError) {
    console.error('Error listing folders:', folderError.message);
    return [];
  }

  // Step 2: Loop through each folder and fetch files
  for (const folder of folders || []) {
    if (folder.name && folder.metadata === null && folder.name === 'uploads') { // it's a folder
      const { data: files, error: fileError } = await supabase
        .storage
        .from('new-bucket')
        .list(folder.name, { limit: 100 });

      if (fileError) {
        console.error(`Error listing files in ${folder.name}:`, fileError.message);
        continue;
      }

      // Step 3: Generate public URL for each file
      for (const file of files || []) {
        if (['.init', '.emptyFolderPlaceholder'].includes(file.name)) continue;
        const fullPath = `${folder.name}/${file.name}`;
        const { data: urlData } = supabase
          .storage
          .from('new-bucket')
          .getPublicUrl(fullPath);

        allFiles.push({
          id: timestamp.toString() + Math.random().toString(36).substr(2, 9),
          name: file.name.includes('_') ? file.name.split('_').slice(1).join('_') : file.name,
          size: file.metadata?.size || 0,
          type: 'application/pdf',
          uploadedAt: new Date(file.updated_at || file.created_at || '').toLocaleDateString(),
          url: urlData?.publicUrl || '',
          file: undefined // optional
        });
      }
    }
  }

  return allFiles;
};
useEffect(() => {
   const loadFiles = async () => {
    const files = await fetchFiles();
    setUploadedFiles(files);
  };

  loadFiles();
  }, []);


  const removeFile = useCallback((fileId: string) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove?.url?.startsWith('blob:')) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      return prev.filter(f => f.id !== fileId);
    });
  }, []);

  return {
    uploadedFiles,
    isUploading,
    handleFiles,
    removeFile
  };
};
