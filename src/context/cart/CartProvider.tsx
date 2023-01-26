import { useReducer, useMemo, useCallback } from 'react';

import type { TCartState } from 'types';
import type { TProduct } from 'types/models.type';
import { ADD_PRODUCT, CLEAR_CART } from '../types';

import CartContext from './cartContext';
import cartReducer from './cartReducer';

const CartProvider = ({ children }: any) => {
  const initialState: TCartState = {
    products: [],
    productCount: 0,
    total: 0,
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addProduct = useCallback(
    (product: TProduct | null) =>
      dispatch({ type: ADD_PRODUCT, payload: product }),
    [],
  );

  const clearCart = useCallback(() => dispatch({ type: CLEAR_CART }), []);

  const providerObject = useMemo(
    () => ({
      state,
      addProduct,
      clearCart,
    }),
    [state, addProduct, clearCart],
  );

  return (
    <CartContext.Provider value={providerObject}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
