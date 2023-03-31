import { useRef } from 'react';
import { toast } from 'react-toastify';

export const TOAST_ERROR = 'error';
export const TOAST_INFO = 'info';
export const TOAST_DEFAULT = 'default';
export const TOAST_WARNING = 'warning';
export const TOAST_SUCCESS = 'success';

function useUpdatableToast(Component, type) {
  const ref = useRef(null);

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

  if (isRunning) {
    toast.update(ref.current, {
      render: Component,
    });
  }

  return { play, stop, isRunning };
}

useUpdatableToast.defaultProps = {
  type: 'default',
};

export default useUpdatableToast;
