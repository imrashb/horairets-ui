import { useNavigate, To } from "react-router-dom";

type DelayedNavigate = (path: To, timeout: number) => void;

const useDelayedNavigate = (): DelayedNavigate => {
  const navigate = useNavigate();

  const delayedNavigate: DelayedNavigate = (path, timeout) => {
    setTimeout(() => {
      navigate(path);
    }, timeout);
  };

  return delayedNavigate;
};

export default useDelayedNavigate;
