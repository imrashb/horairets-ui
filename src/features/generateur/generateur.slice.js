/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { GENERATEUR_LIST_VIEW } from './generateur.constants';

const initialState = {
  session: '',
  programme: '',
  selectedCours: undefined,
  view: GENERATEUR_LIST_VIEW,
  conges: undefined,
  nombreCours: undefined,
};

const GENERATEUR_SLICE = 'generateur';

const generateurSlice = createSlice({
  name: GENERATEUR_SLICE,
  initialState,
  reducers: {
    setProgramme: (state, action) => {
      // immutable state based off those changes
      state.programme = action.payload;
    },
    setSession: (state, action) => {
      // immutable state based off those changes
      state.session = action.payload;
    },
    setSelectedCours: (state, action) => {
      state.selectedCours = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    setConges: (state, action) => {
      state.conges = action.payload;
    },
    setNombreCours: (state, action) => {
      state.nombreCours = action.payload;
    },
  },
});

export const generateurReducer = generateurSlice.reducer;

export const {
  setProgramme, setSession, setSelectedCours, setView, setConges, setNombreCours,
} = generateurSlice.actions;

export const selectProgramme = (state) => state.generateur.programme;

export const selectSession = (state) => state.generateur.session;

export const selectSelectedCours = (state) => state.generateur.selectedCours;

export const selectView = (state) => state.generateur.view;

export const selectConges = (state) => state.generateur.conges;

export const selectNombreCours = (state) => state.generateur.nombreCours;

export default generateurSlice;
