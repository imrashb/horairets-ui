/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showNomCoursGroupe: true,
  showNomActivite: true,
  showLocaux: true,
  showUniqueCoursColors: true,
  showModeEnseignement: false,
};

const AFFICHAGE_SLICE = 'affichage';

const affichageSlice = createSlice({
  name: AFFICHAGE_SLICE,
  initialState,
  reducers: {
    setAffichageCombinaisons: (state, action) => {
      // immutable­tate based off those changes
      state.showNomCoursGroupe = action.payload.showNomCoursGroupe;
      state.showLocaux = action.payload.showLocaux;
      state.showNomActivite = action.payload.showNomActivite;
      state.showUniqueCoursColors = action.payload.showUniqueCoursColors;
      state.showModeEnseignement = action.payload.showModeEnseignement;
    },
  },
});

export const affichageReducer = affichageSlice.reducer;

export const {
  setAffichageCombinaisons,
} = affichageSlice.actions;

export const selectShowNomCoursGroupe = (state) => state.affichage.showNomCoursGroupe;

export const selectShowNomActivite = (state) => state.affichage.showNomActivite;

export const selectShowLocaux = (state) => state.affichage.showLocaux;

export const selectShowUniqueCoursColors = (state) => state.affichage.showUniqueCoursColors;

export const selectShowModeEnseignement = (state) => state.affichage.showModeEnseignement;

export default affichageSlice;
