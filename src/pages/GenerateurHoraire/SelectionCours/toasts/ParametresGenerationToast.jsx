import React from 'react';
import { useTranslation } from 'react-i18next';
import useUpdatableToast, { TOAST_INFO } from '../../../../components/Toasts/useUpdatableToast';
import { NOMBRE_MAX_COURS_PAR_HORAIRE } from '../../generateurHoraire.constants';
import useGenerateurHoraire from '../../GenerateurHoraireContexts/hooks/useGenerateurHoraire';

function ParametresGenerationToast({ readyToGenerate }) {
  const { t } = useTranslation('common');
  const {
    coursObligatoire, cours, conges, nombreCours,
  } = useGenerateurHoraire();

  const nombreCoursGeneration = nombreCours
  || Math.min(cours?.length, NOMBRE_MAX_COURS_PAR_HORAIRE);

  const Component = (
    <>
      {`${t('cours')}: ${cours?.join(', ')}`}
      <br />
      {
        (coursObligatoire && coursObligatoire?.length !== 0)
        && (
        <>
            {`${t('coursRequisDansHoraire')}: ${coursObligatoire?.join(', ')}`}
          <br />
        </>
        )
        }
      {`${t('nombreCoursParHoraire')}: ${nombreCours || nombreCoursGeneration} ${t('cours').toLowerCase()}`}
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

  return undefined;
}

export default ParametresGenerationToast;
