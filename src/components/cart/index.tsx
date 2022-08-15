import { Button } from 'components';
import useCart from 'hooks/useCart';

import './styles.scss';

function Cart() {
  const { state, clearCart } = useCart();

  const getCartTotal = () =>
    state.products.reduce(
      (partial, product) => partial + product.price * product.qty,
      0,
    );

  return (
    <div className="cart">
      {state.products.length ? (
        <>
          {state.products.map((product) => (
            <div key={product.id} className="product-info">
              <span>{product.name}</span>
              <span>Quantidade: {product.qty}</span>
            </div>
          ))}
          <div className="totals-container">
            Total: R$ {getCartTotal().toFixed(2)}
          </div>
          <div className="buttons-container">
            <Button secondary onClick={() => clearCart()}>
              Esvaziar carrinho
            </Button>
            <Button>Finalizar compra</Button>
          </div>
        </>
      ) : (
        <h3>Carrinho vazio. Seus produtos aparecerão aqui!</h3>
      )}
    </div>
  );
}

export default Cart;
