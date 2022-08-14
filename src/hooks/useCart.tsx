import { useContext } from 'react';
import CartContext from 'context/cart/cartContext';

const useCart = () => useContext(CartContext);

export default useCart;
