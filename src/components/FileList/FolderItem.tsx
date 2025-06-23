import React from 'react';
import { Folder } from 'lucide-react';

interface FolderItemProps {
  folderName: string;
  onClick?: (folderName: string) => void;
}

export const FolderItem: React.FC<FolderItemProps> = ({ folderName, onClick }) => {
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