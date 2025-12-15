export interface BridgeMessageData {
  data: BridgeMessage;
}

export interface BridgeMessage {
  accessToken: string;
  nativeVersion: string;
  id: number | null;
  reportMode: ReportOptionType;
}

export enum ReportOptionType {
  ALL_REPORT_HISTORY = "all",
  PATIENT_REPORT_HISTORY = "patient",
  NEW_REPORT = "create",
}

export enum ExportOptionType {
  ALL = "all",
  ONLY_POSITIVE_CASE = "only_positive_case",
}
