import { useQuery, useMutation } from '@tanstack/react-query';
import axios from '../../app/api/axiosInstance';
import {
  GET_PROGRAMMES_ENDPOINT, GET_SESSIONS_ENDPOINT, GET_COMBINAISONS_ENDPOINT,
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

export const useGetSessions = () => useQuery({
  queryKey: ['sessions'],
  queryFn: async () => {
    const { data } = await axios.get(`${GET_SESSIONS_ENDPOINT}`);
    return data;
  },
});

export const useGetProgrammes = () => useQuery({
  queryKey: ['programmes'],
  queryFn: async () => {
    const { data } = await axios.get(`${GET_PROGRAMMES_ENDPOINT}`);
    return data?.filter((programme) => programme !== MAITRISE);
  },
});

export const useGetCoursSession = (session, programme, enabled = true) => useQuery({
  queryKey: ['coursSession', session, programme],
  queryFn: async () => {
    const params = new URLSearchParams();
    programme.forEach((p) => params.append(PROGRAMMES, p));
    params.append(PROGRAMMES, MAITRISE);
    const { data } = await axios.get(`${GET_SESSIONS_ENDPOINT}/${session}?${params.toString()}`);
    return data;
  },
  enabled: !!session && !!programme && enabled,
});

export const useGetCombinaisons = () => useMutation({
  mutationFn: async ({
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

    const { data } = await axios.get(`${GET_COMBINAISONS_ENDPOINT}?${params.toString()}`);
    return data;
  },
});

export const useGetCombinaisonsFromId = () => useMutation({
  mutationFn: async (combinaisonIds) => {
    const params = new URLSearchParams();
    params.append(IDS, combinaisonIds);
    const { data } = await axios.get(`${GET_COMBINAISONS_FROM_IDS_ENDPOINT}?${params.toString()}`);
    return data;
  },
});
