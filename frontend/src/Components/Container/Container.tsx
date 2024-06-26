import React from "react";

interface ContainerProps {
  children?: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <div className="px-[16px] ax:px-[20px] as:px-[40px] xl:px-[140px] lg:px-[70px] ">
      {children}
    </div>
  );
}

export default Container;
