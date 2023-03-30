/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { FILTRES_PLANIFICATION } from '../../pages/GenerateurHoraire/generateurHoraire.constants';
import { filterPlanification } from '../../pages/GenerateurHoraire/generateurHoraire.filters';
import { COMBINAISONS_SORTS } from '../../pages/GenerateurHoraire/generateurHoraire.sorting';
import { GENERATEUR_LIST_VIEW } from './generateur.constants';

const initialState = {
  session: '',
  programme: [],
  selectedCours: undefined,
  coursObligatoires: undefined,
  view: GENERATEUR_LIST_VIEW,
  conges: undefined,
  nombreCours: undefined,
  sorting: Object.keys(COMBINAISONS_SORTS)[0],
  filters: {
    planification: FILTRES_PLANIFICATION,
  },
  combinaisons: undefined,
  rawCombinaisons: undefined,
};

const GENERATEUR_SLICE = 'generateur';

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const pipeAndFilterCombinaisons = (state) => {
  state.combinaisons = state.rawCombinaisons
    ? pipe(
      COMBINAISONS_SORTS[state.sorting],
      filterPlanification(state.filters.planification),
    )(state.rawCombinaisons) : state.rawCombinaisons;
};

const generateurSlice = createSlice({
  name: GENERATEUR_SLICE,
  initialState,
  reducers: {
    setProgramme: (state, action) => {
      // immutable­tate based off those changes
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
    setSorting: (state, action) => {
      state.sorting = action.payload;
      pipeAndFilterCombinaisons(state);
    },
    setCoursObligatoires: (state, action) => {
      state.coursObligatoires = action.payload;
    },
    setPlanification: (state, action) => {
      state.filters.planification = action.payload;
      pipeAndFilterCombinaisons(state);
    },
    setCombinaisons: (state, action) => {
      state.rawCombinaisons = action.payload;
      pipeAndFilterCombinaisons(state);
    },
  },
});

export const generateurReducer = generateurSlice.reducer;

export const {
  setProgramme,
  setSession,
  setSelectedCours,
  setView,
  setConges,
  setNombreCours,
  setSorting,
  setCoursObligatoires,
  setPlanification,
  setCombinaisons,
} = generateurSlice.actions;

export const selectProgramme = (state) => state.generateur.programme;

export const selectSession = (state) => state.generateur.session;

export const selectSelectedCours = (state) => state.generateur.selectedCours;

export const selectCoursObligatoires = (state) => state.generateur.coursObligatoires;

export const selectView = (state) => state.generateur.view;

export const selectConges = (state) => state.generateur.conges;

export const selectNombreCours = (state) => state.generateur.nombreCours;

export const selectSorting = (state) => state.generateur.sorting;

export const selectPlanification = (state) => state.generateur.filters.planification;

export const selectCombinaisons = (state) => state.generateur.combinaisons;

export const selectRawCombinaisons = (state) => state.generateur.rawCombinaisons;

export default generateurSlice;
