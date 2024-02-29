import React, { useState } from "react";
import postData from "../../Pages/login/postData";

function Register() {
  const [updateone, setUpdateone] = useState("fa-solid fa-eye");
  const [updatetwo, setUpdatetwo] = useState("fa-solid fa-eye");
  const [typeone, setTypeone] = useState("password");
  const [typetwo, setTypetwo] = useState("password");
  const [validPwdone, setValidPwdone] = useState("");
  const [textChangeOne, setTextChangeOne] = useState("");
  const [strengthOne, setStrengthOne] = useState("");
  const [name,setName]=useState("");
  const [ph,setPh]=useState("");
  const [email,setEmail]=useState("");
  const [pwd,setPwd]=useState("");
  const [matched,setMatched]=useState("");
  const [matchedText,setMatchedText]=useState("");

  const alphabet = /[a-zA-Z]/;
  const number = /[0-9]/;
  const symbols = /[!,@,#,$,%,^,&,*,?,_,(,),-,+,=,~,/,\,|]/;

  const check =(e)=>{
  
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
  }

  const add = async (e) => {
    e.preventDefault();

        await postData({ name, ph,email,pwd });
      setName('');
      setPh('');
      setEmail('');
      setPwd('');
      setConfPwd('');
      setValidPwdone("normal");
      setTextChangeOne("");
    
      
 
  };

  
  return (
    <>
      <form action="" autocomplete="off" onSubmit={add}>
            

              <div className="actual-form mt-3">
                <div className="input-wrap">
                  <i className="fa-solid fa-user"></i>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>
                <div className="input-wrap">
                  <i className="fa-solid fa-phone"></i>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Phone Number"
                    value={ph}
                    onChange={(e)=>setPh(e.target.value)}
                  />
                </div>

                <div className="input-wrap">
                  <i className="fa-solid fa-envelope"></i>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>

                <div className="input-wrap">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type={typeone}
                    className={`input-field ${validPwdone}`}
                    placeholder="Create Password"
                    value={pwd}
                    onChange={(e)=>{ setPwd(e.target.value);check(e)}}
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
                <div className="input-wrap ">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type={typetwo}
                    className={`input-field `}
                    placeholder="Confirm Password"
                    onChange={(e)=>{
                        const pwdchecking = e.target.value
                        if(pwdchecking.length===0){
                            setMatched('')
                            setMatchedText('')
                        }
                        else if(pwd===pwdchecking){
                            setMatched('matched')
                            setMatchedText('Password Matched')
                        }else{
                            setMatched('notmatched')
                            setMatchedText('Password Not Matched')
                        }
                    }}
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
                  <p className={`${matched}`} style={{position:'absolute',top:'95%',right:'0',fontSize:'12px'}}>{matchedText}</p>
                </div>

                <button type="submit"  className="sign-btn" >Sign Up</button>
              </div>
            </form>
    </>
  )
}

export default Register
