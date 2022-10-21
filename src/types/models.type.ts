import { TCartProduct } from './CartProvider.type';

export type TCategory = {
  id: string;
  description: string;
};

export type TProduct = {
  id: string;
  name: string;
  price: number;
  category: TCategory;
  sellerId: number;
};

export type TUser = {
  firstName: string;
  lastName: string;
  document: string;
  birthdate: string;
  deliveryAddress?: string;
  password: string;
};

export type TLoginUser = {
  id: number;
  login: string;
  password: string;
  deliveryAddress?: string;
};

export type TOrder = {
  id?: number;
  status: number;
  products: TCartProduct[];
  paymentMethod: number;
  deliveryAddress: string;
  buyerId: number;
  sellersIds: number[];
};
