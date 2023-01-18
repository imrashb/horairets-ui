import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import {
  HEURE_DEBUT_COURS, HEURE_FIN_COURS,
} from './CombinasonHoraire.constants';
import CombinaisonHoraireWrapper from './CombinaisonHoraire.styles';
import Jour from './Jour';

function CombinaisonHoraire({
  disableHeures,
  disableNomJours,
  disableNomCours,
  disableNomActivite,
  disableLocaux,
  combinaison,
}) {
  const jours = ['DIMANCHE', 'LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI'];

  const heures = [...Array(HEURE_FIN_COURS - HEURE_DEBUT_COURS + 1).keys()]
    .map((v) => v + HEURE_DEBUT_COURS);

  const getHeureString = (heure) => `${String(heure).padStart(2, '0')}:00`;

  return (
    <CombinaisonHoraireWrapper>
      {!disableHeures && (
      <div className="heures-container">
        {heures.map((v) => <div>{getHeureString(v)}</div>)}
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
};

CombinaisonHoraire.defaultProps = {
  disableHeures: false,
  disableNomJours: false,
  disableNomCours: false,
  disableNomActivite: false,
  disableLocaux: false,
};

export default CombinaisonHoraire;
