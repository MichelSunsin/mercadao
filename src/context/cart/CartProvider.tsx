import { useReducer, useMemo, useCallback } from 'react';

import type { TCartState } from 'types';
import type { TProduct } from 'types/models.type';
import { ADD_PRODUCT, CLEAR_PRODUCTS } from '../types';

import CartContext from './cartContext';
import cartReducer from './cartReducer';

const CartProvider = ({ children }: any) => {
  const initialState: TCartState = {
    products: [],
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addProduct = useCallback(
    async (product: TProduct | null) =>
      dispatch({ type: ADD_PRODUCT, payload: product }),
    [],
  );

  const clearProducts = useCallback(
    () => dispatch({ type: CLEAR_PRODUCTS, payload: null }),
    [],
  );

  const providerObject = useMemo(
    () => ({
      state,
      addProduct,
      clearProducts,
    }),
    [state.products, addProduct, clearProducts],
  );

  return (
    <CartContext.Provider value={providerObject}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
