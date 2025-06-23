import React from 'react';
import { UploadedFile } from '@/lib/types';
import { FileItem } from './FileItem';

interface FileListProps {
  files: UploadedFile[];
  onFileClick?: (file: UploadedFile) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onFileClick }) => {
  if (files.length === 0) {
    return (
      // <div className="text-center py-12">
      //   <div className="w-12 h-12 mx-auto bg-slate-100 rounded-xl flex items-center justify-center mb-4">
      //     <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      //     </svg>
      //   </div>
      //   <p className="text-slate-500 font-medium">No documents uploaded yet</p>
      //   <p className="text-sm text-slate-400 mt-1">Upload your first PDF to get started</p>
      // </div>
      <div></div>
    );
  }

  return (
    <div className="space-y-3">
      {files.map((file) => (
        <FileItem key={file.id} file={file} onClick={onFileClick} />
      ))}
    </div>
  );
};