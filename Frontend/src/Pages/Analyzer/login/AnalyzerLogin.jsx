import React, { useEffect, useState } from "react";
import "./LoginSignup.css";
import AdminLogin from "../../../Components/AdminLogin/AdminLogin";
import { useNavigate } from "react-router-dom";

function AnalyzerLogin() {
  const [addclass, setAddclass] = useState("");
  const loginToken = localStorage.getItem("loginToken");
  const navigate = useNavigate("");
  useEffect(() => {
    if (loginToken) {
      navigate("/Analyzer");
    }
  },[loginToken]);

  return (
    <>
      <div className={`main ${addclass} border border-danger`}>
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
    </>
  );
}

export default AnalyzerLogin;
