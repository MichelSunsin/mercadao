import { TLoginUser } from './models.type';

export type TAuthState = {
  loading: boolean;
  loginToken: string | null;
  user: TLoginUser | null;
};

export type TAuthContext = {
  state: TAuthState;
  setLoginToken: (loginToken: string) => void;
  clearLoginToken: () => void;
  setUser: (user: TLoginUser) => void;
  clearUser: () => void;
};
