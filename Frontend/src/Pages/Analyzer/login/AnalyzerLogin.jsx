import React, { useState } from "react";
import "./LoginSignup.css";
import Login from '../../../Components/login/Login'
import Register from "../../../Components/register/Register";


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
                <h6>Not registred yet?</h6>
                <a
                  href="#"
                  className="toggle"
                  onClick={() => setAddclass("sign-up-mode")}
                >
                  Sign up
                </a>
              </div>
              <Login value='/Analyzer'/>
            </div>
            <div className="form sign-up-form">
            <div className="heading">
                <h2>Get Started</h2>
                <h6>Already have an account?</h6>
                <a href="#" className="toggle" onClick={() => setAddclass()}>
                  Sign in
                </a>
              </div>
            <Register value='/Analyzer  '/>
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
