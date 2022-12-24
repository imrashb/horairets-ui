import { useTranslation } from 'react-i18next';
import Activite from './Activite/Activite';
import ActiviteSpacer from './Activite/ActiviteSpacer';
import JourWrapper from './Jour.styles';

function Jour({ jour, combinaison }) {
  const { t } = useTranslation('common');

  const min = 8;
  const max = 23;

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

  const sigles = combinaison?.groupes?.map((g) => g?.cours?.sigle);

  const sortedActivites = activites.sort(
    // eslint-disable-next-line no-unsafe-optional-chaining
    (a, b) => a?.horaire?.heureDepart - b?.horaire?.heureDepart,
  );

  const components = [];

  let isActivite = false;
  let currentFlex = 0;

  let index = 0;

  const getActiviteComponent = (activite) => {
    const deg = (sigles.indexOf(activite.sigle) / sigles.length) * 360;
    const color = `hsl(${deg}deg 80% 50%)`;
    const borderColor = `hsl(${deg}deg 80% 40%)`;
    return (
      <Activite
        activite={activite}
        flex={currentFlex}
        color={color}
        borderColor={borderColor}
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
      <div className="nom-jour">{t(jour)}</div>
      <div className="classes-wrapper">
        {components}
      </div>
    </JourWrapper>
  );
}

export default Jour;
