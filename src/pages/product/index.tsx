import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth, useFetch } from 'hooks';
import { Button, Header } from 'components';
import type { TCategory, TProduct } from 'types';
import {
  addDoc,
  collection,
  doc,
  FirestoreError,
  getDoc,
  orderBy,
  setDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { firestore, storage } from 'utils/firebase-utils';

import './styles.scss';

function Product() {
  const navigate = useNavigate();

  const { search } = useLocation();
  const queryProductUid = search.replace('?', '');

  const { state } = useAuth();

  const { register, reset, handleSubmit } = useForm<TProduct>();

  const [product, setProduct] = useState<TProduct | null>(null);
  const [productImageUpload, setProductImageUpload] = useState<File>();
  const [productImage, setProductImage] = useState<Blob | null>(null);

  const onSubmit = async (data: TProduct) => {
    if (state.user) {
      try {
        data.sellerUid = state.user.uid;

        if (product) {
          const imageURL = await uploadImageToCloud(queryProductUid);

          await setDoc(doc(firestore, 'products', queryProductUid), {
            ...data,
            ...(imageURL && { productImageURL: imageURL }),
          });
        } else {
          const docRef = await addDoc(collection(firestore, 'products'), {
            ...data,
          });

          const imageURL = await uploadImageToCloud(docRef.id);

          if (imageURL) {
            await setDoc(
              docRef,
              { productImageURL: imageURL },
              { merge: true },
            );
          }
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
    try {
      const product = await getDoc(doc(firestore, 'products', queryProductUid));

      if (product.exists()) {
        const fetchedProduct = product.data() as TProduct;
        setProduct(fetchedProduct);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileRead = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setProductImageUpload(file);
      const base64 = (await convertToBase64(file)) as Blob;
      setProductImage(base64);
    }

    event.target.value = '';
  };

  const uploadImageToCloud = async (productUid: string) => {
    try {
      if (state.user && productImage) {
        const imagePath = `images/${state.user.uid}/${productUid}/product-image.png`;

        const storageRef = ref(storage, imagePath);
        await uploadBytes(storageRef, productImageUpload as Blob);

        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  useEffect(() => {
    if (!product && queryProductUid !== '') {
      fetchProduct();
    }
  }, [queryProductUid]);

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
            <div className="primary-container">
              <div className="align-left">
                <div
                  className="image-container"
                  style={{
                    backgroundImage: `url(${
                      productImage?.toString() ?? product?.productImageURL
                    })`,
                  }}
                >
                  {!productImage && !product?.productImageURL && (
                    <span>
                      Clique aqui para escolher uma imagem para seu produto
                    </span>
                  )}
                  <input
                    className="image-input"
                    type="file"
                    accept="image/*"
                    src={product?.productImageURL ?? productImage?.toString()}
                    onChange={handleFileRead}
                  />
                </div>
              </div>
              <div className="align-right">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  className="mrc-input"
                  {...register('name')}
                />
                <label htmlFor="price">Preço</label>
                <input
                  type="text"
                  className="mrc-input"
                  {...register('price', { valueAsNumber: true })}
                />
              </div>
            </div>
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
              {queryProductUid ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
