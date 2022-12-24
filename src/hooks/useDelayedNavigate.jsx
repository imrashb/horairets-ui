import { useNavigate } from 'react-router-dom';

const useDelayedNavigate = () => {
  const navigate = useNavigate();

  const delayedNavigate = (path, timeout) => {
    setTimeout(() => {
      navigate(path);
    }, timeout);
  };

  return delayedNavigate;
};

export default useDelayedNavigate;
