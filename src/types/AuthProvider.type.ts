export type TAuthProvider = {
  loading: boolean;
  loginToken: string | null;
  setLoginToken?: (loginToken: string) => void;
  clearLoginToken?: () => void;
};
