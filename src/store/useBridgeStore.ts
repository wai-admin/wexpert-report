import { create } from "zustand";
import { BridgeMessage } from "@/lib/bridgeMessageType";

interface BridgeState {
  bridgeMessage: BridgeMessage | null;
  setBridgeMessage: (message: BridgeMessage) => void;
  clearBridgeMessage: () => void;
}

export const useBridgeStore = create<BridgeState>((set) => ({
  bridgeMessage: null,
  setBridgeMessage: (message: BridgeMessage) => {
    set({ bridgeMessage: message });
  },
  clearBridgeMessage: () => set({ bridgeMessage: null }),
}));
