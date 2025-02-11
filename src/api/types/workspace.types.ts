export interface IRequestListProjects {
  workspaceId: string;
  folderId: string;
}

export interface IRequestFiles {
  workspaceId: string;
  folderId: string;
  files: {
    name: string;
    size: number;
  }[];
}

export interface IRequestUpdateFile {
  workspaceId: string;
  folderId: string;
  fileId: string;
  status:
    | "waiting"
    | "inprogress"
    | "complete"
    | "failed"
    | "cancelling"
    | "cancel";
  multipart?: {
    uploadId: string;
    parts: { partNumber: number; partHash: string }[];
  };
}

export interface IRequestProjects {
  workspaceId: string;
  projectId: string;
  name?: string;
}

export type ProjectDataType = {
  id: string;
  name: string;
  numberOfFiles: number;
  totalFileSize: number;
  modifiedDate: string;
  preview: {
    //optional?
    largeThumbnailUrl: string;
  };
};

export interface IProjectsResponse {
  meta: {
    totalRows: number;
    pageSize: number;
  };
  data: {
    folders: ProjectDataType[];
  };
}

export interface IRequestNewProjects extends IRequestProjects {
  name?: string;
}

export interface INewProjectsResponse extends ProjectDataType {}

export interface IRequestQCProfileEvaluation {
  workspaceId: string;
  projectId: string;
  fileId: string;
  profiles: { name: string }[];
}

export interface IRequestTransfer {
  receivers: string[];
  files: {
    id: string;
  }[];
  message: string;
  password: string | null;
  daysToExpire: number;
}

export interface IRequestTransferId {
  transferId: string;
}

export interface IRequestTransferDetails {
  transferId: string;
}

export interface IResponseTransfer {
  id: string;
  status: string;
  shareLinkUrl: string;
}
