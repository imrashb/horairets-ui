import { useTheme } from '@emotion/react';
import { Download } from '@mui/icons-material';
import {
  Alert,
  Snackbar,
  Grid, IconButton, TablePagination, Typography, useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import fileDownload from 'js-file-download';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { BASE_API_URL, GET_COMBINAISONS_ENDPOINT } from '../../../app/api/api.constants';
import CombinaisonHoraire from '../../../components/CombinaisonHoraire/CombinaisonHoraire';
import { GENERATEUR_GRID_VIEW } from '../../../features/generateur/generateur.constants';
import {
  selectSorting, selectView,
} from '../../../features/generateur/generateur.slice';
import { COMBINAISONS_SORTS } from '../generateurHoraire.sorting';
import CombinaisonsWrapper from './Combinaisons.styles';
import useCombinaisonsSelector from './useCombinaisonsSelector';

const ROWS_PER_PAGE = [10, 20, 50, 100];

function Combinaisons() {
  const { t } = useTranslation('common');
  const view = useSelector(selectView);
  const sorting = useSelector(selectSorting);

  const data = useCombinaisonsSelector();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE[0]);

  const isGrid = view === GENERATEUR_GRID_VIEW;

  const columns = isGrid ? 2 : 1;
  const spacing = isGrid ? 4 : 0;

  const sorted = useMemo(() => (data ? COMBINAISONS_SORTS[sorting](data) : data), [data, sorting]);

  useEffect(() => {
    if (sorted) {
      setPage(0);
    }
  }, [sorted]);

  const handleRowsPerPageChange = (event) => {
    const value = event?.target?.value;
    setRowsPerPage(value);
    setPage(Math.floor((page * rowsPerPage) / value));
  };

  const theme = useTheme();
  const isSmallViewport = useMediaQuery(theme.breakpoints.down('sm'));

  const Pagination = (
    <TablePagination
      component="div"
      count={data?.length}
      page={page}
      rowsPerPageOptions={ROWS_PER_PAGE}
      rowsPerPage={rowsPerPage}
      onPageChange={(e, p) => setPage(p)}
      onRowsPerPageChange={handleRowsPerPageChange}
      labelRowsPerPage={!isSmallViewport ? t('horaireParPage') : ''}
      showFirstButton
      showLastButton
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

  const [downloadError, setDownloadError] = useState(false);

  return (
    <CombinaisonsWrapper>
      {downloadError && (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={downloadError}
      >
        <Alert
          severity="error"
          onClose={() => {
            setDownloadError(false);
          }}
        >
          {t('erreurTelechargement')}
        </Alert>
      </Snackbar>
      )}
      {data?.length > 0 && (
        Pagination
      )}
      <Grid className="combinaisons-grid" container columnSpacing={spacing} columns={{ xs: columns }}>
        {sorted?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((combinaison) => (
          <Grid item xs={1}>
            <Typography className="numero-horaire" variant="h4">
              {`${t('horaire')} ${sorted.indexOf(combinaison) + 1}`}
              <IconButton
                color="primary"
                onClick={async () => {
                  try {
                    const url = `${BASE_API_URL + GET_COMBINAISONS_ENDPOINT}/${combinaison?.uniqueId}`;
                    const res = await axios.get(url, {
                      responseType: 'blob',
                    });
                    fileDownload(res.data, 'horaire.jpeg');
                  } catch (error) {
                    setDownloadError(true);
                  }
                }}
              >
                <Download />
              </IconButton>
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
