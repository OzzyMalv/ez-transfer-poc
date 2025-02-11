import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export type SettingsFormSliceStateType = Pick<RootState, "settings">;

export interface ISettingsSliceState {
  route: {
    animateTo: null | string;
  };
  showNavigation: boolean;
}

const initialState: ISettingsSliceState = {
  route: {
    animateTo: null,
  },
  showNavigation: true,
};

export const settingsSlice = createSlice({
  name: "[settingSlice]",
  initialState,
  reducers: {
    setAnimateTo(state, action) {
      state.route.animateTo = action.payload;
    },
    setShowNavigation(state, action) {
      state.showNavigation = action.payload;
    },
  },
});

export const { setAnimateTo, setShowNavigation } = settingsSlice?.actions;

export const selectShowNavigation = (state: SettingsFormSliceStateType) =>
  state.settings.showNavigation;

export default settingsSlice.reducer;
