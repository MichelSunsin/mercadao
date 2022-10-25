import { useMemo, useState } from 'react';
import { Drawer } from 'antd';
import { orderBy, where } from 'firebase/firestore';

import useFetch from 'hooks/useFetch';
import { ProductCard, Cart, Header } from 'components';
import type { TCategory, TProduct } from 'types/models.type';

import './styles.scss';

function Home() {
  const [search, setSearch] = useState('');

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const categoryQueryFilter = useMemo(
    () => [orderBy('description', 'asc')],
    [selectedCategory],
  );

  const { data: categories } = useFetch('categories', categoryQueryFilter);

  const productQueryFilter = useMemo(
    () => (selectedCategory ? [where('category', '==', selectedCategory)] : []),
    [selectedCategory],
  );

  const { data: products } = useFetch('products', productQueryFilter);

  return (
    <>
      <div className="home-container">
        <Header setIsCartOpen={setIsCartOpen} />
        <div className="sidenav">
          <input
            className="mrc-input"
            placeholder="Buscar produto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <h3>Categorias</h3>
          <button
            key="todas-as-categorias"
            type="button"
            className={`${!selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            Todas
          </button>
          {categories?.map((category: TCategory) => (
            <button
              key={category.uid}
              type="button"
              className={`${selectedCategory === category.uid ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.uid)}
            >
              {category.description}
            </button>
          ))}
        </div>
        <div className="product-listing">
          {products?.map((product: TProduct) => (
            <ProductCard key={product.uid} product={product} />
          ))}
        </div>
      </div>
      <Drawer visible={isCartOpen} onClose={() => setIsCartOpen(false)}>
        <Cart />
      </Drawer>
    </>
  );
}

export default Home;
