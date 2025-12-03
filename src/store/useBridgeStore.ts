import { create } from "zustand";
import { BridgeMessage } from "@/lib/bridgeMessageType";

interface BridgeStore {
  bridgeMessage: BridgeMessage | null;
  setBridgeMessage: (message: BridgeMessage) => void;
  isInitializedBridgeMessage: boolean;
}

export const useBridgeStore = create<BridgeStore>((set) => ({
  bridgeMessage: null,
  setBridgeMessage: (message: BridgeMessage) => {
    set({ bridgeMessage: message, isInitializedBridgeMessage: true });
  },
  isInitializedBridgeMessage: false,
}));
