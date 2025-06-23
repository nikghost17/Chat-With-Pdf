export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type?: string;
  uploadedAt:string;
  url?: string;
  uploadTime?: string; // Optional, can be formatted as needed
  file?: File; // Add the actual file object
}

export interface Folder {
  id: string;
  name: string;
  createdAt: Date;
  files: UploadedFile[];
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}