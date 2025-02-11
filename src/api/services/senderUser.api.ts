import { getS3UploadInstance } from "@/common/utils/axiosUtils";
import axios, { AxiosProgressEvent, AxiosResponse } from "axios";
import {
  ICreateFilesetSessionRequest,
  ICreateFilesetSessionResponse,
  IFilesetSessionStatusResponse,
  IRegisterNewSenderRequest,
  IRegisterNewSenderResponse,
} from "../types/senderUser.types";

interface IUploadPart {
  part_number: number;
  part_hash: string;
}
interface IFileUploadPart {
  parts: IUploadPart[];
  upload_id: string;
  name: string;
}

export default class SenderUserAPIs {
  private static baseUrl = "/user/sender";
  public static unAuthAxiosInstance = getS3UploadInstance();
  public static async RegisterNewSender(body: IRegisterNewSenderRequest) {
    return (await axios.post(
      `${this.baseUrl}`,
      body,
    )) as AxiosResponse<IRegisterNewSenderResponse>;
  }

  public static async sendEmailVerification(senderId: string) {
    return (await axios.post(
      `${this.baseUrl}/${senderId}/verify`,
      {},
    )) as AxiosResponse<never>;
  }

  public static async verifySenderCode(
    senderId: string,
    verificationCode: string,
  ) {
    return (await axios.post(
      `${this.baseUrl}/${senderId}/verify/${encodeURIComponent(
        verificationCode,
      )}`,
      {},
    )) as AxiosResponse<never>;
  }

  public static async CreateFilesetSession(
    SenderId: string,
    body: ICreateFilesetSessionRequest,
  ) {
    return (await axios.post(
      `${this.baseUrl}/${SenderId}/filesetsession`,
      body,
    )) as AxiosResponse<ICreateFilesetSessionResponse>;
  }

  public static async RequestQC(SenderId: string, FilesetSessionId: string) {
    return (await axios.post(
      `${this.baseUrl}/${SenderId}/filesetsession/${FilesetSessionId}`,
    )) as AxiosResponse<ICreateFilesetSessionResponse>;
  }

  public static async GetFilesetSessionStatus(
    SenderId: string,
    FilesetSessionId: string,
  ) {
    return (await axios.get(
      `${this.baseUrl}/${SenderId}/filesetsession/${FilesetSessionId}`,
    )) as AxiosResponse<IFilesetSessionStatusResponse>;
  }

  public static async RequestCancelQC(
    SenderId: string,
    FilesetSessionId: string,
  ) {
    return (await axios.delete(
      `${this.baseUrl}/${SenderId}/filesetsession/${FilesetSessionId}`,
    )) as AxiosResponse<IFilesetSessionStatusResponse>;
  }

  public static async UploadFileToS3Bucket(
    uploadEndpoint: string,
    targetFile: Blob,
    onUploadProgress: (e: AxiosProgressEvent) => void,
    signal: AbortSignal,
  ) {
    return await this.unAuthAxiosInstance.put(uploadEndpoint, targetFile, {
      headers: {
        "Content-Type": "",
      },
      onUploadProgress: onUploadProgress,
      signal,
    });
  }

  public static async CompleteMultiPartUpload(
    SenderId: string,
    FilesetSessionId: string,
    parts: IFileUploadPart[],
  ) {
    return await axios.post(
      `${this.baseUrl}/${SenderId}/filesetsession/${FilesetSessionId}/files`,
      { multipart: parts },
    );
  }
}
