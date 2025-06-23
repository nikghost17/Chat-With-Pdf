import React from 'react';
import { UploadedFile } from '@/lib/types';
import { formatFileSize } from '@/lib/fileUtils';
import { FileIcon } from '../ui/FileIcon';

interface FileItemProps {
  file: UploadedFile;
  onClick?: (file: UploadedFile) => void;
}

export const FileItem: React.FC<FileItemProps> = ({ file, onClick }) => {
  return (
    <div 
      className="bg-gradient-to-br from-white to-slate-50 hover:from-blue-50 hover:to-indigo-50 rounded-xl p-4 cursor-pointer transition-all duration-200 border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
      onClick={() => onClick?.(file)}
    >
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
          <FileIcon size="md" className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate mb-1">{file.name}</p>
          <p className="text-xs text-slate-500">
            {formatFileSize(file.size)} • {file.uploadTime}  {file.uploadedAt}
          </p>
        </div>
      </div>
    </div>
  );
};