import { Navigate, useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

import { useAuth } from 'hooks';
import { auth, firestore } from 'utils/firebase-utils';
import type { TUser } from 'types';

const ProtectedRoute = ({ children }: any) => {
  const location = useLocation();
  const { state, setUser, clearUser } = useAuth();

  auth.onAuthStateChanged(async (user) => {
    if (user && !state.user) {
      const response = await getDoc(doc(firestore, 'users', user.uid));
      setUser(response.data() as TUser);
    } else if (!user && state.user) {
      clearUser();
      <Navigate to={'/login'} state={{ from: location }} replace />;
    }
  });

  if (!auth.currentUser) {
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
