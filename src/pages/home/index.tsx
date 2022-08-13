import { useState } from 'react';

import './styles.scss';

function Home() {
  const categories = [
    { id: null, desc: 'Todas' },
    { id: 0, desc: 'Categoria 1' },
    { id: 1, desc: 'Categoria 2' },
    { id: 3, desc: 'Categoria 3' },
  ];

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <div className="home-container">
      <div className="header">Mercadão de Garça</div>
      <div className="sidenav">
        <input className="mrc-input" placeholder="Buscar produto" />
        <h3>Categorias</h3>
        {categories.map((category) => (
          <button
            type="button"
            className={`${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.desc}
          </button>
        ))}
      </div>
      <div className="product-listing">Listagem de produtos</div>
    </div>
  );
}

export default Home;
