import { Panorama } from '@mui/icons-material';
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ButtonDialog from '../../../../components/ButtonDialog/ButtonDialog';
import { useDisplayPreferences } from '../../../../hooks/firebase';

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  tooltip?: string;
}

function CheckboxField({
  label, checked, onChange, tooltip,
}: CheckboxFieldProps): JSX.Element {
  return (
    <FormControl>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={() => onChange(!checked)} />}
        label={label}
      />
      {tooltip && <FormHelperText>{tooltip}</FormHelperText>}
    </FormControl>
  );
}

function AffichageCombinaisons(): JSX.Element {
  const { t } = useTranslation('common');
  const { preferences, updatePreferences } = useDisplayPreferences();

  const [showNomCoursGroupe, setShowNomCoursGroupe] = useState(preferences.showNomCoursGroupe);
  const [showLocaux, setShowLocaux] = useState(preferences.showLocaux);
  const [showNomActivite, setShowNomActivite] = useState(preferences.showNomActivite);
  const [showUniqueCoursColors, setShowUniqueCoursColors] = useState(
    preferences.showUniqueCoursColors,
  );
  const [showModeEnseignement, setShowModeEnseignement] = useState(
    preferences.showModeEnseignement,
  );
  const [showEnseignant, setShowEnseignant] = useState(preferences.showEnseignant);

  useEffect(() => {
    setShowNomCoursGroupe(preferences.showNomCoursGroupe);
    setShowLocaux(preferences.showLocaux);
    setShowNomActivite(preferences.showNomActivite);
    setShowUniqueCoursColors(preferences.showUniqueCoursColors);
    setShowModeEnseignement(preferences.showModeEnseignement);
    setShowEnseignant(preferences.showEnseignant);
  }, [preferences]);

  const onClose = async () => {
    await updatePreferences({
      showNomCoursGroupe,
      showLocaux,
      showNomActivite,
      showUniqueCoursColors,
      showModeEnseignement,
      showEnseignant,
    });
    toast.success(t('parametresAffichageAppliques'));
  };

  const checkboxConfigs = [
    {
      label: t('afficherNomCoursGroupe'),
      checked: showNomCoursGroupe,
      onChange: setShowNomCoursGroupe,
    },
    { label: t('afficherLocaux'), checked: showLocaux, onChange: setShowLocaux },
    {
      label: t('afficherTypeActivite'),
      checked: showNomActivite,
      onChange: setShowNomActivite,
      tooltip: t('typesActivites') as string,
    },
    {
      label: t('afficherModeEnseignement'),
      checked: showModeEnseignement,
      onChange: setShowModeEnseignement,
      tooltip: t('modesEnseignements') as string,
    },
    { label: t('afficherEnseignant'), checked: showEnseignant, onChange: setShowEnseignant },
    {
      label: t('afficherCouleursCoursUniques'),
      checked: showUniqueCoursColors,
      onChange: setShowUniqueCoursColors,
    },
  ];

  return (
    <ButtonDialog title={t('affichage')} onClose={onClose} icon={<Panorama />}>
      <Typography component="div">{t('parametresAffichageCombinaisons')}</Typography>
      {checkboxConfigs.map((config) => (
        <CheckboxField key={config.label} {...config} />
      ))}
      <Divider />
    </ButtonDialog>
  );
}

export default AffichageCombinaisons;
