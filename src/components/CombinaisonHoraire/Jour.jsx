/* eslint-disable react/forbid-prop-types */
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useAtomValue } from 'jotai';
import Activite from './Activite/Activite';
import ActiviteSpacer from './Activite/ActiviteSpacer';
import { HEURE_DEBUT_COURS, HEURE_FIN_COURS } from './CombinasonHoraire.constants';
import JourWrapper from './Jour.styles';
import { getDeterministicRandomBorderCoursColor, getDeterministicRandomCoursColor } from './combinaisonHoraire.utils';
import affichageAtom from '../../features/affichage/affichageAtoms';

const getLegacyColors = (sigle, sigles) => {
  const deg = (sigles.indexOf(sigle) / sigles.length) * 360;
  const color = `hsl(${deg}deg 80% 50%)`;
  const borderColor = `hsl(${deg}deg 80% 40%)`;
  return { color, borderColor };
};

function Jour({
  jour,
  combinaison,
  disableNomJours,
  disableNomCours,
  disableNomActivite,
  disableLocaux,
  disableModeEnseignement,
  disableEnseignant,
  forceLegacyColors,
}) {
  const { t } = useTranslation('common');

  const { showUniqueCoursColors } = useAtomValue(affichageAtom);

  const min = HEURE_DEBUT_COURS;
  const max = HEURE_FIN_COURS;

  const activites = combinaison?.groupes?.reduce((prev, curr) => {
    const valid = curr?.activites?.filter((act) => act?.horaire?.jour === jour);

    const mapped = valid?.map((act) => (
      {
        ...act,
        numeroGroupe: curr?.numeroGroupe,
        sigle: curr?.cours?.sigle,
      }));

    return [...prev, ...mapped];
  }, []);

  const sortedActivites = activites.sort(
    // eslint-disable-next-line no-unsafe-optional-chaining
    (a, b) => a?.horaire?.heureDepart - b?.horaire?.heureDepart,
  );

  const components = [];

  let isActivite = false;
  let currentFlex = 0;

  let index = 0;

  const sigles = combinaison?.groupes?.map((g) => g?.cours?.sigle);

  const getActiviteComponent = (activite) => {
    const legacyColors = getLegacyColors(activite.sigle, sigles);

    const showUniqueColors = !forceLegacyColors && showUniqueCoursColors;

    const color = showUniqueColors
      ? getDeterministicRandomCoursColor(activite.sigle) : legacyColors.color;
    const borderColor = showUniqueColors
      ? getDeterministicRandomBorderCoursColor(activite.sigle) : legacyColors.borderColor;

    return (
      <Activite
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

  const getSpacerComponent = () => <ActiviteSpacer flex={currentFlex} />;

  for (let i = min; i <= max; i += 0.5) {
    const heure = i * 100;
    const currentActivite = sortedActivites[index];

    if (!isActivite && currentActivite && currentActivite?.horaire?.heureDepart === heure) {
      if (currentFlex !== 0) {
        components.push(getSpacerComponent());
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
        components.push(getActiviteComponent(currentActivite));
      } else {
        components.push(getSpacerComponent());
      }
    }
    currentFlex += 1;
  }

  return (
    <JourWrapper>
      {!disableNomJours && <div className="nom-jour">{t(jour)}</div>}
      <div className="classes-wrapper">
        {components}
      </div>
    </JourWrapper>
  );
}

Jour.propTypes = {
  combinaison: PropTypes.object.isRequired,
  jour: PropTypes.string.isRequired,
  disableNomJours: PropTypes.bool,
  disableNomCours: PropTypes.bool,
  disableNomActivite: PropTypes.bool,
  disableLocaux: PropTypes.bool,
  disableModeEnseignement: PropTypes.bool,
  disableEnseignant: PropTypes.bool,
  forceLegacyColors: PropTypes.bool,
};

Jour.defaultProps = {
  disableNomJours: false,
  disableNomCours: false,
  disableNomActivite: false,
  disableLocaux: false,
  disableModeEnseignement: true,
  disableEnseignant: true,
  forceLegacyColors: false,
};

export default Jour;
