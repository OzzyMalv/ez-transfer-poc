import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export type LoginSliceType = Pick<RootState, "login">;

export interface ILoginSliceState {
  isLoading: boolean;
  status?: string;
}

const initialState: ILoginSliceState = {
  isLoading: false,
};

export const requestLinkResetPassword = createAsyncThunk(
  "requestLinkResetPassword",
  async ({ email }: { email: string }) => {
    return {};
  },
);

export const requestSetNewPassword = createAsyncThunk(
  "requestSetNewPassword",
  async ({
    secureToken,
    password,
  }: {
    secureToken: string;
    password: string;
  }) => {
    return {};
  },
);

export const loginSlice = createSlice({
  name: "[loginSlice]",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestLinkResetPassword.pending, (draftState) => {
      draftState.isLoading = true;
    });

    builder.addCase(requestLinkResetPassword.fulfilled, (draftState) => {
      draftState.isLoading = false;
    });

    builder.addCase(requestLinkResetPassword.rejected, (draftState) => {
      draftState.isLoading = false;
    });

    builder.addCase(requestSetNewPassword.pending, (draftState) => {
      draftState.isLoading = true;
    });

    builder.addCase(requestSetNewPassword.fulfilled, (draftState) => {
      draftState.isLoading = false;
    });

    builder.addCase(requestSetNewPassword.rejected, (draftState) => {
      draftState.isLoading = false;
    });
  },
});

export default loginSlice.reducer;
