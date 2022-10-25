import { useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  FirestoreError,
  getFirestore,
} from 'firebase/firestore';

import config from 'api/firebase-config';
import { useAuth, useCart } from 'hooks';
import { getCartTotal } from 'utils';
import { Button } from 'components';
import { OrderStatus } from '.';
import type { TOrder } from 'types';

type SummaryProps = {
  selectedOrder: TOrder | null;
  setSelectedOrder: React.Dispatch<React.SetStateAction<TOrder | null>>;
};

function Summary({ selectedOrder, setSelectedOrder }: SummaryProps) {
  const firestore = getFirestore(config);
  const { state: authState } = useAuth();
  const { state: cartState, clearCart } = useCart();

  const [stage, setStage] = useState<'payment' | 'summary'>(
    selectedOrder ? 'summary' : 'payment',
  );

  const [paymentOption, setPaymentOption] = useState(0);
  const paymentMethods = ['Dinheiro', 'Cartão de crédito'];

  const products = selectedOrder?.products.length
    ? selectedOrder?.products
    : cartState.products;

  const handlePlaceOrder = async () => {
    if (authState.user) {
      try {
        const newOrder: TOrder = {
          status: OrderStatus.Aberta,
          products: cartState.products,
          paymentMethod: paymentOption,
          deliveryAddress: authState.user?.deliveryAddress ?? '',
          buyerUid: authState.user.uid,
          sellerUids: [
            ...new Set(cartState.products.map((product) => product.sellerUid)),
          ],
        };

        await addDoc(collection(firestore, 'orders'), newOrder);

        clearCart();
      } catch (error) {
        const err = error as FirestoreError;
        console.log(err.message);
      }
    }
  };

  return (
    <div className="order-info-container">
      {stage === 'payment' && (
        <>
          <h2 className="title">Escolha seu meio de pagamento</h2>
          <div className="payment-options-container">
            <div className="payment-option">
              <input
                type="radio"
                value={0}
                checked={paymentOption === 0}
                onChange={(e) => setPaymentOption(+e.target.value)}
              />
              <label>{paymentMethods[0]}</label>
            </div>
            <div className="payment-option">
              <input
                type="radio"
                value={1}
                checked={paymentOption === 1}
                onChange={(e) => setPaymentOption(+e.target.value)}
              />
              <label>{paymentMethods[1]}</label>
            </div>
          </div>
          <div className="button-container">
            <Button onClick={() => setStage('summary')}>Revisar pedido</Button>
          </div>
        </>
      )}
      {stage === 'summary' && (
        <>
          <h2 className="title">Revise seu pedido</h2>
          <div className="order-summary-container">
            {products.map((product) => (
              <div className="product-listing" key={product.uid}>
                <div className="align-left">{product.name}</div>
                <div className="align-right">{`${
                  product.quantity
                } * R$ ${product.price.toFixed(2)}`}</div>
              </div>
            ))}
            <h3 className="total">
              Total: R${getCartTotal(products).toFixed(2)}
            </h3>
          </div>
          <div className="order-payment-method-container">
            <h2 className="title">Meio de pagamento</h2>
            <h3 className="align-right">{paymentMethods[paymentOption]}</h3>
          </div>
          <div className="order-payment-method-container">
            <h2 className="title">Endereço de entrega</h2>
            <h3 className="align-right">
              {selectedOrder?.uid
                ? selectedOrder.deliveryAddress
                : authState.user?.deliveryAddress}
            </h3>
          </div>
          <div className="button-container">
            {!selectedOrder ? (
              <>
                <Button secondary onClick={() => setStage('payment')}>
                  Trocar meio de pagamento
                </Button>
                <Button onClick={handlePlaceOrder}>Finalizar compra</Button>
              </>
            ) : (
              <Button onClick={() => setSelectedOrder(null)}>Fechar</Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Summary;
