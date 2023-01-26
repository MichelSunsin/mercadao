import type { TCartState } from 'types';
import { CLEAR_CART, ADD_PRODUCT } from '../types';

export default (state: TCartState, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      const existingCartItemIndex = state.products.findIndex(
        (item) => item.uid === action.payload.uid,
      );

      if (existingCartItemIndex > -1) {
        const newState = {
          ...state,
          products: [
            ...state.products.slice(0, existingCartItemIndex),
            {
              ...state.products[existingCartItemIndex],
              quantity: state.products[existingCartItemIndex].quantity + 1,
            },
            ...state.products.slice(existingCartItemIndex + 1),
          ],
          productCount: state.productCount + 1,
        };

        return newState;
      }
      return {
        ...state,
        products: [{ ...action.payload, quantity: 1 }, ...state.products],
        productCount: state.productCount + 1,
      };
    }
    case CLEAR_CART: {
      return {
        ...state,
        products: [],
        productCount: 0,
        total: 0,
      };
    }
    default:
      return state;
  }
};
