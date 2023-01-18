/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { GENERATEUR_LIST_VIEW } from './generateur.constants';

const initialState = {
  session: '',
  programme: '',
  selectedCours: undefined,
  view: GENERATEUR_LIST_VIEW,
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
  },
});

export const generateurReducer = generateurSlice.reducer;

export const {
  setProgramme, setSession, setSelectedCours, setView,
} = generateurSlice.actions;

export const selectProgramme = (state) => state.generateur.programme;

export const selectSession = (state) => state.generateur.session;

export const selectSelectedCours = (state) => state.generateur.selectedCours;

export const selectView = (state) => state.generateur.view;

export default generateurSlice;
