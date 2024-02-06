import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [addclass, setAddclass] = useState("");
  const [update, setUpdate] = useState("fa-solid fa-eye");
  const [updateone, setUpdateone] = useState("fa-solid fa-eye");
  const [updatetwo, setUpdatetwo] = useState("fa-solid fa-eye");
  const [type, setType] = useState("password");
  const [typeone, setTypeone] = useState("password");
  const [typetwo, setTypetwo] = useState("password");
  const [validPwd, setValidPwd] = useState("");
  const [validPwdone, setValidPwdone] = useState("");
  const [textChange, setTextChange] = useState("");
  const [textChangeOne, setTextChangeOne] = useState("");
  const [strength, setStrength] = useState("");
  const [strengthOne, setStrengthOne] = useState("");
  const alphabet = /[a-zA-Z]/;
  const number = /[0-9]/;
  const symbols = /[!,@,#,$,%,^,&,*,?,_,(,),-,+,=,~,/,\,|]/;

  return (
    <div className={`main ${addclass}`}>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            <form action="" autocomplete="off" className="sign-in-form">
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

              <div className="actual-form">
                <div className="input-wrap">
                  <i class="fa-solid fa-envelope"></i>
                  <input
                    type="Email"
                    minlength="4"
                    className="input-field"
                    autocomplete="off"
                    required
                    placeholder="Email"
                  />
                </div>

                <div className="input-wrap ">
                  <i class="fa-solid fa-lock"></i>
                  <input
                    type={type}
                    minlength="4"
                    className={`input-field ${validPwd}`}
                    autocomplete="off"
                    placeholder="Password"
                    onChange={(e) => {
                      const password = e.target.value;
                      if (password.length === 0) {
                        setValidPwd("normal");
                        setTextChange("");
                      } else if (
                        alphabet.test(password) &&
                        number.test(password) &&
                        symbols.test(password)
                      ) {
                        setValidPwd("strong");
                        setTextChange("Strong");
                        setStrength("strong");
                      } else if (
                        (alphabet.test(password) && number.test(password)) ||
                        (alphabet.test(password) && symbols.test(password)) ||
                        (number.test(password) && symbols.test(password))
                      ) {
                        setValidPwd("medium");
                        setTextChange("Medium");
                        setStrength("medium");
                      } else {
                        setValidPwd("low");
                        setTextChange("Weak");
                        setStrength("low");
                      }
                    }}
                  />
                  <i
                    className={`${update}`}
                    onClick={() => {
                      if (update === "fa-solid fa-eye") {
                        setUpdate("fa-solid fa-eye-slash");
                        setType("text");
                      } else {
                        setUpdate("fa-solid fa-eye");
                        setType("password");
                      }
                    }}
                  ></i>
                </div>
                <p className={`fw-bold login-valid valid ${strength}`}>
                  {textChange}
                </p>

                <input type="submit" value="Sign In" className="sign-btn" />
              </div>
            </form>

            <form action="" autocomplete="off" className="sign-up-form">
              <div className="heading">
                <h2>Get Started</h2>
                <h6>Already have an account?</h6>
                <a href="#" className="toggle" onClick={() => setAddclass()}>
                  Sign in
                </a>
              </div>

              <div className="actual-form mt-3">
                <div className="input-wrap">
                  <i class="fa-solid fa-user"></i>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Name"
                  />
                </div>
                <div className="input-wrap">
                  <i className="fa-solid fa-phone"></i>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="input-wrap">
                  <i class="fa-solid fa-envelope"></i>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="Email"
                  />
                </div>

                <div className="input-wrap">
                  <i class="fa-solid fa-lock"></i>
                  <input
                    type={typeone}
                    className={`input-field ${validPwdone}`}
                    placeholder="Create Password"
                    onChange={(e) => {
                      const passwordone = e.target.value;
                      if (passwordone.length === 0) {
                        setValidPwdone("normal");
                        setTextChangeOne("");
                      } else if (
                        alphabet.test(passwordone) &&
                        number.test(passwordone) &&
                        symbols.test(passwordone)
                      ) {
                        setValidPwdone("strong");
                        setTextChangeOne("Strong");
                        setStrengthOne("strong");
                      } else if (
                        (alphabet.test(passwordone) &&
                          number.test(passwordone)) ||
                        (alphabet.test(passwordone) &&
                          symbols.test(passwordone)) ||
                        (number.test(passwordone) && symbols.test(passwordone))
                      ) {
                        setValidPwdone("medium");
                        setTextChangeOne("Medium");
                        setStrengthOne("medium");
                      } else {
                        setValidPwdone("low");
                        setTextChangeOne("Weak");
                        setStrengthOne("low");
                      }
                    }}
                  />
                  <i
                    className={`${updateone}`}
                    onClick={() => {
                      if (updateone === "fa-solid fa-eye") {
                        setUpdateone("fa-solid fa-eye-slash");
                        setTypeone("text");
                      } else {
                        setUpdateone("fa-solid fa-eye");
                        setTypeone("password");
                      }
                    }}
                  ></i>
                </div>
                <p className={`fw-bold signup-valid valid ${strengthOne}`}>
                  {textChangeOne}
                </p>
                <div className="input-wrap">
                  <i class="fa-solid fa-lock"></i>
                  <input
                    type={typetwo}
                    className={`input-field `}
                    placeholder="Confirm Password"
                  />
                  <i
                    className={`${updatetwo}`}
                    onClick={() => {
                      if (updatetwo === "fa-solid fa-eye") {
                        setUpdatetwo("fa-solid fa-eye-slash");
                        setTypetwo("text");
                      } else {
                        setUpdatetwo("fa-solid fa-eye");
                        setTypetwo("password");
                      }
                    }}
                  ></i>
                </div>

                <input type="submit" value="Sign Up" className="sign-btn" />
              </div>
            </form>
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

export default Login;
