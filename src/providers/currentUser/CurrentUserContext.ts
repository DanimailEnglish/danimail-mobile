import { createContext } from "react";

import type { CurrentUserContextValue } from "./types";

export const CurrentUserContext = createContext<
  CurrentUserContextValue | undefined
>(undefined);
