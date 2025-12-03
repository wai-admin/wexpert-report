import { create } from "zustand";
import { NativeMessage } from "@/lib/nativeMessageType";

interface MessageState {
  nativeMessage: NativeMessage | null;
  setNativeMessage: (message: NativeMessage) => void;
  isInitializedNativeMessage: boolean;
}

export const useMessageStore = create<MessageState>((set) => ({
  nativeMessage: null,
  setNativeMessage: (message: NativeMessage) => {
    set({ nativeMessage: message, isInitializedNativeMessage: true });
  },
  isInitializedNativeMessage: false,
}));
