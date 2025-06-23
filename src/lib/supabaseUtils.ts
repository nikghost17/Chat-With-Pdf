import { supabase } from './supabaseConfig'
import { UploadedFile } from './types'

export async function createFolder(folderName: string): Promise<string> {
  if (!folderName) return 'Folder name required'

  const filePath = `${folderName}/.init`
  const { error } = await supabase.storage
    .from('new-bucket')
    .upload(filePath, new Blob(['init']), {
      contentType: 'text/plain',
      upsert: false,
    })

  if (error) {
    return `❌ Error: ${error.message}`
  } else {
    return `✅ Folder "${folderName}" created`
  }
}

export async function listFolders(): Promise<string[]> {
  const { data, error } = await supabase.storage
    .from('new-bucket')
    .list('', {
      limit: 100,
      offset: 0,
    })

  if (error) {
    console.error('Error listing folders:', error.message)
    return []
  }

  // Filter out files and return only folder names
  return (data || []).filter(item => item.metadata === null &&  item.name !== 'uploads').map(item => item.name);
}

export async function deleteFolder(folderName: string): Promise<string> {
  if (!folderName) return 'Folder name required'

  const { error } = await supabase.storage
    .from('my-bucket')
    .remove([`${folderName}/.init`])

  if (error) {
    return `❌ Error: ${error.message}`
  } else {
    return `✅ Folder "${folderName}" deleted`
  }
}


export async function uploadPDF(file: File, folderName?:string) {
  if(!folderName) {folderName = 'uploads';} // Default folder name if not provided
  const filePath = `${folderName}/${file.name}`;

  const { data, error } = await supabase.storage
    .from('new-bucket') // Replace with your bucket name
    .upload(filePath, file, {
      contentType: 'application/pdf',
      upsert: true,
    });

  if (error) {
    console.error('Upload error:', error.message);
    return null;
  }

  const { data: publicURLData } = supabase
    .storage
    .from('your-bucket-name')
    .getPublicUrl(filePath);

  return publicURLData.publicUrl;
}

export async function fetchFilesFromFolder(folderName: string): Promise<UploadedFile[]> {
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
    if (folder.name === folderName && folder.metadata === null) { // it's a folder
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
        if (file.name === '.init') continue;
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
}
