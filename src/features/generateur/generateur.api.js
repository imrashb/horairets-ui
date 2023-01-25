import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BASE_API_URL, GET_PROGRAMMES_ENDPOINT, GET_SESSIONS_ENDPOINT, GET_COMBINAISONS_ENDPOINT,
} from '../../app/api/api.constants';
import { MAITRISE } from '../../pages/GenerateurHoraire/generateurHoraire.constants';

const PROGRAMMES = 'programmes';
const SESSION = 'session';
const COURS = 'cours';
const NOMBRE_COURS = 'nbCours';
const CONGES = 'conges';

export const generateurApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    getSessions: builder.query({
      query: () => GET_SESSIONS_ENDPOINT,
    }),
    getProgrammes: builder.query({
      query: () => GET_PROGRAMMES_ENDPOINT,
      transformResponse: (
        response,
      ) => response?.filter((programme) => programme !== MAITRISE),
    }),
    getCoursSession: builder.query({
      query: ({ session, programme }) => {
        const params = new URLSearchParams();
        params.append(PROGRAMMES, programme);
        params.append(PROGRAMMES, MAITRISE);
        return `${GET_SESSIONS_ENDPOINT}/${session}?${params.toString()}`;
      },
    }),
    getCombinaisons: builder.query({
      query: ({
        session, cours, conges, nombreCours,
      }) => {
        const params = new URLSearchParams();
        params.append(SESSION, session);
        params.append(COURS, cours);

        if (nombreCours) {
          params.append(NOMBRE_COURS, nombreCours);
        }

        if (conges && conges.length > 0) {
          params.append(CONGES, conges);
        }
        return `${GET_COMBINAISONS_ENDPOINT}?${params.toString()}`;
      },
    }),
  }),
});

export const selectCoursSession = (session, programme) => (state) => generateurApi
  .endpoints.getCoursSession.select({ session, programme })(state);

export const selectCombinaisons = (session, cours, nombreCours, conges) => (state) => generateurApi
  .endpoints.getCombinaisons.select({
    session, cours, nombreCours, conges,
  })(state);

// Export hooks for usage in functional components
export const {
  useGetSessionsQuery,
  useGetProgrammesQuery,
  useLazyGetCoursSessionQuery,
  useLazyGetCombinaisonsQuery,
} = generateurApi;
