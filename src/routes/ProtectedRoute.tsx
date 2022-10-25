import { Navigate, useLocation } from 'react-router-dom';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { useAuth } from 'hooks';
import config from 'api/firebase-config';
import type { TUser } from 'types';

const ProtectedRoute = ({ children }: any) => {
  const location = useLocation();
  const auth = getAuth();
  const firestore = getFirestore(config);
  const { setUser } = useAuth();

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const response = await getDoc(doc(firestore, 'users', user.uid));
      setUser(response.data() as TUser);
    }
  });

  if (!auth.currentUser) {
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
