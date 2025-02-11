import axios from "axios";
import { ENV_CONSTANTS } from "@/common/constants/env.const";
import {
  IFilesetSessionsResponse,
  IReceivedRequestAnalyseFilesInfo,
  IRequestSaveTransferToWorkspace,
  ISession,
} from "@/api/types/receivedTransfers.types";

export default class ReceivedTransfersAPIs {
  private static receivedTransfersBaseUrl = `/filesetsessions`;

  public static async RequestAnalyseReceivedFiles(
    params: IReceivedRequestAnalyseFilesInfo,
  ) {
    const receiverFilesEndpoint = `${ENV_CONSTANTS.API_BASE_URL_V2}${this.receivedTransfersBaseUrl}/${params.filesetSessionId}/files/qc`;
    return await axios.post<ISession>(receiverFilesEndpoint, params.files);
  }

  public static async RequestGetReceivedTransfers() {
    return await axios.get<IFilesetSessionsResponse>(
      `${ENV_CONSTANTS.API_BASE_URL_V2}${this.receivedTransfersBaseUrl}`,
    );
  }

  public static async RequestGetSingleReceivedTransfer(
    filesetSessionId: string,
    withFiles: boolean = false,
    password?: string,
  ) {
    const query = withFiles ? "?include=files" : "";
    const headers = password
      ? {
          Accept: "application/json",
          "X-FilesetSessionPassword": password,
        }
      : undefined;
    const url = `${ENV_CONSTANTS.API_BASE_URL_V2}${this.receivedTransfersBaseUrl}/${filesetSessionId}${query}`;
    return await axios.get<ISession>(url, { headers });
  }

  public static async RequestSaveTransferToWorkspace({
    workspaceId,
    filesetSessionId,
    projectId,
    fileKeys,
  }: IRequestSaveTransferToWorkspace) {
    return await axios.post<unknown>(
      `${ENV_CONSTANTS.API_BASE_URL_V2}/workspaces/${workspaceId}/folders/${projectId}/filesetsession/${filesetSessionId}/files`,
      fileKeys,
    );
  }
}
