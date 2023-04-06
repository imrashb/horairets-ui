import { useAuthState } from 'react-firebase-hooks/auth';

import useFirebaseAuth from './useFirebaseAuth';

// eslint-disable-next-line func-names
const withAuth = (Component) => function (props) {
  const auth = useFirebaseAuth();
  const [user] = useAuthState(auth);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return user ? <Component {...props} /> : undefined;
};

export default withAuth;
