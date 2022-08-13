import { useContext } from 'react';
import AuthContext from 'context/auth/authContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;
