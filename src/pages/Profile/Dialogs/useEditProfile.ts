import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useGetProgrammes } from "../../../features/generateur/generateurQueries";
import { UserDocument, UserProfile } from "../../../hooks/firebase/types";
import useUserDocument from "../../../hooks/firebase/useUserDocument";
import { formatSession, parseSession, TrimestreId } from "../../../utils/Sessions.utils";

export function useEditProfile(currentProfile?: UserProfile) {
  const { t } = useTranslation("common");
  const programmesQuery = useGetProgrammes();
  const { updateDocument } = useUserDocument<UserDocument>();

  const [programme, setProgramme] = useState(currentProfile?.programme || "");
  const [trimestreId, setTrimestreId] = useState<TrimestreId>("A");
  const [annee, setAnnee] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    if (currentProfile) {
      setProgramme(currentProfile.programme || "");
      const parsed = parseSession(currentProfile.admissionSession);
      if (!parsed) {
        return;
      }
      setTrimestreId(parsed.trimestreId);
      setAnnee(parsed.annee);
    }
  }, [currentProfile]);

  const handleSave = async () => {
    const admissionSession = formatSession(trimestreId, annee);
    await updateDocument({
      profile: {
        programme,
        admissionSession,
        sessions: currentProfile?.sessions || {},
      }
    }, {
      showToast: true,
      successMessage: t("profilMisAJour") as string,
      errorMessage: t("erreurMiseAJourProfil") as string,
    });
  };

  return {
    programme,
    setProgramme,
    trimestreId,
    setTrimestreId,
    annee,
    setAnnee,
    handleSave,
    programmesQuery,
  };
}
