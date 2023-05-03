export const getGroupeId = (sigle, groupe) => `${sigle}-${groupe}`;

export const reduceCombinaisonsInfoToGroupesOnly = (
  combinaisonsInfo,
) => combinaisonsInfo?.reduce((prev, cours) => [
  ...prev, ...cours.groupes.map((g) => getGroupeId(cours.sigle, g)),
], []);
