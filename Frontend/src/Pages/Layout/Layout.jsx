import ShowHideNavbar from '../../Components/ShowHideNavbar/ShowHideNavbar';
import Navbar from '../../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
const Layout = () => {
    return <>
    <ShowHideNavbar>
      <div style={{position:'fixed',top:'0',zIndex:"2", width:'100%',background:'white'}}>
      <Navbar />
      </div>

    </ShowHideNavbar>
      <Outlet />
      <ShowHideNavbar>
      <Footer/>
      </ShowHideNavbar>
    </>;
  };
  
  export default Layout;