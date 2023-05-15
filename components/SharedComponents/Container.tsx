import { ReactNode } from 'react';

type ContainerPropsT = {
  className?: string;
  children?: ReactNode | null;
};

function Container(props: ContainerPropsT) {
  return <div className={`${props?.className || ''} h-screen w-screen overflow-auto`}>{props?.children}</div>;
}
export default Container;
