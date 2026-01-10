/* eslint-disable react-hooks/exhaustive-deps */
import {
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import withAuth from "../../components/Auth/AuthenticatedComponent";
import { useGetCombinaisonsFromId } from "../../features/generateur/generateurQueries";
import { useFavorites } from "../../hooks/firebase";
import useFilteredCombinaisons from "../../hooks/useFilteredCombinaisons";
import { HOME_URL } from "../../routes/Routes.constants";
import {
  getSessionTranslation,
  sortSession as sortSessions,
} from "../../utils/Sessions.utils";
import Combinaisons from "../GenerateurHoraire/Combinaisons/Combinaisons";
import GenerationModifiers from "../GenerateurHoraire/GenerationModifiers/GenerationModifiers";
import AucunFavorisDisponible from "./AucunFavorisDisponible/AucunFavorisDisponible";
import FavorisWrapper from "./Favoris.styles";

function Favoris(): JSX.Element {
  const { t } = useTranslation("common");

  const { favorites, sessions: rawSessions, isLoading, getFavoritesBySession } = useFavorites();

  // Sort sessions for display
  const sessions = useMemo(() => {
    const sorted = [...rawSessions];
    sortSessions(sorted);
    return sorted;
  }, [rawSessions]);

  const [session, setSession] = useState<string>("");

  // Auto-select the first session with favorites
  useEffect(() => {
    if (sessions.length > 0) {
      const latestSession = sessions.find(
        (s) => getFavoritesBySession(s).length > 0
      );
      if (latestSession) {
        setSession(latestSession);
      }
    }
  }, [sessions, getFavoritesBySession]);

  const getCombinaisonsMutation = useGetCombinaisonsFromId();

  const filteredCombinaisons = useFilteredCombinaisons(
    getCombinaisonsMutation?.data
  );

  // Fetch combinaisons when session changes
  useEffect(() => {
    const sessionFavorites = getFavoritesBySession(session);
    if (session && sessionFavorites.length > 0) {
      getCombinaisonsMutation.mutate(sessionFavorites);
    }
  }, [session, favorites]);

  const isPending = isLoading || getCombinaisonsMutation.isPending;

  return (
    <FavorisWrapper>
      <Typography
        className="title"
        color="primary"
        fontWeight={600}
        variant="h2"
      >
        {t("favoris").toUpperCase()}
      </Typography>
      <GenerationModifiers
        title={t("horairesGeneres", { count: filteredCombinaisons?.length || 0 }) as string}
      />

      {isPending ? (
        <Backdrop open={isPending} sx={{ zIndex: 3000 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : undefined}

      {session ? (
        <>
          <div className="control-wrapper">
            <FormControl fullWidth required variant="standard">
              <InputLabel>{t("session")}</InputLabel>
              <Select
                value={session}
                onChange={(e) => setSession(e.target.value as string)}
                label={t("session")}
              >
                {sessions.map((s) =>
                  getFavoritesBySession(s).length > 0 ? (
                    <MenuItem key={s} value={s}>
                      {getSessionTranslation(s, t)}
                    </MenuItem>
                  ) : undefined
                )}
              </Select>
            </FormControl>
          </div>
          {filteredCombinaisons && filteredCombinaisons.length > 0 ? (
            <Combinaisons combinaisons={filteredCombinaisons} />
          ) : (
            <AucunFavorisDisponible />
          )}
        </>
      ) : (
        <AucunFavorisDisponible />
      )}
    </FavorisWrapper>
  );
}

export default withAuth(Favoris, HOME_URL);
