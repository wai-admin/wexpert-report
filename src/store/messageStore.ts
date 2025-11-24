import { create } from "zustand";
import { NativeDefaultMessage } from "@/lib/nativeMessageType";
import { ELEMENT } from "@/constants/element";

interface MessageState {
  nativeMessage: NativeDefaultMessage | null;
  setNativeMessage: (message: NativeDefaultMessage) => void;
  clearMessage: () => void;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  nativeMessage: null,
  setNativeMessage: (message: NativeDefaultMessage) => {
    set({ nativeMessage: message });
  },
  clearMessage: () => set({ nativeMessage: null }),
}));
