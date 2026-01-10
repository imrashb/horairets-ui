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
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useTranslation } from "react-i18next";
import withAuth from "../../components/Auth/AuthenticatedComponent";
import { Combinaison } from "../../features/generateur/generateur.types";
import { useGetCombinaisonsFromId } from "../../features/generateur/generateurQueries";
import useFilteredCombinaisons from "../../hooks/useFilteredCombinaisons";
import useFirebaseUserDocument from "../../hooks/useFirebaseUserDocument";
import { HOME_URL } from "../../routes/Routes.constants";
import {
  getSessionTranslation,
  sortSession as sortSessions,
} from "../../utils/Sessions.utils";
import Combinaisons from "../GenerateurHoraire/Combinaisons/Combinaisons";
import GenerationModifiers from "../GenerateurHoraire/GenerationModifiers/GenerationModifiers";
import AucunFavorisDisponible from "./AucunFavorisDisponible/AucunFavorisDisponible";
import FavorisWrapper from "./Favoris.styles";

export interface UserFavoritesData {
  favorites?: Record<string, string[]>;
}

function Favoris(): JSX.Element {
  const { t } = useTranslation("common");

  const document = useFirebaseUserDocument();
  // Cast useDocumentData result
  const [userData, loading] = useDocumentData(document);
  const data = userData as UserFavoritesData | undefined;

  const sessions = useMemo(
    () => (data?.favorites ? Object.keys(data.favorites) : []),
    [data?.favorites]
  );
  sortSessions(sessions);

  const [session, setSession] = useState<string>("");

  useEffect(() => {
    if (sessions && sessions.length > 0) {
      const latestSession = sessions.find(
        (s) => (data?.favorites?.[s]?.length || 0) > 0
      );
      if (latestSession) {
        setSession(latestSession);
      }
    }
  }, [sessions, data]);

  const getCombinaisonsMutation = useGetCombinaisonsFromId();

  // Assuming useFilteredCombinaisons expects Combinaison[] | undefined
  // getCombinaisonsMutation.data is Combinaison[] | undefined
  const filteredCombinaisons = useFilteredCombinaisons(
    getCombinaisonsMutation?.data
  );

  useEffect(() => {
    if (session && data?.favorites?.[session]) {
      getCombinaisonsMutation.mutate(data.favorites[session]);
    }
  }, [session, data]); // Added data dependency or handle it in memo logic

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

      {loading || getCombinaisonsMutation.isPending ? (
        <Backdrop
          open={loading || getCombinaisonsMutation.isPending}
          sx={{ zIndex: 3000 }}
        >
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
                {sessions?.map((s) =>
                  (data?.favorites?.[s]?.length || 0) > 0 ? (
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
