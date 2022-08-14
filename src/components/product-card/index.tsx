import Button from 'components/button';
import { BiImage } from 'react-icons/bi';
import { BsCartPlusFill } from 'react-icons/bs';
import type { TProduct } from 'types/models.type';

import './styles.scss';

type TProductCard = {
  product: TProduct;
};

function ProductCard({ product }: TProductCard) {
  return (
    <div className="product-card">
      <BiImage className="product-image" />
      <div className="product-info">
        <h4>{product.name}</h4>
        <h4>R$ {product.price}</h4>
      </div>
      <Button>
        <BsCartPlusFill className="add-to-cart" />
      </Button>
    </div>
  );
}

export default ProductCard;
