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

import config from 'api/firebase-config';
import { useAuth } from 'hooks';
import { OrderStatus } from '.';
import type { TOrder } from 'types';
import { Button } from 'components';

import './OrderListing.scss';

type OrderListingProps = {
  setSelectedOrder: React.Dispatch<React.SetStateAction<TOrder | null>>;
};

function OrderListing({ setSelectedOrder }: OrderListingProps) {
  const firestore = getFirestore(config);
  const { state } = useAuth();
  const [orders, setOrders] = useState<TOrder[]>([]);
  const status = ['Aberta', 'Enviada', 'Finalizada'];

  const handleStatusUpdate = async (order: TOrder) => {
    if (order.uid) {
      try {
        await setDoc(doc(firestore, 'orders', order.uid), {
          ...order,
          status: order.status + 1,
        });
      } catch (error) {
        const err = error as FirestoreError;
        console.log(err.message);
      }
    }
  };

  const renderStatusButton = (order: TOrder) => {
    if (order.status === OrderStatus.Aberta && !state.user?.deliveryAddress) {
      return <Button onClick={() => handleStatusUpdate(order)}>Enviar</Button>;
    }
    if (order.status === OrderStatus.Enviada && state.user?.deliveryAddress) {
      return (
        <Button onClick={() => handleStatusUpdate(order)}>
          Confirmar entrega
        </Button>
      );
    }
  };

  // useEffect(() => {
  //   if (state.user) {
  //     let constraints: QueryConstraint = where(
  //       'sellerUids',
  //       'array-contains',
  //       state.user?.uid,
  //     );

  //     // Vendor
  //     if (state.user.deliveryAddress) {
  //       constraints = where('buyerUid', '==', state.user?.uid);
  //     }

  //     const q = query(collection(firestore, 'orders'), constraints);
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       let dbOrders: TOrder[] = [];

  //       querySnapshot.forEach((doc) => {
  //         dbOrders.push({
  //           ...(doc.data() as TOrder),
  //           uid: doc.id,
  //         });
  //       });

  //       setOrders(dbOrders);
  //     });

  //     return function cleanUp() {
  //       unsubscribe();
  //     };
  //   }
  // }, []);

  return (
    <div className="order-info-container">
      <h2>Pedidos</h2>
      {orders.length ? (
        orders.map((order) => (
          <div className="order-listing" key={order.uid}>
            <div className="align-left">
              <h2>Id do pedido: {order.uid}</h2>
              Status: {status[order.status]}
            </div>
            <div className="align-right">
              <Button onClick={() => setSelectedOrder(order)}>
                Ver detalhes
              </Button>
              {order.status !== OrderStatus.Finalizada &&
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
