import { EditCalendar, School, WorkHistory } from '@mui/icons-material';
import { Chip, Stack } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SessionConfig } from '../../../../hooks/firebase/types';
import { CreditsRange } from '../../../../utils/credits.utils';
import { isCustomDisponibilites } from '../../../../utils/Disponibilites.utils';

interface SessionStatsChipsProps {
  config: SessionConfig;
  creditsRange: CreditsRange;
}

export default function SessionStatsChips({
  config,
  creditsRange,
}: SessionStatsChipsProps): JSX.Element {
  const { t } = useTranslation('common');

  const creditsLabel = creditsRange.min === creditsRange.max
    ? t('credits', { count: creditsRange.min })
    : t('creditsRange', { min: creditsRange.min, max: creditsRange.max });

  const stats = [
    {
      key: 'cours',
      label: t('nbCoursParHoraire', {
        count: config.nombreCours ?? config.cours.length,
      }),
      Icon: School,
      visible: true,
    },
    {
      key: 'credits',
      label: creditsLabel,
      Icon: WorkHistory,
      visible: creditsRange.max > 0,
    },
    {
      key: 'disponibilites',
      label: t('disponibilitesPersonnalisees'),
      Icon: EditCalendar,
      visible: isCustomDisponibilites(config.disponibilites),
    },
  ];

  return (
    <Stack
      direction="row"
      alignItems="center"
      mt={0.5}
      sx={{ flexWrap: 'wrap', gap: 1, rowGap: 0.5 }}
    >
      {stats
        .filter((stat) => stat.visible)
        .map((stat) => {
          const { Icon } = stat;
          return (
            <Chip
              key={stat.key}
              label={stat.label}
              icon={<Icon sx={{ fontSize: '16px !important' }} />}
              size="small"
              variant="outlined"
              sx={{ height: 24, fontSize: '0.75rem' }}
            />
          );
        })}
    </Stack>
  );
}
