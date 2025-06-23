// // import React from 'react';
// // import { MessageCircle, X } from 'lucide-react';

// // interface SidebarHeaderProps {
// //   onClose?: () => void;
// //   showCloseButton?: boolean;
// // }

// // export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ 
// //   onClose, 
// //   showCloseButton = false 
// // }) => {
// //   return (
// //     <div className="p-6 border-b border-gray-700/50">
// //       <div className="flex items-center justify-between">
// //         <div className="flex items-center space-x-3">
// //           <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
// //             <MessageCircle className="w-6 h-6 text-white" />
// //           </div>
// //           <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
// //             DocuChat
// //           </h1>
// //         </div>
// //         {showCloseButton && (
// //           <button 
// //             onClick={onClose}
// //             className="lg:hidden text-gray-400 hover:text-white transition-colors"
// //           >
// //             <X className="w-6 h-6" />
// //           </button>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };


// import React from 'react';
// import { MessageCircle, X } from 'lucide-react';

// interface SidebarHeaderProps {
//   onClose?: () => void;
//   showCloseButton?: boolean;
// }

// export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ 
//   onClose, 
//   showCloseButton = false 
// }) => {
//   return (
//     <div className="p-6 border-b border-slate-200">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm border border-slate-200">
//             <MessageCircle className="w-5 h-5 text-white" />
//           </div>
//           <h1 className="text-xl font-semibold text-slate-900">
//             DocuChat
//           </h1>
//         </div>
//         {showCloseButton && (
//           <button 
//             onClick={onClose}
//             className="lg:hidden text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

import React from 'react';
import { MessageCircle, X } from 'lucide-react';

interface SidebarHeaderProps {
  onClose?: () => void;
  showCloseButton?: boolean;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ 
  onClose, 
  showCloseButton = false 
}) => {
  return (
    <div className="p-4 border-b border-slate-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            DocuChat
          </h1>
        </div>
        {showCloseButton && (
          <button 
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};