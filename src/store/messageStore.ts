import { create } from "zustand";

interface MessageState {
  receivedMessage: string | object;
  setReceivedMessage: (message: string | object) => void;
  clearMessage: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  receivedMessage: "",
  setReceivedMessage: (message: string | object) =>
    set({ receivedMessage: message }),
  clearMessage: () => set({ receivedMessage: "" }),
}));
