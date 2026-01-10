import {
  CalendarToday,
  Dashboard,
  Favorite,
  Info,
  SvgIconComponent,
} from "@mui/icons-material";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  FAVORIS_URL,
  GENERATEUR_HORAIRE_URL,
  HOME_URL,
} from "../../routes/Routes.constants";
import useFirebaseAuth from "../Auth/useFirebaseAuth";

export type NavBarTab = {
  path: string;
  icon: SvgIconComponent;
  label: string;
  hidden?: boolean;
  new?: boolean;
  disabled?: boolean;
};

const useNavBarTabs = (): NavBarTab[] => {
  const auth = useFirebaseAuth();
  const [user] = useAuthState(auth);

  const tabs: NavBarTab[] = [
    {
      path: HOME_URL,
      icon: Dashboard,
      label: "accueil",
    },
    {
      path: GENERATEUR_HORAIRE_URL,
      icon: CalendarToday,
      label: "generateurHoraire",
    },
    {
      path: FAVORIS_URL,
      icon: Favorite,
      label: "favoris",
      hidden: !user,
      new: true,
    },
    {
      path: "/",
      icon: Info,
      label: "aPropos",
      hidden: true,
    },
  ];

  return tabs;
};

export default useNavBarTabs;
