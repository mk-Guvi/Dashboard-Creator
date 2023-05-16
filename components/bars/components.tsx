import Link from 'next/link';
import { Icon } from '../Icons';
import { IconTypeT } from '../Icons/iconInner';
import { SidebarFooterItems, SidebarSectionItems } from './constants';

export type SidebarItemEnityT = {
  label: string;
  value: string;
  iconName?: IconTypeT;
};
type SideBarItemPropsT = SidebarItemEnityT & {
  isSelected?: boolean;
};
export const SideBarItem = (props: SideBarItemPropsT) => {
  const { iconName, label, value, isSelected } = props;
  return (
    <Link href={value}>
      <div
        className={`flex items-center transition-all duration-200 gap-2 flex-wrap hover:bg-white rounded py-2 pr-2 pl-1  cursor-pointer text-white hover:text-black`}
        id={value}>
        {iconName ? <Icon icon={iconName} className={'h-5 w-5 pt-0.5'} id={value} /> : null}
        <p id={value} className={`${isSelected ? 'font-bold' : 'text-sm'}`}>
          {' '}
          {label}
        </p>
      </div>
    </Link>
  );
};

type SidebarContainerPropsT = {
  toggleSidebar: () => void;
  selectedItem: string;
};
export const SidebarContainer = ({ toggleSidebar, selectedItem }: SidebarContainerPropsT) => {
  return (
    <div className="bg-black relative sm:z-40 p-6 rounded-2xl h-full flex flex-col gap-2  w-full">
      <div className="text-white  flex items-center gap-2 flex-wrap">
        <p className="font-bold text-[1.8rem] flex-1">Board.</p>
        <Icon icon="x" className="sm:hidden hover:bg-gray-50 rounded p-1 hover:text-black h-7 w-7 cursor-pointer" onClick={toggleSidebar} />
      </div>
      <section className="flex-1 my-2 flex-col gap-5 flex pr-2 overflow-auto">
        {SidebarSectionItems?.map((each) => {
          return <SideBarItem {...each} key={each.value} isSelected={selectedItem === each?.value} />;
        })}
      </section>
      <footer className="h-20 w-full  flex flex-col gap-2">
        {SidebarFooterItems?.map((each) => {
          return <SideBarItem {...each} key={each.value} isSelected={selectedItem === each?.value} />;
        })}
      </footer>
    </div>
  );
};
