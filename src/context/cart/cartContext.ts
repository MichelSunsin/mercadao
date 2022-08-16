import { createContext } from 'react';
import type { TCartContext } from 'types';

const cartProvider = createContext({} as TCartContext);

export default cartProvider;
