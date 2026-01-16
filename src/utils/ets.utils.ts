const ETS_COURSE_URL_BASE = 'https://www.etsmtl.ca/etudes/cours';
const PLANETS_PDF_URL_BASE = 'https://planets.etsmtl.ca/public/Versionpdf.aspx';

const SESSION_SUFFIX_MAP: Record<string, string> = {
  H: '1', // Hiver (Winter)
  E: '2', // Été (Summer)
  A: '3', // Automne (Fall)
};

function transformSessionToPlanetsFormat(session: string): string {
  const prefix = session.charAt(0).toUpperCase();
  const year = session.slice(1);
  const suffix = SESSION_SUFFIX_MAP[prefix] || '1';
  return `${year}${suffix}`;
}

export function getEtsCourseUrl(sigle: string): string {
  return `${ETS_COURSE_URL_BASE}/${sigle.toLowerCase()}`;
}

export function getPlanDeCoursUrl(session: string, sigle: string, groupe = '00'): string {
  const planetsSession = transformSessionToPlanetsFormat(session);
  return `${PLANETS_PDF_URL_BASE}?session=${planetsSession}&sigle=${sigle.toUpperCase()}&groupe=${groupe}`;
}
