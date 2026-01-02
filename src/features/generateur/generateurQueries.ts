import { useMutation, useQuery } from "@tanstack/react-query";
import {
  GET_COMBINAISONS_ENDPOINT,
  GET_COMBINAISONS_FROM_IDS_ENDPOINT,
  GET_PROGRAMMES_ENDPOINT,
  GET_SESSIONS_ENDPOINT,
} from "../../app/api/api.constants";
import axios from "../../app/api/axiosInstance";
import { MAITRISE } from "../../pages/GenerateurHoraire/generateurHoraire.constants";
import { Combinaison, GenerateurConfig, Cours } from "./generateur.types";

const PROGRAMMES = "programmes";
const SESSION = "session";
const COURS = "cours";
const NOMBRE_COURS = "nbCours";
const CONGES = "conges";
const COURS_OBLIGATOIRES = "coursObligatoires";
const IDS = "ids";

export const useGetSessions = () =>
  useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const { data } = await axios.get<string[]>(`${GET_SESSIONS_ENDPOINT}`);
      return data;
    },
  });

export const useGetProgrammes = () =>
  useQuery({
    queryKey: ["programmes"],
    queryFn: async () => {
      const { data } = await axios.get<string[]>(`${GET_PROGRAMMES_ENDPOINT}`);
      return data?.filter((programme) => programme !== MAITRISE);
    },
  });

export const useGetCoursSession = (
  session: string | null,
  programme: string | string[],
  enabled = true
) =>
  useQuery({
    queryKey: ["coursSession", session, programme],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (Array.isArray(programme)) {
        programme.forEach((p) => params.append(PROGRAMMES, p));
      } else {
        // Fallback if string
        params.append(PROGRAMMES, programme);
      }
      params.append(PROGRAMMES, MAITRISE);
      const { data } = await axios.get<Cours[]>(
        `${GET_SESSIONS_ENDPOINT}/${session}?${params.toString()}`
      );
      return data;
    },
    enabled: !!session && !!programme && enabled,
  });

export const useGetCombinaisons = () =>
  useMutation({
    mutationFn: async ({
      session,
      cours,
      conges,
      nombreCours,
      coursObligatoires,
    }: Partial<GenerateurConfig>) => {
      const params = new URLSearchParams();
      if (session) params.append(SESSION, session);
      if (cours) params.append(COURS, cours.join(",")); // Assuming array of sigles needed as commaseparated or repeated? Original code: checked params.append(COURS, cours). If cours is array, axios/URLSearchParams handles it? Original code: `params.append(COURS, cours)` implies automatic toString which is comma joined for arrays.

      if (nombreCours) {
        params.append(NOMBRE_COURS, String(nombreCours));
      }

      if (conges && conges.length > 0) {
        params.append(CONGES, conges.join(","));
      }

      if (coursObligatoires && coursObligatoires.length > 0) {
        params.append(COURS_OBLIGATOIRES, coursObligatoires.join(","));
      }

      const { data } = await axios.get<Combinaison[]>(
        `${GET_COMBINAISONS_ENDPOINT}?${params.toString()}`
      );
      return data;
    },
  });

export const useGetCombinaisonsFromId = () =>
  useMutation({
    mutationFn: async (combinaisonIds: string | string[]) => {
      const params = new URLSearchParams();
      params.append(
        IDS,
        Array.isArray(combinaisonIds) ? combinaisonIds.join(",") : combinaisonIds
      );
      const { data } = await axios.get<Combinaison[]>(
        `${GET_COMBINAISONS_FROM_IDS_ENDPOINT}?${params.toString()}`
      );
      return data;
    },
  });
