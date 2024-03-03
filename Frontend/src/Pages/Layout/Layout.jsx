import ShowHideNavbar from '../../Components/ShowHideNavbar/ShowHideNavbar';
import Navbar from '../../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom';
const Layout = () => {
    return <>
    <ShowHideNavbar>
    <Navbar />
    </ShowHideNavbar>
      <Outlet />
    </>;
  };
  
  export default Layout;