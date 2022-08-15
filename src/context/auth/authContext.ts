import { createContext } from 'react';
import type { TAuthContext } from 'types';

const authContext = createContext({} as TAuthContext);

export default authContext;
