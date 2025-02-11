import {
  INewProjectsResponse,
  IProjectsResponse,
  IRequestFiles,
  IRequestListProjects,
  IRequestNewProjects,
  IRequestProjects,
  IRequestQCProfileEvaluation,
  IRequestTransfer,
  IRequestTransferId,
  IRequestUpdateFile,
  IResponseTransfer,
} from "@/api/types/workspace.types";
import { ENV_CONSTANTS } from "@/common/constants/env.const";
import routes from "@/common/constants/routes";
import axios from "axios";

export default class WorkspaceAPIs {
  private static baseUrl = routes.WORKSPACES;

  public static async RequestWorkspaces() {
    return await axios.get(`${ENV_CONSTANTS.API_BASE_URL_V2}${this.baseUrl}`);
  }

  public static async RequestProjects({
    workspaceId,
    projectId,
  }: IRequestProjects) {
    return await axios.get<IProjectsResponse>(
      `${ENV_CONSTANTS.API_BASE_URL_V2}/workspaces/${workspaceId}/folders/${projectId}`,
      { params: { limit: 100 } },
    );
  }

  public static async RequestDeleteProject({
    workspaceId,
    projectId,
  }: IRequestProjects) {
    return await axios.delete<IProjectsResponse>(
      `${ENV_CONSTANTS.API_BASE_URL_V2}/workspaces/${workspaceId}/folders/${projectId}`,
    );
  }

  public static async RequestNewProjects({
    workspaceId,
    projectId,
    name,
  }: IRequestNewProjects) {
    return await axios.post<INewProjectsResponse>(
      `${ENV_CONSTANTS.API_BASE_URL_V2}/workspaces/${workspaceId}/folders/${projectId}`,
      {
        name,
      },
    );
  }

  public static async RequestListProjects({
    workspaceId,
    folderId,
  }: IRequestListProjects) {
    return await axios.get(
      `${ENV_CONSTANTS.API_BASE_URL_V2}${this.baseUrl}/${workspaceId}/folders/${folderId}`,
    );
  }

  public static async RequestFiles(data: IRequestFiles) {
    return await axios.post(
      `${ENV_CONSTANTS.API_BASE_URL_V2}${this.baseUrl}/${data.workspaceId}/folders/${data.folderId}/files`,
      data.files,
    );
  }

  public static async RequestUpdateFile(data: IRequestUpdateFile) {
    return await axios.patch(
      `${ENV_CONSTANTS.API_BASE_URL_V2}${this.baseUrl}/${data.workspaceId}/folders/${data.folderId}/files/${data.fileId}`,
      { status: data.status, multipart: data.multipart },
    );
  }

  public static async RequestListFiles({
    workspaceId,
    folderId,
  }: {
    workspaceId: string;
    folderId: string;
  }) {
    return await axios.get(
      `${ENV_CONSTANTS.API_BASE_URL_V2}${this.baseUrl}/${workspaceId}/folders/${folderId}/files`,
    );
  }

  public static async UpdateProjectName({
    workspaceId,
    folderId,
    title,
  }: {
    workspaceId: string;
    folderId: string;
    title: string;
  }) {
    return await axios.put(
      `${ENV_CONSTANTS.API_BASE_URL_V2}${this.baseUrl}/${workspaceId}/folders/${folderId}`,
      { name: title },
    );
  }

  public static async RequestRemoveFile({
    workspaceId,
    folderId,
    fileId,
  }: {
    workspaceId: string;
    folderId: string;
    fileId: string;
  }) {
    return await axios.delete(
      `${ENV_CONSTANTS.API_BASE_URL_V2}${this.baseUrl}/${workspaceId}/folders/${folderId}/files/${fileId}`,
    );
  }

  public static async RequestQCProfileEvaluation({
    workspaceId,
    projectId,
    fileId,
    profiles,
  }: IRequestQCProfileEvaluation) {
    return await axios.post(
      `${ENV_CONSTANTS.API_BASE_URL_V2}/workspaces/${workspaceId}/folders/${projectId}/files/${fileId}/qc`,
      {
        profiles,
      },
    );
  }

  public static async RequestTransfer(data: IRequestTransfer) {
    return await axios.post<IResponseTransfer>(
      `${ENV_CONSTANTS.API_BASE_URL_V2}/filesetsessions`,
      data,
    );
  }

  public static async RequestTransferDetails(id: IRequestTransferId) {
    return await axios.get<IResponseTransfer>(
      `${ENV_CONSTANTS.API_BASE_URL_V2}/filesetsessions/${id.transferId}`,
    );
  }
}
