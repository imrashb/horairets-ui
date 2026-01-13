import { useTranslation } from "react-i18next";
import ActiviteWrapper from "./Activite.styles";

interface ActiviteData {
  sigle: string;
  numeroGroupe: string | number;
  modeEnseignement: string;
  charges: string[];
  nom: string;
  locaux: string[];
}

interface ActiviteProps {
  activite: ActiviteData;
  flex: number;
  borderColor: string;
  color: string;
  disableNomCours?: boolean;
  disableNomActivite?: boolean;
  disableLocaux?: boolean;
  disableModeEnseignement?: boolean;
  disableEnseignant?: boolean;
}

function Activite({
  activite,
  flex,
  borderColor,
  color,
  disableNomCours = false,
  disableNomActivite = false,
  disableLocaux = false,
  disableModeEnseignement = true,
  disableEnseignant = true,
}: ActiviteProps): JSX.Element {
  const { t } = useTranslation("common");
  return (
    <ActiviteWrapper flex={flex} borderColor={borderColor} color={color}>
      <div className="wrapper">
        {!disableNomCours && (
          <span>
            <strong>
              {activite?.sigle}-{activite?.numeroGroupe}
            </strong>
          </span>
        )}
        {!disableModeEnseignement && (
          <span>{t(activite?.modeEnseignement)}</span>
        )}
        {!disableEnseignant && <span>{t(activite?.charges?.join(","))}</span>}
        {!disableNomActivite && <span>{activite?.nom}</span>}
        {!disableLocaux && <span>{activite?.locaux?.join(",")}</span>}
      </div>
    </ActiviteWrapper>
  );
}

export default Activite;
