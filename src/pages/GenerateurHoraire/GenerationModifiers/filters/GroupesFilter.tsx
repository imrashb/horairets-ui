import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { useAtomValue } from "jotai";
import React from "react";
import { useTranslation } from "react-i18next";
import { combinaisonsInfoAtom } from "../../../../features/generateur/generateurAtoms";
import { getGroupeId, CombinaisonInfo } from "../../../../utils/Groupes.utils";
import useFilters from "./context/useFilters";

function GroupesFilter(): JSX.Element | null {
  const { t } = useTranslation("common");

  const { groupes, setGroupes } = useFilters();
  const combinaisonsInfo = useAtomValue(combinaisonsInfoAtom);
  const isVisible = !!(combinaisonsInfo && combinaisonsInfo.length > 0);
  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value;
    setGroupes(typeof value === "string" ? value.split(",") : value);
  };

  const theme = useTheme<Theme>();

  const sortFunction = (a: CombinaisonInfo, b: CombinaisonInfo) => {
    if (a.sigle < b.sigle) {
      return -1;
    }
    if (a.sigle > b.sigle) {
      return 1;
    }
    return 0;
  };

  const sorted = combinaisonsInfo
    ? [...combinaisonsInfo].sort(sortFunction)
    : [];

  if (!isVisible) return null;

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel>{t("groupes")}</InputLabel>
      <Select
        multiple
        value={groupes}
        onChange={handleChange}
        label={t("trierPar")}
        renderValue={(value) =>
          t("groupesSelectionnes", { count: value.length })
        }
      >
        {sorted.map((cours) => [
          <ListSubheader
            key={`header-${cours.sigle}`}
            sx={{ background: theme.palette.grey[100] }}
          >
            {cours.sigle}
          </ListSubheader>,
          ...cours.groupes.map((groupe) => {
            const id = getGroupeId(cours.sigle, String(groupe));
            return (
              <MenuItem key={id} value={id}>
                <Checkbox checked={groupes.includes(id)} />
                <ListItemText primary={id} />
              </MenuItem>
            );
          }),
        ])}
      </Select>
    </FormControl>
  );
}

export default GroupesFilter;
