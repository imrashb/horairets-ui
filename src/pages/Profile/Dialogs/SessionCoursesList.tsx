import { Lock, LockOpen, Warning } from '@mui/icons-material';
import { Chip, Tooltip } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Cours } from '../../../features/generateur/generateur.types';
import { SessionConfig } from '../../../hooks/firebase/types';
import { fadeInOutAnimation } from '../../../utils/animations';
import AddCourseAutocomplete from './AddCourseAutocomplete';
import { CourseSection, CoursesContainer, EmptyState, SectionLabel } from './SessionCard.styles';

interface SessionCoursesListProps {
  config: SessionConfig;
  allCours: Cours[];
  isCoursLoading?: boolean;
  onAddCourse: (sigle: string) => void;
  onRemoveCourse: (sigle: string) => void;
  onToggleLock: (sigle: string) => void;
}

function SessionCoursesList({
  config,
  allCours,
  isCoursLoading = false,
  onAddCourse,
  onRemoveCourse,
  onToggleLock,
}: SessionCoursesListProps): JSX.Element {
  const { t } = useTranslation('common');

  const isCourseInvalid = (sigle: string) => {
    // If we are loading, or if no courses are available yet, we assume valid to prevent flashing errors
    if (isCoursLoading || allCours.length === 0) return false;
    return !allCours.some((c) => c.sigle === sigle);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <CourseSection>
        <SectionLabel variant="caption">
          <Lock sx={{ fontSize: 12 }} />
          {t('coursObligatoires')}
        </SectionLabel>
        <CoursesContainer>
          <AnimatePresence>
            {config.coursObligatoires.map((sigle) => {
              const isInvalid = isCourseInvalid(sigle);
              return (
                <motion.div key={`locked-${sigle}`} layout {...fadeInOutAnimation}>
                  <Tooltip title={isInvalid ? t('coursInvalide') : ''}>
                    <Chip
                      label={sigle}
                      icon={isInvalid ? <Warning /> : <Lock />}
                      onClick={() => onToggleLock(sigle)}
                      onDelete={() => onRemoveCourse(sigle)}
                      color={isInvalid ? 'error' : 'secondary'}
                      size="small"
                    />
                  </Tooltip>
                </motion.div>
              );
            })}
            {config.coursObligatoires.length === 0 && (
              <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <EmptyState style={{ fontSize: '0.75rem' }}>{t('aucunCoursObligatoire')}</EmptyState>
              </motion.div>
            )}
          </AnimatePresence>
        </CoursesContainer>
      </CourseSection>

      <CourseSection>
        <SectionLabel variant="caption">
          <LockOpen sx={{ fontSize: 12 }} />
          {t('coursVariables')}
        </SectionLabel>
        <CoursesContainer>
          <AnimatePresence>
            {config.cours
              .filter((c) => !config.coursObligatoires.includes(c))
              .map((sigle) => {
                const isInvalid = isCourseInvalid(sigle);
                return (
                  <motion.div key={`unlocked-${sigle}`} layout {...fadeInOutAnimation}>
                    <Tooltip title={isInvalid ? t('coursInvalide') : ''}>
                      <Chip
                        label={sigle}
                        icon={isInvalid ? <Warning /> : <LockOpen />}
                        onClick={() => onToggleLock(sigle)}
                        onDelete={() => onRemoveCourse(sigle)}
                        variant={isInvalid ? 'filled' : 'outlined'}
                        color={isInvalid ? 'error' : 'primary'}
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
            onAddCourse={onAddCourse}
          />
        </CoursesContainer>
      </CourseSection>
    </div>
  );
}

export default SessionCoursesList;
