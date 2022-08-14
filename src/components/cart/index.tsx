import useCart from 'hooks/useCart';

function Cart() {
  const { state } = useCart();
  return (
    <div className="cart">
      {state.products.length ? (
        state.products.map((product) => (
          <h3 key={product.id}>{product.name}</h3>
        ))
      ) : (
        <h3>Carrinho vazio</h3>
      )}
    </div>
  );
}

export default Cart;
