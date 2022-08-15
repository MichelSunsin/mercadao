import { useReducer, useMemo, useCallback } from 'react';

import type { TAuthState, TLoginUser } from 'types';
import {
  CLEAR_LOGIN_TOKEN,
  CLEAR_USER,
  SET_LOGIN_TOKEN,
  SET_USER,
} from '../types';

import AuthContext from './authContext';
import authReducer from './authReducer';

const AuthProvider = ({ children }: any) => {
  const initialState: TAuthState = {
    loading: false,
    loginToken: '123',
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const setLoginToken = useCallback(
    async (token: string | null) =>
      dispatch({ type: SET_LOGIN_TOKEN, payload: token }),
    [],
  );

  const clearLoginToken = useCallback(
    () => dispatch({ type: CLEAR_LOGIN_TOKEN, payload: null }),
    [],
  );

  const setUser = useCallback(
    (user: TLoginUser) => dispatch({ type: SET_USER, payload: user }),
    [],
  );

  const clearUser = useCallback(() => dispatch({ type: CLEAR_USER }), []);

  const providerObject = useMemo(
    () => ({
      state,
      setLoginToken,
      clearLoginToken,
      setUser,
      clearUser,
    }),
    [state, setLoginToken, clearLoginToken, setUser, clearUser],
  );

  return (
    <AuthContext.Provider value={providerObject}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
