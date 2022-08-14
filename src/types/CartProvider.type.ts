import type { TProduct } from './models.type';

export type TCartState = {
  products: TProduct[];
};

export type TCartContext = {
  state: TCartState;
  addProduct: (product: TProduct) => void;
  clearProducts: () => void;
};
