import { CalendarMonth, Delete, Lock, LockOpen, Warning } from '@mui/icons-material';
import { Chip, IconButton, Tooltip, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useSetAtom } from 'jotai';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { activeGenerateurConfigAtom, formGenerateurConfigAtom, programmesAtom, sessionAtom } from '../../../features/generateur/generateurAtoms';
import { Cours } from '../../../features/generateur/generateur.types';
import { SessionConfig } from '../../../hooks/firebase/types';
import { GENERATEUR_HORAIRE_URL } from '../../../routes/Routes.constants';
import { fadeInOutAnimation } from '../../../utils/animations';
import { calculateCreditsRange } from '../../../utils/credits.utils';
import { getSessionTranslation } from '../../../utils/Sessions.utils';
import AddCourseAutocomplete from './AddCourseAutocomplete';
import EditSessionConfigDialog from './EditSessionConfigDialog';
import SessionStatsChips from './SessionStatsChips';
import { CardHeader, CardWrapper, CoursesContainer, DeleteButton, EmptyState } from './SessionCard.styles';

interface SessionCardProps {
  session: string;
  config: SessionConfig;
  allCours: Cours[];
  programme?: string;
  isCoursLoading?: boolean;
  onUpdateConfig: (config: SessionConfig) => void;
  onDeleteSession: () => void;
}

function SessionCard({
  session,
  config,
  allCours,
  programme,
  isCoursLoading = false,
  onUpdateConfig,
  onDeleteSession,
}: SessionCardProps): JSX.Element {
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const setSession = useSetAtom(sessionAtom);
  const setProgrammes = useSetAtom(programmesAtom);
  const setFormConfig = useSetAtom(formGenerateurConfigAtom);
  const setActiveConfig = useSetAtom(activeGenerateurConfigAtom);

  const creditsRange = useMemo(
    () => calculateCreditsRange(allCours, config),
    [allCours, config]
  );

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

  const handleAddCourse = (sigle: string) => {
    onUpdateConfig({
      ...config,
      cours: [...config.cours, sigle],
    });
  };

  const handleRemoveCourse = (sigle: string) => {
    onUpdateConfig({
      ...config,
      cours: config.cours.filter((c) => c !== sigle),
      coursObligatoires: config.coursObligatoires.filter((c) => c !== sigle),
    });
  };

  const handleToggleLock = (sigle: string) => {
    const isLocked = config.coursObligatoires.includes(sigle);
    onUpdateConfig({
      ...config,
      coursObligatoires: isLocked
        ? config.coursObligatoires.filter((c) => c !== sigle)
        : [...config.coursObligatoires, sigle],
    });
  };

  const hasWarning = config.nombreCours !== null && config.cours.length < config.nombreCours;
  const canExport = config.cours.length > 0;

  return (
    <CardWrapper>
      <CardHeader>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {getSessionTranslation(session, t) || session}
            </Typography>
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
          <EditSessionConfigDialog config={config} onSave={onUpdateConfig} />
          <DeleteButton size="small" onClick={onDeleteSession}>
            <Delete sx={{ fontSize: 18 }} />
          </DeleteButton>
        </div>
      </CardHeader>

      <CoursesContainer>
        {config.cours.length === 0 && <EmptyState>{t('aucunCoursPlanifie')}</EmptyState>}

        <AnimatePresence>
          {config.cours.map((sigle) => {
            const isLocked = config.coursObligatoires.includes(sigle);
            return (
              <motion.div key={sigle} layout {...fadeInOutAnimation}>
                <Tooltip title={isLocked ? t('coursObligatoire') : t('coursOptionnel')}>
                  <Chip
                    label={sigle}
                    icon={isLocked ? <Lock /> : <LockOpen />}
                    onClick={() => handleToggleLock(sigle)}
                    onDelete={() => handleRemoveCourse(sigle)}
                    color={isLocked ? 'secondary' : 'primary'}
                    size="small"
                  />
                </Tooltip>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <AddCourseAutocomplete
          allCours={allCours}
          isLoading={isCoursLoading}
          existingCourses={config.cours}
          onAddCourse={handleAddCourse}
        />
      </CoursesContainer>
    </CardWrapper>
  );
}

export default SessionCard;

