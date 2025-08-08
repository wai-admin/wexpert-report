export interface NativeMessageData {
  data: NativeMessage;
}

// TODO: null 처리 필요
export interface NativeMessage {
  accessToken: string;
  assessment: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  chartNo: string;
  exportOptionType: string;
  id: number;
}
