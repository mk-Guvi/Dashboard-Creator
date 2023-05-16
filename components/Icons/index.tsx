import { FC, MouseEventHandler } from 'react';
import IconInner, { IconTypeT } from './iconInner';

interface IconPropsI {
  icon: IconTypeT;
  className?: string;
  fill?: string;
  otherProps?: any;
  strokeWidth?: number;
  onClick?: MouseEventHandler<SVGSVGElement>;
  id?: string;
}

export const Icon: FC<IconPropsI> = (props) => {
  const { icon, id, strokeWidth = 2, className, fill = 'none', ...otherProps } = props;
  if (!icon) {
    return null;
  }

  return (
    <svg
      width={'100%'}
      height={'100%'}
      id={id}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={`${className} feather feather-${icon} h-6 w-6 `}
      {...otherProps}
      onClick={props.onClick}
      strokeLinecap="round"
      strokeLinejoin="round">
      <IconInner icon={icon} />
    </svg>
  );
};
