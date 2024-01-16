// eslint-disable-next-line import/prefer-default-export
export const getSessionTranslation = (value, t) => {
  const params = { annee: value?.substring(1, value?.length) };
  switch (value?.charAt(0).toLowerCase()) {
    case 'a':
      return t('sessionAutomne', params);
    case 'e':
      return t('sessionEte', params);
    case 'h':
      return t('sessionHiver', params);
    default:
      return undefined;
  }
};

export const getSessionFromCombinaisonUniqueId = (id) => window.atob(id)?.split(':')[0];

const TRIMESTRES = {
  H: 1,
  E: 2,
  A: 3,
};

export const sortSession = (session) => {
  if (session) {
    session.sort((s1, s2) => {
      const s1Trimestre = s1.charAt(0);
      const s1Annee = parseInt(s1.substring(1, s1.length), 10);
      const s2Trimestre = s2.charAt(0);
      const s2Annee = parseInt(s2.substring(1, s2.length), 10);

      if (s1Annee === s2Annee) {
        return TRIMESTRES[s1Trimestre] - TRIMESTRES[s2Trimestre];
      }
      return s1Annee - s2Annee;
    });
  }
};
