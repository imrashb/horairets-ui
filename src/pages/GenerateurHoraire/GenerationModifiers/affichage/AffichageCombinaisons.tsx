import { Panorama } from "@mui/icons-material";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonDialog from "../../../../components/ButtonDialog/ButtonDialog";
import affichageAtom from "../../../../features/affichage/affichageAtoms";

const getCheckbox = (
  label: string,
  checked: boolean,
  setChecked: (checked: boolean) => void,
  tooltip?: string
) => (
  <FormControl>
    <FormControlLabel
      control={
        <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
      }
      label={label}
    />
    {tooltip && <FormHelperText>{tooltip}</FormHelperText>}
  </FormControl>
);

function AffichageCombinaisons(): JSX.Element {
  const { t } = useTranslation("common");
  const [affichage, setAffichage] = useAtom(affichageAtom);

  const [showNomCoursGroupe, setShowNomCoursGroupe] = useState(
    affichage.showNomCoursGroupe
  );
  const [showLocaux, setShowLocaux] = useState(affichage.showLocaux);
  const [showNomActivite, setShowNomActivite] = useState(
    affichage.showNomActivite
  );
  const [showUniqueCoursColors, setShowUniqueCoursColors] = useState(
    affichage.showUniqueCoursColors
  );
  const [showModeEnseignement, setShowModeEnseignement] = useState(
    affichage.showModeEnseignement
  );
  const [showEnseignant, setShowEnseignant] = useState(
    affichage.showEnseignant
  );

  const onClose = () => {
    setAffichage({
      ...affichage,
      showNomCoursGroupe,
      showLocaux,
      showNomActivite,
      showUniqueCoursColors,
      showModeEnseignement,
      showEnseignant,
    });
  };

  return (
    <ButtonDialog title={t("affichage")} onClose={onClose} icon={<Panorama />}>
      <Typography component="div">
        {t("parametresAffichageCombinaisons")}
      </Typography>
      {getCheckbox(
        t("afficherNomCoursGroupe"),
        showNomCoursGroupe,
        setShowNomCoursGroupe
      )}
      {getCheckbox(t("afficherLocaux"), showLocaux, setShowLocaux)}
      {getCheckbox(
        t("afficherTypeActivite"),
        showNomActivite,
        setShowNomActivite,
        t("typesActivites") as string
      )}
      {getCheckbox(
        t("afficherModeEnseignement"),
        showModeEnseignement,
        setShowModeEnseignement,
        t("modesEnseignements") as string
      )}
      {getCheckbox(t("afficherEnseignant"), showEnseignant, setShowEnseignant)}
      {getCheckbox(
        t("afficherCouleursCoursUniques"),
        showUniqueCoursColors,
        setShowUniqueCoursColors
      )}
      <Divider />
    </ButtonDialog>
  );
}

export default AffichageCombinaisons;
