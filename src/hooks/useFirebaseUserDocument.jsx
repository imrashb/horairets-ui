import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getFirestore } from 'firebase/firestore';
import useFirebaseAuth from '../components/Auth/useFirebaseAuth';

const USERS_COLLECTION = 'users';

const useFirebaseUserDocument = () => {
  const auth = useFirebaseAuth();
  const [user] = useAuthState(auth);

  const document = user ? doc(getFirestore(), USERS_COLLECTION, user?.uid) : undefined;
  return document;
};

export default useFirebaseUserDocument;
