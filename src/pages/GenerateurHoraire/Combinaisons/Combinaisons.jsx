import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import CombinaisonHoraire from '../../../components/CombinaisonHoraire/CombinaisonHoraire';
import { selectCombinaisons } from '../../../features/generateur/generateur.api';
import { GENERATEUR_GRID_VIEW } from '../../../features/generateur/generateur.constants';
import {
  selectConges, selectNombreCours, selectSelectedCours, selectSession, selectView,
} from '../../../features/generateur/generateur.slice';
import CombinaisonsWrapper from './Combinaisons.styles';

function Combinaisons() {
  const session = useSelector(selectSession);
  const selectedCours = useSelector(selectSelectedCours);
  const nombreCours = useSelector(selectNombreCours);
  const conges = useSelector(selectConges);
  const view = useSelector(selectView);

  const { data } = useSelector(selectCombinaisons(session, selectedCours, nombreCours, conges));

  const isGrid = view === GENERATEUR_GRID_VIEW;

  const columns = isGrid ? 2 : 1;
  const spacing = isGrid ? 4 : 0;
  return (
    <CombinaisonsWrapper>
      <Grid className="combinaisons-grid" container columnSpacing={spacing} columns={{ xs: columns }}>
        {data?.map((combinaison) => (
          <Grid item xs={1}>
            <CombinaisonHoraire combinaison={combinaison} />
          </Grid>
        ))}
      </Grid>

    </CombinaisonsWrapper>
  );
}

export default Combinaisons;
