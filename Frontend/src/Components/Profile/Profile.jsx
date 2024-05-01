import React,{useState,useEffect} from 'react'
import './style.css'
import { useDispatch } from 'react-redux';
import { useNavigate,Link,NavLink } from 'react-router-dom';
import { unSetUserToken } from '../../Features/authSlice';
import { getToken, removeToken } from '../../Service/LocalStorageService';
import { setUserInfo, unsetUserInfo } from '../../Features/userSlice';
import {useGetLoggedUserQuery} from'../../Service/UserAuthApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';


function Profile() {

    const handleLogout = () => {
        dispatch(unsetUserInfo({ name: "", email: "" }))
        dispatch(unSetUserToken({ access_token: null }))
        removeToken()
        navigate('/')
      }

      const navigate = useNavigate()
      const dispatch = useDispatch()
      const { access_token } = getToken()
  
   
  
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
    <div class="dropdown-btn">
    <img src="/images/how_to_live_with_heart_problem.jpg" alt=""/>
    <div class="dropdown-content">
        <div class="item nav-link"><NavLink to="/profile">Profile</NavLink></div>
        <div class="item nav-link"> <NavLink to='/Orders'>Orders</NavLink></div>
        <div class="item nav-link"> {access_token ?(<NavLink to='/'  onClick={handleLogout}>Logout</NavLink>):(<NavLink to='/login'>Login</NavLink>)}</div>
    </div>

</div>
  )
}

export default Profile
