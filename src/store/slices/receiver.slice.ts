import {
  IReceiverFileSetSessionInfoResponse,
  IReceiverSessionInfoResponse,
  IRequestReceiverSessionFilesInfo,
} from "@/api/types/receiverUser.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export type ReceiverSliceStateType = Pick<RootState, "receiver">;

export interface IReceiverSlice {
  analyseFilesLoading: Array<number>;
  isAnalyseAllActive: boolean;
  isLoading: boolean;
  sessionInfo: null | IReceiverSessionInfoResponse;
  sessionFiles: IReceiverFileSetSessionInfoResponse | null;
  isContinueDisabled: boolean;
  safeArea: Array<string>;
  safeAreaAll: boolean;
  safetyAreaWidths: Array<AspectRatioWidthObject>;
  errors: {
    status: "visible" | "hide";
    message: string;
    offset: string;
    messageType: "error" | "success";
  };
}

const initialState: IReceiverSlice = {
  analyseFilesLoading: [],
  isAnalyseAllActive: false,
  isLoading: true,
  sessionInfo: null,
  sessionFiles: null,
  isContinueDisabled: true,
  safeArea: [],
  safetyAreaWidths: [],
  safeAreaAll: false,
  errors: {
    status: "hide",
    message: "",
    offset: "",
    messageType: "error",
  },
};

interface AspectRatioWidthObject {
  id: string | number; // Adjust based on what platform.id is
  width: number;
}

interface requestReceiverFiles extends IRequestReceiverSessionFilesInfo {
  isSkipLoading?: boolean;
}

export const requestReceiverFiles = createAsyncThunk(
  "[receiverSlice]: requestReceiverFiles",
  async () => {},
);

export const requestAnalyseFiles = createAsyncThunk(
  "[receiverSlice]: requestAnalyseFiles",
  async () => {},
);

export const receiverSlice = createSlice({
  name: "[receiverSlice]",
  initialState,
  reducers: {
    setReceiverSessionInfo(state, action) {
      state.sessionInfo = action.payload;
    },
    setContinueDisabled(state, action) {
      state.isContinueDisabled = action.payload;
    },
    setReceiverFileSetSession(state, action) {
      state.sessionFiles = action.payload;
      state.isLoading = false;
    },
    setError(state, action: { payload: Partial<IReceiverSlice["errors"]> }) {
      if (action.payload.status) {
        state.errors.status = action.payload.status;
      }
      if (action.payload.message) state.errors.message = action.payload.message;

      state.errors.offset = action.payload.offset || "";
      state.errors.messageType = action.payload.messageType || "error";
    },
    setSafeArea(state, action) {
      state.safeArea = action.payload;
    },
    setSafeAreaAll(state, action) {
      state.safeAreaAll = action.payload;
    },
    setSafeAreaWidths(state, action) {
      state.safetyAreaWidths = action.payload;
    },
    setAnalyseFilesLoading(state, action) {
      state.analyseFilesLoading = action.payload;
    },
    setIsAnalyseAllActive(state, action) {
      state.isAnalyseAllActive = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestReceiverFiles.pending, (draftState, action) => {});

    builder.addCase(requestReceiverFiles.fulfilled, (draftState, action) => {
      draftState.isLoading = false;
      draftState.errors.status = "hide";
      draftState.errors.messageType = "success";
    });

    builder.addCase(requestReceiverFiles.rejected, (draftState) => {
      // 401: Unauthorized
      draftState.errors.status = "visible";
      draftState.errors.messageType = "error";
      draftState.errors.message = "receiver.form.password.error.tooltip";
    });

    builder.addCase(requestAnalyseFiles.fulfilled, (state, action) => {});
  },
});

export const {
  setReceiverSessionInfo,
  setContinueDisabled,
  setReceiverFileSetSession,
  setError,
  setSafeArea,
  setSafeAreaAll,
  setSafeAreaWidths,
} = receiverSlice.actions;

export const selectIsLoading = (state: ReceiverSliceStateType) =>
  state.receiver.isLoading;

export const selectReceiverSessionInfo = (state: ReceiverSliceStateType) =>
  state.receiver.sessionInfo;

export const selectReceiverConfirmedOrLoading = (
  state: ReceiverSliceStateType,
) => state.receiver.isLoading || state.receiver.sessionFiles !== null;

export const selectReceiverFileSetSession = (state: ReceiverSliceStateType) =>
  state.receiver.sessionFiles;

export const selectContinueDisabled = (state: ReceiverSliceStateType) =>
  state.receiver.isContinueDisabled;

export const selectSafeArea = (state: ReceiverSliceStateType) =>
  state.receiver.safeArea;

export const selectSafeAreaAll = (state: ReceiverSliceStateType) =>
  state.receiver.safeAreaAll;

export const selectSafeAreaWidths = (state: ReceiverSliceStateType) =>
  state.receiver.safetyAreaWidths;

export const selectGlobalErrors = (s: ReceiverSliceStateType) =>
  s.receiver.errors;

export default receiverSlice.reducer;
