import type { TAuthState } from 'types';
import { SET_USER, CLEAR_USER } from '../types';

export default (state: TAuthState, action: { type: string; payload?: any }) => {
  switch (action.type) {
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
