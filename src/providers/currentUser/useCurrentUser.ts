import {useContext} from 'react';

import {CurrentUserContext} from './CurrentUserContext';
import type {CurrentUserContextValue} from './types';

export function useCurrentUser(): CurrentUserContextValue {
  const value = useContext(CurrentUserContext);
  if (value === undefined) {
    throw new Error('useCurrentUser was used outside of a CurrentUserProvider');
  }
  return value;
}
