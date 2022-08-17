import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'api';
import { useAuth } from 'hooks';
import { Button, Header } from 'components';
import type { TCategory, TProduct } from 'types';

import './styles.scss';

function Product() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { state } = useAuth();

  const [product, setProduct] = useState<TProduct | null>(null);
  const [categories, setCategories] = useState<TCategory[]>([]);

  const { register, reset, handleSubmit } = useForm();

  const productId = search.replace(/\D/g, '');

  const onSubmit = async (data: any) => {
    data.sellerId = state.user?.id;
    if (productId) {
      await axios.put(`/products/${productId}`, data);
    } else {
      await axios.post('products', data);
    }

    navigate('/home');
  };

  const fetchProduct = async () => {
    const response = await axios.get(`/products?id=${productId}`);
    setProduct(response.data[0]);
  };

  const fetchCategories = async () => {
    const response = await axios.get('http://localhost:3000/categories');
    setCategories(response.data);
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  useEffect(() => {
    reset(product as any);
  }, [product]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="product-container">
      <Header />
      <div className="product-info-wrapper">
        <div className="product-info-container">
          <h2 className="title">Cadastro de produto</h2>
          <form id="form-product" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Nome</label>
            <input type="text" className="mrc-input" {...register('name')} />
            <label htmlFor="price">Preço</label>
            <input
              type="text"
              className="mrc-input"
              {...register('price', { valueAsNumber: true })}
            />
            <label htmlFor="category">Categoria</label>
            <select
              className="mrc-input"
              {...register('category', { valueAsNumber: true })}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.description}
                </option>
              ))}
            </select>
          </form>
          <div className="buttons-container-rows">
            <Button secondary onClick={() => navigate('/home')}>
              Voltar
            </Button>
            <Button type="submit" form="form-product">
              {productId ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
