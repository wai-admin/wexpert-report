import { ReactNode } from "react";
import Header from "./Header";

interface A4TemplateProps {
  children: ReactNode;
  pageNumber: number;
  hospitalName: string;
}

const A4Template = ({
  children,
  pageNumber,
  hospitalName,
}: A4TemplateProps) => {
  return (
    <div className="a4-page">
      <div className="a4-content">
        <Header hospitalName={hospitalName} />
        {children}
      </div>
      <div className="page-number-container">
        <p className="page-number">{pageNumber}</p>
      </div>
    </div>
  );
};

export default A4Template;
