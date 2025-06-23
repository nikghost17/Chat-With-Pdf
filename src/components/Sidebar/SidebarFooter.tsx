// import React from 'react';
// import { Settings, History } from 'lucide-react';
// import { Button } from '../ui/Button';

// interface SidebarFooterProps {
//   onSignInClick: () => void;
//   onSettingsClick: () => void;
//   onHistoryClick: () => void;
// }

// export const SidebarFooter: React.FC<SidebarFooterProps> = ({
//   onSignInClick,
//   onSettingsClick,
//   onHistoryClick
// }) => {
//   return (
//     <div className="p-6 border-t border-gray-700/50 space-y-3">
//       <div className="text-center text-sm text-gray-400">
//         <p>Sign in to save your chat history</p>
//       </div>
//       <Button 
//         onClick={onSignInClick}
//         variant="primary"
//         className="w-full bg-blue-600 hover:bg-blue-700"
//       >
//         Sign In
//       </Button>
//       <div className="flex items-center justify-between text-sm">
//         <div className="flex items-center space-x-4">
//           <Button 
//             onClick={onSettingsClick}
//             variant="ghost"
//             icon={Settings}
//             className="text-sm"
//           >
//             Settings
//           </Button>
//           <Button 
//             onClick={onHistoryClick}
//             variant="ghost"
//             icon={History}
//             className="text-sm"
//           >
//             History
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };


import React from 'react';
import { Settings, History } from 'lucide-react';
import { Button } from '../ui/Button';

interface SidebarFooterProps {
  onSignInClick: () => void;
  onSettingsClick: () => void;
  onHistoryClick: () => void;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  onSignInClick,
  onSettingsClick,
  onHistoryClick
}) => {
  return (
    <div className="p-6 border-t border-slate-200 space-y-4">
      <div className="text-center text-sm text-slate-500">
        <p>Sign in to save your conversations</p>
      </div>
      <Button 
        onClick={onSignInClick}
        variant="primary"
        className="w-full"
      >
        Sign In
      </Button>
      <div className="flex items-center justify-center gap-6 pt-2">
        <Button 
          onClick={onSettingsClick}
          variant="ghost"
          icon={Settings}
          size="sm"
          className="text-slate-500 hover:text-slate-700"
        >
          Settings
        </Button>
        <Button 
          onClick={onHistoryClick}
          variant="ghost"
          icon={History}
          size="sm"
          className="text-slate-500 hover:text-slate-700"
        >
          History
        </Button>
      </div>
    </div>
  );
};