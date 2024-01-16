import React, { useEffect, useMemo, useState } from 'react';
import {
  Backdrop, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import FavorisWrapper from './Favoris.styles';
import withAuth from '../../components/Auth/AuthenticatedComponent';
import { HOME_URL } from '../../routes/Routes.constants';
import GenerationModifiers from '../GenerateurHoraire/GenerationModifiers/GenerationModifiers';
import Combinaisons from '../GenerateurHoraire/Combinaisons/Combinaisons';
import useFirebaseUserDocument from '../../hooks/useFirebaseUserDocument';
import { getSessionTranslation, sortSession as sortSessions } from '../../utils/Sessions.utils';
import { useLazyGetCombinaisonsFromIdQuery } from '../../features/generateur/generateur.api';
import AucunFavorisDisponible from './AucunFavorisDisponible/AucunFavorisDisponible';
import useFilteredCombinaisons from '../../hooks/useFilteredCombinaisons';

function Favoris() {
  const { t } = useTranslation('common');

  const document = useFirebaseUserDocument();
  const [userData, loading] = useDocumentData(document);
  const sessions = useMemo(() => (
    userData?.favorites ? Object.keys(userData?.favorites) : []
  ), [userData?.favorites]);
  sortSessions(sessions);

  const [session, setSession] = useState('');

  useEffect(() => {
    if (sessions && sessions?.length > 0) {
      const latestSession = sessions.find((s) => userData?.favorites[s]?.length > 0);
      setSession(latestSession);
    }
  }, [sessions]);

  const [trigger, query] = useLazyGetCombinaisonsFromIdQuery();

  const filteredCombinaisons = useFilteredCombinaisons(query?.data);

  useEffect(() => {
    if (session) {
      trigger(userData?.favorites[session]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <FavorisWrapper>
      <Typography className="title" color="primary" fontWeight={600} variant="h2">{t('favoris').toUpperCase()}</Typography>
      <GenerationModifiers title={t('horairesGeneres', { count: filteredCombinaisons?.length })} />

      {(loading || query?.isFetching) ? (
        <Backdrop
          open={loading || query?.isFetching}
          sx={{ zIndex: 3000 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : undefined}

      {session ? (
        <>
          <div className="control-wrapper">
            <FormControl fullWidth required variant="standard">

              <InputLabel>{t('session')}</InputLabel>
              <Select
                value={session}
                onChange={(e) => setSession(e?.target?.value)}
                label={t('session')}
              >
                {sessions?.map((s) => (
                  userData?.favorites[s]?.length > 0
                    ? (
                      <MenuItem key={s} value={s}>
                        {getSessionTranslation(s, t)}
                      </MenuItem>
                    ) : undefined
                ))}
              </Select>
            </FormControl>
          </div>
          {filteredCombinaisons?.length > 0 ? <Combinaisons combinaisons={filteredCombinaisons} />
            : <AucunFavorisDisponible />}
        </>
      )
        : <AucunFavorisDisponible />}
    </FavorisWrapper>
  );
}

export default withAuth(Favoris, HOME_URL);
