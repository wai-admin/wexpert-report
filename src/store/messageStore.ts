import { create } from "zustand";
import {
  ExportOptionType,
  NativeDefaultMessage,
} from "@/lib/nativeMessageType";

interface MessageState {
  nativeMessage: NativeDefaultMessage | null;
  setNativeMessage: (message: NativeDefaultMessage) => void;
  clearMessage: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  nativeMessage: {
    accessToken: "",
    assessment: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    chartNo: "",
    exportOptionType: ExportOptionType.ALL,
    id: -1,
  },
  setNativeMessage: (message: NativeDefaultMessage) =>
    set({ nativeMessage: message }),
  clearMessage: () => set({ nativeMessage: null }),
}));
