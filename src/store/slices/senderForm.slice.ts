import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  ICreateFilesetSessionRequest,
  ICreateFilesetSessionResponse,
  IFileWithPath,
  IRegisterNewSenderResponse,
} from "@/api/types/senderUser.types";
import SenderUserAPIs from "@/api/services/senderUser.api";
import dayjs from "dayjs";
import { FileSetSessionStatus } from "@/common/constants/enums";
import { FileWithPath } from "react-dropzone";

export type SenderFormSliceStateType = Pick<RootState, "senderForm">;

interface ISubmissionStruct {
  isLoading: boolean;
  senderInfo: IRegisterNewSenderResponse | null;
  filesetSession: ICreateFilesetSessionResponse | null;
  sessionInfo: {
    expirationDate: string | null;
    shortLink: string | null;
  };
}

interface IQCProgressStruct {
  status: FileSetSessionStatus | string;
  fileStatus: {
    [fileName: string]: FileSetSessionStatus;
  };
}

export interface ISenderFormSliceState {
  firstView: boolean;
  files: {
    isLoading: boolean;
    count: number;
    list: IFileWithPath[];
    totalSize: number;
  };
  errors: {
    status: "visible" | "hide";
    message: string;
    offset: string;
    messageType: "error" | "success" | "info" | "infoText";
  };
  message: string;
  receivers: {
    isValid: boolean;
    value: string[];
    isAlertDisplayed: boolean;
  };
  sender: {
    isVerifyEmailSent: boolean;
    isVerifyEmailReSent: boolean;
    isValid: boolean;
    senderId: string;
    value: string;
    isAlertDisplayed: boolean;
    isLoggedInUser: boolean;
  };
  submission: ISubmissionStruct;
  qcProgress: IQCProgressStruct;
  password: {
    text: string;
    enable: boolean;
  };
  qcFirst: boolean;
}

const initialState: ISenderFormSliceState = {
  firstView: true,
  files: {
    isLoading: false,
    count: 0,
    list: [],
    totalSize: 0,
  },
  errors: {
    status: "hide",
    message: "",
    offset: "",
    messageType: "error",
  },
  message: "",
  receivers: {
    isValid: false,
    value: [],
    isAlertDisplayed: false,
  },
  sender: {
    isVerifyEmailSent: false,
    isVerifyEmailReSent: false,
    isValid: false,
    senderId: "",
    value: "",
    isAlertDisplayed: false,
    isLoggedInUser: false,
  },
  submission: {
    isLoading: false,
    senderInfo: null,
    filesetSession: null,
    sessionInfo: {
      expirationDate: null,
      shortLink: null,
    },
  },
  qcProgress: {
    status: "",
    fileStatus: {},
  },
  password: {
    text: "",
    enable: false,
  },
  qcFirst: false,
};

const sliceClearState = { ...initialState };

export type TSubmitSenderFormProps = {
  senderEmail: string;
  code: string;
  fileSetSessionData: Omit<ICreateFilesetSessionRequest, "sender">;
};

export type TGetSenderId = {
  senderEmail: TSubmitSenderFormProps["senderEmail"];
};

export type TSendEmailWithCode = {
  senderId: TQCProps["senderId"];
};

export type TVerifySenderCode = {
  senderId: TQCProps["senderId"];
  verificationCode: string;
};

export type TQCProps = {
  senderId: string;
  fileSetSessionId: string;
};

export type Folder = {
  folders: Record<string, Folder>;
  files: FileWithPath[];
  path: string;
};

export const getSenderId = createAsyncThunk(
  "[senderForm] getSenderId",
  async ({ senderEmail }: TGetSenderId, { rejectWithValue }) => {
    try {
      const { data: registeredSender } = await SenderUserAPIs.RegisterNewSender(
        {
          email: senderEmail,
        },
      );

      return registeredSender;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const sendEmailWithCode = createAsyncThunk(
  "[senderForm] sendEmailWithCode",
  async ({ senderId }: TSendEmailWithCode, { rejectWithValue }) => {
    try {
      const { data } = await SenderUserAPIs.sendEmailVerification(senderId);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const resendEmailWithCode = createAsyncThunk(
  "[senderForm] resendEmailWithCode",
  async ({ senderId }: TSendEmailWithCode, { rejectWithValue }) => {
    try {
      const { data } = await SenderUserAPIs.sendEmailVerification(senderId);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const verifySenderCode = createAsyncThunk(
  "[senderForm] verifySenderCode",
  async (
    { senderId, verificationCode }: TVerifySenderCode,
    { rejectWithValue },
  ) => {
    try {
      const { data } = await SenderUserAPIs.verifySenderCode(
        senderId,
        verificationCode,
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getSenderAndSendVerifyEmail = createAsyncThunk(
  "[senderForm] getSenderAndSendVerifyEmail",
  async ({ senderEmail }: TGetSenderId, { rejectWithValue, dispatch }) => {
    try {
      const {
        payload: { id },
      } = (await dispatch(getSenderId({ senderEmail }))) as {
        payload: { id: string };
      };

      await dispatch(sendEmailWithCode({ senderId: id }));

      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const submitSenderForm = createAsyncThunk(
  "[senderForm] submitForm",
  async (
    { senderEmail, code, fileSetSessionData }: TSubmitSenderFormProps,
    { rejectWithValue },
  ) => {
    try {
      const { data: registeredSender } = await SenderUserAPIs.RegisterNewSender(
        {
          email: senderEmail,
        },
      );

      const { data: filesetSessionData } =
        await SenderUserAPIs.CreateFilesetSession(registeredSender.id, {
          sender: { id: registeredSender.id, code },
          ...fileSetSessionData,
        });

      return {
        isLoading: false,
        filesetSession: filesetSessionData,
        senderInfo: registeredSender,
        sessionInfo: {
          expirationDate: dayjs()
            .add(fileSetSessionData.days_to_expire, "day")
            .format("HH:mm A, DD MMM YYYY"),
          shortLink: null,
        },
      } as ISubmissionStruct;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const requestQC = createAsyncThunk(
  "[QC]: requestQC",
  async ({ senderId, fileSetSessionId }: TQCProps, { rejectWithValue }) => {
    try {
      await SenderUserAPIs.RequestQC(senderId, fileSetSessionId);
      return {
        status: FileSetSessionStatus.IN_PROGRESS,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getFileSetSessionStatus = createAsyncThunk(
  "[QC]: filesetSessionStatus",
  async ({ senderId, fileSetSessionId }: TQCProps, { rejectWithValue }) => {
    try {
      const qcProgress: IQCProgressStruct = { status: "", fileStatus: {} };
      const { data: filesetSessionStatus } =
        await SenderUserAPIs.GetFilesetSessionStatus(
          senderId,
          fileSetSessionId,
        );
      qcProgress.status = filesetSessionStatus.status as FileSetSessionStatus;
      filesetSessionStatus.files.forEach((file) => {
        qcProgress.fileStatus = {
          ...qcProgress.fileStatus,
          [file.name]: file.status as FileSetSessionStatus,
        };
      });
      return qcProgress;
    } catch (err) {
      rejectWithValue(err);
    }
  },
);

export const getCancelQCRequest = createAsyncThunk(
  "[QC]: getCancelQCRequest",
  async ({ senderId, fileSetSessionId }: TQCProps, { rejectWithValue }) => {
    try {
      const qcProgress: IQCProgressStruct = { status: "", fileStatus: {} };
      const { data: filesetSessionStatus } =
        await SenderUserAPIs.RequestCancelQC(senderId, fileSetSessionId);
      qcProgress.status = filesetSessionStatus.status as FileSetSessionStatus;
      filesetSessionStatus.files.forEach((file) => {
        qcProgress.fileStatus = {
          ...qcProgress.fileStatus,
          [file.name]: file.status as FileSetSessionStatus,
        };
      });
      return qcProgress;
    } catch (err) {
      rejectWithValue(err);
    }
  },
);

export const senderFormSlice = createSlice({
  name: "[senderForm]",
  initialState,
  reducers: {
    setSelectedFiles(state, action) {
      let temp: FileWithPath[] = [];
      if (action.payload.length !== 0) {
        temp = Array.from(action.payload);
      }
      temp = [...temp, ...state.files.list];
      state.files.list = temp;
      state.files.count = temp.length;
      state.files.totalSize = temp.reduce(
        (totalSize, file) => totalSize + file.size,
        0,
      );
      state.firstView = false;
    },
    clearAllFiles(state) {
      state.files.list = [];
      state.files.count = 0;
      state.files.totalSize = 0;
    },
    removeSingleFile(state, action) {
      const filteredFiles = state.files.list.filter((file) => {
        const fileName = file.path ?? file.name;
        return fileName !== action.payload;
      });

      state.files.list = filteredFiles;
      state.files.totalSize = filteredFiles.reduce(
        (totalSize, file) => totalSize + file.size,
        0,
      );
      state.files.count = filteredFiles.length;
    },
    removeSingleFolder(state, action) {
      const filteredFiles = state.files.list.filter(
        (file) => !file.path?.startsWith(action.payload),
      );

      state.files.list = filteredFiles;
      state.files.totalSize = filteredFiles.reduce(
        (totalSize, file) => totalSize + file.size,
        0,
      );
      state.files.count = filteredFiles.length;
    },
    setError(
      state,
      action: { payload: Partial<ISenderFormSliceState["errors"]> },
    ) {
      if (action.payload.status) {
        state.errors.status = action.payload.status;
      }
      if (action.payload.status === "visible") {
        //hiding other error tooltips
        state.sender.isAlertDisplayed = false;
        state.receivers.isAlertDisplayed = false;
      }
      if (action.payload.message) state.errors.message = action.payload.message;

      state.errors.offset = action.payload.offset || "";
      state.errors.messageType = action.payload.messageType || "error";
    },

    setMessage(state, action) {
      state.message = action.payload;
    },

    setQcFirst(state, action) {
      state.qcFirst = action.payload;
    },

    setReceiversEmails(state, action) {
      state.receivers.value = action.payload;
    },
    setReceiversEmailsValidity(state, action) {
      state.receivers.isValid = action.payload;
    },
    setReceiversEmailsAlertState(state, action) {
      state.receivers.isAlertDisplayed = action.payload;
      //hiding other error tooltips
      state.errors.status = "hide";
      state.sender.isAlertDisplayed = false;
    },
    setSenderEmail(state, action) {
      state.sender.value = action.payload;
    },
    setSenderEmailValidity(state, action) {
      state.sender.isValid = action.payload;
    },
    setSenderAsLoggedInUser(state, action) {
      state.sender.isLoggedInUser = action.payload;
    },
    setSenderEmailAlertState(state, action) {
      state.sender.isAlertDisplayed = action.payload;
      //hiding other error tooltips
      state.errors.status = "hide";
      state.receivers.isAlertDisplayed = false;
    },
    clearUploadSubmissionData(state) {
      state.submission = {
        isLoading: false,
        senderInfo: null,
        filesetSession: null,
        sessionInfo: {
          shortLink: null,
          expirationDate: null,
        },
      };
    },
    setQCStatus(state, action) {
      state.qcProgress.status = action.payload;
    },
    removeItemFromFileQcState(state, action) {
      const tempFileStatus: { [x: string]: FileSetSessionStatus } = {};
      let isAllPropsAreSafe = true;
      for (const [key, value] of Object.entries(
        state.qcProgress.fileStatus || {},
      )) {
        if (key !== action.payload) tempFileStatus[key] = value;
      }

      for (const [key] of Object.entries(tempFileStatus)) {
        if (tempFileStatus[key] === FileSetSessionStatus.FAILED)
          isAllPropsAreSafe = false;
      }

      if (isAllPropsAreSafe) {
        state.qcProgress.status = "";
      }
      state.qcProgress.fileStatus = tempFileStatus;
    },
    clearQCState(state) {
      state.qcProgress = initialState.qcProgress;
    },
    resetSenderForm(state) {
      state.firstView = true;
      state.files = sliceClearState.files;
      state.message = sliceClearState.message;
      state.receivers = sliceClearState.receivers;
      state.sender = sliceClearState.sender;
      state.submission = sliceClearState.submission;
      state.qcProgress = sliceClearState.qcProgress;
      state.errors = sliceClearState.errors;
      state.password = sliceClearState.password;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setPasswordInfoTooltipState(state) {
      state.errors.status = "hide";
      state.sender.isAlertDisplayed = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitSenderForm.pending, (draftState) => {
      draftState.submission.isLoading = true;
    });

    builder.addCase(submitSenderForm.fulfilled, (draftState, action) => {
      draftState.submission.isLoading = false;
      if (action.payload) draftState.submission = action.payload;
    });

    builder.addCase(submitSenderForm.rejected, (draftState) => {
      draftState.submission = initialState.submission;
    });

    builder.addCase(requestQC.pending, (draftState) => {
      draftState.qcProgress.status = FileSetSessionStatus.WAITING;
    });

    builder.addCase(requestQC.fulfilled, (draftState, action) => {
      draftState.qcProgress.status = action.payload.status;
    });

    builder.addCase(getFileSetSessionStatus.fulfilled, (draftState, action) => {
      draftState.qcProgress = action.payload || draftState.qcProgress;
    });

    builder.addCase(getCancelQCRequest.fulfilled, (draftState, action) => {
      draftState.qcProgress = action.payload || draftState.qcProgress;
    });

    builder.addCase(getSenderId.fulfilled, (draftState, action) => {
      const { id } = action.payload;
      draftState.sender.senderId = id;
    });

    builder.addCase(sendEmailWithCode.pending, (draftState) => {
      draftState.sender.isVerifyEmailSent = true;
    });
    builder.addCase(sendEmailWithCode.fulfilled, (draftState) => {
      draftState.sender.isVerifyEmailSent = true;
    });
    // for now even if it fails we allow resend only by button
    builder.addCase(sendEmailWithCode.rejected, (draftState) => {
      draftState.sender.isVerifyEmailSent = true;
    });

    builder.addCase(resendEmailWithCode.pending, (draftState) => {
      draftState.sender.isVerifyEmailReSent = true;
    });
  },
});

export const { setSelectedFiles, setError, setQcFirst } =
  senderFormSlice?.actions;

export const getFolderSizeAndFileCount = (folder: Folder) => {
  let size = 0;
  let count = 0;

  count = folder.files.length;
  size = folder.files.reduce(function (a, b) {
    return a + b.size;
  }, 0);

  Object.keys(folder.folders).forEach((key) => {
    const subfolderInfo = getFolderSizeAndFileCount(folder.folders[key]);
    size = size + subfolderInfo.size;
    count = count + subfolderInfo.count;
  });

  return { size, count };
};

export const selectGlobalErrors = (s: SenderFormSliceStateType) =>
  s.senderForm.errors;

export const selectErrorStatus = (s: SenderFormSliceStateType) =>
  s.senderForm.errors.status;

export const selectErrorMessage = (s: SenderFormSliceStateType) =>
  s.senderForm.errors.message;

export const selectErrorMessageType = (s: SenderFormSliceStateType) =>
  s.senderForm.errors.messageType;

export const selectSenderField = (s: SenderFormSliceStateType) =>
  s.senderForm.sender;

export const selectSenderSubmissionState = (s: SenderFormSliceStateType) =>
  s.senderForm.submission;

export const selectQcFirst = (s: SenderFormSliceStateType) =>
  s.senderForm.qcFirst;

export default senderFormSlice.reducer;
