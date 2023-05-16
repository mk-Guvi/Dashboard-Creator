import React, { ReactNode, useState } from 'react';

type TooltipPropsT = {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
};
const Tooltip: React.FC<TooltipPropsT> = ({ content, position = 'bottom', children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const tooltipStyles: React.CSSProperties = {
    position: 'absolute',
    color: 'white',
    borderRadius: '0.25rem',
    padding: '0.5rem',
    fontSize: '0.875rem',
    zIndex: 10,
  };

  if (position === 'top') {
    tooltipStyles.bottom = '100%';
    tooltipStyles.left = '50%';
    tooltipStyles.transform = 'translateX(-50%) translateY(-0.5rem)';
  } else if (position === 'bottom') {
    tooltipStyles.top = '70%';
    tooltipStyles.left = '50%';
    tooltipStyles.transform = 'translateX(-70%) translateY(0.5rem)';
  } else if (position === 'left') {
    tooltipStyles.top = '50%';
    tooltipStyles.right = '100%';
    tooltipStyles.transform = 'translateY(-50%) translateX(-0.5rem)';
  } else if (position === 'right') {
    tooltipStyles.top = '50%';
    tooltipStyles.left = '100%';
    tooltipStyles.transform = 'translateY(-50%) translateX(0.5rem)';
  }

  return (
    <div className="relative">
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
      {isHovered && <div style={tooltipStyles}>{content}</div>}
    </div>
  );
};

export default Tooltip;
