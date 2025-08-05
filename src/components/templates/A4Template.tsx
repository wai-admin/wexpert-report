import { ReactNode } from "react";
import Header from "./Header";

interface A4TemplateProps {
  children: ReactNode;
}

const A4Template = ({ children }: A4TemplateProps) => {
  return (
    <div className="a4-page">
      <div className="a4-content">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default A4Template;
