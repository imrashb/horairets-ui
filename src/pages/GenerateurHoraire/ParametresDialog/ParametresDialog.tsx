/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  congesAtom,
  nombreCoursAtom,
} from "../../../features/generateur/generateurAtoms";
import {
  JOURS,
  NOMBRE_MAX_COURS_PAR_HORAIRE,
} from "../generateurHoraire.constants";
import useGenerateurHoraire from "../GenerateurHoraireContexts/hooks/useGenerateurHoraire";
import ParametresDialogWrapper from "./ParametresDialog.styles";

interface ParametresDialogProps {
  open: boolean;
  onClose: () => void;
}

function ParametresDialog({
  open,
  onClose,
}: ParametresDialogProps): JSX.Element {
  const { t } = useTranslation("common");

  const nombreCours = useAtomValue(nombreCoursAtom);
  const conges = useAtomValue(congesAtom);

  const [controlledNombreCours, setControlledNombreCours] = useState<
    number | string
  >(nombreCours || 5);
  const [controlledConges, setControlledConges] = useState<string[]>(
    conges || []
  );

  const { setNombreCours, setConges } = useGenerateurHoraire();

  const applyParameters = () => {
    setNombreCours(Number(controlledNombreCours));
    setConges(controlledConges);
    if (onClose) onClose();
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
      <DialogTitle>{t("parametresHoraire")}</DialogTitle>
      <DialogContent>
        <ParametresDialogWrapper>
          <FormControl fullWidth variant="standard">
            <InputLabel>{t("nombreCoursParHoraire")}</InputLabel>
            <Select
              value={controlledNombreCours}
              onChange={(event) =>
                setControlledNombreCours(event?.target?.value)
              }
              label={t("nombreCoursParHoraire")}
            >
              {[...Array(NOMBRE_MAX_COURS_PAR_HORAIRE).keys()].map(
                (value) => (
                  <MenuItem key={value + 1} value={value + 1}>
                    {`${value + 1} ${t("cours").toLowerCase()}`}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="standard">
            <InputLabel>{t("joursConges")}</InputLabel>
            <Select
              multiple
              value={controlledConges}
              onChange={(event) => {
                const val = event?.target?.value;
                setControlledConges(
                  typeof val === "string" ? val.split(",") : val
                );
              }}
            >
              {JOURS.map((conge) => (
                <MenuItem key={conge} value={conge}>
                  {t(conge)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ParametresDialogWrapper>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onClose}>
          {t("annuler")}
        </Button>
        <Button variant="contained" onClick={applyParameters}>
          {t("appliquerParametres")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ParametresDialog;
