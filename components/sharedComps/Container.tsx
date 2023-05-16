import { ReactNode } from 'react';

type ContainerPropsT = {
  className?: string;
  children?: ReactNode | null;
};

export const Container = (props: ContainerPropsT) => {
  return <div className={`${props?.className || ''} h-screen w-screen overflow-auto`}>{props?.children}</div>;
};
