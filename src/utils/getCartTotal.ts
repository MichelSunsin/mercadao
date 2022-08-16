import { TCartProduct } from 'types';

export default function getCartTotal(products: TCartProduct[]) {
  return products.reduce(
    (partialTotal, product) => partialTotal + product.price * product.qty,
    0,
  );
}
