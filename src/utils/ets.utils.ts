const ETS_COURSE_URL_BASE = 'https://www.etsmtl.ca/etudes/cours';

export function getEtsCourseUrl(sigle: string): string {
  return `${ETS_COURSE_URL_BASE}/${sigle.toLowerCase()}`;
}
