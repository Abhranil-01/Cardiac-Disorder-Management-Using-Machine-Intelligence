import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../Service/UserAuthApi'
import { storeToken } from '../../Service/LocalStorageService';

function Register({value}) {
  console.log(value);
  const [display,setDisplay]=useState('d-none')
  const [color,setColor] = useState('text-danger'); 
  const [updateone, setUpdateone] = useState("fa-solid fa-eye");
  const [updatetwo, setUpdatetwo] = useState("fa-solid fa-eye");
  const [typeone, setTypeone] = useState("password");
  const [typetwo, setTypetwo] = useState("password");
  const [validPwdone, setValidPwdone] = useState("");
  const [textChangeOne, setTextChangeOne] = useState("");
  const [strengthOne, setStrengthOne] = useState("");
  // const [matched,setMatched]=useState("");
  // const [matchedText,setMatchedText]=useState("");
  const [server_error, setServerError] = useState({})
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('passwd'),
      password2: data.get('confpwd'),
      phone_number: data.get('ph'),
      tc: data.get('tc'),
    }
    const res = await registerUser(actualData)
    if (res.error) {
      // console.log(typeof (res.error.data.errors))
      console.log('dwaewf',res.error.data.errors)
      setServerError(res.error.data.errors)
     alert(res.error.data.errors.email[0])
    }
    if (res.data) {
      navigate(`/otp-verification/${data.get('email')}`)
    }
  }



  const alphabet = /[a-zA-Z]/;
  const number = /[0-9]/;
  const symbols = /[!,@,#,$,%,^,&,*,?,_,(,),-,+,=,~,/,\,|]/;

  const check =(e)=>{
  setDisplay('flex')
    const passwordone = e.target.value;
    if(passwordone.length === 15){
      setColor('text-success')
    }else{
      setColor('text-danger')
    }
    
    if (passwordone.length === 0) {
      setValidPwdone("normal");
      setTextChangeOne("");
      setDisplay('d-none')
      setColor('text-danger')
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



  
  return (
    <>
      <form action="" autocomplete="off" onSubmit={handleSubmit}>
            

              <div className="actual-form mt-3">
                <div className="input-wrap">
                  <i className="fa-solid fa-user"></i>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Name"
                    id="name"
                    name="name"
                  />
                </div>
                <div className="input-wrap">
                  <i className="fa-solid fa-phone"></i>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Phone Number"
                    id="ph"
                    name="ph"
                  />
                </div>

                <div className="input-wrap">
                  <i className="fa-solid fa-envelope"></i>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="Email"
                    id="email"
                    name="email"
                  />
                </div>

                <div className="input-wrap">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type={typeone}
                    className={`input-field ${validPwdone}`}
                    placeholder="Create Password"
                    id="passwd"
                    name="passwd"
                    onChange={check}
                    minLength={6}
                    maxLength={15}
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
          
                    <p className={`${color} ${display} fw-bold text-center password-checker`} >Minimum Password length is 6 </p>
                  
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
                    id="confpwd"
                    name="confpwd"
                  
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
                  {/* <p className={`${matched}`} style={{position:'absolute',top:'95%',right:'0',fontSize:'12px'}}>{matchedText}</p> */}
                </div>

                <button type="submit"  className="sign-btn" >Register</button>
              </div>
             
            </form>
    </>
  )
}

export default Register
