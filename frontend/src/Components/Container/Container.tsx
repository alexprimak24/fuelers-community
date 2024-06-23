import React from "react";

interface ContainerProps {
  children?: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return <div className="px-[140px]">{children}</div>;
}

export default Container;
