import { BiImage } from 'react-icons/bi';
import { BsCartPlusFill } from 'react-icons/bs';

import { useCart } from 'hooks';
import Button from 'components/button';
import type { TProduct } from 'types/models.type';

import './styles.scss';

type TProductCard = {
  product: TProduct;
};

function ProductCard({ product }: TProductCard) {
  const { addProduct } = useCart();

  return (
    <div className="product-card">
      <BiImage className="product-image" />
      <div className="product-info">
        <h4>{product.name}</h4>
        <h4>R$ {product.price}</h4>
      </div>
      <Button onClick={() => addProduct(product)}>
        <BsCartPlusFill className="add-to-cart" />
      </Button>
    </div>
  );
}

export default ProductCard;
