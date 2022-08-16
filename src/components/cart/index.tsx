import { useNavigate } from 'react-router-dom';

import { useCart } from 'hooks';
import { getCartTotal } from 'utils';
import { Button } from 'components';

import './styles.scss';

function Cart() {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart">
      {state.products.length ? (
        <>
          {state.products.map((product) => (
            <div key={product.id} className="product-info">
              <span>{product.name}</span>
              <span>
                {product.qty} x R$ {product.price.toFixed(2)}
              </span>
            </div>
          ))}
          <div className="totals-container">
            Total: R$ {getCartTotal(state.products).toFixed(2)}
          </div>
          <div className="buttons-container">
            <Button secondary onClick={() => clearCart()}>
              Esvaziar carrinho
            </Button>
            <Button onClick={() => navigate('/order')}>Finalizar compra</Button>
          </div>
        </>
      ) : (
        <h3>Carrinho vazio. Seus produtos aparecerão aqui!</h3>
      )}
    </div>
  );
}

export default Cart;
