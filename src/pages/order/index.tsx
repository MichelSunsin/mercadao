import { useState } from 'react';

import { Header } from 'components';
import { useCart } from 'hooks';
import type { TOrder } from 'types';
import Summary from './Summary';
import OrderListing from './OrderListing';

import './styles.scss';

function Order() {
  const { state } = useCart();
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);

  return (
    <div className="order-container">
      <Header />
      <div className="order-info-wrapper">
        {state.products.length || selectedOrder ? (
          <Summary
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
          />
        ) : (
          <OrderListing setSelectedOrder={setSelectedOrder} />
        )}
      </div>
    </div>
  );
}

export default Order;
