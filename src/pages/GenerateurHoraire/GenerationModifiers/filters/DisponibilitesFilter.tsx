import { Button, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FILTRES_PLANIFICATION, JOURS } from "../../generateurHoraire.constants";
import useFilters from "./context/useFilters";

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto repeat(7, 1fr);
  gap: 4px;
  align-items: center;
`;

const HeaderCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  padding: 4px;
`;

const ToggleButton = styled(Button)<{ $active: boolean }>`
  min-width: 32px !important;
  height: 32px;
  padding: 0 !important;
  border-radius: 4px !important;
  background-color: ${({ $active, theme }) =>
    $active ? theme.palette.primary.main : theme.palette.action.hover} !important;
  color: ${({ $active, theme }) =>
    $active ? theme.palette.primary.contrastText : theme.palette.text.primary} !important;
  border: 1px solid ${({ $active, theme }) => 
    $active ? theme.palette.primary.light : theme.palette.divider} !important;
  
  &:hover {
    opacity: 0.8;
  }
`;

function DisponibilitesFilter(): JSX.Element {
  const { t } = useTranslation("common");
  const { disponibilites, setDisponibilites } = useFilters();

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

  // Short day names. Usually t("dimanche") returns "Dimanche". We can slice(0,3) or add short keys.
  // Using slice(0,3) is quick and easy for French/English.
  const getShortDay = (dayKey: string) => t(dayKey).substring(0, 3);

  return (
    <FilterWrapper>
      <Typography variant="body2" color="textSecondary">
        {t("instructionsDisponibilites")}
      </Typography>
      <GridContainer>
        {/* Top-Left Empty Cell or "All" toggle */}
        <div />

        {/* Day Headers */}
        {JOURS.map((day, index) => (
          <HeaderCell key={day}>
            <Tooltip title={t("toggleDay") || "Toggle Day"} placement="top">
              <Button 
                size="small" 
                onClick={() => toggleDay(index)}
                sx={{ minWidth: 'unset', fontWeight: 'bold' }}
              >
                {getShortDay(day)}
              </Button>
            </Tooltip>
          </HeaderCell>
        ))}

        {/* Rows */}
        {FILTRES_PLANIFICATION.map((period, periodIndex) => (
          <React.Fragment key={period}>
            {/* Period Header */}
            <HeaderCell>
               <Tooltip title={t("togglePeriod") || "Toggle Period"} placement="left">
                <Button 
                  size="small" 
                  onClick={() => togglePeriod(periodIndex)}
                  sx={{ minWidth: 'unset', fontSize: '0.75rem' }}
                >
                  {t(period)}
                </Button>
              </Tooltip>
            </HeaderCell>

            {/* Cells */}
            {disponibilites.map((dayDisp, dayIndex) => (
              <div key={`${dayIndex}-${periodIndex}`} style={{ display: 'flex', justifyContent: 'center' }}>
                <ToggleButton
                  $active={dayDisp[periodIndex]}
                  variant="contained"
                  disableElevation
                  onClick={() => toggleCell(dayIndex, periodIndex)}
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </GridContainer>
    </FilterWrapper>
  );
}

export default DisponibilitesFilter;
