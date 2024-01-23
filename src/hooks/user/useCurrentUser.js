import { useAuthState } from 'react-firebase-hooks/auth';
import useFirebaseAuth from '../../components/Auth/useFirebaseAuth';
import useDocumentValue from '../firebase/useDocumentValue';

const useCurrentUser = () => {
  const auth = useFirebaseAuth();
  const [user, loading] = useAuthState(auth);

  const { data } = useDocumentValue('profile', {
    initialArgs: {
      id: user?.uid,
      displayName: user?.displayName,
    },
  });

  return {
    loading,
    user: data,
    auth,
  };
};

export default useCurrentUser;
