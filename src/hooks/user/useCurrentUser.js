import { useAuthState } from 'react-firebase-hooks/auth';
import { useCallback } from 'react';
import useFirebaseAuth from '../../components/Auth/useFirebaseAuth';
import useDocumentValue from '../firebase/useDocumentValue';

const useCurrentUser = () => {
  const auth = useFirebaseAuth();
  const [user, loading] = useAuthState(auth);

  const { data, update } = useDocumentValue('profile', {
    initialArgs: {
      id: user?.uid,
      displayName: user?.displayName,
      programmes: ['LOG'],
    },
  });

  const updateDisplayName = useCallback(
    (displayName) => {
      update({ displayName });
    },
    [update],
  );

  const updateProgrammes = useCallback(
    (programmes) => {
      update({ programmes });
    },
    [update],
  );

  return {
    loading,
    user: data,
    auth,
    updateDisplayName,
    updateProgrammes,
  };
};

export default useCurrentUser;
