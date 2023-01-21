import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import config from 'api/firebase-config';

const auth = getAuth();
const firestore = getFirestore(config);
const storage = getStorage(config);

if (import.meta.env.DEV) {
  connectAuthEmulator(
    auth,
    `http://localhost:${import.meta.env.VITE_FIREBASE_LOCAL_AUTH_PORT}`,
  );

  connectFirestoreEmulator(
    firestore,
    'localhost',
    import.meta.env.VITE_FIREBASE_LOCAL_FIRESTORE_PORT,
  );

  connectStorageEmulator(
    storage,
    'localhost',
    import.meta.env.VITE_FIREBASE_LOCAL_STORAGE_PORT,
  );
}

export { auth, firestore, storage };
