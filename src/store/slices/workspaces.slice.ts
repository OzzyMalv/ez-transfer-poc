import WorkspaceAPIs from "@/api/services/workspace.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IWorkspace } from "./workspace.slice";
import { IRequestProjects, ProjectDataType } from "@/api/types/workspace.types";
import {
  mockedProjects,
  mockedWorkspaces,
} from "@/store/slices/mockedWorkspaces";

export interface IWorkspaces {
  workspaces: IWorkspace[];
  projects: ProjectDataType[];
  isFetchingProjects: boolean;
}

const initialState: IWorkspaces = {
  workspaces: [],
  projects: [],
  isFetchingProjects: false,
};

export type WorkspacesSliceStateType = Pick<RootState, "workspaces">;

export const requestWorkspaces = createAsyncThunk(
  "[workspacesSlice]: requestWorkspaces",
  async () => {
    const data = mockedWorkspaces;

    return { data };
  },
);

export const getProjects = createAsyncThunk(
  "[workspacesSlice]: getProjects",
  async ({}: IRequestProjects, { rejectWithValue }) => {
    try {
      const data = mockedProjects;
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const deleteProject = createAsyncThunk(
  "[workspacesSlice]: deleteProject",
  async ({ workspaceId, projectId }: IRequestProjects, { rejectWithValue }) => {
    try {
      const { data } = await WorkspaceAPIs.RequestDeleteProject({
        workspaceId,
        projectId,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const workspacesSlice = createSlice({
  name: "[workspacesSlice]",
  initialState,
  reducers: {
    addProject: (state, action) => {
      // Add new project to head of the list
      state.projects = [action.payload, ...state.projects];
    },

    removeProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload,
      );
    },
    setProjectName(state, action) {
      state.projects = state.projects.map((project) => {
        if (project.id !== action.payload.projectId) {
          return project;
        } else {
          return {
            ...project,
            name: action.payload.name,
          };
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestWorkspaces.fulfilled, (draftState, action) => {
      draftState.workspaces = action.payload.data;
    });
    builder.addCase(getProjects.pending, (draftState) => {
      draftState.isFetchingProjects = true;
    });
    builder.addCase(getProjects.fulfilled, (draftState, action) => {
      draftState.projects = action.payload || [];
      draftState.isFetchingProjects = false;
    });
    builder.addCase(getProjects.rejected, (draftState) => {
      draftState.isFetchingProjects = false;
    });
  },
});

export const selectWorkspaces = (state: WorkspacesSliceStateType) =>
  state.workspaces.workspaces;

export const selectProjects = (state: WorkspacesSliceStateType) =>
  state.workspaces.projects;

export const selectIsFetchingProjects = (state: WorkspacesSliceStateType) =>
  state.workspaces.isFetchingProjects;

export const { addProject, removeProject, setProjectName } =
  workspacesSlice.actions;

export default workspacesSlice.reducer;
