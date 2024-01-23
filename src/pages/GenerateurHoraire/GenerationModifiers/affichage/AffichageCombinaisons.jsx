import { Panorama } from '@mui/icons-material';
import {
  Checkbox, Divider, FormControl, FormControlLabel, FormHelperText, Typography,
} from '@mui/material';
import React, { useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ButtonDialog from '../../../../components/ButtonDialog/ButtonDialog';
import {
  affichageInitialState,
  selectAffichage,
  setAffichageCombinaisons,
} from '../../../../features/affichage/affichage.slice';
import useDocumentValue from '../../../../hooks/firebase/useDocumentValue';

const getCheckbox = (label, state, dispatch, key, tooltip) => {
  const checked = state[key];
  return (
    <FormControl>
      <FormControlLabel
        control={(
          <Checkbox
            checked={checked}
            onChange={() => dispatch({
              [key]: !checked,
            })}
          />
        )}
        label={label}
      />
      {tooltip && <FormHelperText>{tooltip}</FormHelperText>}
    </FormControl>
  );
};

function AffichageCombinaisons() {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const { data, update } = useDocumentValue('affichage.combinaisons', { initialArgs: affichageInitialState });
  const affichageGlobal = useSelector(selectAffichage);
  const [state, localDispatch] = useReducer((oldState, newState) => (
    { ...oldState, ...newState }), affichageGlobal);

  useEffect(() => {
    if (affichageGlobal) {
      localDispatch(affichageGlobal);
    }
  }, [affichageGlobal]);

  useEffect(() => {
    if (data) dispatch(setAffichageCombinaisons(data));
  }, [data]);

  const onClose = () => {
    dispatch(setAffichageCombinaisons(state));
    update(state);
  };

  return (
    <ButtonDialog title={t('affichage')} onClose={onClose} icon={<Panorama />}>
      <Typography component="div">{t('parametresAffichageCombinaisons')}</Typography>
      {getCheckbox(t('afficherNomCoursGroupe'), state, localDispatch, 'showNomCoursGroupe')}
      {getCheckbox(t('afficherLocaux'), state, localDispatch, 'showLocaux')}
      {getCheckbox(t('afficherTypeActivite'), state, localDispatch, 'showNomActivite', t('typesActivites'))}
      {getCheckbox(t('afficherCharges'), state, localDispatch, 'showCharges')}
      {getCheckbox(
        t('afficherModeEnseignement'),
        state,
        localDispatch,
        'showModeEnseignement',
        t('modesEnseignements'),
      )}
      {getCheckbox(t('afficherCouleursCoursUniques'), state, localDispatch, 'showUniqueCoursColors')}
      <Divider />
    </ButtonDialog>
  );
}

export default AffichageCombinaisons;
