import {
  Button, Tooltip, Typography, useMediaQuery, useTheme,
} from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FILTRES_PLANIFICATION, JOURS } from '../../generateurHoraire.constants';
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

function DisponibilitesFilter(): JSX.Element {
  const { t } = useTranslation('common');
  const { disponibilites, setDisponibilites } = useFilters();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleCell = (dayIndex: number, periodIndex: number) => {
    const newDisp = disponibilites.map((d) => [...d]);
    newDisp[dayIndex][periodIndex] = !newDisp[dayIndex][periodIndex];
    setDisponibilites(newDisp);
  };

  const toggleDay = (dayIndex: number) => {
    const newDisp = disponibilites.map((d) => [...d]);
    const day = newDisp[dayIndex];
    const allActive = day.every((v) => v);
    newDisp[dayIndex] = day.map(() => !allActive);
    setDisponibilites(newDisp);
  };

  const togglePeriod = (periodIndex: number) => {
    const newDisp = disponibilites.map((d) => [...d]);
    const periodValues = newDisp.map((d) => d[periodIndex]);
    const allActive = periodValues.every((v) => v);

    newDisp.forEach((d) => {
      d[periodIndex] = !allActive;
    });
    setDisponibilites(newDisp);
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

        {JOURS.map((day, index) => (
          <HeaderCell key={day}>
            <Tooltip title={t('toggleDay')} placement="top">
              <Button
                size="small"
                onClick={() => toggleDay(index)}
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

        {FILTRES_PLANIFICATION.map((period, periodIndex) => (
          <React.Fragment key={period}>
            <HeaderCell>
              <Tooltip title={t('togglePeriod')} placement="left">
                <Button
                  size="small"
                  onClick={() => togglePeriod(periodIndex)}
                  sx={{
                    minWidth: 'unset',
                    fontSize: isMobile ? '0.55rem' : '0.75rem',
                    fontWeight: 'bold',
                    padding: isMobile ? '2px' : '4px 8px',
                  }}
                >
                  {t(period)}
                </Button>
              </Tooltip>
            </HeaderCell>

            {disponibilites.map((dayDisp, dayIndex) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`${dayIndex}-${periodIndex}`}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <ToggleButton
                  $active={dayDisp[periodIndex]}
                  $isMobile={isMobile}
                  variant="contained"
                  disableElevation
                  onClick={() => toggleCell(dayIndex, periodIndex)}
                >
                  {dayDisp[periodIndex] ? (
                    <Check sx={{ fontSize: isMobile ? 14 : 18 }} />
                  ) : (
                    <Close sx={{ fontSize: isMobile ? 14 : 18 }} />
                  )}
                </ToggleButton>
              </div>
            ))}
          </React.Fragment>
        ))}
      </GridContainer>
    </FilterWrapper>
  );
}

export default DisponibilitesFilter;
