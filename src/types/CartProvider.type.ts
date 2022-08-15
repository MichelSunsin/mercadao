import type { TProduct } from './models.type';

export type TCartProduct = {
  qty: number;
} & TProduct;

export type TCartState = {
  products: TCartProduct[];
  total: number;
};

export type TCartContext = {
  state: TCartState;
  addProduct: (product: TProduct) => void;
  clearCart: () => void;
};
