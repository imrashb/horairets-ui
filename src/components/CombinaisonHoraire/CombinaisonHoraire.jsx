import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import {
  HEURE_DEBUT_COURS, HEURE_FIN_COURS,
} from './CombinasonHoraire.constants';
import CombinaisonHoraireWrapper from './CombinaisonHoraire.styles';
import Jour from './Jour';
import { JOURS } from '../../pages/GenerateurHoraire/generateurHoraire.constants';

function CombinaisonHoraire({
  disableHeures,
  disableNomJours,
  disableNomCours,
  disableNomActivite,
  disableLocaux,
  disableModeEnseignement,
  disableEnseignant,
  combinaison,
  forceLegacyColors,
}) {
  const jours = JOURS;

  const heures = [...Array(HEURE_FIN_COURS - HEURE_DEBUT_COURS + 1).keys()]
    .map((v) => v + HEURE_DEBUT_COURS);

  const getHeureString = (heure) => `${String(heure).padStart(2, '0')}:00`;

  return (
    <CombinaisonHoraireWrapper key={combinaison.uniqueId}>
      {!disableHeures && (
      <div className="heures-container">
        {heures.map((v) => <div key={v}>{getHeureString(v)}</div>)}
      </div>
      )}
      <Grid sx={{ height: '100%' }} container columns={{ xs: jours.length }}>
        {jours.map((jour) => (
          <Grid key={jour} xs={1}>
            <Jour
              key={jour}
              jour={jour}
              combinaison={combinaison}
              disableNomJours={disableNomJours}
              disableNomActivite={disableNomActivite}
              disableNomCours={disableNomCours}
              disableLocaux={disableLocaux}
              disableModeEnseignement={disableModeEnseignement}
              disableEnseignant={disableEnseignant}
              forceLegacyColors={forceLegacyColors}
            />
          </Grid>
        ))}
      </Grid>
    </CombinaisonHoraireWrapper>
  );
}

CombinaisonHoraire.propTypes = {
  disableHeures: PropTypes.bool,
  disableNomJours: PropTypes.bool,
  disableNomCours: PropTypes.bool,
  disableNomActivite: PropTypes.bool,
  disableLocaux: PropTypes.bool,
  forceLegacyColors: PropTypes.bool,
};

CombinaisonHoraire.defaultProps = {
  disableHeures: false,
  disableNomJours: false,
  disableNomCours: false,
  disableNomActivite: false,
  disableLocaux: false,
  forceLegacyColors: false,
};

export default CombinaisonHoraire;
