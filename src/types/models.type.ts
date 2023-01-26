import { Timestamp } from 'firebase/firestore';
import { TCartProduct } from './CartProvider.type';

export type TCategory = {
  uid: string;
  description: string;
};

export type TProduct = {
  uid?: string;
  name: string;
  price: number;
  category: TCategory | null;
  sellerUid: string;
  productImageURL: string;
};

export type TUser = {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  document: string;
  birthdate: string;
  deliveryAddress: string;
};

export type TOrder = {
  uid?: string;
  status: number;
  products: TCartProduct[];
  paymentMethod: number;
  deliveryAddress: string;
  buyerUid: string;
  sellerUids: string[];
  confirmedSellerUids: string[];
  createdAt: Timestamp;
};
