import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export interface User {
  Id: string;
  FirstName: string;
  LastName: string;
}

const INITIAL_USER: User = {
  Id: import.meta.env.VITE_WEB_USER_ID as string,
  FirstName: '',
  LastName: '',
};

export const tokenAtom = atom<string | null>(null);
export const userAtom = atom<User>(INITIAL_USER);

export const modeAtom = atomWithStorage<'light' | 'dark'>('mode', 'dark');

interface Credentials {
  AccessToken: string;
  User: User;
}

// Helper to set both token and user
export const setCredentialsAtom = atom(null, (get, set, { AccessToken, User }: Credentials) => {
  set(tokenAtom, AccessToken);
  set(userAtom, User);
});

export const logOutAtom = atom(null, (get, set) => {
  set(userAtom, INITIAL_USER);
  set(tokenAtom, null);
  localStorage.removeItem('user');
});
