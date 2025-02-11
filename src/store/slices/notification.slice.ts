import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export type NotificationSliceType = Pick<RootState, "notification">;

export interface INotification {
  isOpen: boolean;
  message: string;
  type: "success" | "error" | "warning";
  persisted: boolean;
}

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    isOpen: false,
    message: "",
    type: "success",
    persisted: false,
  } as INotification,
  reducers: {
    showNotify: (state, action) => {
      state.isOpen = action.payload.isOpen;
      state.message = action.payload.message;
      state.persisted = action.payload.persisted || false;
      if (action.payload.type) {
        state.type = action.payload.type;
      }
    },
  },
});

export const selectShowingNotify = (s: NotificationSliceType) => s.notification;

export const { showNotify } = notificationSlice.actions;

export default notificationSlice.reducer;
