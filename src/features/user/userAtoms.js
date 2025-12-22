import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const tokenAtom = atom(null);
export const userAtom = atom({
  Id: import.meta.env.VITE_WEB_USER_ID,
  FirstName: '',
  LastName: '',
});

export const modeAtom = atomWithStorage('mode', 'dark');

// Helper to set both token and user
export const setCredentialsAtom = atom(
  null,
  (get, set, { AccessToken, User }) => {
    set(tokenAtom, AccessToken);
    set(userAtom, User);
  },
);

export const logOutAtom = atom(
  null,
  (get, set) => {
    set(userAtom, { Id: import.meta.env.VITE_WEB_USER_ID });
    set(tokenAtom, null);
    localStorage.removeItem('user');
  },
);
