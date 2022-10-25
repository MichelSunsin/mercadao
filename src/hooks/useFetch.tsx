import { useEffect, useState } from 'react';
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  query,
  QueryConstraint,
} from 'firebase/firestore';
import config from 'api/firebase-config';

type TCollections = 'categories' | 'products' | 'orders';

export default function useFetch(
  collectionName: TCollections,
  constraints?: QueryConstraint[],
) {
  const [data, setData] = useState<DocumentData | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetch() {
    try {
      setLoading(true);
      const db = getFirestore(config);
      const dataCollection = collection(db, collectionName);

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
  }

  useEffect(() => {
    fetch();
  }, [collectionName, constraints]);

  return { data, error, loading };
}
