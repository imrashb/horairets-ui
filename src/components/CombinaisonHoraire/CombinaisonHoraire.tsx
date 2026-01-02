import { Grid } from "@mui/material";
import { JOURS } from "../../pages/GenerateurHoraire/generateurHoraire.constants";
import CombinaisonHoraireWrapper from "./CombinaisonHoraire.styles";
import {
  HEURE_DEBUT_COURS,
  HEURE_FIN_COURS,
} from "./CombinasonHoraire.constants";
import Jour from "./Jour";

// Redefining types locally for now to match Jour.tsx
// TODO: Centralize these types in a shared types file
interface Horaire {
  jour: string;
  heureDepart: number;
  heureFin: number;
}

interface ActiviteObj {
  horaire: Horaire;
  modeEnseignement: string;
  charges: string[];
  nom: string;
  locaux: string[];
}

interface Cours {
  sigle: string;
  credits: number;
  titre: string;
}

interface Groupe {
  cours: Cours;
  numeroGroupe: string | number;
  activites: ActiviteObj[];
}

interface Combinaison {
  groupes: Groupe[];
  uniqueId: string;
}

interface CombinaisonHoraireProps {
  disableHeures?: boolean;
  disableNomJours?: boolean;
  disableNomCours?: boolean;
  disableNomActivite?: boolean;
  disableLocaux?: boolean;
  disableModeEnseignement?: boolean;
  disableEnseignant?: boolean;
  combinaison: Combinaison;
  forceLegacyColors?: boolean;
}

function CombinaisonHoraire({
  disableHeures = false,
  disableNomJours = false,
  disableNomCours = false,
  disableNomActivite = false,
  disableLocaux = false,
  disableModeEnseignement = true,
  disableEnseignant = true,
  combinaison,
  forceLegacyColors = false,
}: CombinaisonHoraireProps): JSX.Element {
  const jours = JOURS;

  const heures = [...Array(HEURE_FIN_COURS - HEURE_DEBUT_COURS + 1).keys()].map(
    (v) => v + HEURE_DEBUT_COURS
  );

  const getHeureString = (heure: number) =>
    `${String(heure).padStart(2, "0")}:00`;

  return (
    <CombinaisonHoraireWrapper key={combinaison.uniqueId}>
      {!disableHeures && (
        <div className="heures-container">
          {heures.map((v) => (
            <div key={v}>{getHeureString(v)}</div>
          ))}
        </div>
      )}
      <Grid sx={{ height: "100%" }} container columns={{ xs: jours.length }}>
        {jours.map((jour) => (
          <Grid item key={jour} xs={1}>
            <Jour
              key={jour}
              jour={jour}
              combinaison={combinaison}
              disableNomJours={disableNomJours}
              disableNomActivite={disableNomActivite}
              disableNomCours={disableNomCours}
              disableLocaux={disableLocaux}
              disableModeEnseignement={disableModeEnseignement}
              disableEnseignant={disableEnseignant}
              forceLegacyColors={forceLegacyColors}
            />
          </Grid>
        ))}
      </Grid>
    </CombinaisonHoraireWrapper>
  );
}

export default CombinaisonHoraire;
