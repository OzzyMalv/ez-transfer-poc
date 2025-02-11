import WorkspaceAPIs from "@/api/services/workspace.api";
import { File } from "@/api/types/receiverUser.types";
import { IFileWithPath } from "@/api/types/senderUser.types";
import {
  IRequestFiles,
  IRequestListProjects,
  IRequestProjects,
  IRequestQCProfileEvaluation,
  IRequestTransfer,
  IRequestTransferDetails,
} from "@/api/types/workspace.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  mockedProjects,
  mockRequestFiles,
} from "@/store/slices/mockedWorkspaces";

export interface IWorkspace {
  id: string;
  type: string;
  name: string;
  rootFolderId: string;
  owner: boolean;
  folders: IFolder[];
  basicTransfer: boolean;
  isAnalyseAllActive: boolean;
  filesBeingAnalysed: string[];
  transferDrawerOpen: boolean;
  transferType: string;
  currentTransfer: {
    password: string;
    message: string;
    daysToExpire: number;
    receivers: [];
    files: {
      id: string;
    };
  };
  filesUploading: Array<string>;
  foldersUploading: Array<string>;
  transferId: string;
  transferPolling: boolean;
  transferStatus: string;
  shareLinkUrl: string;
  showShareLink: boolean;
  filesWithVirus: Array<string>;
}

export interface IFolder {
  id: string;
  name: string;
  numberOfFiles: number;
  modifiedDate: string;
  preview: {
    largeThumbnailUrl: string;
  };
  selected: boolean;
  files: IProjectFile[];
  polling: boolean;
  totalFileSize: number;
}

export interface IProjectFile extends File {
  file?: IFileWithPath;
  status: string;
  id: string;
  multipart?: {
    uploadId: string;
    parts: {
      partNumber: number;
      url: string;
      range: {
        start: number;
        end: number;
      };
    }[];
  };
  name: string;
  size: number;
  url?: string;
}

const initialState: IWorkspace = {
  id: "",
  type: "",
  name: "",
  rootFolderId: "",
  owner: true,
  folders: [],
  basicTransfer: false,
  isAnalyseAllActive: false,
  filesBeingAnalysed: [],
  transferType: "",
  currentTransfer: {
    password: "",
    message: "",
    daysToExpire: 0,
    receivers: [],
    files: {
      id: "",
    },
  },
  transferDrawerOpen: false,
  filesUploading: [],
  foldersUploading: [],
  transferId: "",
  transferPolling: false,
  transferStatus: "",
  shareLinkUrl: "",
  showShareLink: false,
  filesWithVirus: [],
};

export type WorkspaceSliceStateType = Pick<RootState, "workspace">;

export const requestNewProject = createAsyncThunk(
  "[workspaceSlice]: requestNewProject",
  async (
    { workspaceId, projectId, name }: IRequestProjects,
    { rejectWithValue },
  ) => {
    try {
      const { data } = await WorkspaceAPIs.RequestNewProjects({
        workspaceId,
        projectId: projectId,
        name,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const requestListProjects = createAsyncThunk(
  "[workspaceSlice]: requestListProjects",
  async (
    { workspaceId, folderId }: IRequestListProjects,
    { rejectWithValue },
  ) => {
    try {
      return { folders: mockedProjects, workspaceId, folderId };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const requestFiles = createAsyncThunk(
  "[workspaceSlice]: requestFiles",
  async (
    { workspaceId, folderId, files }: IRequestFiles,
    { rejectWithValue },
  ) => {
    try {
      return { files: mockRequestFiles, workspaceId, folderId };
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const requestListFiles = createAsyncThunk(
  "[workspaceSlice]: requestListFiles",
  async (
    {
      workspaceId,
      folderId,
    }: {
      workspaceId: string;
      folderId: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await WorkspaceAPIs.RequestListFiles({
        workspaceId,
        folderId,
      });

      return { data: data.data, workspaceId, folderId };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const requestRenameProject = createAsyncThunk(
  "[workspaceSlice]: requestRenameProject",
  async (
    {
      workspaceId,
      projectId,
      title,
    }: {
      workspaceId: string;
      projectId: string;
      title: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await WorkspaceAPIs.UpdateProjectName({
        workspaceId,
        folderId: projectId,
        title,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const requestRemoveFile = createAsyncThunk(
  "[workspaceSlice]: requestRemoveFile",
  async (
    {
      workspaceId,
      folderId,
      fileId,
    }: {
      workspaceId: string;
      folderId: string;
      fileId: string;
    },
    { rejectWithValue },
  ) => {
    try {
      await WorkspaceAPIs.RequestRemoveFile({
        workspaceId,
        folderId,
        fileId,
      });

      return { workspaceId, folderId, fileId };
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const requestQCProfileEvaluation = createAsyncThunk(
  "[workspaceSlice]: requestQCProfileEvaluation",
  async (
    { workspaceId, projectId, fileId, profiles }: IRequestQCProfileEvaluation,
    { rejectWithValue },
  ) => {
    try {
      const { data } = await WorkspaceAPIs.RequestQCProfileEvaluation({
        workspaceId,
        projectId,
        fileId,
        profiles,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const requestTransferDetailsStatus = createAsyncThunk(
  "[workspaceSlice]: requestTransferDetailsStatus",
  async ({ transferId }: IRequestTransferDetails, { rejectWithValue }) => {
    try {
      const { data } = await WorkspaceAPIs.RequestTransferDetails({
        transferId,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const requestTransferId = createAsyncThunk(
  "[workspaceSlice]: requestTransferId",
  async (data: IRequestTransfer, { rejectWithValue }) => {
    try {
      const response = await WorkspaceAPIs.RequestTransfer(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const workspaceSlice = createSlice({
  name: "[workspaceSlice]",
  initialState,
  reducers: {
    setWorkspace(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.type = action.payload.type;
      state.rootFolderId = action.payload.rootFolderId;
      state.owner = action.payload.owner;
    },
    setBasicTransfer(state, action) {
      state.basicTransfer = action.payload;
    },
    setCurrentTransfer(state, action) {
      state.currentTransfer = action.payload;
    },
    setTransferDrawerOpen(state, action) {
      state.transferDrawerOpen = action.payload;
    },
    setTransferId(state, action) {
      state.transferId = action.payload;
    },
    setTransferType(state, action) {
      state.transferType = action.payload;
    },
    setSubFolder(state, action) {
      state.folders.push(action.payload);
    },
    setIsAnalyseAllWorkspaceFilesActive(state, action) {
      state.isAnalyseAllActive = action.payload;
    },
    setTransferPolling(state, action) {
      state.transferPolling = action.payload;
    },
    setTransferStatus(state, action) {
      state.transferStatus = action.payload;
    },
    setShowShareLink(state, action) {
      state.showShareLink = action.payload;
    },
    setFilesWithVirus(state, action) {
      if (!state.filesWithVirus.includes(action.payload)) {
        state.filesWithVirus = [...state.filesWithVirus, action.payload];
      }
    },
    setRemoveFileWithVirus(state, action) {
      state.filesWithVirus = state.filesWithVirus.filter(
        (file) => file !== action.payload,
      );
    },
    setResetFilesWithVirus(state, action) {
      state.filesWithVirus = action.payload;
    },
    setResetTransfer(state, action) {
      state.transferPolling = action.payload.transferPolling;
      state.transferStatus = action.payload.transferStatus;
      state.showShareLink = action.payload.showShareLink;
      state.currentTransfer = action.payload.currentTransfer;
      state.transferDrawerOpen = action.payload.transferDrawerOpen;
    },
    setFilesUploading(state, action) {
      if (!state.filesUploading.includes(action.payload)) {
        state.filesUploading = [...state.filesUploading, action.payload];
      }
    },
    setRemoveFilesUploading(state, action) {
      state.filesUploading = state.filesUploading.filter(
        (file) => file !== action.payload,
      );
    },
    setFoldersUploading(state, action) {
      if (!state.foldersUploading.includes(action.payload)) {
        state.foldersUploading = [...state.foldersUploading, action.payload];
      }
    },
    setRemoveFoldersUploading(state, action) {
      state.foldersUploading = state.foldersUploading.filter(
        (folder) => folder !== action.payload,
      );
    },
    setProjectName(state, action) {
      state.folders = state.folders.map((folder) => {
        if (folder.id !== action.payload.folderId) {
          return folder;
        } else {
          return {
            ...folder,
            name: action.payload.name,
          };
        }
      });
    },
    setSubFolderFiles(state, action) {
      state.folders = state.folders.map((folder) => {
        if (folder.id !== action.payload.folderId) {
          return folder;
        } else {
          return {
            ...folder,
            files: action.payload.files,
          };
        }
      });
    },

    setNewFilesToFolder(state, action) {
      state.folders = state.folders.map((folder) => {
        if (folder.id !== action.payload.folderId) {
          return folder;
        } else {
          return {
            ...folder,
            files: [...folder.files, ...action.payload.files],
          };
        }
      });
    },

    setPolling(state, action) {
      state.folders = state.folders.map((folder) => {
        if (folder.id !== action.payload.folderId) {
          return folder;
        } else {
          return {
            ...folder,
            polling: action.payload.polling,
          };
        }
      });
    },
    setFilesStatus(state, action) {
      state.folders = state.folders.map((folder) => {
        if (folder.id !== action.payload.folderId) {
          return folder;
        } else {
          const files = folder.files.map((file) => {
            const payloadFile = action.payload.files.find(
              (f: IProjectFile) => f.id === file.id,
            );
            if (payloadFile) {
              return payloadFile;
            }
            return file;
          });

          return {
            ...folder,
            files,
          };
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestListFiles.fulfilled, (state, action) => {
      state.folders = state.folders.map((folder) => {
        if (folder.id !== action.payload?.folderId) {
          return folder;
        } else {
          let filesInProgress = 0;
          if (folder.files.length === 0) {
            const polling = action.payload.data.some(
              (file: IProjectFile) =>
                file.status === "Inprogress" || file.status === "Waiting",
            );
            return {
              ...folder,
              files: action.payload.data,
              polling,
            };
          } else {
            const files = folder.files.map((file) => {
              const requestFile: IProjectFile = action.payload?.data.find(
                (f: IProjectFile) => f.id === file.id,
              );

              if (!requestFile) return file;

              if (["New", "Upload", "Uploading"].includes(file.status)) {
                return file;
              }

              if (
                requestFile.status === "Waiting" ||
                requestFile.status === "Inprogress"
              ) {
                filesInProgress++;
              }

              return requestFile;
            });

            return {
              ...folder,
              files,
              polling: filesInProgress > 0,
            };
          }
        }
      });
    });

    builder.addCase(requestTransferDetailsStatus.fulfilled, (state, action) => {
      const status = action.payload.status;
      const polling = status === "Inprogress" || status === "Waiting";

      if (!polling) {
        state.transferStatus = status;
        if (action.payload.shareLinkUrl) {
          state.shareLinkUrl = action.payload.shareLinkUrl;
        }
      }

      state.transferPolling = polling;
    });

    builder.addCase(requestTransferId.fulfilled, (state, action) => {
      state.transferId = action.payload.id;
      const status = action.payload.status;
      const polling = !["Complete", "Failed"].includes(status);

      if (!polling) {
        state.transferStatus = status;
        if (action.payload.shareLinkUrl) {
          state.shareLinkUrl = action.payload.shareLinkUrl;
        }
      }

      state.transferPolling = polling;
    });

    builder.addCase(requestRemoveFile.fulfilled, (state, action) => {
      state.folders = state.folders.map((folder) => {
        if (folder.id !== action.payload?.folderId) {
          return folder;
        } else {
          return {
            ...folder,
            files: folder.files.filter(
              (file) => file.id !== action.payload?.fileId,
            ),
          };
        }
      });
    });

    builder.addCase(requestQCProfileEvaluation.pending, (state, action) => {
      const { fileId } = action.meta.arg;

      state.filesBeingAnalysed.push(fileId);
    });

    builder.addCase(requestQCProfileEvaluation.fulfilled, (state, action) => {
      const { projectId } = action.meta.arg;
      state.folders = state.folders.map((folder) => {
        if (folder.id !== projectId) {
          return folder;
        } else {
          return {
            ...folder,
            files: folder.files.map((file) => {
              if (file.id !== action.payload.id) {
                return file;
              } else {
                return { ...action.payload };
              }
            }),
          };
        }
      });
      state.filesBeingAnalysed = state.filesBeingAnalysed.filter(
        (fileId) => fileId !== action.payload.id,
      );
    });
  },
});

export const selectWorkspace = (state: WorkspaceSliceStateType) =>
  state.workspace;

export const selectCurrentTransfer = (state: WorkspaceSliceStateType) =>
  state.workspace.currentTransfer;

export const selectTransferType = (state: WorkspaceSliceStateType) =>
  state.workspace.transferType;

export const selectFilesUploading = (state: WorkspaceSliceStateType) =>
  state.workspace.filesUploading;

export const selectFoldersUploading = (state: WorkspaceSliceStateType) =>
  state.workspace.foldersUploading;

export const selectTransferId = (state: WorkspaceSliceStateType) =>
  state.workspace.transferId;

export const selectTransferPolling = (state: WorkspaceSliceStateType) =>
  state.workspace.transferPolling;

export const selectTransferStatus = (state: WorkspaceSliceStateType) =>
  state.workspace.transferStatus;

export const selectShareLinkUrl = (state: WorkspaceSliceStateType) =>
  state.workspace.shareLinkUrl;

export const selectShowShareLink = (state: WorkspaceSliceStateType) =>
  state.workspace.showShareLink;

export const selectFilesWithVirus = (state: WorkspaceSliceStateType) =>
  state.workspace.filesWithVirus;

export const selectProjectFiles =
  (projectId: string) => (state: WorkspaceSliceStateType) =>
    mockedProjects.find((folder) => folder.id === projectId)?.files || [];

export const selectPollingStatus = () => () => false;

export const selectProject = (folderId: string) => () => {
  return mockedProjects.find((folder) => folder.id === folderId);
};

export const {
  setWorkspace,
  setSubFolder,
  setFilesStatus,
  setProjectName,
  setBasicTransfer,
  setTransferDrawerOpen,
  setTransferType,
  setCurrentTransfer,
  setFilesUploading,
  setRemoveFilesUploading,
  setFoldersUploading,
  setRemoveFoldersUploading,
  setTransferId,
  setShowShareLink,
  setResetTransfer,
  setFilesWithVirus,
  setResetFilesWithVirus,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
