import { useContext } from "react";
import { PrintContext } from "@/context/PrintContext";

export const usePrintContext = () => {
  const context = useContext(PrintContext);
  if (!context) {
    throw new Error("usePrintContext must be used within PrintProvider");
  }
  return context;
};
