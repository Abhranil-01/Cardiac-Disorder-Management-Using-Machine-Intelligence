import ShowHideNavbar from '../../Components/ShowHideNavbar/ShowHideNavbar';
import Navbar from '../../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
const Layout = () => {
    return <>
    <ShowHideNavbar>
    <Navbar />
    </ShowHideNavbar>
      <Outlet />
      <ShowHideNavbar>
      <Footer/>
      </ShowHideNavbar>
    </>;
  };
  
  export default Layout;