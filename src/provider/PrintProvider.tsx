import React, { RefObject } from "react";
import { PrintContext } from "@/context/PrintContext";

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
