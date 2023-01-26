import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  FirestoreError,
  getFirestore,
  onSnapshot,
  query,
  QueryConstraint,
  setDoc,
  where,
} from 'firebase/firestore';

import { firestore } from 'utils/firebase-utils';
import { useAuth } from 'hooks';
import { OrderStatus } from '.';
import type { TOrder } from 'types';
import { Button } from 'components';

import './OrderListing.scss';

type OrderListingProps = {
  setSelectedOrder: React.Dispatch<React.SetStateAction<TOrder | null>>;
};

function OrderListing({ setSelectedOrder }: OrderListingProps) {
  const { state } = useAuth();
  const [orders, setOrders] = useState<TOrder[]>([]);
  const status = ['Aberto', 'Enviado', 'Finalizado'];

  function shouldRenderDeliverButton(order: TOrder) {
    return (
      !state.user?.deliveryAddress &&
      order.status === OrderStatus.Aberto &&
      !order.confirmedSellerUids.includes(state.user?.uid ?? '')
    );
  }

  async function handleStatusUpdate(order: TOrder) {
    if (order.uid && state.user) {
      try {
        if (state.user.deliveryAddress) {
          await setDoc(doc(firestore, 'orders', order.uid), {
            ...order,
            status: order.status + 1,
          });
        } else {
          const newOrder: TOrder = {
            ...order,
            confirmedSellerUids: [...order.confirmedSellerUids, state.user.uid],
          };

          if (
            newOrder.confirmedSellerUids.length === newOrder.sellerUids.length
          ) {
            newOrder.status = newOrder.status + 1;
          }

          await setDoc(doc(firestore, 'orders', order.uid), {
            ...newOrder,
          });
        }
      } catch (error) {
        const err = error as FirestoreError;
        console.log(err.message);
      }
    }
  }

  function renderStatusButton(order: TOrder) {
    if (shouldRenderDeliverButton(order)) {
      return <Button onClick={() => handleStatusUpdate(order)}>Enviar</Button>;
    }
    if (order.status === OrderStatus.Enviado && state.user?.deliveryAddress) {
      return (
        <Button onClick={() => handleStatusUpdate(order)}>
          Confirmar entrega
        </Button>
      );
    }
  }

  useEffect(() => {
    let constraints: QueryConstraint = where(
      'sellerUids',
      'array-contains',
      state.user?.uid,
    );

    // Buyer
    if (state.user?.deliveryAddress) {
      constraints = where('buyerUid', '==', state.user?.uid);
    }

    const q = query(collection(firestore, 'orders'), constraints);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let dbOrders: TOrder[] = [];

      querySnapshot.forEach((doc) => {
        dbOrders.push({
          ...(doc.data() as TOrder),
          uid: doc.id,
        });
      });

      setOrders(dbOrders);
    });

    return function cleanUp() {
      unsubscribe();
    };
  }, []);

  return (
    <div className="order-info-container">
      <h2>Pedidos</h2>
      {orders.length ? (
        orders.map((order) => (
          <div className="order-listing" key={order.uid}>
            <div className="align-left">
              <h2>Id do pedido: {order.uid}</h2>
              <span>Status: {status[order.status]}</span>
              <br />
              <span>
                Pedido feito em {order.createdAt.toDate().toLocaleDateString()}
              </span>
            </div>
            <div className="align-right">
              <Button onClick={() => setSelectedOrder(order)}>
                Ver detalhes
              </Button>
              {order.status !== OrderStatus.Finalizado &&
                renderStatusButton(order)}
            </div>
          </div>
        ))
      ) : (
        <div>Você ainda não possui nenhum pedido.</div>
      )}
    </div>
  );
}

export default OrderListing;
