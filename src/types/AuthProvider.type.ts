import { TUser } from './models.type';

export type TAuthState = {
  user: TUser | null;
};

export type TAuthContext = {
  state: TAuthState;
  setUser: (user: TUser) => void;
  clearUser: () => void;
};
