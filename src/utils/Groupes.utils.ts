export type CombinaisonInfo = {
  sigle: string;
  groupes: (string | number)[];
};

export const getGroupeId = (sigle: string, groupe: string): string =>
  `${sigle}-${groupe}`;

export const reduceCombinaisonsInfoToGroupesOnly = (
  combinaisonsInfo?: CombinaisonInfo[]
): string[] => {
  return (
    combinaisonsInfo?.reduce<string[]>((prev, cours) => {
      const groupes = cours.groupes.map((g) => getGroupeId(cours.sigle, String(g)));
      return [...prev, ...groupes];
    }, []) ?? []
  );
};
