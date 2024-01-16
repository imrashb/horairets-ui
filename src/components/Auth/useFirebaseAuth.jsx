import { useContext } from 'react';
import AuthContext from './AuthContext';

const useFirebaseAuth = () => useContext(AuthContext);

export default useFirebaseAuth;
