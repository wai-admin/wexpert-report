import { create } from "zustand";
import { NativeMessage } from "@/lib/nativeMessageType";

interface MessageState {
  nativeMessage: NativeMessage | {};
  setNativeMessage: (message: NativeMessage) => void;
  clearMessage: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  nativeMessage: {},
  setNativeMessage: (message: NativeMessage) => set({ nativeMessage: message }),
  clearMessage: () => set({ nativeMessage: {} }),
}));
