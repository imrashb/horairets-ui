import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { NOMBRE_MAX_COURS_PAR_HORAIRE } from "../../pages/GenerateurHoraire/generateurHoraire.constants";

interface NombreCoursSelectorProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

export default function NombreCoursSelector({
  value,
  onChange,
}: NombreCoursSelectorProps): JSX.Element {
  const { t } = useTranslation("common");

  const displayValue = value === null ? 0 : value;

  const handleChange = (event: SelectChangeEvent<number | string>) => {
    const val = Number(event.target.value);
    if (val === 0) {
      onChange(null);
    } else {
      onChange(val);
    }
  };

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel>{t("nombreCoursParHoraire")}</InputLabel>
      <Select
        value={displayValue}
        label={t("nombreCoursParHoraire")}
        onChange={handleChange}
      >
        <MenuItem value={0}>
          <em>{t("tousLesCours")}</em>
        </MenuItem>
        {[...Array(NOMBRE_MAX_COURS_PAR_HORAIRE).keys()].map((value) => (
          <MenuItem key={value + 1} value={value + 1}>
            {`${value + 1} ${t("cours").toLowerCase()}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
