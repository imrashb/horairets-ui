import { useAuthState } from 'react-firebase-hooks/auth';

import { Navigate } from 'react-router-dom';
import useFirebaseAuth from './useFirebaseAuth';

// eslint-disable-next-line func-names
const withAuth = (Component, redirectPath) => function (props) {
  const auth = useFirebaseAuth();
  const [user, loading] = useAuthState(auth);

  const canBeRedirected = !loading && !user && redirectPath;

  const RedirectComponent = canBeRedirected ? <Navigate to={redirectPath} /> : undefined;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return user ? <Component {...props} /> : RedirectComponent;
};

export default withAuth;
