import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useUpdatableToast, { TOAST_ERROR } from '../../../../components/Toasts/useUpdatableToast';
import { selectNombreCours, selectRawCombinaisons } from '../../../../features/generateur/generateur.slice';
import useGenerateurHoraire from '../../GenerateurHoraireContexts/hooks/useGenerateurHoraire';
import useFilteredCombinaisons from '../../../../hooks/useFilteredCombinaisons';

const AUCUN_HORAIRE_TOAST_ID = 'AUCUN_HORAIRE_TOAST_ID';

function GenerationInformationToasts({ readyToGenerate }) {
  const { t } = useTranslation('common');
  const { nombreCours, cours } = useGenerateurHoraire();
  const combinaisons = useFilteredCombinaisons();
  const rawCombinaisons = useSelector(selectRawCombinaisons);
  const currentNombreCours = useSelector(selectNombreCours);

  const coursInferieurToast = useUpdatableToast(t('alerteNombreCoursInferieur', { count: cours?.length, nbCours: nombreCours }), TOAST_ERROR);

  if (!readyToGenerate && nombreCours > cours?.length) {
    coursInferieurToast.play();
  } else {
    coursInferieurToast.stop();
  }

  // Aucun horaire généré
  useEffect(() => {
    if (combinaisons?.length === 0) {
      if (rawCombinaisons?.length > combinaisons?.length) {
        toast.warning(t('aucunHoraireAvecFiltres', { count: rawCombinaisons?.length }), { toastId: AUCUN_HORAIRE_TOAST_ID });
      } else {
        toast.warning(t('conflitEntreCours', { nbCours: currentNombreCours }), { toastId: AUCUN_HORAIRE_TOAST_ID });
      }
    } else {
      toast.dismiss(AUCUN_HORAIRE_TOAST_ID);
    }
  }, [combinaisons, rawCombinaisons]);

  return undefined;
}

export default GenerationInformationToasts;
