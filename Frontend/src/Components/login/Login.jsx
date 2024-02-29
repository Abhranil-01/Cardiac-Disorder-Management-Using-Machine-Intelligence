import React, { useState, useEffect } from "react";
import getData from "../../Pages/login/getData";

function Login() {
  const [type, setType] = useState("password");
  const [update, setUpdate] = useState("fa-solid fa-eye");
  const [emailone, setEmailOne] = useState("");
  const [pwdone, setPwdOne] = useState("");
  const [email, setEmail] = useState("");

 
  return (
    <>
      <form action="" autoComplete="off" onSubmit={submit}>
        <div className="actual-form">
          <div className="input-wrap">
            <i className="fa-solid fa-envelope"></i>
            <input
              type="email"
              minLength="4"
              className="input-field"
              autoComplete="off"
              placeholder="Email"
              value={emailone}
              onChange={(e) => setEmailOne(e.target.value)}
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
              value={pwdone}
              onChange={(e) => setPwdOne(e.target.value)}
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

export default Login;
