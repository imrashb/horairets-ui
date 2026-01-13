/* eslint-disable react/forbid-prop-types */
import { useTranslation } from 'react-i18next';
import { useDisplayPreferences } from '../../hooks/firebase';
import Activite from './Activite/Activite';
import ActiviteSpacer from './Activite/ActiviteSpacer';
import { HEURE_DEBUT_COURS, HEURE_FIN_COURS } from './CombinasonHoraire.constants';
import JourWrapper from './Jour.styles';
import {
  getDeterministicRandomBorderCoursColor,
  getDeterministicRandomCoursColor,
} from './combinaisonHoraire.utils';

// Types
interface Horaire {
  jour: string;
  heureDepart: number;
  heureFin: number;
}

interface ActiviteObj {
  horaire: Horaire;
  modeEnseignement: string;
  charges: string[];
  nom: string;
  locaux: string[];
}

interface Cours {
  sigle: string;
  credits: number;
  titre: string;
}

interface Groupe {
  cours: Cours;
  numeroGroupe: string | number;
  activites: ActiviteObj[];
}

interface Combinaison {
  groupes: Groupe[];
  uniqueId: string;
}

interface JourProps {
  jour: string;
  combinaison: Combinaison;
  disableNomJours?: boolean;
  disableNomCours?: boolean;
  disableNomActivite?: boolean;
  disableLocaux?: boolean;
  disableModeEnseignement?: boolean;
  disableEnseignant?: boolean;
  forceLegacyColors?: boolean;
}

interface MappedActivite extends ActiviteObj {
  numeroGroupe: string | number;
  sigle: string;
}

const getLegacyColors = (sigle: string, sigles: string[]) => {
  const index = sigles.indexOf(sigle);
  const deg = (index / sigles.length) * 360;
  // Fallback if sigle not found (index -1)
  const safeDeg = index === -1 ? 0 : deg;
  const color = `hsl(${safeDeg}deg 80% 50%)`;
  const borderColor = `hsl(${safeDeg}deg 80% 40%)`;
  return { color, borderColor };
};

function Jour({
  jour,
  combinaison,
  disableNomJours = false,
  disableNomCours = false,
  disableNomActivite = false,
  disableLocaux = false,
  disableModeEnseignement = true,
  disableEnseignant = true,
  forceLegacyColors = false,
}: JourProps): JSX.Element {
  const { t } = useTranslation('common');

  const { preferences } = useDisplayPreferences();
  const { showUniqueCoursColors } = preferences;

  const min = HEURE_DEBUT_COURS;
  const max = HEURE_FIN_COURS;

  const activites: MappedActivite[] = combinaison?.groupes?.reduce<MappedActivite[]>((prev, curr) => {
    const valid = curr?.activites?.filter((act) => act?.horaire?.jour === jour);

    const mapped = valid?.map((act) => ({
      ...act,
      numeroGroupe: curr?.numeroGroupe,
      sigle: curr?.cours?.sigle,
    }));

    return [...prev, ...(mapped || [])];
  }, []) || [];

  const sortedActivites = activites.sort(
    (a, b) => (a?.horaire?.heureDepart || 0) - (b?.horaire?.heureDepart || 0),
  );

  const components: JSX.Element[] = [];

  let isActivite = false;
  let currentFlex = 0;

  let index = 0;

  const sigles = combinaison?.groupes?.map((g) => g?.cours?.sigle) || [];

  const getActiviteComponent = (activite: MappedActivite) => {
    const legacyColors = getLegacyColors(activite.sigle, sigles);

    const showUniqueColors = !forceLegacyColors && showUniqueCoursColors;

    const color = showUniqueColors
      ? getDeterministicRandomCoursColor(activite.sigle)
      : legacyColors.color;
    const borderColor = showUniqueColors
      ? getDeterministicRandomBorderCoursColor(activite.sigle)
      : legacyColors.borderColor;

    return (
      <Activite
        key={`${activite.sigle}-${activite.horaire.heureDepart}`} // Add key
        activite={activite}
        flex={currentFlex}
        color={color}
        borderColor={borderColor}
        disableNomActivite={disableNomActivite}
        disableNomCours={disableNomCours}
        disableLocaux={disableLocaux}
        disableModeEnseignement={disableModeEnseignement}
        disableEnseignant={disableEnseignant}
      />
    );
  };

  const getSpacerComponent = (key: string) => <ActiviteSpacer key={key} flex={currentFlex} />;

  for (let i = min; i <= max; i += 0.5) {
    const heure = i * 100;
    const currentActivite = sortedActivites[index];

    // Added explicit undefined check for currentActivite
    if (!isActivite && currentActivite && currentActivite?.horaire?.heureDepart === heure) {
      if (currentFlex !== 0) {
        components.push(getSpacerComponent(`spacer-${i}-start`));
      }
      isActivite = true;
      currentFlex = 0;
    }

    if (isActivite && currentActivite && currentActivite?.horaire?.heureFin === heure) {
      components.push(getActiviteComponent(currentActivite));
      currentFlex = -1;
      isActivite = false;
      i -= 0.5;
      index += 1;
    }

    if (i === max && currentFlex !== 0) {
      if (isActivite) {
        // Should we assume this case implies activity ends at max?
        // Logic from original: pushes activite.
        // If logic is flawed originally, keeping it same.
        // It seems loop goes i += 0.5.
        // If i == max, and isActivite, it means activity spans beyond max? or matches exactly?
        components.push(getActiviteComponent(currentActivite));
      } else {
        components.push(getSpacerComponent(`spacer-${i}-end`));
      }
    }
    currentFlex += 1;
  }

  return (
    <JourWrapper>
      {!disableNomJours && <div className="nom-jour">{t(jour)}</div>}
      <div className="classes-wrapper">{components}</div>
    </JourWrapper>
  );
}

export default Jour;
