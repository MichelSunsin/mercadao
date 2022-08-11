import { createContext } from 'react';
import type { TAuthState } from 'types';

const authContext = createContext({} as TAuthState);

export default authContext;
