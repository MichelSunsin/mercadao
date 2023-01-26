import type { TProduct } from './models.type';

export type TCartProduct = {
  quantity: number;
} & TProduct;

export type TCartState = {
  products: TCartProduct[];
  productCount: number;
  total: number;
};

export type TCartContext = {
  state: TCartState;
  addProduct: (product: TProduct) => void;
  clearCart: () => void;
};
