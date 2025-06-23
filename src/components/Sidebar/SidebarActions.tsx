import React from 'react';
import { Upload, FolderPlus } from 'lucide-react';
import { Button } from '../ui/Button';

interface SidebarActionsProps {
  onUploadClick: () => void;
  onNewCollectionClick: () => void;
  isUploading?: boolean;
}

export const SidebarActions: React.FC<SidebarActionsProps> = ({
  onUploadClick,
  onNewCollectionClick,
  isUploading = false
}) => {
  return (
    <div className="p-6 space-y-4">
      <Button 
        onClick={onUploadClick}
        variant="primary"
        icon={Upload}
        className="w-full"
      >
        {isUploading ? 'Uploading...' : 'Upload Document'}
      </Button>
      
      <Button 
        onClick={onNewCollectionClick}
        variant="secondary"
        icon={FolderPlus}
        className="w-full"
      >
        Create Folder 
      </Button>
    </div>
  );
};