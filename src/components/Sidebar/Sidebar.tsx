// 'use client'
// import React, { useState, useEffect } from 'react'
// import { UploadedFile } from '@/lib/types'
// import { SidebarHeader } from './SidebarHeader'
// import { SidebarActions } from './SidebarActions'
// import { SidebarFooter } from './SidebarFooter'
// import { FileList } from '@/components/FileList/FileList'
// import { FolderList } from '../FileList/folderList'
// import { listFolders } from '../../lib/supabaseUtils'
// import { fetchFilesFromFolder } from '../../lib/supabaseUtils'
// import { formatFileSize } from '@/lib/fileUtils'
// import { FileIcon } from '../ui/FileIcon'
// import { Button } from '../ui/Button'
// import { Upload } from 'lucide-react'

// interface SidebarProps {
//   isOpen: boolean
//   onClose: () => void
//   uploadedFiles: UploadedFile[]
//   onUploadClick: () => void
//   onNewCollectionClick: () => void
//   onFileClick?: (file: UploadedFile) => void
//   onSignInClick: () => void
//   onSettingsClick: () => void
//   onHistoryClick: () => void
//   isUploading?: boolean
// }

// // Enhanced FileItem component for the popup
// const PopupFileItem: React.FC<{ file: UploadedFile; onClick?: (file: UploadedFile) => void }> = ({ 
//   file, 
//   onClick 
// }) => {
//   return (
//     <div 
//       className="bg-gradient-to-br from-white to-slate-50 hover:from-blue-50 hover:to-indigo-50 rounded-xl p-4 cursor-pointer transition-all duration-200 border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md group"
//       onClick={() => onClick?.(file)}
//     >
//       <div className="flex items-start space-x-4">
//         <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0 group-hover:shadow-md transition-shadow">
//           <FileIcon size="md" className="text-white" />
//         </div>
//         <div className="flex-1 min-w-0">
//           <p className="text-sm font-semibold text-slate-900 truncate mb-1 group-hover:text-blue-700 transition-colors">
//             {file.name}
//           </p>
//           <p className="text-xs text-slate-500 mb-2">
//             {formatFileSize ? formatFileSize(file.size) : `${file.size} bytes`} • {file.uploadTime || file.uploadedAt}
//           </p>
//           <div className="flex items-center space-x-2">
//             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//               PDF
//             </span>
//             <a
//               href={file.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-xs text-blue-600 hover:text-blue-800 underline"
//               onClick={(e) => e.stopPropagation()}
//             >
//               Open in new tab
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export const Sidebar: React.FC<SidebarProps> = ({
//   isOpen,
//   onClose,
//   uploadedFiles,
//   onUploadClick,
//   onNewCollectionClick,
//   onFileClick,
//   onSignInClick,
//   onSettingsClick,
//   onHistoryClick,
//   isUploading,
// }) => {
//   const [selectedFolderFiles, setSelectedFolderFiles] = useState<UploadedFile[]>([])
//   const [showPopup, setShowPopup] = useState(false)
//   const [selectedFolderName, setSelectedFolderName] = useState<string>('')
//   const [isLoadingFiles, setIsLoadingFiles] = useState(false)

//   const handleFolderClick = async (folderName: string) => {
//     console.log(`Folder clicked: ${folderName}`)
//     setSelectedFolderName(folderName)
//     setIsLoadingFiles(true)
//     setShowPopup(true)
    
//     try {
//       const files = await fetchFilesFromFolder(folderName)
//       setSelectedFolderFiles(files)
//     } catch (error) {
//       console.error('Error fetching files:', error)
//       setSelectedFolderFiles([])
//     } finally {
//       setIsLoadingFiles(false)
//     }
//   }

//   const handleClosePopup = () => {
//     setShowPopup(false)
//     setSelectedFolderFiles([])
//     setSelectedFolderName('')
//   }

//   const handleUploadInPopup = () => {
//     // Call the same upload function as the sidebar button
//     onUploadClick()
//     // Optionally close the popup after upload
//     // handleClosePopup()
//   }

//   const [folders, setFolders] = useState<string[]>([])
  
//   useEffect(() => {
//     const fetchFolders = async () => {
//       const fetchedFolders = await listFolders()
//       setFolders(fetchedFolders)
//     }
//     fetchFolders()
//   }, [])

//   return (
//     <>
//       <div
//         className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-30 w-80 h-screen bg-white/95 backdrop-blur-xl border-r border-slate-200/60 transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-lg`}
//       >
//         <div className="flex flex-col h-full">
//           <SidebarHeader onClose={onClose} showCloseButton />

//           <SidebarActions
//             onUploadClick={onUploadClick}
//             onNewCollectionClick={onNewCollectionClick}
//             isUploading={isUploading}
//           />

//           <div className="flex-1 px-6 py-4 overflow-y-auto">
//             <div className="mb-6">
//               <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4">
//                 Recent Documents
//               </h3>
//               <FolderList folders={folders} onFolderClick={handleFolderClick} />
//               <div className='p-2'></div>
//               <FileList files={uploadedFiles} onFileClick={onFileClick} />
//             </div>
//           </div>

//           <SidebarFooter
//             onSignInClick={onSignInClick}
//             onSettingsClick={onSettingsClick}
//             onHistoryClick={onHistoryClick}
//           />
//         </div>
//       </div>

//       {/* Enhanced Modal Popup */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in-0 zoom-in-95 duration-200">
//             {/* Header */}
//             <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
//               <div>
//                 <h2 className="text-xl font-bold text-slate-900 mb-1">
//                   Files in "{selectedFolderName}"
//                 </h2>
//                 <p className="text-sm text-slate-500">
//                   {isLoadingFiles ? 'Loading...' : `${selectedFolderFiles.length} files found`}
//                 </p>
//               </div>
//               <div className="flex items-center space-x-3">
//                 {/* Upload Document Button in Popup */}
//                 <Button
//                   onClick={handleUploadInPopup}
//                   className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//                   disabled={isUploading}
//                 >
//                   <Upload className="w-4 h-4" />
//                   <span>{isUploading ? 'Uploading...' : 'Upload Document'}</span>
//                 </Button>
                
//                 <button
//                   className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
//                   onClick={handleClosePopup}
//                   aria-label="Close modal"
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
//               {isLoadingFiles ? (
//                 <div className="flex items-center justify-center py-12">
//                   <div className="flex items-center space-x-3">
//                     <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
//                     <span className="text-slate-600">Loading files...</span>
//                   </div>
//                 </div>
//               ) : selectedFolderFiles.length === 0 ? (
//                 <div className="text-center py-12">
//                   <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                     </svg>
//                   </div>
//                   <h3 className="text-lg font-medium text-slate-900 mb-2">No files found</h3>
//                   <p className="text-slate-500">This folder doesn't contain any files yet.</p>
                  
//                   {/* Upload button when no files */}
//                   <div className="mt-6">
//                     <Button
//                       onClick={handleUploadInPopup}
//                       className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
//                       disabled={isUploading}
//                     >
//                       <Upload className="w-5 h-5" />
//                       <span>{isUploading ? 'Uploading...' : 'Upload Your First Document'}</span>
//                     </Button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {selectedFolderFiles.map((file) => (
//                     <PopupFileItem
//                       key={file.id}
//                       file={file}
//                       onClick={onFileClick}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             {!isLoadingFiles && selectedFolderFiles.length > 0 && (
//               <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
//                 <div className="flex items-center justify-between text-sm text-slate-600">
//                   <span>{selectedFolderFiles.length} files total</span>
//                   <button
//                     onClick={handleClosePopup}
//                     className="px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   )
// }



'use client'
import React, { useState, useEffect, useRef } from 'react'
import { UploadedFile } from '@/lib/types'
import { SidebarHeader } from './SidebarHeader'
import { SidebarActions } from './SidebarActions'
import { SidebarFooter } from './SidebarFooter'
import { FileList } from '@/components/FileList/FileList'
import { FolderList } from '../FileList/FolderList'
import { listFolders, fetchFilesFromFolder, uploadPDF } from '../../lib/supabaseUtils'
import { formatFileSize } from '@/lib/fileUtils'
import { FileIcon } from '../ui/FileIcon'
import { Button } from '../ui/Button'
import { Upload } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  uploadedFiles: UploadedFile[]
  onUploadClick: () => void
  onNewCollectionClick: () => void
  onFileClick?: (file: UploadedFile) => void
  onSignInClick: () => void
  onSettingsClick: () => void
  onHistoryClick: () => void
  isUploading?: boolean
  selectedFile?: UploadedFile | null
  setSelectedFile?: (file: UploadedFile | null) => void
  folderAdded?: boolean
}

const PopupFileItem: React.FC<{ file: UploadedFile; onClick?: (file: UploadedFile) => void ; showPopup? :boolean , setshowPopup? : React.Dispatch<React.SetStateAction<boolean>>  }> = ({ 
  file, 
  onClick,
  showPopup = true,
  setshowPopup
}) => (
  <div 
    className="bg-gradient-to-br from-white to-slate-50 hover:from-blue-50 hover:to-indigo-50 rounded-xl p-4 cursor-pointer transition-all duration-200 border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md group"
    onClick={() =>{ onClick?.(file);
     setshowPopup?.(false);
    }}
  >
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0 group-hover:shadow-md transition-shadow">
        <FileIcon size="md" className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900 truncate mb-1 group-hover:text-blue-700 transition-colors">
          {file.name}
        </p>
        <p className="text-xs text-slate-500 mb-2">
          {formatFileSize ? formatFileSize(file.size) : `${file.size} bytes`} • {file.uploadTime || file.uploadedAt}
        </p>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            PDF
          </span>
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-800 underline"
            onClick={(e) => e.stopPropagation()}
          >
            Open in new tab
          </a>
        </div>
      </div>
    </div>
  </div>
)

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  uploadedFiles,
  onUploadClick,
  onNewCollectionClick,
  onFileClick,
  onSignInClick,
  onSettingsClick,
  onHistoryClick,
  isUploading,
  selectedFile,
  setSelectedFile,
  folderAdded

}) => {
  const [folders, setFolders] = useState<string[]>([])
  const [selectedFolderFiles, setSelectedFolderFiles] = useState<UploadedFile[]>([])
  const [selectedFolderName, setSelectedFolderName] = useState<string>('')
  const [isLoadingFiles, setIsLoadingFiles] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchFolders = async () => {
      const fetchedFolders = await listFolders()
      setFolders(fetchedFolders)
    }
    fetchFolders()
  }, [folderAdded])

  const handleFolderClick = async (folderName: string) => {
    setSelectedFolderName(folderName)
    setIsLoadingFiles(true)
    setShowPopup(true)
    try {
      const files = await fetchFilesFromFolder(folderName)
      setSelectedFolderFiles(files)
       // If a file is selected, trigger the click handler
    } catch (error) {
      console.error('Error fetching files:', error)
      setSelectedFolderFiles([])
    } finally {
      setIsLoadingFiles(false)
    }
  }

  const handleClosePopup = () => {
    setShowPopup(false)
    setSelectedFolderName('')
    setSelectedFolderFiles([])
  }

  const handleUploadInPopup = () => {
    if (!selectedFolderName) {
      alert('Select a folder before uploading.')
      return
    }
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || !selectedFolderName) return

    setIsLoadingFiles(true)
    try {
      const uploadPromises = Array.from(files).map((file) =>
        uploadPDF(file, selectedFolderName)
      )
      await Promise.all(uploadPromises)

      const updatedFiles = await fetchFilesFromFolder(selectedFolderName)
      setSelectedFolderFiles(updatedFiles)
      setSelectedFile?.(updatedFiles[updatedFiles.length - 1] || null) // Set the first file as selected if available
    } catch (err) {
      console.error('Upload error:', err)
    } finally {
      setIsLoadingFiles(false)
      e.target.value = ''
    }
  }

  return (
    <>
      <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-30 w-80 h-screen bg-white/95 backdrop-blur-xl border-r border-slate-200/60 transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-lg`}>
        <div className="flex flex-col h-full">
          <SidebarHeader onClose={onClose} showCloseButton />
          <SidebarActions onUploadClick={onUploadClick} onNewCollectionClick={onNewCollectionClick} isUploading={isUploading} />
          <div className="flex-1 px-6 py-4 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4">Recent Documents</h3>
              <FolderList folders={folders} onFolderClick={handleFolderClick} />
              <div className='p-2'></div>
              <FileList files={uploadedFiles} onFileClick={onFileClick} />
            </div>
          </div>
          <SidebarFooter onSignInClick={onSignInClick} onSettingsClick={onSettingsClick} onHistoryClick={onHistoryClick} />
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Files in "{selectedFolderName}"</h2>
                <p className="text-sm text-slate-500">{isLoadingFiles ? 'Loading...' : `${selectedFolderFiles.length} files found`}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button onClick={handleUploadInPopup} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm" disabled={isUploading}>
                  <Upload className="w-4 h-4" />
                  <span>{isUploading ? 'Uploading...' : 'Upload Document'}</span>
                </Button>
                <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors" onClick={handleClosePopup} aria-label="Close modal">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
              {isLoadingFiles ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                    <span className="text-slate-600">Loading files...</span>
                  </div>
                </div>
              ) : selectedFolderFiles.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No files found</h3>
                  <p className="text-slate-500">This folder doesn't contain any files yet.</p>
                  <div className="mt-6">
                    <Button onClick={handleUploadInPopup} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed mx-auto" disabled={isUploading}>
                      <Upload className="w-5 h-5" />
                      <span>{isUploading ? 'Uploading...' : 'Upload Your First Document'}</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedFolderFiles.map((file) => (
                    <PopupFileItem key={file.id} file={file} onClick={onFileClick} showPopup = {showPopup} setshowPopup={setShowPopup} />
                  ))}
                </div>
              )}
            </div>

            {!isLoadingFiles && selectedFolderFiles.length > 0 && (
              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{selectedFolderFiles.length} files total</span>
                  <button onClick={handleClosePopup} className="px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        accept="application/pdf"
        multiple
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  )
}
