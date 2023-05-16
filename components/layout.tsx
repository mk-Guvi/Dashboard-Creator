import { ReactNode } from 'react';
import { Sidebar } from './bars';

type LayoutPropsT = {
  children?: ReactNode | null;
  classNameContainer?: string;
  classNameChildren?: string;
};
export function Layout(props: LayoutPropsT) {
  return (
    <div className={`${props?.classNameContainer || ''}  w-screen flex   h-screen overflow-auto bg-layout`}>
      <Sidebar />

      {props?.children ? <div className={`${props?.classNameChildren || ''} sm:pl-[15rem]  p-4 flex-1`}>{props?.children}</div> : null}
    </div>
  );
}
