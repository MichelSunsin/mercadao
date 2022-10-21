import { useEffect, useState } from 'react';
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import config from 'api/firebase-config';
import type { TQueryFilter, TQueryOrder } from 'types';

type TCollections = 'categories' | 'products';

export default function useFetch(
  collectionName: TCollections,
  queryFilter?: TQueryFilter,
  queryOrder?: TQueryOrder,
) {
  const [data, setData] = useState<DocumentData | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetch() {
    try {
      setLoading(true);
      const db = getFirestore(config);
      const dataCollection = collection(db, collectionName);

      let queriedCollection = query(dataCollection);

      if (queryFilter) {
        queriedCollection = query(
          dataCollection,
          where(queryFilter.name, '==', queryFilter.value),
        );
      }

      if (queryOrder) {
        queriedCollection = query(
          dataCollection,
          orderBy(queryOrder.name, queryOrder.direction),
        );
      }

      if (queryFilter && queryOrder) {
        queriedCollection = query(
          dataCollection,
          orderBy(queryOrder.name, queryOrder.direction),
        );
      }

      const collectionSnapshot = await getDocs(
        queriedCollection ?? dataCollection,
      );

      const collectionList = collectionSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setData(collectionList);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch();
  }, [collectionName, queryFilter]);

  return { data, error, loading };
}
