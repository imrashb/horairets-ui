export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
export const GET_SESSIONS_ENDPOINT = 'sessions';
export const GET_PROGRAMMES_ENDPOINT = `${GET_SESSIONS_ENDPOINT}/programmes`;
export const GET_COMBINAISONS_ENDPOINT = 'combinaisons';
export const GET_COMBINAISONS_FROM_IDS_ENDPOINT = `${GET_COMBINAISONS_ENDPOINT}/id`;
