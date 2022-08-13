import { useReducer, useMemo, useCallback } from 'react';

import type { TAuthProvider } from 'types';
import { CLEAR_LOGIN_TOKEN, SET_LOGIN_TOKEN } from '../types';

import AuthContext from './authContext';
import authReducer from './authReducer';

const AuthProvider = ({ children }: any) => {
  const initialState: TAuthProvider = {
    loading: false,
    loginToken: '123',
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

  const providerObject = useMemo(
    () => ({
      loading: state.loading,
      loginToken: state.loginToken,
      setLoginToken,
      clearLoginToken,
    }),
    [state.loginToken, state.loading, setLoginToken, clearLoginToken],
  );

  return (
    <AuthContext.Provider value={providerObject}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
