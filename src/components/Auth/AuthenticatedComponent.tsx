/* eslint-disable react/function-component-definition */
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import useFirebaseAuth from "./useFirebaseAuth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  redirectPath?: string
): React.FC<P> =>
  function WithAuth(props: P) {
    const auth = useFirebaseAuth();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [user, loading] = useAuthState(auth);

    const canBeRedirected = !loading && !user && redirectPath;

    if (canBeRedirected) {
      return <Navigate to={redirectPath} />;
    }

    // eslint-disable-next-line react/jsx-props-no-spreading
    return user ? <Component {...props} /> : null;
  };

export default withAuth;
