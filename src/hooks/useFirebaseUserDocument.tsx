import { doc, DocumentReference, getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import useFirebaseAuth from "../components/Auth/useFirebaseAuth";

const USERS_COLLECTION = "users";

const useFirebaseUserDocument = (): DocumentReference | undefined => {
  const auth = useFirebaseAuth();
  const [user] = useAuthState(auth);

  const document = user
    ? doc(getFirestore(), USERS_COLLECTION, user.uid)
    : undefined;
  return document;
};

export default useFirebaseUserDocument;
