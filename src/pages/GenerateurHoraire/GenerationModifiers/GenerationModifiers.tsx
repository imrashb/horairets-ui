import { useTheme } from "@emotion/react";
import { GridView, ViewList } from "@mui/icons-material";
import {
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  GENERATEUR_GRID_VIEW,
  GENERATEUR_LIST_VIEW,
} from "../../../features/generateur/generateur.constants";
import { viewAtom } from "../../../features/generateur/generateurAtoms";
import AffichageCombinaisons from "./affichage/AffichageCombinaisons";
import FiltersProvider from "./filters/context/FiltersProvider";
import GenerationFilters from "./filters/GenerationFilters";
import GenerationModifiersWrapper from "./GenerationModifiers.styles";
import GenerationSorting from "./GenerationSorting";

interface GenerationModifiersProps {
  title?: string;
}

function GenerationModifiers({
  title,
}: GenerationModifiersProps): JSX.Element {
  const { t } = useTranslation("common");
  const [view, setView] = useAtom(viewAtom);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    value: string | null
  ) => {
    if (value) setView(value);
  };

  const theme = useTheme() as Theme;
  const isLargeViewport = useMediaQuery(theme.breakpoints.up("lg"));
  useEffect(() => {
    if (!isLargeViewport) {
      setView(GENERATEUR_LIST_VIEW);
    }
  }, [isLargeViewport, setView]);

  return (
    <GenerationModifiersWrapper>
      {isLargeViewport && (
        <ToggleButtonGroup
          className="views-wrapper"
          value={view}
          exclusive
          onChange={handleAlignment}
        >
          <ToggleButton value={GENERATEUR_LIST_VIEW} size="small">
            <Tooltip title={t("affichageListe")}>
              <ViewList />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value={GENERATEUR_GRID_VIEW} size="small">
            <Tooltip title={t("affichageGrille")}>
              <GridView />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      )}
      <GenerationSorting />
      <FiltersProvider>
        <GenerationFilters />
      </FiltersProvider>
      <AffichageCombinaisons />

      {title && (
        <Typography className="nb-horaires-generes" variant="h5">
          {title}
        </Typography>
      )}
    </GenerationModifiersWrapper>
  );
}

export default GenerationModifiers;
