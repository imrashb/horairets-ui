import { Grid, TablePagination, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CombinaisonHoraire from '../../../components/CombinaisonHoraire/CombinaisonHoraire';
import { selectCombinaisons } from '../../../features/generateur/generateur.api';
import { GENERATEUR_GRID_VIEW } from '../../../features/generateur/generateur.constants';
import {
  selectConges, selectNombreCours, selectSelectedCours, selectSession, selectView,
} from '../../../features/generateur/generateur.slice';
import CombinaisonsWrapper from './Combinaisons.styles';

const ROWS_PER_PAGE = [10, 20, 50, 100];

function Combinaisons() {
  const { t } = useTranslation('common');
  const session = useSelector(selectSession);
  const selectedCours = useSelector(selectSelectedCours);
  const nombreCours = useSelector(selectNombreCours);
  const conges = useSelector(selectConges);
  const view = useSelector(selectView);
  const { data } = useSelector(selectCombinaisons(session, selectedCours, nombreCours, conges));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE[0]);

  const isGrid = view === GENERATEUR_GRID_VIEW;

  const columns = isGrid ? 2 : 1;
  const spacing = isGrid ? 4 : 0;

  const handleRowsPerPageChange = (event) => {
    const value = event?.target?.value;
    setRowsPerPage(value);
    setPage(Math.floor((page * rowsPerPage) / value));
  };

  const Pagination = (
    <TablePagination
      component="div"
      count={data?.length}
      page={page}
      rowsPerPageOptions={ROWS_PER_PAGE}
      rowsPerPage={rowsPerPage}
      onPageChange={(e, p) => setPage(p)}
      onRowsPerPageChange={handleRowsPerPageChange}
      labelRowsPerPage={t('horaireParPage')}
      labelDisplayedRows={(params) => t(
        'paginationHoraire',
        {
          from: params.from,
          to: params.to === -1 ? params.count : params.to,
          count: params.count,
        },
      )}
    />
  );

  return (
    <CombinaisonsWrapper>
      {data?.length > 0 && (
        Pagination
      )}
      <Grid className="combinaisons-grid" container columnSpacing={spacing} columns={{ xs: columns }}>
        {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((combinaison) => (
          <Grid item xs={1}>
            <Typography className="numero-horaire" variant="h4">
              {`${t('horaire')} ${data.indexOf(combinaison) + 1}`}
            </Typography>
            <CombinaisonHoraire combinaison={combinaison} />
          </Grid>
        ))}
      </Grid>
      {data?.length > 0 && (
        Pagination
      )}
    </CombinaisonsWrapper>
  );
}

export default Combinaisons;
