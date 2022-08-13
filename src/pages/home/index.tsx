import { useEffect, useState } from 'react';
import axios from 'axios';
import type { TCategory, TProduct } from 'types/models.type';

import './styles.scss';

function Home() {
  const [search, setSearch] = useState('');

  const [categories, setCategories] = useState<TCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const [products, setProducts] = useState<TProduct[]>([]);

  const fetchCategories = async () => {
    const response = await axios.get('http://localhost:3000/categories');
    setCategories([{ id: null, description: 'Todas' }, ...response.data]);
  };

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:3000/products');
    setProducts(response.data);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <div className="header">Mercadão de Garça</div>
      <div className="sidenav">
        <input
          className="mrc-input"
          placeholder="Buscar produto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <h3>Categorias</h3>
        {categories.map((category) => (
          <button
            type="button"
            className={`${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.description}
          </button>
        ))}
      </div>
      <div className="product-listing">
        {products.map((product) => (
          <div className="product-card">
            <h1>{product.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
