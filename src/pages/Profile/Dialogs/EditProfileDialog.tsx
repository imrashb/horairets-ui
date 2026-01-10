import { Edit } from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import ButtonDialog from "../../../components/ButtonDialog/ButtonDialog";
import { UserProfile } from "../../../hooks/firebase/types";
import { TRIMESTRE_IDS, TRIMESTRE_MAP, TrimestreId } from "../../../utils/Sessions.utils";
import { useEditProfile } from "./useEditProfile";

interface EditProfileDialogProps {
  currentProfile?: UserProfile;
}

function EditProfileDialog({ currentProfile }: EditProfileDialogProps): JSX.Element {
  const { t } = useTranslation("common");
  
  const {
      programme, 
      setProgramme,
      trimestreId, 
      setTrimestreId,
      annee, 
      setAnnee,
      handleSave,
      programmesQuery
  } = useEditProfile(currentProfile);

  return (
    <ButtonDialog
      title={t("modifierProfil")}
      icon={<Edit />}
      onClose={handleSave}
    >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <FormControl fullWidth>
            <InputLabel>{t("programmeEtudes")}</InputLabel>
            <Select
              value={programme}
              label={t("programmeEtudes")}
              onChange={(e) => setProgramme(e.target.value)}
            >
              {programmesQuery.data?.map((p) => (
                <MenuItem key={p} value={p}>
                  {t(p)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="subtitle2" color="text.secondary">
            {t("sessionAdmission")}
          </Typography>
          <div style={{ display: "flex", gap: "1rem" }}>
            <FormControl fullWidth>
              <InputLabel>{t("trimestre")}</InputLabel>
              <Select
                value={trimestreId}
                label={t("trimestre")}
                onChange={(e) => setTrimestreId(e.target.value as TrimestreId)}
              >
                {TRIMESTRE_IDS.map((id) => (
                  <MenuItem key={id} value={id}>
                    {t(TRIMESTRE_MAP[id].translationKey)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label={t("annee")}
              type="number"
              value={annee}
              onChange={(e) => setAnnee(e.target.value)}
            />
          </div>
        </div>
    </ButtonDialog>
  );
}

export default EditProfileDialog;
