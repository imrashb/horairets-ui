import { setDoc } from 'firebase/firestore';
import lodash from 'lodash';
import { useMemo } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import useFirebaseUserDocument from '../useFirebaseUserDocument';

const useDocumentValue = (selector, { initialArgs } = {}) => {
  const document = useFirebaseUserDocument();
  const [data] = useDocumentData(document);

  if (selector.length === 0) {
    throw new Error('No selector provided');
  }

  const update = (newData) => {
    if (!data) return;
    const split = selector.split('.');
    let dataToUpdate = {};
    const dataToReturn = dataToUpdate;
    for (let i = 0; i < split.length; i++) {
      if (i === split.length - 1) {
        dataToUpdate[split[i]] = newData;
        break;
      } else {
        dataToUpdate[split[i]] = {};
        dataToUpdate = dataToUpdate[split[i]];
      }
    }

    setDoc(document, dataToReturn, { merge: true });
  };

  const selectedData = useMemo(() => {
    if (!data) return undefined;
    const split = selector.split('.');
    let selectedData = data;
    for (let i = 0; i < split.length; i++) {
      if (selectedData) {
        selectedData = selectedData[split[i]];
      }
    }

    return selectedData;
  }, [data]);

  const initialArgsToUpdate = useMemo(() => {
    if (!selectedData && initialArgs) {
      return initialArgs;
    }

    if (selectedData && initialArgs) {
      const differencies = lodash(initialArgs)
        .keys()
        .filter((key) => selectedData[key] === undefined && initialArgs[key] !== undefined)
        .value();

      const argsToUpdate = differencies.length === 0
        ? undefined
        : differencies.reduce((acc, curr) => ({ ...acc, [curr]: initialArgs[curr] }), {});

      return argsToUpdate;
    }

    return undefined;
  }, [initialArgs]);

  if (initialArgsToUpdate) {
    update(initialArgs);
  }

  return { data: selectedData, update };
};

export default useDocumentValue;
