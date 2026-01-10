import { Settings } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonDialog from "../../../components/ButtonDialog/ButtonDialog";
import CongesSelector from "../../../components/Selectors/CongesSelector";
import NombreCoursSelector from "../../../components/Selectors/NombreCoursSelector";
import { SessionConfig } from "../../../hooks/firebase/types";

interface EditSessionConfigDialogProps {
  config: SessionConfig;
  onSave: (config: SessionConfig) => void;
}

export default function EditSessionConfigDialog({
  config,
  onSave,
}: EditSessionConfigDialogProps): JSX.Element {
  const { t } = useTranslation("common");
  const [nombreCours, setNombreCours] = useState(config.nombreCours);
  const [conges, setConges] = useState<string[]>(config.conges);

  useEffect(() => {
    setNombreCours(config.nombreCours);
    setConges(config.conges);
  }, [config]);

  const handleSave = () => {
    onSave({ ...config, nombreCours, conges });
  };

  return (
    <ButtonDialog
      title={t("parametresHoraire")}
      icon={<Settings sx={{ fontSize: 18 }} />}
      isIconButton
      onClose={handleSave}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <NombreCoursSelector value={nombreCours} onChange={setNombreCours} />
        <CongesSelector value={conges} onChange={setConges} />
      </div>
    </ButtonDialog>
  );
}
