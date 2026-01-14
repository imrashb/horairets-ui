import { CalendarMonth, Delete, Warning } from '@mui/icons-material';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { useSetAtom } from 'jotai';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSessionCourses } from '../hooks/useSessionCourses';
import {
  activeGenerateurConfigAtom,
  formGenerateurConfigAtom,
  programmesAtom,
  sessionAtom,
} from '../../../../features/generateur/generateurAtoms';
import { SessionConfig } from '../../../../hooks/firebase/types';
import { GENERATEUR_HORAIRE_URL } from '../../../../routes/Routes.constants';
import { calculateCreditsRange } from '../../../../utils/credits.utils';
import { getSessionTranslation } from '../../../../utils/Sessions.utils';
import EditSessionConfigDialog from './EditSessionConfigDialog';
import SessionStatsChips from './SessionStatsChips';
import SessionCoursesList from './SessionCoursesList';
import ViewSelectedScheduleButton from './ViewSelectedScheduleButton';
import { BaseCard } from '../../../../components/Cards/BaseCard';
import { CardHeader, DeleteButton } from './SessionCard.styles';
import { usePlannedCourses } from '../PlannedCoursesContext';

interface SessionCardProps {
  session: string;
}

function SessionCard({ session }: SessionCardProps): JSX.Element {
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const {
    programme,
    localSessions,
    onUpdateSessionConfig,
    onDeleteSession,
  } = usePlannedCourses();

  const config = localSessions[session];
  const {
    allCours, isCoursLoading, isSessionAvailable, isLoadingSessions,
  } = useSessionCourses(
    session,
    programme,
  );

  const setSession = useSetAtom(sessionAtom);
  const setProgrammes = useSetAtom(programmesAtom);
  const setFormConfig = useSetAtom(formGenerateurConfigAtom);
  const setActiveConfig = useSetAtom(activeGenerateurConfigAtom);

  const creditsRange = useMemo(() => {
    if (!config) return { min: 0, max: 0 };
    return calculateCreditsRange(allCours, config);
  }, [allCours, config]);

  if (!config) return <></>;

  const handleExportToGenerator = () => {
    const generatorConfig = {
      cours: config.cours,
      coursObligatoires: config.coursObligatoires,
      conges: config.conges,
      nombreCours: config.nombreCours,
      session,
      programmes: programme ? [programme] : [],
    };
    setSession(session);
    setProgrammes(programme ? [programme] : []);
    setFormConfig(generatorConfig);
    setActiveConfig(generatorConfig);
    navigate(GENERATEUR_HORAIRE_URL);
  };

  const handleUpdateConfig = (newConfig: SessionConfig) => {
    onUpdateSessionConfig(session, newConfig);
  };

  const handleAddCourse = (sigle: string) => {
    handleUpdateConfig({
      ...config,
      cours: [...config.cours, sigle],
    });
  };

  const handleRemoveCourse = (sigle: string) => {
    handleUpdateConfig({
      ...config,
      cours: config.cours.filter((c) => c !== sigle),
      coursObligatoires: config.coursObligatoires.filter((c) => c !== sigle),
    });
  };

  const handleToggleLock = (sigle: string) => {
    const isLocked = config.coursObligatoires.includes(sigle);
    handleUpdateConfig({
      ...config,
      coursObligatoires: isLocked
        ? config.coursObligatoires.filter((c) => c !== sigle)
        : [...config.coursObligatoires, sigle],
    });
  };

  const hasWarning = config.nombreCours !== null && config.cours.length < config.nombreCours;
  const canExport = config.cours.length > 0;

  return (
    <BaseCard>
      <CardHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {getSessionTranslation(session, t) || session}
            </Typography>
            <ViewSelectedScheduleButton session={session} />
            {!isSessionAvailable && !isLoadingSessions && (
              <Tooltip title={t('sessionInvalideWarning')}>
                <Warning color="warning" sx={{ fontSize: 20 }} />
              </Tooltip>
            )}
            {hasWarning && (
              <Tooltip
                title={t('alerteNombreCoursInferieur', {
                  nbCours: config.nombreCours,
                  count: config.cours.length,
                })}
              >
                <Warning color="warning" sx={{ fontSize: 20 }} />
              </Tooltip>
            )}
          </div>
          <SessionStatsChips config={config} creditsRange={creditsRange} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Tooltip title={t('exporterAuGenerateur')}>
            <span>
              <IconButton
                size="small"
                onClick={handleExportToGenerator}
                disabled={!canExport}
                sx={{
                  bgcolor: canExport ? 'primary.main' : undefined,
                  color: canExport ? 'primary.contrastText' : undefined,
                  '&:hover': {
                    bgcolor: canExport ? 'primary.dark' : undefined,
                  },
                  '&.Mui-disabled': {
                    bgcolor: 'action.disabledBackground',
                  },
                }}
              >
                <CalendarMonth sx={{ fontSize: 18 }} />
              </IconButton>
            </span>
          </Tooltip>
          <EditSessionConfigDialog config={config} onSave={handleUpdateConfig} />
          <DeleteButton size="small" onClick={() => onDeleteSession(session)}>
            <Delete sx={{ fontSize: 18 }} />
          </DeleteButton>
        </div>
      </CardHeader>

      <SessionCoursesList
        config={config}
        allCours={allCours}
        isCoursLoading={isCoursLoading}
        onAddCourse={handleAddCourse}
        onRemoveCourse={handleRemoveCourse}
        onToggleLock={handleToggleLock}
      />
    </BaseCard>
  );
}

export default SessionCard;
