import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { NOMBRE_MAX_COURS_PAR_HORAIRE } from "../../pages/GenerateurHoraire/generateurHoraire.constants";

interface NombreCoursSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export default function NombreCoursSelector({ value, onChange }: NombreCoursSelectorProps): JSX.Element {
  const { t } = useTranslation("common");

  const handleChange = (event: SelectChangeEvent<number>) => {
    onChange(Number(event.target.value));
  };

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel>{t("nombreCoursParHoraire")}</InputLabel>
      <Select
        value={value}
        label={t("nombreCoursParHoraire")}
        onChange={handleChange}
      >
        {[...Array(NOMBRE_MAX_COURS_PAR_HORAIRE).keys()].map((value) => (
          <MenuItem key={value + 1} value={value + 1}>
            {`${value + 1} ${t("cours").toLowerCase()}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
