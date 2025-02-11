import { Preview, Qc } from "@/api/types/receiverUser.types";

export interface IRequestReceivedTransfers {
  limit: number;
  offset: number;
}
export interface IRequestGetSingleReceivedTransfer {
  filesetSessionId: string;
  withFiles: boolean;
  password?: string;
}
export interface IRequestGetSingleReceivedTransferFileAnalysis {
  filesetSessionId: string;
  files: IReceivedRequestAnalyseFile[];
}

export interface File {
  fileKey: string; // <uuid> as the File identifier
  name: string;
  size: number;
  downloadUrl?: string;
  preview: Preview;
  qc: Qc;
  status: string;
}

export interface IReceivedRequestAnalyseFile {
  fileKey: string;
  qc: {
    profiles: { name: string }[];
  };
}

export interface IReceivedRequestAnalyseFilesInfo {
  filesetSessionId: string;
  files: IReceivedRequestAnalyseFile[];
}

export interface IFilesetSessionsResponse {
  meta: {
    totalRows: number;
    pageSize: number;
  };
  data: {
    filesetSessions: ISession[];
  };
}

export interface ISession {
  id: string;
  senderEmail: string;
  message: string;
  isPasswordProtected: boolean;
  expirationDate: string;
  numberOfFiles: number;
  totalFilesize: number;
  creationDate: string;
  shareLinkUrl: string;
  downloadUrl: string;
  files?: File[];
}

export interface IRequestSaveTransferToWorkspace {
  filesetSessionId: string;
  workspaceId: string;
  projectId: string;
  fileKeys: { fileKey: string }[];
}
