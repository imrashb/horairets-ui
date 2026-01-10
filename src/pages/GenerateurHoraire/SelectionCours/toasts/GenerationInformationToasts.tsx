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
  const combinaisons = useFilteredCombinaisons();
  const rawCombinaisons = useAtomValue(rawCombinaisonsAtom);
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


  useEffect(() => {
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
