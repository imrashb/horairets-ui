import { useRef, useEffect } from 'react';
import { Id, toast, TypeOptions } from 'react-toastify';

export const TOAST_ERROR = 'error';
export const TOAST_INFO = 'info';
export const TOAST_DEFAULT = 'default';
export const TOAST_WARNING = 'warning';
export const TOAST_SUCCESS = 'success';

type ComponentType = React.ReactNode;

function useUpdatableToast(Component: ComponentType, type: TypeOptions = 'default') {
  const ref = useRef<Id | null>(null);

  const play = () => {
    if (!ref.current) {
      ref.current = toast(Component, {
        autoClose: false,
        onClose: () => {
          ref.current = null;
        },
        type,
      });
      return true;
    }
    return false;
  };

  const stop = () => {
    if (ref.current) {
      toast.dismiss(ref.current);
      return true;
    }
    return false;
  };

  const isRunning = () => !!ref.current;

  if (ref.current) {
    toast.update(ref.current, {
      render: Component,
    });
  }

  useEffect(
    () => () => {
      if (ref.current) {
        toast.dismiss(ref.current);
      }
    },
    [],
  );

  return { play, stop, isRunning };
}

export default useUpdatableToast;
