import type { TCartState } from 'types';
import { CLEAR_CART, ADD_PRODUCT } from '../types';

export default (state: TCartState, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      const existingCartItemIndex = state.products.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (existingCartItemIndex > -1) {
        const newState = {
          ...state,
          products: [
            ...state.products.slice(0, existingCartItemIndex),
            {
              ...state.products[existingCartItemIndex],
              qty: state.products[existingCartItemIndex].qty + 1,
            },
            ...state.products.slice(existingCartItemIndex + 1),
          ],
        };

        return newState;
      }
      return {
        ...state,
        products: [{ ...action.payload, qty: 1 }, ...state.products],
      };
    }
    case CLEAR_CART: {
      return {
        ...state,
        products: [],
        total: 0,
      };
    }
    default:
      return state;
  }
};
