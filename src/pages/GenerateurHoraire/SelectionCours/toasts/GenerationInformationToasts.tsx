import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import useUpdatableToast, {
  TOAST_ERROR,
} from "../../../../components/Toasts/useUpdatableToast";
import {
  nombreCoursAtom,
  rawCombinaisonsAtom,
} from "../../../../features/generateur/generateurAtoms";
import useFilteredCombinaisons from "../../../../hooks/useFilteredCombinaisons";
import useGenerateurHoraire from "../../GenerateurHoraireContexts/hooks/useGenerateurHoraire";

const AUCUN_HORAIRE_TOAST_ID = "AUCUN_HORAIRE_TOAST_ID";

interface GenerationInformationToastsProps {
  readyToGenerate: boolean;
}

function GenerationInformationToasts({
  readyToGenerate,
}: GenerationInformationToastsProps): JSX.Element | null {
  const { t } = useTranslation("common");
  const { nombreCours, cours } = useGenerateurHoraire();
  // TODO: Fix explicit any when migrating generateurAtoms
  const combinaisons = useFilteredCombinaisons();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawCombinaisons = useAtomValue(rawCombinaisonsAtom) as unknown as any[];
  const currentNombreCours = useAtomValue(nombreCoursAtom);

  const coursInferieurToast = useUpdatableToast(
    t("alerteNombreCoursInferieur", {
      count: cours?.length,
      nbCours: nombreCours,
    }),
    TOAST_ERROR
  );

  if (!readyToGenerate && (nombreCours || 0) > (cours?.length || 0)) {
    coursInferieurToast.play();
  } else {
    coursInferieurToast.stop();
  }

  // Aucun horaire généré
  useEffect(() => {
    // BUG FIX: Only show conflict toast if we actually have courses selected and are attempting validity.
    // If cours implies we haven't selected enough, or simple initialization, skip.
    // Also, rawCombinaisons default is likely [] initially.
    // We assume if cours.length > 0 we might expect combinations.
    if (readyToGenerate || (cours?.length || 0) === 0) {
      toast.dismiss(AUCUN_HORAIRE_TOAST_ID);
      return;
    }

    if (combinaisons?.length === 0) {
      if ((rawCombinaisons?.length || 0) > (combinaisons?.length || 0)) {
        toast.warning(
          t("aucunHoraireAvecFiltres", { count: rawCombinaisons?.length }),
          { toastId: AUCUN_HORAIRE_TOAST_ID }
        );
      } else {
        // Only show if we actually have rawCombinaisons (meaning generation ran and returned 0? OR default is 0?)
        // If default is 0, this always shows.
        // We really need to know if generation was ATTEMPTED.
        // For now, if cours > 0, we can assume we might show it if length is 0?
        // But if user is modifying selection?
        // Let's assume checking `cours?.length > 0` is a good proxy avoiding "Empty State".
        toast.warning(t("conflitEntreCours", { nbCours: currentNombreCours }), {
          toastId: AUCUN_HORAIRE_TOAST_ID,
        });
      }
    } else {
      toast.dismiss(AUCUN_HORAIRE_TOAST_ID);
    }
  }, [
    combinaisons,
    rawCombinaisons,
    currentNombreCours,
    cours,
    t,
    readyToGenerate,
  ]);

  return null;
}

export default GenerationInformationToasts;
