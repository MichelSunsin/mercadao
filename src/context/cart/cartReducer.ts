import type { TCartState } from 'types';
import { CLEAR_PRODUCTS, ADD_PRODUCT } from '../types';

export default (state: TCartState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    }
    case CLEAR_PRODUCTS: {
      return {
        ...state,
        products: [],
      };
    }
    default:
      return state;
  }
};
