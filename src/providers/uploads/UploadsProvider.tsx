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
  const [uploadProgresses, setUploadProgresses] = useState<
    UploadsContextValue["uploadProgresses"]
  >({});

  const uploadToMux = useCallback(async (filePath: string) => {
    const {
      data: { uploadUrl, videoId },
    } = await Functions.createVideo({});

    // uploading state
    setUploadProgresses((previous) => ({
      ...previous,
      [videoId]: 0,
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

        setUploadProgresses((previous) => {
          if (previous[videoId] == null) {
            return previous;
          }

          return {
            ...previous,
            [videoId]: uploadProgress,
          };
        });
      },
    );

    await uploadTask.uploadAsync();
  }, []);

  const contextValue = useMemo(
    () => ({ uploadToMux, uploadProgresses }),
    [uploadProgresses, uploadToMux],
  );

  return (
    <UploadsContext.Provider value={contextValue}>
      {children}
    </UploadsContext.Provider>
  );
}
