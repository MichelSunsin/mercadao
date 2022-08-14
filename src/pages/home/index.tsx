import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiLogOut } from 'react-icons/fi';

import { ProductCard } from 'components';
import type { TCategory, TProduct } from 'types/models.type';

import './styles.scss';

function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  const [categories, setCategories] = useState<TCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const [products, setProducts] = useState<TProduct[]>([]);

  const fetchCategories = async () => {
    const response = await axios.get('http://localhost:3000/categories');
    setCategories([{ id: null, description: 'Todas' }, ...response.data]);
  };

  const fetchProducts = async () => {
    let url = `http://localhost:3000/products?name_like=${search}`;

    if (selectedCategory !== null) {
      url += `&categories_like=${selectedCategory}`;
    }

    const response = await axios.get(url);
    setProducts(response.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [search, selectedCategory]);

  return (
    <div className="home-container">
      <div className="header">
        <div className="align-left">Mercadão de Garça</div>
        <div className="align-right">
          <button type="button" onClick={() => navigate('/login')}>
            <FiLogOut />
          </button>
        </div>
      </div>
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
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
