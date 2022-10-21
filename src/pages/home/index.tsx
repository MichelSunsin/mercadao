import { useEffect, useMemo, useState } from 'react';
import { Drawer } from 'antd';
import axios from 'axios';

import { ProductCard, Cart, Header } from 'components';
import type { TCategory, TProduct } from 'types/models.type';

import './styles.scss';
import useFetch from 'hooks/useProducts';

function Home() {
  const [search, setSearch] = useState('');

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const categoryQueryFilter = useMemo(
    () => ({
      name: 'name',
      direction: 'asc',
    }),
    [selectedCategory],
  );

  const { data: categories } = useFetch(
    'categories',
    undefined,
    categoryQueryFilter,
  );

  const productQueryFilter = useMemo(
    () =>
      selectedCategory
        ? {
            name: 'category',
            operator: '==',
            value: selectedCategory,
          }
        : undefined,
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
          {categories?.map((category: TCategory) => (
            <button
              key={category.id}
              type="button"
              className={`${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.description}
            </button>
          ))}
        </div>
        <div className="product-listing">
          {products?.map((product: TProduct) => (
            <ProductCard key={product.id} product={product} />
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
