export interface UploadStatus {
  uploadProgress: number;
}

export type UploadStatuses = { [id: string]: UploadStatus | undefined };

export type UploadsContextValue = {
  uploadToMux: (filePath: string) => void;
  removeUploadStatus: (id: string) => void;
  uploadStatuses: UploadStatuses;
};
