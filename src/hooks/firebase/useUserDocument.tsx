import {
  doc,
  DocumentReference,
  getFirestore,
  PartialWithFieldValue,
  setDoc,
} from "firebase/firestore";
import React, { createContext, useContext, useMemo, useCallback, ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { toast } from "react-toastify";
import useFirebaseAuth from "../../components/Auth/useFirebaseAuth";
import { UseUserDocumentResult, UserDocument } from "./types";

const USERS_COLLECTION = "users" as const;

export interface UpdateOptions {
  showToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

const UserDocumentContext = createContext<UseUserDocumentResult<UserDocument> | undefined>(undefined);

interface UserDocumentProviderProps {
  children: ReactNode;
}

export function UserDocumentProvider({ children }: UserDocumentProviderProps): JSX.Element {
  const auth = useFirebaseAuth();
  const [user, authLoading] = useAuthState(auth);

  const documentRef: DocumentReference | undefined = useMemo(() => {
    if (!user?.uid) return undefined;
    return doc(getFirestore(), USERS_COLLECTION, user.uid);
  }, [user?.uid]);

  const [rawData, loading, error] = useDocumentData(documentRef);

  const data = rawData as UserDocument | undefined;

  const updateDocument = useCallback(
    async (updates: PartialWithFieldValue<UserDocument>, options?: UpdateOptions): Promise<void> => {
      if (!documentRef) {
        throw new Error("Cannot update document: User is not authenticated");
      }

      const { showToast = false, successMessage, errorMessage } = options || {};

      try {
        await setDoc(documentRef, updates, { merge: true });
        if (showToast && successMessage) {
          toast.success(successMessage);
        }
      } catch {
        if (showToast && errorMessage) {
          toast.error(errorMessage);
        }
        throw new Error("Failed to update document");
      }
    },
    [documentRef]
  );

  const value = useMemo<UseUserDocumentResult<UserDocument>>(() => {
    const isDataLoading = loading || (!!user && !data && !error);
    
    return {
      data,
      isLoading: authLoading || isDataLoading,
      error,
      updateDocument,
    };
  }, [data, loading, authLoading, user, error, updateDocument]);

  return (
    <UserDocumentContext.Provider value={value}>
      {children}
    </UserDocumentContext.Provider>
  );
}

function useUserDocument<T extends UserDocument = UserDocument>(): UseUserDocumentResult<T> {
  const context = useContext(UserDocumentContext);
  if (!context) {
    throw new Error("useUserDocument must be used within a UserDocumentProvider");
  }
  return context as UseUserDocumentResult<T>;
}

export default useUserDocument;
