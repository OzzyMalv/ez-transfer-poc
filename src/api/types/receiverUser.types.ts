import { IProjectFile } from "@/store/slices/workspace.slice";

export interface IRequestReceiverSessionInfo {
  receiverId: string;
  fileSetSessionId: string;
}
export interface IRequestReceiverSessionFilesInfo {
  receiverId: string;
  fileSetSessionId: string;
  password: string;
}

export interface IRequestAnalyseFile {
  id: number;
  qc: {
    profiles: string[];
  };
}
export interface IRequestAnalyseSessionFilesInfo {
  receiverId: string;
  fileSetSessionId: string;
  files: IRequestAnalyseFile[];
}

export interface IReceiverSessionInfoResponse {
  id: string;
  senderEmail: string;
  message: string;
  isPasswordProtected: boolean;
  expirationDate: string;
  numberOfFiles: number;
  totalFilesize: number;
  receiverEmail: string;
}

export type QcReportType = {
  id: number;
  name: string;
  category: string;
  state: string;
  display_name: string;
  displayName: string;
  value: string | number | boolean;
};

export type QcSubReport = {
  report: QcReportType[];
};

export const QcAttributeState = {
  ACCEPTED: "Accepted",
  FAILED: "Failed",
  WARNING: "Warning",
} as const;

export const ProfileAnalysisState = {
  ACCEPTED: "Accepted",
  FAILED: "Failed",
} as const;

export type QcResultAttribute = {
  id: number;
  name: string;
  category: string;
  state:
    | typeof QcAttributeState.ACCEPTED
    | typeof QcAttributeState.FAILED
    | typeof QcAttributeState.WARNING;
  displayName: string;
  value: string;
  note: string;
};

export type QcResult = {
  profileName: string;
  state:
    | typeof ProfileAnalysisState.ACCEPTED
    | typeof ProfileAnalysisState.FAILED;
  attributes: QcResultAttribute[];
};

export type Qc = {
  availableProfiles: string[];
  profiles?: {
    name: string;
    results: { state: QcResult["state"]; attributes: QcResultAttribute[] };
  }[];
  results: QcResult[];
  result: {
    report: QcReportType[];
    subReports?: QcSubReport[];
  };
};

export interface DetailedAnalysisState {
  isOpenResults: boolean;
  analysisResult: QcResult | null;
}

export interface File {
  fileId: number;
  id?: string;
  fileName: string;
  fileSize: number;
  fileUrl: string;
  preview: Preview;
  qcReport: QcReportType[];
  shareUrl: string;
  qcSubReports: QcSubReport[];
  qc: Qc;
}

export interface Preview {
  smallThumbnailUrl: string | null;
  largeThumbnailUrl: string | null;
  hasProxy: boolean;
  smallProxyUrl: string | null;
}

export interface IReceiverFileSetSessionInfoResponse {
  id: string;
  senderEmail: string;
  message: string;
  expirationDate: string;
  numberOfFiles: number;
  totalFilesize: number;
  downloadallUrl: string;
  files: IProjectFile[];
  shareLinkUrl: string;
}

export interface IRequestAnalyseFilesInfo {
  receiverId: string;
  fileSetSessionId: string;
  files: IRequestAnalyseFile[];
}

export interface IRequestAnalyseFile {
  id: number;
  qc: {
    profiles: string[];
  };
}

export const qcProfile = {
  DV360: "dv360",
  YOUTUBE: "youtube",
  CM360: "cm360",
  NETFLIX: "netflix",
  AMAZON_DSP: "amazon-dsp",
  AMAZON_PRIME: "amazon-dsp-prime",
  DISNEY_PLUS: "disney-plus",
  THE_TRADE_DESK: "thetradedesk",
  META: "meta",
  SNAPCHAT: "snapchat",
  TIK_TOK: "tiktok",
  X: "x",
  SAMSUNG: "samsung",
  SAMSUNG_CTV: "samsung-ctv",
} as const;
type Values<T> = T[keyof T];
export type Profile = Values<typeof qcProfile>;
