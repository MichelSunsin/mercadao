import { useReducer, useMemo, useCallback } from 'react';

import type { TAuthState, TUser } from 'types';
import { CLEAR_USER, SET_USER } from '../types';

import AuthContext from './authContext';
import authReducer from './authReducer';

const AuthProvider = ({ children }: any) => {
  const initialState: TAuthState = {
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const setUser = useCallback(
    (user: TUser) => dispatch({ type: SET_USER, payload: user }),
    [],
  );

  const clearUser = useCallback(() => dispatch({ type: CLEAR_USER }), []);

  const providerObject = useMemo(
    () => ({
      state,
      setUser,
      clearUser,
    }),
    [state, setUser, clearUser],
  );

  return (
    <AuthContext.Provider value={providerObject}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
