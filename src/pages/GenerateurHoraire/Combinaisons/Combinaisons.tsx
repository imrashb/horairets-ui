import { useTheme } from "@emotion/react";
import { Download } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  TablePagination,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import fileDownload from "js-file-download";
import { useAtomValue } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { GET_COMBINAISONS_ENDPOINT } from "../../../app/api/api.constants";
import axios from "../../../app/api/axiosInstance";
import CombinaisonHoraire from "../../../components/CombinaisonHoraire/CombinaisonHoraire";
import { useDisplayPreferences } from "../../../hooks/firebase";
import { GENERATEUR_GRID_VIEW } from "../../../features/generateur/generateur.constants";
import { Combinaison } from "../../../features/generateur/generateur.types";
import {
  rawCombinaisonsAtom,
  viewAtom,
} from "../../../features/generateur/generateurAtoms";
import CombinaisonsWrapper from "./Combinaisons.styles";
import FavoriteButton from "./FavoriteButton";
import SelectedScheduleButton from "./SelectedScheduleButton";

const ROWS_PER_PAGE = [10, 20, 50, 100];

interface CombinaisonsProps {
  combinaisons?: Combinaison[];
}

function Combinaisons({ combinaisons }: CombinaisonsProps): JSX.Element {
  const { t } = useTranslation("common");
  const view = useAtomValue(viewAtom);
  const rawCombinaisons = useAtomValue(rawCombinaisonsAtom);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE[0]);

  const { preferences } = useDisplayPreferences();
  const {
    showNomCoursGroupe,
    showNomActivite,
    showLocaux,
    showModeEnseignement,
    showEnseignant,
  } = preferences;

  const isGrid = view === GENERATEUR_GRID_VIEW;

  const columns = isGrid ? 2 : 1;
  const spacing = isGrid ? 4 : 0;
  useEffect(() => {
    if (rawCombinaisons) {
      setPage(0);
    }
  }, [rawCombinaisons]);

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setRowsPerPage(value);
    setPage(Math.floor((page * rowsPerPage) / value));
  };

  const theme = useTheme() as Theme;
  const isSmallViewport = useMediaQuery(theme.breakpoints.down("sm"));

  const Pagination = (
    <TablePagination
      component="div"
      count={combinaisons?.length || 0}
      page={page}
      rowsPerPageOptions={ROWS_PER_PAGE}
      rowsPerPage={rowsPerPage}
      onPageChange={(e, p) => setPage(p)}
      onRowsPerPageChange={handleRowsPerPageChange}
      labelRowsPerPage={!isSmallViewport ? t("horaireParPage") : ""}
      showFirstButton
      showLastButton
      labelDisplayedRows={(params) =>
        t("paginationHoraire", {
          from: params.from,
          to: params.to === -1 ? params.count : params.to,
          count: params.count,
        })
      }
    />
  );

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (mainRef.current) {
        const navbar = document.getElementById("navbar");
        const yOffset = -(navbar?.clientHeight || 0) || 0;
        const y =
          mainRef.current.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 0);
  }, [page, rawCombinaisons]);

  return (
    <CombinaisonsWrapper ref={mainRef}>
      {combinaisons && combinaisons.length > 0 && Pagination}
      <Grid
        className="combinaisons-grid"
        container
        columnSpacing={spacing}
        columns={{ xs: columns }}
      >
        {combinaisons
          ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((combinaison) => (
            <Grid key={combinaison.uniqueId} item xs={1}>
              <Typography className="numero-horaire" variant="h4">
                {`${t("horaire")} ${combinaisons.indexOf(combinaison) + 1}`}
                <Tooltip title={t("telechargerHoraire")}>
                  <IconButton
                    color="primary"
                    onClick={async () => {
                      try {
                        const url = `${GET_COMBINAISONS_ENDPOINT}/${combinaison?.uniqueId}`;
                        const res = await axios.get(url, {
                          responseType: "blob",
                        });
                        fileDownload(res.data, "horaire.jpeg");
                      } catch (error) {
                        toast.error(t("erreurTelechargement"));
                      }
                    }}
                  >
                    <Download />
                  </IconButton>
                </Tooltip>
                <FavoriteButton combinaison={combinaison} />
                <SelectedScheduleButton combinaison={combinaison} />
              </Typography>
              <Typography className="credits" variant="h6">
                {t("credits", {
                  count: combinaison?.groupes?.reduce(
                    (prev, curr) => prev + curr.cours.credits,
                    0
                  ),
                })}
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
          ))}
      </Grid>
      {combinaisons && combinaisons.length > 0 && Pagination}
    </CombinaisonsWrapper>
  );
}

export default Combinaisons;
