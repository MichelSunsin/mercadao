import type { TProduct } from './models.type';

export type TCartProduct = {
  qty: number;
} & TProduct;

export type TCartState = {
  products: TCartProduct[];
};

export type TCartContext = {
  state: TCartState;
  addProduct: (product: TProduct) => void;
  clearProducts: () => void;
};
