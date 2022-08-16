import { useEffect, useState } from 'react';

import { useAuth } from 'hooks';
import axios from 'api';
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
  const status = ['Aberta', 'Enviada', 'Finalizada'];

  const handleStatusUpdate = async (order: TOrder) => {
    await axios.put(`/orders/${order.id}`, {
      ...order,
      status: order.status + 1,
    });

    fetchOrders();
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

  const fetchOrders = async () => {
    let url = `/orders?buyerId=${state.user?.id}`;

    // Vendor
    if (!state.user?.deliveryAddress) {
      url = `/orders?sellersIds_like=${state.user?.id}`;
    }

    const response = await axios.get(url);
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
