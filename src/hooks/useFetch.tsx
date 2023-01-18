import { useEffect, useState, useCallback } from 'react';
import {
  collection,
  connectFirestoreEmulator,
  DocumentData,
  getDocs,
  query,
  QueryConstraint,
} from 'firebase/firestore';

import { firestore } from 'utils/firebase-utils';

type TCollections = 'categories' | 'products' | 'orders';

export default function useFetch(
  collectionName: TCollections,
  constraints?: QueryConstraint[],
) {
  const [data, setData] = useState<DocumentData | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);

      const dataCollection = collection(firestore, collectionName);

      let queriedCollection = null;

      if (constraints?.length) {
        queriedCollection = query(dataCollection, ...constraints);
      }

      const collectionSnapshot = await getDocs(
        queriedCollection ?? dataCollection,
      );

      const collectionList = collectionSnapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id,
      }));

      setData(collectionList);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [collectionName, constraints]);

  useEffect(() => {
    fetch();
  }, [collectionName, constraints]);

  return { data, error, loading };
}
