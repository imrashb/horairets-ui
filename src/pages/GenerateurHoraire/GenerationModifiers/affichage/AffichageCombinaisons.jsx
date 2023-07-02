import { Panorama } from '@mui/icons-material';
import {
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ButtonDialog from '../../../../components/ButtonDialog/ButtonDialog';
import {
  selectShowLocaux, selectShowNomActivite, selectShowNomCoursGroupe, setAffichageCombinaisons,
} from '../../../../features/affichage/affichage.slice';

const getCheckbox = (label, checked, setChecked) => (
  <FormControlLabel
    control={(
      <Checkbox
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
)}
    label={label}
  />
);

function AffichageCombinaisons() {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const showNomCoursGroupeGlobal = useSelector(selectShowNomCoursGroupe);
  const showLocauxGlobal = useSelector(selectShowLocaux);
  const showNomActiviteGlobal = useSelector(selectShowNomActivite);

  const [showNomCoursGroupe, setShowNomCoursGroupe] = useState(showNomCoursGroupeGlobal);
  const [showLocaux, setShowLocaux] = useState(showLocauxGlobal);
  const [showNomActivite, setShowNomActivite] = useState(showNomActiviteGlobal);

  const onClose = () => {
    dispatch(setAffichageCombinaisons({
      showNomCoursGroupe,
      showLocaux,
      showNomActivite,
    }));
  };

  return (
    <ButtonDialog title={t('affichage')} onClose={onClose} icon={<Panorama />}>
      <Typography component="div">
        {t('parametresAffichageCombinaisons')}
      </Typography>
      {getCheckbox(t('afficherNomCoursGroupe'), showNomCoursGroupe, setShowNomCoursGroupe)}
      {getCheckbox(t('afficherLocaux'), showLocaux, setShowLocaux)}
      {getCheckbox(t('afficherTypeActivite'), showNomActivite, setShowNomActivite)}
      <Divider />
    </ButtonDialog>
  );
}

export default AffichageCombinaisons;
