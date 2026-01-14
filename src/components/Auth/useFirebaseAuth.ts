import { Auth } from 'firebase/auth';
import { useContext } from 'react';
import AuthContext from './AuthContext';

const useFirebaseAuth = (): Auth => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useFirebaseAuth must be used within an AuthProvider');
  }
  return auth;
};

export default useFirebaseAuth;
