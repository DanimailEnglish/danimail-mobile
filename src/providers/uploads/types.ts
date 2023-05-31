export type UploadStatuses = { [id: string]: number | undefined };

export type UploadsContextValue = {
  uploadToMux: (filePath: string) => void;
  uploadProgresses: UploadStatuses;
};
