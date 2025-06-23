"use client";

import React from 'react';
import { Folder } from 'lucide-react';

interface FolderItemProps {
  folderName: string;
  onClick?: (folderName: string) => void;
}

const FolderItem: React.FC<FolderItemProps> = ({ folderName, onClick }) => {
  return (
    <div 
      className="bg-gradient-to-br from-white to-slate-50 hover:from-amber-50 hover:to-yellow-50 rounded-xl p-4 cursor-pointer transition-all duration-200 border border-slate-200 hover:border-amber-300 shadow-sm hover:shadow-md"
      onClick={() => onClick?.(folderName)}
    >
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
          <Folder size={20} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate mb-1">{folderName}</p>
          <p className="text-xs text-slate-500">
            Folder
          </p>
        </div>
      </div>
    </div>
  );
};

// Preview component
export default function FolderItemPreview() {
  const handleFolderClick = (folderName: string) => {
    alert(`Clicked on folder: ${folderName}`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">FolderItem Component Preview</h2>
      <div className="space-y-4 max-w-md">
        <FolderItem 
          folderName="Documents" 
          onClick={handleFolderClick}
        />
        <FolderItem 
          folderName="Images" 
          onClick={handleFolderClick}
        />
        <FolderItem 
          folderName="Projects/Web Development/React Components" 
          onClick={handleFolderClick}
        />
        <FolderItem 
          folderName="My Folder" 
          onClick={handleFolderClick}
        />
      </div>
    </div>
  );
}