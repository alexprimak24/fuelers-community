import React from 'react';

interface IconProps {
  svg: React.ReactNode;
}

const Icon: React.FC<IconProps> = ({ svg }) => {
  return (
    <div className="icon-container">
      {svg}
    </div>
  );
};

export default Icon;