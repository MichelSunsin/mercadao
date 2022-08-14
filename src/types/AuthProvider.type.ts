export type TAuthState = {
  loading: boolean;
  loginToken: string | null;
  setLoginToken?: (loginToken: string) => void;
  clearLoginToken?: () => void;
};
