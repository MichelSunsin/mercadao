import type { TAuthState } from 'types';
import { SET_LOGIN_TOKEN, CLEAR_LOGIN_TOKEN } from '../types';

export default (state: TAuthState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SET_LOGIN_TOKEN: {
      return {
        ...state,
        loginToken: action.payload,
      };
    }
    case CLEAR_LOGIN_TOKEN: {
      return {
        ...state,
        loginToken: null,
      };
    }
    default:
      return state;
  }
};
