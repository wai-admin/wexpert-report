import { create } from "zustand";
import { NativeMessage } from "@/lib/nativeMessageType";

interface MessageState {
  nativeMessage: NativeMessage | null;
  setNativeMessage: (message: NativeMessage) => void;
  clearMessage: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  nativeMessage: null,
  setNativeMessage: (message: NativeMessage) => set({ nativeMessage: message }),
  clearMessage: () => set({ nativeMessage: null }),
}));
