import { Grid } from '@mui/material';
import GenerateurHoraireWrapper from './GenerateurHoraire.styles';
import Jour from './Jour';
import { combinaison } from './temp';

function GenerateurHoraire() {
  const jours = ['DIMANCHE', 'LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI'];

  const comb = combinaison;

  return (
    <GenerateurHoraireWrapper>
      <Grid sx={{ height: '100%' }} container columns={{ xs: jours.length }}>
        {jours.map((jour) => (
          <Grid xs={1}>
            <Jour jour={jour} combinaison={comb} />
          </Grid>
        ))}
      </Grid>
    </GenerateurHoraireWrapper>
  );
}

export default GenerateurHoraire;
