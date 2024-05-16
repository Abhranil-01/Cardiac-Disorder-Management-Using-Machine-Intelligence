import React, { useState } from "react";
import "./LoginSignup.css";
import Login from '../../../Components/login/Login'
import Register from "../../../Components/register/Register";
import AdminLogin from "../../../Components/AdminLogin/AdminLogin";


function AnalyzerLogin() {
  const [addclass, setAddclass] = useState("");
  
  return (
    <div className={`main ${addclass}`}>
      <div className="formbox">
        <div className="inner-box">
          <div className="forms-wrap">
            <div className="form sign-in-form">
            <div className="heading">
                <h2>Welcome Back</h2>
             
              </div>
              <AdminLogin />
            </div>
          
          </div>
          <div className="carousel">
            <div className="images-wrapper">
              <img
                src="\src\Images\7774236_3736765.jpg"
                className="image img-1 show"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyzerLogin;
