export interface NativeMessageData {
  data: NativeDefaultMessage | NativePrintMessage;
}

// TODO: null 처리 필요
export interface NativeDefaultMessage {
  accessToken: string;
  assessment: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  chartNo: string;
  exportOptionType: ExportOptionType;
  nativeVersion: string;
  id: number;
}

export interface NativePrintMessage {
  requestPrint: boolean;
}

export enum ExportOptionType {
  ALL = "all",
  ONLY_POSITIVE_CASE = "only_positive_case",
}
