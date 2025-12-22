import { Panorama } from '@mui/icons-material';
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAtomValue, useSetAtom } from 'jotai';
import ButtonDialog from '../../../../components/ButtonDialog/ButtonDialog';
import {
  showEnseignantAtom,
  showLocauxAtom,
  showModeEnseignementAtom,
  showNomActiviteAtom,
  showNomCoursGroupeAtom,
  showUniqueCoursColorsAtom,
  setAffichageCombinaisonsAtom,
} from '../../../../features/affichage/affichageAtoms';

const getCheckbox = (label, checked, setChecked, tooltip) => (
  <FormControl>
    <FormControlLabel
      control={(
        <Checkbox
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      )}
      label={label}
    />
    {tooltip && (
      <FormHelperText>
        {tooltip}
      </FormHelperText>
    )}
  </FormControl>
);

function AffichageCombinaisons() {
  const { t } = useTranslation('common');
  const setAffichageCombinaisons = useSetAtom(setAffichageCombinaisonsAtom);

  const showNomCoursGroupeGlobal = useAtomValue(showNomCoursGroupeAtom);
  const showLocauxGlobal = useAtomValue(showLocauxAtom);
  const showNomActiviteGlobal = useAtomValue(showNomActiviteAtom);
  const showUniqueCoursColorsGlobal = useAtomValue(showUniqueCoursColorsAtom);
  const showModeEnseignementGlobal = useAtomValue(showModeEnseignementAtom);
  const showEnseignantGlobal = useAtomValue(showEnseignantAtom);

  const [showNomCoursGroupe, setShowNomCoursGroupe] = useState(showNomCoursGroupeGlobal);
  const [showLocaux, setShowLocaux] = useState(showLocauxGlobal);
  const [showNomActivite, setShowNomActivite] = useState(showNomActiviteGlobal);
  const [showUniqueCoursColors, setShowUniqueCoursColors] = useState(showUniqueCoursColorsGlobal);
  const [showModeEnseignement, setShowModeEnseignement] = useState(showModeEnseignementGlobal);
  const [showEnseignant, setShowEnseignant] = useState(showEnseignantGlobal);

  const onClose = () => {
    setAffichageCombinaisons({
      showNomCoursGroupe,
      showLocaux,
      showNomActivite,
      showUniqueCoursColors,
      showModeEnseignement,
      showEnseignant,
    });
  };

  return (
    <ButtonDialog title={t('affichage')} onClose={onClose} icon={<Panorama />}>
      <Typography component="div">
        {t('parametresAffichageCombinaisons')}
      </Typography>
      {getCheckbox(t('afficherNomCoursGroupe'), showNomCoursGroupe, setShowNomCoursGroupe)}
      {getCheckbox(t('afficherLocaux'), showLocaux, setShowLocaux)}
      {getCheckbox(t('afficherTypeActivite'), showNomActivite, setShowNomActivite, t('typesActivites'))}
      {getCheckbox(t('afficherModeEnseignement'), showModeEnseignement, setShowModeEnseignement, t('modesEnseignements'))}
      {getCheckbox(t('afficherEnseignant'), showEnseignant, setShowEnseignant)}
      {getCheckbox(t('afficherCouleursCoursUniques'), showUniqueCoursColors, setShowUniqueCoursColors)}
      <Divider />
    </ButtonDialog>
  );
}

export default AffichageCombinaisons;
