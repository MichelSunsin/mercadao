import { useEffect, useState } from 'react';

import { useAuth } from 'hooks';
import axios from 'api';
import { Button } from 'components';
import type { TOrder } from 'types';

import './OrderListing.scss';

type OrderListingProps = {
  setSelectedOrder: React.Dispatch<React.SetStateAction<TOrder | null>>;
};

function OrderListing({ setSelectedOrder }: OrderListingProps) {
  const { state } = useAuth();
  const [orders, setOrders] = useState<TOrder[]>([]);

  const fetchOrders = async () => {
    const response = await axios.get(`/orders?buyerId=${state.user?.id}`);
    setOrders(response.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-info-container">
      <h2>Pedidos</h2>
      {orders.length ? (
        orders.map((order) => (
          <div className="order-listing" key={order.id}>
            <div className="align-left">
              <h2>Pedido nº{order.id}</h2>
              Status: Aguardando
            </div>
            <div className="align-right">
              <Button onClick={() => setSelectedOrder(order)}>
                Ver detalhes
              </Button>
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
