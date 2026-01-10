import { Edit } from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonDialog from "../../../components/ButtonDialog/ButtonDialog";
import { useGetProgrammes } from "../../../features/generateur/generateurQueries";
import { UpdateOptions, UserProfile } from "../../../hooks/firebase/types";
import { formatSession, parseSession, TRIMESTRE_IDS, TRIMESTRE_MAP, TrimestreId } from "../../../utils/Sessions.utils";

interface EditProfileDialogProps {
  currentProfile?: UserProfile;
  onSave: (profile: UserProfile, options?: UpdateOptions) => Promise<void>;
}

function EditProfileDialog({ currentProfile, onSave }: EditProfileDialogProps): JSX.Element {
  const { t } = useTranslation("common");
  const programmesQuery = useGetProgrammes();

  const [programme, setProgramme] = useState(currentProfile?.programme || "");
  const [trimestreId, setTrimestreId] = useState<TrimestreId>("A");
  const [annee, setAnnee] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    if (currentProfile) {
      setProgramme(currentProfile.programme || "");
      const parsed = parseSession(currentProfile.admissionSession);
      if (!parsed) {
        return;
      }
      setTrimestreId(parsed.trimestreId);
      setAnnee(parsed.annee);
    }
  }, [currentProfile]);

  const handleClose = async () => {
    const admissionSession = formatSession(trimestreId, annee);
    await onSave({
      programme,
      admissionSession,
      sessions: currentProfile?.sessions || {},
    }, {
      showToast: true,
      successMessage: t("profilMisAJour") as string,
      errorMessage: t("erreurMiseAJourProfil") as string,
    });
  };

  return (
    <ButtonDialog
      title={t("modifierProfil")}
      icon={<Edit />}
      onClose={handleClose}
    >
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
    </ButtonDialog>
  );
}

export default EditProfileDialog;
