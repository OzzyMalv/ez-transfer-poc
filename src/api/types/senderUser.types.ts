export interface IRegisterNewSenderRequest {
  email: string;
}

export interface IRegisterNewSenderResponse {
  id: string;
  email: string;
  firstname: null | string;
  lastname: null | string;
}

export interface ICreateFilesetSessionRequest {
  sender: {
    id: string;
    code: string;
  };
  receivers: string[];
  files: {
    name: string;
    size: number;
  }[];
  message: string;
  days_to_expire: number;
  password: string | null;
}

export interface IPart {
  partNumber: number;
  range: {
    start: number;
    end: number;
  };
  url: string;
}

export interface IMultipartUpload {
  uploadId: string;
  parts: IPart[];
}

export interface IFile {
  name: string;
  size: number;
  url: string;
  multipart?: IMultipartUpload;
}

export interface ICreateFilesetSessionResponse {
  id: string;
  files: IFile[];
}

export interface IFilesetSessionStatusResponse {
  id: string;
  status: string;
  files: {
    name: string;
    size: number;
    status: string;
  }[];
}

export interface IFileWithPath extends File {
  path?: string;
}
