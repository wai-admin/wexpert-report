import { createContext, RefObject } from "react";

interface PrintContextType {
  printRef: RefObject<HTMLDivElement | null>;
}

export const PrintContext = createContext<PrintContextType | null>(null);
