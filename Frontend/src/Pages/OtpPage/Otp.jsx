import React, { useEffect, useRef, useState } from "react";
import "./Otp.css";
import { useNavigate, useParams } from "react-router-dom";
import { useGetActivateQuery, useGetOtpQuery } from "../../Service/UserAuthApi";
import { storeToken } from "../../Service/LocalStorageService";
function Otp() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [checkNumber, setCheckNumber] = useState();
  const [activateEmail, setActivateEmail] = useState("")
  const inputRefs = useRef([]);
  const {name,email}=useParams()

  const {data}=  useGetOtpQuery(email)
  const navigate=useNavigate()
  const {data:activateData}=useGetActivateQuery(activateEmail)
  console.log(data);
  console.log(activateData);
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  const handleChange = (index, e) => {
    const { value } = e.target;
    if (!isNaN(value) && value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < otp.length - 1 && value !== "") {
        inputRefs.current[index + 1].focus();
      }
    }
  };
console.log(otp);
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleClick =  () => {
    console.log("pjohj");
    const otpNumber =otp.join("");

    if(otpNumber.length ===6){
      if(data.otp===parseInt(otpNumber)){
        console.log("pjoiji0uaedrgre");
          setActivateEmail(data.email)
        if(activateData.msg==="Account activation Successful"){
          console.log("uighyitgyigb",activateData.token);
           storeToken(activateData.token)
		   console.log("before: ",name);
           if(name==="home"){
			console.log(name);
            navigate("/")
           }
        } 
      }
    }
  };
  return (
    <div class="container-fluid vh-100  border border-danger  d-flex justify-content-center align-items-center">
      <div class="position-relative">
        <div class="card otp-card p-2 text-center ">
          <h6 className="text-primary">
            Please enter the one time password to verify your account
          </h6>
          <div>
            {" "}
            <span>A code has been sent to</span> <small>*******9897</small>{" "}
          </div>
          <div
            id="otp"
            class="inputs d-flex flex-row justify-content-center mt-2"
          >
            {otp.map((value, index) => (
              <input
                key={index}
                class="m-2 text-center form-control  otp-input rounded"
                type="text"
                ref={(input) => (inputRefs.current[index] = input)}
                value={checkNumber}
                maxlength="1"
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                required
              />
            ))}
          </div>
          <div class="mt-4">
            {" "}
            <button class="btn btn-primary px-4 validate" onClick={handleClick}>Validate</button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
