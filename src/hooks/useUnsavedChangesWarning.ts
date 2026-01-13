import { useCallback, useEffect } from "react";
import { useBeforeUnload, useBlocker } from "react-router-dom";

export function useUnsavedChangesWarning(message: string, hasChanges: boolean) {
  useBeforeUnload(
    useCallback(
      (e: BeforeUnloadEvent) => {
        if (hasChanges) {
          e.preventDefault();
        }
      },
      [hasChanges]
    )
  );

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      hasChanges && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      if (window.confirm(message)) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker, message]);
}
