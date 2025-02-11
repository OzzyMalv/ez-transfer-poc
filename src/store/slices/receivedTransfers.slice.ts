import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ReceivedTransfersAPIs from "@/api/services/receivedTransfers.api";
import {
  IRequestGetSingleReceivedTransfer,
  IRequestGetSingleReceivedTransferFileAnalysis,
  IRequestReceivedTransfers,
  ISession,
} from "@/api/types/receivedTransfers.types";
import { RootState } from "..";

export interface IReceivedTransfers {
  isLoadingReceivedTransfers: boolean;
  transfers: ISession[];
  analyseReceivedFilesLoading: string[];
  isAnalyseAllReceivedActive: boolean;
}

const initialState: IReceivedTransfers = {
  isLoadingReceivedTransfers: true,
  transfers: [],
  analyseReceivedFilesLoading: [],
  isAnalyseAllReceivedActive: false,
};

export type ReceivedTransfersSliceStateType = Pick<
  RootState,
  "receivedTransfers"
>;

export const requestAnalyseReceivedFiles = createAsyncThunk(
  "requestAnalyseReceivedFiles",
  async (
    { filesetSessionId, files }: IRequestGetSingleReceivedTransferFileAnalysis,
    { rejectWithValue },
  ) => {
    try {
      const { data } = await ReceivedTransfersAPIs.RequestAnalyseReceivedFiles({
        filesetSessionId,
        files,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// limit, offset is needed when we implement pagination
export const requestGetReceivedTransfers = createAsyncThunk(
  "requestGetReceivedTransfers",
  async ({}: IRequestReceivedTransfers, { rejectWithValue }) => {
    try {
      const { data } =
        await ReceivedTransfersAPIs.RequestGetReceivedTransfers();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const requestGetSingleReceivedTransfer = createAsyncThunk(
  "requestGetSingleReceivedTransfer",
  async (
    {
      filesetSessionId,
      withFiles,
      password,
    }: IRequestGetSingleReceivedTransfer,
    { rejectWithValue },
  ) => {
    try {
      const { data } =
        await ReceivedTransfersAPIs.RequestGetSingleReceivedTransfer(
          filesetSessionId,
          withFiles,
          password,
        );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const receivedTransfersSlice = createSlice({
  name: "[receivedTransfersSlice]",
  initialState,
  reducers: {
    setAnalyseReceivedFilesLoading(state, action) {
      state.analyseReceivedFilesLoading = action.payload;
    },
    setIsAnalyseAllReceivedActive(state, action) {
      state.isAnalyseAllReceivedActive = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestGetReceivedTransfers.pending, (draftState) => {
      draftState.isLoadingReceivedTransfers = true;
    });
    builder.addCase(
      requestGetSingleReceivedTransfer.pending,
      (draftState, action) => {
        const singleTransferIndex = draftState.transfers.findIndex(
          (transfer) => transfer.id === action.meta.arg.filesetSessionId,
        );
        if (singleTransferIndex > -1) {
          draftState.transfers[singleTransferIndex] =
            action?.payload || draftState.transfers[singleTransferIndex];
        } else if (action.payload) {
          draftState.transfers.push(action.payload);
        }
      },
    );
    builder.addCase(
      requestAnalyseReceivedFiles.fulfilled,
      (draftState, action) => {
        const singleTransferIndex = draftState.transfers.findIndex(
          (transfer) => transfer.id === action.meta.arg.filesetSessionId,
        );
        if (singleTransferIndex > -1) {
          draftState.transfers[singleTransferIndex] =
            action?.payload || draftState.transfers[singleTransferIndex];
        }
      },
    );
    builder.addCase(
      requestGetReceivedTransfers.fulfilled,
      (draftState, action) => {
        draftState.isLoadingReceivedTransfers = false;
        draftState.transfers = action.payload?.data?.filesetSessions ?? [];
      },
    );
    builder.addCase(
      requestGetSingleReceivedTransfer.fulfilled,
      (draftState, action) => {
        const singleTransferIndex = draftState.transfers.findIndex(
          (transfer) => transfer.id === action.meta.arg.filesetSessionId,
        );
        if (singleTransferIndex > -1) {
          draftState.transfers[singleTransferIndex] =
            action?.payload || draftState.transfers[singleTransferIndex];
        } else {
          draftState.transfers.push(action.payload);
        }
      },
    );
    builder.addCase(requestGetReceivedTransfers.rejected, (draftState) => {
      draftState.isLoadingReceivedTransfers = false;
    });
  },
});

export const selectReceivedTransfer = (
  state: ReceivedTransfersSliceStateType,
  id: string,
) => state.receivedTransfers.transfers.find((t) => t.id === id);

export const selectReceivedFileList = (
  state: ReceivedTransfersSliceStateType,
  transferId: string,
) => state.receivedTransfers.transfers.find((t) => t.id === transferId)?.files;

export default receivedTransfersSlice.reducer;
