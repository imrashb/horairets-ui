import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { JOURS } from "../../pages/GenerateurHoraire/generateurHoraire.constants";

interface CongesSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function CongesSelector({ value, onChange }: CongesSelectorProps): JSX.Element {
  const { t } = useTranslation("common");

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const val = event.target.value;
    const newValue = typeof val === "string" ? val.split(",") : val;
    onChange(newValue);
  };

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel>{t("joursConges")}</InputLabel>
      <Select
        multiple
        value={value}
        label={t("joursConges")}
        onChange={handleChange}
      >
        {JOURS.map((conge) => (
          <MenuItem key={conge} value={conge}>
            {t(conge)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
