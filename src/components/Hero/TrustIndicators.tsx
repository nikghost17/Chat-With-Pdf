// import React from 'react';
// import { Users, Shield, Star } from 'lucide-react';

// export const TrustIndicators: React.FC = () => {
//   return (
//     <div className="space-y-4">
//       <p className="text-gray-400">Trusted by students and researchers from top institutions</p>
//       <div className="flex items-center justify-center space-x-8 text-gray-500">
//         <div className="flex items-center space-x-2">
//           <Users className="w-5 h-5" />
//           <span className="text-sm">10M+ Users</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Shield className="w-5 h-5" />
//           <span className="text-sm">Secure & Private</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Star className="w-5 h-5" />
//           <span className="text-sm">4.9 Rating</span>
//         </div>
//       </div>
//     </div>
//   );
// };


import React from 'react';
import { Users, Shield, Star } from 'lucide-react';

export const TrustIndicators: React.FC = () => {
  return (
    <div className="space-y-6">
      <p className="text-slate-500 text-center max-w-lg mx-auto">
        Trusted by professionals and organizations worldwide for secure document analysis
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 text-slate-600">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-sm font-medium">1M+ Professionals</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-green-600" />
          </div>
          <span className="text-sm font-medium">Enterprise Security</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
            <Star className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-sm font-medium">4.8/5 Rating</span>
        </div>
      </div>
    </div>
  );
};