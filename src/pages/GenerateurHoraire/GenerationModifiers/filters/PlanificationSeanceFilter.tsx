import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { FILTRES_PLANIFICATION } from "../../generateurHoraire.constants";
import useFilters from "./context/useFilters";

function PlanificationSeanceFilter(): JSX.Element {
  const { t } = useTranslation("common");

  const { planification, setPlanification } = useFilters();

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel>{t("planificationSeances")}</InputLabel>
      <Select
        multiple
        value={planification}
        onChange={(e) => {
          setPlanification(e?.target?.value as string[]);
        }}
        label={t("trierPar")}
      >
        {FILTRES_PLANIFICATION.map((value) => (
          <MenuItem key={value} value={value}>
            {t(value)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default PlanificationSeanceFilter;
