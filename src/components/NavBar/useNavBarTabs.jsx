import { useAuthState } from 'react-firebase-hooks/auth';
import {
  CalendarToday, Dashboard, Favorite, Info,
} from '@mui/icons-material';
import useFirebaseAuth from '../Auth/useFirebaseAuth';
import { FAVORIS_URL, GENERATEUR_HORAIRE_URL, HOME_URL } from '../../routes/Routes.constants';

const useNavBarTabs = () => {
  const auth = useFirebaseAuth();
  const [user] = useAuthState(auth);

  const tabs = [
    {
      path: HOME_URL,
      icon: Dashboard,
      label: 'accueil',
    },
    {
      path: GENERATEUR_HORAIRE_URL,
      icon: CalendarToday,
      label: 'generateurHoraire',
    },
    {
      path: FAVORIS_URL,
      icon: Favorite,
      label: 'favoris',
      hidden: !user,
      new: true,
    },
    {
      path: '/',
      icon: Info,
      label: 'aPropos',
      hidden: true,
    },
  ];

  return tabs;
};

export default useNavBarTabs;
