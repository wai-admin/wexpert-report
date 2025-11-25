export interface NativeMessageData {
  data: NativeDefaultMessage;
}

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

export enum ExportOptionType {
  ALL = "all",
  ONLY_POSITIVE_CASE = "only_positive_case",
}
