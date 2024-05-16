import React from 'react'
import { NavLink } from "react-router-dom";
function NotLogin({title}) {
  return (
    <div className=" container-fluid vh-100 ">
    <div className="row h-100  justify-content-center align-items-center">
      <div className="col-5 p-0">
        <div class="card border-0 text-center">
          <img
            src="\src\Images\icon\computer-security-with-login-password-padlock.jpg"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body text-center ">
            <p class="card-text">
              PLEASE{"  "}
              <span className="btn btn-primary">
                <NavLink
                  to="/login"
                  className="text-white text-decoration-none"
                >
                  LOGIN
                </NavLink>
              </span>
              {"   "}AND SEE {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default NotLogin
