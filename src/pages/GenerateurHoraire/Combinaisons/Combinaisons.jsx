import { useTheme } from '@emotion/react';
import { Download } from '@mui/icons-material';
import {
  Grid, IconButton, TablePagination, Typography, useMediaQuery,
} from '@mui/material';
import fileDownload from 'js-file-download';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { toast } from 'react-toastify';
import axios from '../../../app/api/axiosInstance';
import { GET_COMBINAISONS_ENDPOINT } from '../../../app/api/api.constants';
import CombinaisonHoraire from '../../../components/CombinaisonHoraire/CombinaisonHoraire';
import { GENERATEUR_GRID_VIEW } from '../../../features/generateur/generateur.constants';
import { rawCombinaisonsAtom, viewAtom } from '../../../features/generateur/generateurAtoms';
import CombinaisonsWrapper from './Combinaisons.styles';
import FavoriteButton from './FavoriteButton';
import {
  showEnseignantAtom,
  showLocauxAtom,
  showModeEnseignementAtom,
  showNomActiviteAtom,
  showNomCoursGroupeAtom,
} from '../../../features/affichage/affichageAtoms';

const ROWS_PER_PAGE = [10, 20, 50, 100];

function Combinaisons({ combinaisons }) {
  const { t } = useTranslation('common');
  const view = useAtomValue(viewAtom);
  const rawCombinaisons = useAtomValue(rawCombinaisonsAtom);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE[0]);

  const showNomCoursGroupe = useAtomValue(showNomCoursGroupeAtom);
  const showNomActivite = useAtomValue(showNomActiviteAtom);
  const showLocaux = useAtomValue(showLocauxAtom);
  const showModeEnseignement = useAtomValue(showModeEnseignementAtom);
  const showEnseignant = useAtomValue(showEnseignantAtom);

  const isGrid = view === GENERATEUR_GRID_VIEW;

  const columns = isGrid ? 2 : 1;
  const spacing = isGrid ? 4 : 0;
  useEffect(() => {
    if (rawCombinaisons) {
      setPage(0);
    }
  }, [rawCombinaisons]);

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
      count={combinaisons?.length}
      page={page}
      rowsPerPageOptions={ROWS_PER_PAGE}
      rowsPerPage={rowsPerPage}
      onPageChange={(e, p) => setPage(p)}
      onRowsPerPageChange={handleRowsPerPageChange}
      labelRowsPerPage={!isSmallViewport ? t('horaireParPage') : ''}
      showFirstButton
      showLastButton
      labelDisplayedRows={(params) => t('paginationHoraire', {
        from: params.from,
        to: params.to === -1 ? params.count : params.to,
        count: params.count,
      })}
    />
  );

  const mainRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (mainRef.current) {
        const yOffset = -document.getElementById('navbar').clientHeight || 0;
        const y = mainRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 0);
  }, [page, rawCombinaisons]);

  return (
    <CombinaisonsWrapper ref={mainRef}>
      {combinaisons?.length > 0 && Pagination}
      <Grid className="combinaisons-grid" container columnSpacing={spacing} columns={{ xs: columns }}>
        {combinaisons?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
          (combinaison) => (
            <Grid key={combinaison.uniqueId} item xs={1}>
              <Typography className="numero-horaire" variant="h4">
                {`${t('horaire')} ${combinaisons.indexOf(combinaison) + 1}`}
                <IconButton
                  color="primary"
                  onClick={async () => {
                    try {
                      const url = `${GET_COMBINAISONS_ENDPOINT}/${combinaison?.uniqueId}`;
                      const res = await axios.get(url, {
                        responseType: 'blob',
                      });
                      fileDownload(res.data, 'horaire.jpeg');
                    } catch (error) {
                      toast.error(t('erreurTelechargement'));
                    }
                  }}
                >
                  <Download />
                </IconButton>
                <FavoriteButton combinaison={combinaison} />
              </Typography>
              <Typography className="credits" variant="h6">
                {t('credits', { count: combinaison?.groupes?.reduce((prev, curr) => prev + curr.cours.credits, 0) })}
              </Typography>
              <CombinaisonHoraire
                combinaison={combinaison}
                disableLocaux={!showLocaux}
                disableNomActivite={!showNomActivite}
                disableNomCours={!showNomCoursGroupe}
                disableModeEnseignement={!showModeEnseignement}
                disableEnseignant={!showEnseignant}
              />
            </Grid>
          ),
        )}
      </Grid>
      {combinaisons?.length > 0 && Pagination}
    </CombinaisonsWrapper>
  );
}

export default Combinaisons;
