import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { setUserToken } from '../../Features/authSlice';
import { getToken, storeToken } from '../../Service/LocalStorageService';
import { useLoginUserMutation } from '../../Service/UserAuthApi';


function AdminLogin() {

  const [type, setType] = useState("password");
  const [update, setUpdate] = useState("fa-solid fa-eye");
  const [server_error, setServerError] = useState({})
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    const res = await loginUser(actualData)
    if (res.error) {
      // console.log(typeof (res.error.data.errors))
      // console.log(res.error.data.errors)
      setServerError(res.error.data.errors)
      alert('Wrong Email or Password')
    }
    if (res.data) {
      // console.log(typeof (res.data))
      console.log('aswdsd',res.data)
    
        if(res.data.is_admin === false){
          alert('!Sorry This Page For Admin')
          return;
        }else{
          storeToken(res.data.token)
          let { access_token } = getToken()
          dispatch(setUserToken({ access_token: access_token }))
          navigate(``)
        }
 
      
      storeToken(res.data.token)
      let { access_token } = getToken()
      dispatch(setUserToken({ access_token: access_token }))
      navigate(`${value}`)
    }
  }
  let { access_token } = getToken()
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }))
  }, [access_token, dispatch])



  

  return (
    <>
      <form action="" autoComplete="off" onSubmit={handleSubmit}>
        <div className="actual-form">
          <div className="input-wrap">
            <i className="fa-solid fa-envelope"></i>
            <input
              type="email"
              minLength="4"
              className="input-field"
              autoComplete="off"
              placeholder="Email"
              name="email"
            />
          </div>

          <div className="input-wrap">
            <i className="fa-solid fa-lock"></i>
            <input
              type={type}
              minLength="4"
              className={`input-field `}
              autoComplete="off"
              placeholder="Password"
              name="password"
            />
            <i
              className={`${update}`}
              onClick={() => {
                setUpdate(update === "fa-solid fa-eye" ? "fa-solid fa-eye-slash" : "fa-solid fa-eye");
                setType(type === "password" ? "text" : "password");
              }}
            ></i>
          </div>

          <input type="submit" value="Sign In" className="sign-btn" />
        </div>
      </form>
    </>
  );
}

export default AdminLogin;
