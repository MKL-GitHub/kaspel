import React from "react";

import "./index.scss";

export interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="PageLayout">
      <div className="PageLayout-content">{children}</div>
    </div>
  );
};
