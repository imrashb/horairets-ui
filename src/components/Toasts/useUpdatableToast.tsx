import { useRef } from "react";
import { Id, toast, TypeOptions } from "react-toastify";

export const TOAST_ERROR = "error";
export const TOAST_INFO = "info";
export const TOAST_DEFAULT = "default";
export const TOAST_WARNING = "warning";
export const TOAST_SUCCESS = "success";

type ComponentType = React.ReactNode;

function useUpdatableToast(
  Component: ComponentType,
  type: TypeOptions = "default"
) {
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

  // Fix: original code had `if (isRunning)` which is always true for a function.
  // It effectively updated the toast on every render if ref.current existed?
  // Or it was a bug and they meant `if (ref.current)`.
  // Given `isRunning` is defined inside, `if (isRunning)` is truthy.
  // I will assume they meant to update if the toast is currently active.
  if (ref.current) {
    toast.update(ref.current, {
      render: Component,
    });
  }

  return { play, stop, isRunning };
}

export default useUpdatableToast;
