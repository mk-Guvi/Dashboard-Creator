import { useRouter } from 'next/router';
import { useState } from 'react';
import { Icon } from '../Icons';
import { SidebarContainer } from './components';
export const Sidebar = () => {
  const [collapse, setCollapse] = useState(false);
  const toggleSidebar = () => {
    setCollapse(!collapse);
  };
  const router = useRouter();

  return (
    <>
      <Icon
        icon="align-justify"
        className="block cursor-pointer right-4 top-4 fixed z-40 sm:hidden"
        onClick={() => setCollapse(!collapse)}
      />
      <div className={`sm:w-[15rem] hidden sm:block  fixed z-40   h-screen overflow-auto  p-2`}>
        <SidebarContainer toggleSidebar={toggleSidebar} selectedItem={router.pathname} />
      </div>
      <div className={`  ${!collapse ? 'hidden' : 'block'} sm:hidden  fixed z-40 duration-200  w-screen   h-screen overflow-auto  p-2`}>
        <SidebarContainer toggleSidebar={toggleSidebar} selectedItem={router.pathname} />
      </div>
    </>
  );
};
