import {
  Button, Tooltip, Typography, useMediaQuery, useTheme,
} from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  DisponibiliteMap, FILTRES_PLANIFICATION, Jour, JOURS, Periode,
} from '../../generateurHoraire.constants';
import useFilters from './context/useFilters';

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const GridContainer = styled.div<{ $isMobile: boolean }>`
  display: grid;
  grid-template-columns: auto repeat(7, 1fr);
  gap: ${({ $isMobile }) => ($isMobile ? '2px' : '4px')};
  align-items: center;
`;

const HeaderCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  padding: 4px;
`;

const ToggleButton = styled(Button)<{ $active: boolean; $isMobile: boolean }>`
  min-width: ${({ $isMobile }) => ($isMobile ? '24px' : '32px')} !important;
  width: ${({ $isMobile }) => ($isMobile ? '24px' : '32px')};
  height: ${({ $isMobile }) => ($isMobile ? '24px' : '32px')};
  padding: 0 !important;
  border-radius: 4px !important;
  background-color: ${({ $active, theme }) => ($active ? theme.palette.primary.main : theme.palette.action.hover)} !important;
  color: ${({ $active, theme }) => ($active ? theme.palette.primary.contrastText : theme.palette.text.primary)} !important;
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.palette.primary.light : theme.palette.divider)} !important;

  &:hover {
    opacity: 0.8;
  }
`;

interface DisponibilitesFilterProps {
  value?: DisponibiliteMap;
  onChange?: (value: DisponibiliteMap) => void;
}

function DisponibilitesFilter({ value, onChange }: DisponibilitesFilterProps): JSX.Element {
  const { t } = useTranslation('common');
  const { disponibilites: contextDisponibilites, setDisponibilites: setContextDisponibilites } = useFilters();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Use props if provided, otherwise fallback to context
  const disponibilites = value ?? contextDisponibilites;
  const setDisponibilites = onChange ?? setContextDisponibilites;

  // Toggle a specific cell (Day + Period)
  const toggleCell = (day: Jour, periode: Periode) => {
    const currentPeriodes = disponibilites[day] || [];
    const isActive = currentPeriodes.includes(periode);

    const newPeriodes = isActive
      ? currentPeriodes.filter((p) => p !== periode)
      : [...currentPeriodes, periode];

    setDisponibilites({
      ...disponibilites,
      [day]: newPeriodes,
    });
  };

  // Toggle an entire Day (all periods)
  const toggleDay = (day: Jour) => {
    const currentPeriodes = disponibilites[day] || [];
    // If all periods are active, clear all. Otherwise, set all.
    const allActive = FILTRES_PLANIFICATION.every((p) => currentPeriodes.includes(p as Periode));

    setDisponibilites({
      ...disponibilites,
      [day]: allActive ? [] : [...(FILTRES_PLANIFICATION as Periode[])],
    });
  };

  // Toggle a Period across all Days
  const togglePeriod = (periode: Periode) => {
    // Check if this period is active for ALL days
    const allDaysHavePeriod = JOURS.every((day) => {
      const dayPeriodes = disponibilites[day as Jour] || [];
      return dayPeriodes.includes(periode);
    });

    const newDisponibilites = { ...disponibilites };

    JOURS.forEach((dayKey) => {
      const day = dayKey as Jour;
      const currentPeriodes = newDisponibilites[day] || [];
      const hasPeriod = currentPeriodes.includes(periode);

      if (allDaysHavePeriod) {
        // Remove from all
        newDisponibilites[day] = currentPeriodes.filter((p) => p !== periode);
      } else if (!hasPeriod) {
        // Add to those missing it
        newDisponibilites[day] = [...currentPeriodes, periode];
      }
    });

    setDisponibilites(newDisponibilites);
  };

  const getShortDay = (dayKey: string) => {
    if (isMobile) {
      return t(dayKey).substring(0, 1);
    }
    return t(dayKey).substring(0, 3);
  };

  return (
    <FilterWrapper>
      <Typography variant="body2" color="textSecondary">
        {t('instructionsDisponibilites')}
      </Typography>
      <GridContainer $isMobile={isMobile}>
        <div />

        {JOURS.map((day) => (
          <HeaderCell key={day}>
            <Tooltip title={t('toggleDay')} placement="top">
              <Button
                size="small"
                onClick={() => toggleDay(day as Jour)}
                sx={{
                  minWidth: 'unset',
                  fontWeight: 'bold',
                  fontSize: isMobile ? '0.65rem' : '0.875rem',
                  padding: isMobile ? '2px' : '4px 8px',
                }}
              >
                {getShortDay(day)}
              </Button>
            </Tooltip>
          </HeaderCell>
        ))}

        {FILTRES_PLANIFICATION.map((p) => {
          const periode = p as Periode;
          return (
            <React.Fragment key={periode}>
              <HeaderCell>
                <Tooltip title={t('togglePeriod')} placement="left">
                  <Button
                    size="small"
                    onClick={() => togglePeriod(periode)}
                    sx={{
                      minWidth: 'unset',
                      fontSize: isMobile ? '0.55rem' : '0.75rem',
                      fontWeight: 'bold',
                      padding: isMobile ? '2px' : '4px 8px',
                    }}
                  >
                    {t(periode)}
                  </Button>
                </Tooltip>
              </HeaderCell>

              {JOURS.map((d) => {
                const day = d as Jour;
                const isActive = disponibilites[day]?.includes(periode);
                return (
                  <div
                    key={`${day}-${periode}`}
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <ToggleButton
                      $active={!!isActive}
                      $isMobile={isMobile}
                      variant="contained"
                      disableElevation
                      onClick={() => toggleCell(day, periode)}
                    >
                      {isActive ? (
                        <Check sx={{ fontSize: isMobile ? 14 : 18 }} />
                      ) : (
                        <Close sx={{ fontSize: isMobile ? 14 : 18 }} />
                      )}
                    </ToggleButton>
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
      </GridContainer>
    </FilterWrapper>
  );
}

export default DisponibilitesFilter;
