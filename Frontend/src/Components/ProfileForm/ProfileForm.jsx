import React, { useEffect, useState } from "react";
import "./style.css";
import {
  useGetLoggedUserQuery,
  usePostProfileMutation,
} from "../../Service/UserAuthApi";
import { getToken } from "../../Service/LocalStorageService";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfileForm() {
  const { access_token } = getToken();

  const [bloodGroup, setBloodGroup] = useState(null);
  const [gender, setGender] = useState(null);
  const [address, setAddress] = useState(null);
  const [dob, setDOB] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const { data: profile } = useGetLoggedUserQuery(access_token);
  const [postProfile] = usePostProfileMutation();
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setAddress(profile.address);
      setBloodGroup(profile.blood_group);
      setPhone(profile.phone_number);
      setDOB(profile.date_of_birth);
      setGender(profile.gender);
      setEmail(profile.email);
    }
  }, [profile]);

  const handleSave = async (e) => {
    e.preventDefault();

    const res = await postProfile({
      access_token: access_token,
      data: {
        name: name,
        phone_number: phone,
        gender: gender,
        blood_group: bloodGroup,
        date_of_birth: dob,
        address: address,
      },
    });

    console.log("Response:", res);
    setDisable(true);
    if (res.data) {
      console.log(res.data);
      toast.success("Successfully Saved Profile");
    } else {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <>
      {" "}
      <div className=" vw-100 vh-100  d-flex align-items-center justify-content-center  ">
        <div className="container shadow h-75 d-flex flex-column justify-content-around  align-items-center rounded-3">
          <h4>Profile Form</h4>
          <form action="" onSubmit={handleSave}>
            <div className="row justify-content-center ">
              <div className="col-5">
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly
                  />
                  <label for="floatingInput">Email address</label>
                </div>
              </div>
              <div className="col-5">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label for="floatingInput">Name</label>
                </div>
              </div>
              <div className="col-5">
                <div class="form-floating mb-3">
                  <input
                    type="number"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <label for="floatingInput">Phone Number</label>
                </div>
              </div>
              <div class="col-5">
                <div class="form-floating">
                  <select
                    class="form-select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    id="floatingSelectGrid"
                  >
                    <option selected>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <label for="floatingSelectGrid">Select Gender</label>
                </div>
              </div>
              <div class="col-5">
                <div class="form-floating">
                  <select
                    class="form-select"
                    id="floatingSelectGrid"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                  >
                    <option selected>Blood Group</option>
                    <option value="a+">A+</option>
                    <option value="b+">B+</option>
                    <option value="ab+">AB+</option>
                    <option value="o+">O+</option>
                    <option value="a-">A-</option>
                    <option value="ab-">AB-</option>
                  </select>
                  <label for="floatingSelectGrid">Select Blood Group</label>
                </div>
              </div>
              <div className="col-5">
                <div class="form-floating mb-3">
                  <input
                    type="date"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                  />
                  <label for="floatingInput">Date Of Birth</label>
                </div>
              </div>
              <div className="col-10">
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    style={{ height: "60px", resize: "none" }}
                    value={address}
                    onChange={(e=>setAddress(e.target.value))}
                  ></textarea>
                  <label for="floatingTextarea">Address</label>
                </div>
              </div>
              <div className="col-6 mt-5">
                <button className="btn btn-primary w-100">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default ProfileForm;
