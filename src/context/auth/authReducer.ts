import type { TAuthState } from 'types';
import {
  SET_LOGIN_TOKEN,
  CLEAR_LOGIN_TOKEN,
  SET_USER,
  CLEAR_USER,
} from '../types';

export default (state: TAuthState, action: { type: string; payload?: any }) => {
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
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case CLEAR_USER: {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
};
