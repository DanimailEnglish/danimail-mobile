import { useContext } from "react";

import type { UploadsContextValue } from "./types";
import { UploadsContext } from "./UploadsContext";

export function useUploads(): UploadsContextValue {
  const value = useContext(UploadsContext);
  if (value === undefined) {
    throw new Error("useUploads was used outside of a UploadsProvider");
  }
  return value;
}
