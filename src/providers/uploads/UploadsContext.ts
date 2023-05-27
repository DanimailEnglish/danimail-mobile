import { createContext } from "react";

import type { UploadsContextValue } from "./types";

export const UploadsContext = createContext<UploadsContextValue | undefined>(
  undefined,
);
