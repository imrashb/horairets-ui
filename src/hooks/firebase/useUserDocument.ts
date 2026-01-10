import {
  doc,
  DocumentReference,
  getFirestore,
  PartialWithFieldValue,
  setDoc,
} from "firebase/firestore";
import { useMemo, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import useFirebaseAuth from "../../components/Auth/useFirebaseAuth";
import { UseUserDocumentResult, UserDocument } from "./types";

const USERS_COLLECTION = "users" as const;

function useUserDocument<
  T extends UserDocument = UserDocument
>(): UseUserDocumentResult<T> {
  const auth = useFirebaseAuth();
  const [user] = useAuthState(auth);

  const documentRef: DocumentReference | undefined = useMemo(() => {
    if (!user?.uid) return undefined;
    return doc(getFirestore(), USERS_COLLECTION, user.uid);
  }, [user?.uid]);

  const [rawData, loading, error] = useDocumentData(documentRef);

  const data = rawData as T | undefined;

  const updateDocument = useCallback(
    async (updates: PartialWithFieldValue<T>): Promise<void> => {
      if (!documentRef) {
        throw new Error(
          "Cannot update document: User is not authenticated"
        );
      }
      await setDoc(documentRef, updates, { merge: true });
    },
    [documentRef]
  );

  return {
    data,
    isLoading: loading,
    error,
    updateDocument,
  };
}

export default useUserDocument;

