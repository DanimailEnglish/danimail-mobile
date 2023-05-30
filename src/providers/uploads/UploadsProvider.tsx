import { createUploadTask } from "expo-file-system";
import React, { useCallback, useMemo, useState } from "react";

import { Functions } from "../../lib/functions";
import type { UploadsContextValue } from "./types";
import { UploadsContext } from "./UploadsContext";

export interface UploadsProviderProps {
  children?: React.ReactNode;
}

export function UploadsProvider({
  children,
}: UploadsProviderProps): JSX.Element {
  const [uploadStatuses, setUploadStatuses] = useState<
    UploadsContextValue["uploadStatuses"]
  >({});

  const removeUploadStatus = useCallback((id: string) => {
    setUploadStatuses((prevUploadStatuses) => {
      const newUploadStatuses = { ...prevUploadStatuses };
      delete newUploadStatuses[id];
      return newUploadStatuses;
    });
  }, []);

  const uploadToMux = useCallback(async (filePath: string) => {
    const {
      data: { uploadUrl, videoId },
    } = await Functions.createVideo({});

    // uploading state
    setUploadStatuses((previous) => ({
      ...previous,
      [videoId]: { uploadProgress: 0 },
    }));

    const uploadTask = createUploadTask(
      uploadUrl,
      filePath,
      {
        httpMethod: "PUT",
      },
      (data) => {
        const uploadProgress =
          data.totalBytesSent / data.totalBytesExpectedToSend;

        setUploadStatuses((previous) => {
          if (previous[videoId] == null) {
            return previous;
          }

          return {
            ...previous,
            [videoId]: {
              uploadProgress,
            },
          };
        });
      },
    );

    await uploadTask.uploadAsync();
  }, []);

  const contextValue = useMemo(
    () => ({ uploadToMux, removeUploadStatus, uploadStatuses }),
    [removeUploadStatus, uploadStatuses, uploadToMux],
  );

  return (
    <UploadsContext.Provider value={contextValue}>
      {children}
    </UploadsContext.Provider>
  );
}
