import { useNavigate } from 'react-router-dom';
import { BiImage } from 'react-icons/bi';
import { BsCartPlusFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';

import { useAuth, useCart } from 'hooks';
import Button from 'components/button';
import type { TProduct } from 'types/models.type';

import './styles.scss';

type TProductCard = {
  product: TProduct;
};

function ProductCard({ product }: TProductCard) {
  const navigate = useNavigate();
  const { state } = useAuth();
  const { addProduct } = useCart();

  return (
    <div className="product-card">
      {product.productImageURL ? (
        <div
          className="product-image"
          style={{ backgroundImage: `url(${product.productImageURL})` }}
        />
      ) : (
        <BiImage className="product-image" />
      )}
      <div className="product-info">
        <h4>{product.name}</h4>
        <h4>R$ {product.price}</h4>
      </div>
      {state.user?.deliveryAddress && (
        <Button onClick={() => addProduct(product)}>
          <BsCartPlusFill className="button-icon" />
        </Button>
      )}
      {!state.user?.deliveryAddress && product.sellerUid === state.user?.uid && (
        <Button onClick={() => navigate(`/product?${product.uid}`)}>
          <AiFillEdit className="button-icon" />
        </Button>
      )}
    </div>
  );
}

export default ProductCard;
