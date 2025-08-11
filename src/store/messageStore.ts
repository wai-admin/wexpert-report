import { create } from "zustand";
import {
  NativeDefaultMessage,
  NativePrintMessage,
} from "@/lib/nativeMessageType";

interface MessageState {
  nativeMessage: NativeDefaultMessage | NativePrintMessage | null;
  setNativeMessage: (
    message: NativeDefaultMessage | NativePrintMessage
  ) => void;
  clearMessage: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  nativeMessage: null,
  setNativeMessage: (message: NativeDefaultMessage | NativePrintMessage) =>
    set({ nativeMessage: message }),
  clearMessage: () => set({ nativeMessage: null }),
}));
