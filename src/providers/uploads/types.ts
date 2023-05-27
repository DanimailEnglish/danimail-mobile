export interface UploadStatus {
  videoId?: string;
  uploadProgress?: number;
}

export type UploadStatuses = { [id: string]: UploadStatus };

export type UploadsContextValue = {
  uploadToMux: (filePath: string) => void;
  uploadStatuses: UploadStatuses;
};
