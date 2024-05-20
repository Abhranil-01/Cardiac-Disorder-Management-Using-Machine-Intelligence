import React,{useState,useEffect}from 'react'
import './Navbar.css'
import { useDispatch } from 'react-redux';
import { useNavigate,Link,NavLink } from 'react-router-dom';
import { unSetUserToken } from '../../Features/authSlice';
import { getToken, removeToken } from '../../Service/LocalStorageService';
import { setUserInfo, unsetUserInfo } from '../../Features/userSlice';
import {useGetLoggedUserQuery} from'../../Service/UserAuthApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';
import Profile from '../Profile/Profile';

function Navbar() {
  //   const navigate = useNavigate()
  //   const dispatch = useDispatch()
  //   const { access_token } = getToken()

 

  // const { data, isSuccess } = useGetLoggedUserQuery(access_token)

  // const [userData, setUserData] = useState({
  //   email: "",
  //   name: ""
  // })

  // // Store User Data in Local State
  // useEffect(() => {
  //   if (data && isSuccess) {
  //     setUserData({
  //       email: data.email,
  //       name: data.name,
  //     })
  //   }
  // }, [data, isSuccess])

  // // Store User Data in Redux Store
  // useEffect(() => {
  //   if (data && isSuccess) {
  //     dispatch(setUserInfo({
  //       email: data.email,
  //       name: data.name
  //     }))
  //   }
  // }, [data, isSuccess, dispatch])

  return (
    <>
      <nav className="navbar navbar-expand-lg px-2">
        <div className="container-fluid">
            <NavLink className="navbar-brand me-auto fs-2" >HeartFelt</NavLink>

            <div className="offcanvas offcanvas-end bg-success" tabindex="-1" id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title text-white" id="offcanvasNavbarLabel">Heart</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav  justify-content-center flex-grow-1 pe-3">
                        <li className="nav-item">
                            <NavLink to='/' className={({isActive})=>`${isActive ? 'nav-link active':'nav-link '}  `} aria-current="page" href="#">Home</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink to='/BookTest' className={({isActive})=>`${isActive? 'nav-link active':'nav-link'} mx-lg-2`} href="#">Book Test</NavLink>
                        </li> */}
                        <li className="nav-item">
                            <NavLink to='/OrderMedichine' className={({isActive})=>`${isActive? 'nav-link active':'nav-link'} mx-lg-2`} href="#">Order Medicine</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/AboutUs' className={({isActive})=>`${isActive? 'nav-link active':'nav-link'} mx-lg-2`} href="#">About Us</NavLink>
                        </li>

                    </ul>
                </div>
            </div>
              <NavLink to='cart' className='fs-4 me-2 text-success'><FontAwesomeIcon icon={faCartShopping}/></NavLink>
            {/* {access_token ?(<NavLink to='/' className="login-button" onClick={handleLogout}>Logout</NavLink>):(<NavLink to='/login' className="login-button" >Login</NavLink>)}
             */}
             <Profile/>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </div>
    </nav>
    </>
  )
}

export default Navbar
