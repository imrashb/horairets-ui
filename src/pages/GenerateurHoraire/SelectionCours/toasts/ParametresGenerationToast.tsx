import React from 'react';
import { useTranslation } from 'react-i18next';
import useUpdatableToast, { TOAST_INFO } from '../../../../components/Toasts/useUpdatableToast';
import { NOMBRE_MAX_COURS_PAR_HORAIRE } from '../../generateurHoraire.constants';
import useGenerateurHoraire from '../../GenerateurHoraireContexts/hooks/useGenerateurHoraire';

interface ParametresGenerationToastProps {
  readyToGenerate: boolean;
}

function ParametresGenerationToast({ readyToGenerate }: ParametresGenerationToastProps): null {
  const { t } = useTranslation('common');
  const {
    coursObligatoires, cours, conges, nombreCours,
  } = useGenerateurHoraire();

  const nombreCoursGeneration = nombreCours || Math.min(cours?.length || 0, NOMBRE_MAX_COURS_PAR_HORAIRE);

  const Component = (
    <>
      {`${t('cours')}: ${cours?.join(', ')}`}
      <br />
      {coursObligatoires && coursObligatoires?.length !== 0 && (
        <>
          {`${t('coursRequisDansHoraire')}: ${coursObligatoires?.join(', ')}`}
          <br />
        </>
      )}
      {`${t('nombreCoursParHoraire')}: ${nombreCoursGeneration} ${t('cours').toLowerCase()}`}
      <br />
      {`${t('joursConges')}: ${conges?.map((c) => t(c))?.join(', ') || t('aucun')}`}
    </>
  );

  const toast = useUpdatableToast(Component, TOAST_INFO);

  if (readyToGenerate) {
    toast.play();
  } else {
    toast.stop();
  }

  return null;
}

export default ParametresGenerationToast;
