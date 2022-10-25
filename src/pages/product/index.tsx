import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth, useFetch } from 'hooks';
import { Button, Header } from 'components';
import type { TCategory, TProduct } from 'types';

import './styles.scss';
import {
  addDoc,
  collection,
  doc,
  FirestoreError,
  getDoc,
  getFirestore,
  orderBy,
  setDoc,
} from 'firebase/firestore';
import config from 'api/firebase-config';
import { getAuth } from 'firebase/auth';

function Product() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { state } = useAuth();

  const firestore = getFirestore(config);

  const { register, reset, handleSubmit } = useForm<TProduct>();
  const [product, setProduct] = useState<TProduct | null>(null);

  const productUid = search.replace('?', '');

  const onSubmit = async (data: TProduct) => {
    if (state.user) {
      try {
        data.sellerUid = state.user.uid;

        if (product) {
          await setDoc(doc(firestore, 'products', productUid), { ...data });
        } else {
          await addDoc(collection(firestore, 'products'), {
            ...data,
          });
        }

        navigate('/home');
      } catch (error) {
        const err = error as FirestoreError;
        console.log(err.message);
      }
    }
  };

  const categoryQueryFilter = useMemo(
    () => [orderBy('description', 'asc')],
    [],
  );

  const { data: categories } = useFetch('categories', categoryQueryFilter);

  const fetchProduct = async () => {
    const product = await getDoc(doc(firestore, 'products', productUid));

    if (product.exists()) {
      setProduct(product.data() as TProduct);
    }
  };

  useEffect(() => {
    if (!product) {
      fetchProduct();
    }
  }, [productUid]);

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product]);

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
            <select className="mrc-input" {...register('category')}>
              {categories?.map((category: TCategory) => (
                <option key={category.uid} value={category.uid}>
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
              {productUid ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
