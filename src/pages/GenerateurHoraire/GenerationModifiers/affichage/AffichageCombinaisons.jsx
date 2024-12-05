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
import { useDispatch, useSelector } from 'react-redux';
import ButtonDialog from '../../../../components/ButtonDialog/ButtonDialog';
import {
  selectShowEnseignant,
  selectShowLocaux,
  selectShowModeEnseignement,
  selectShowNomActivite,
  selectShowNomCoursGroupe,
  selectShowUniqueCoursColors,
  setAffichageCombinaisons,
} from '../../../../features/affichage/affichage.slice';

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
  const dispatch = useDispatch();

  const showNomCoursGroupeGlobal = useSelector(selectShowNomCoursGroupe);
  const showLocauxGlobal = useSelector(selectShowLocaux);
  const showNomActiviteGlobal = useSelector(selectShowNomActivite);
  const showUniqueCoursColorsGlobal = useSelector(selectShowUniqueCoursColors);
  const showModeEnseignementGlobal = useSelector(selectShowModeEnseignement);
  const showEnseignantGlobal = useSelector(selectShowEnseignant);

  const [showNomCoursGroupe, setShowNomCoursGroupe] = useState(showNomCoursGroupeGlobal);
  const [showLocaux, setShowLocaux] = useState(showLocauxGlobal);
  const [showNomActivite, setShowNomActivite] = useState(showNomActiviteGlobal);
  const [showUniqueCoursColors, setShowUniqueCoursColors] = useState(showUniqueCoursColorsGlobal);
  const [showModeEnseignement, setShowModeEnseignement] = useState(showModeEnseignementGlobal);
  const [showEnseignant, setShowEnseignant] = useState(showEnseignantGlobal);

  const onClose = () => {
    dispatch(setAffichageCombinaisons({
      showNomCoursGroupe,
      showLocaux,
      showNomActivite,
      showUniqueCoursColors,
      showModeEnseignement,
      showEnseignant,
    }));
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
