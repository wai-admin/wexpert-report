import { createContext, useContext, RefObject } from "react";

interface PrintContextType {
  printRef: RefObject<HTMLDivElement | null>;
}

const PrintContext = createContext<PrintContextType | null>(null);

export const usePrintContext = () => {
  const context = useContext(PrintContext);
  if (!context) {
    throw new Error("usePrintContext must be used within PrintProvider");
  }
  return context;
};

export const PrintProvider = ({
  children,
  printRef,
}: {
  children: React.ReactNode;
  printRef: RefObject<HTMLDivElement | null>;
}) => {
  return (
    <PrintContext.Provider value={{ printRef }}>
      {children}
    </PrintContext.Provider>
  );
};
