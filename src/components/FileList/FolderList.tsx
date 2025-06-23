import React from 'react';
import { FolderItem } from './FolderItem';

interface FolderListProps {
  folders: string[];
  onFolderClick?: (folderName: string) => void;
}

export const FolderList: React.FC<FolderListProps> = ({ folders, onFolderClick }) => {
  if (folders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 mx-auto bg-slate-100 rounded-xl flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>
        <p className="text-slate-500 font-medium">No folders created yet</p>
        <p className="text-sm text-slate-400 mt-1">Create your first folder to organize your files</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {folders.map((folder, index) => (
        <FolderItem key={`folder-${index}`} folderName={folder} onClick={onFolderClick} />
      ))}
    </div>
  );
};