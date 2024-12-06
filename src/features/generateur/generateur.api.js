import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BASE_API_URL,
  GET_PROGRAMMES_ENDPOINT,
  GET_SESSIONS_ENDPOINT,
  GET_COMBINAISONS_ENDPOINT,
  GET_COURS_ENDPOINT,
  GET_COMBINAISONS_FROM_IDS_ENDPOINT,
} from '../../app/api/api.constants';
import { MAITRISE } from '../../pages/GenerateurHoraire/generateurHoraire.constants';

const PROGRAMMES = 'programmes';
const SESSION = 'session';
const COURS = 'cours';
const NOMBRE_COURS = 'nbCours';
const CONGES = 'conges';
const COURS_OBLIGATOIRES = 'coursObligatoires';
const IDS = 'ids';

export const generateurApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    getSessions: builder.query({
      query: () => GET_SESSIONS_ENDPOINT,
    }),
    getProgrammes: builder.query({
      query: ({ session }) => {
        const params = new URLSearchParams();
        if (session) params.append(SESSION, session);
        if (params.toString() === '') return GET_PROGRAMMES_ENDPOINT;
        return `${GET_PROGRAMMES_ENDPOINT}?${params.toString()}`;
      },
      transformResponse: (response) => response?.filter((programme) => programme !== MAITRISE),
    }),
    getCoursSession: builder.query({
      query: ({ session, programme }) => {
        const params = new URLSearchParams();
        programme.forEach((p) => params.append(PROGRAMMES, p));
        params.append(PROGRAMMES, MAITRISE);
        return `${GET_SESSIONS_ENDPOINT}/${session}?${params.toString()}`;
      },
    }),
    getCombinaisons: builder.query({
      query: ({
        session, cours, conges, nombreCours, coursObligatoires,
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

        if (coursObligatoires && coursObligatoires.length > 0) {
          params.append(COURS_OBLIGATOIRES, coursObligatoires);
        }

        return `${GET_COMBINAISONS_ENDPOINT}?${params.toString()}`;
      },
    }),
    getCombinaisonsFromId: builder.query({
      query: (combinaisonIds) => {
        const params = new URLSearchParams();
        params.append(IDS, combinaisonIds);

        return `${GET_COMBINAISONS_FROM_IDS_ENDPOINT}?${params.toString()}`;
      },
    }),
    getCours: builder.query({
      query: (programmes) => {
        const params = new URLSearchParams();
        programmes?.forEach((p) => params.append(PROGRAMMES, p));
        return `${GET_COURS_ENDPOINT}?${params.toString()}`;
      },
    }),
  }),
});

export const selectCoursSession = (session, programme) => (state) => generateurApi.endpoints.getCoursSession.select({ session, programme })(state);

// Export hooks for usage in functional components
export const {
  useGetSessionsQuery,
  useGetProgrammesQuery,
  useLazyGetCoursSessionQuery,
  useLazyGetCombinaisonsQuery,
  useLazyGetCombinaisonsFromIdQuery,
  useGetCoursQuery,
} = generateurApi;
