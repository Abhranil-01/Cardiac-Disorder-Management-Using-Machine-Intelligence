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
  const [image, setImage] = useState(null);
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
  const [fileOne, setFileOne] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile[0].name);
      setAddress(profile[0].address);
      setBloodGroup(profile[0].blood_group);
      setPhone(profile[0].phone_number);
      setDOB(profile[0].date_of_birth);
      setGender(profile[0].gender);
      setEmail(profile[0].registered_email);
      setImage(profile[0].image);
    }
  }, [profile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log("Selected File:", file);
      setImage(URL.createObjectURL(file));
      setFileOne(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fileOne", fileOne);
    formData.append("name", name);
    formData.append("phone_number", phone);
    formData.append("gender", gender);
    formData.append("blood_group", bloodGroup);
    formData.append("date_of_birth", dob);
    formData.append("address", address);
  
    const res = await postProfile({
      access_token: access_token,
      data: formData,
    });
  
    console.log("Response:", res);
    setDisable(true);
    if (res.data) {
      toast.success("Successfully Saved Profile");
    } else {
      toast.error("Something Went Wrong");
    }
  };

  console.log(image);
  return (
    <>
      {" "}
      <div className="">
        <form encType="multipart/form-data">
          <section className="query-cover">
            <div className="container">
              <div className="contact-box">
                <div className="contact-left">
                  <div id="image">
                    <img
                      src={`http://127.0.0.1:8000${image}`}
                      alt="Profile Picture"
                      id="profile-pic"
                    />
                    <label htmlFor="input-file" id="update">
                      Update Image
                    </label>
                    <input
                      type="file"
                      name="inputfile"
                      id="input-file"
                      accept="image/"
                      onChange={(e) => handleImageChange(e)}
                    />
                  </div>
                </div>
                <div className="contact-right">
                  <div className="input-row">
                    <div className="input-group">
                      <label>UserName</label>
                      <input
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={disable}
                      />
                    </div>
                    <div className="input-group">
                      <label>Date Of Birth</label>
                      <input
                        name="date_of_birth"
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDOB(e.target.value)}
                        required
                        disabled={disable}
                      />
                    </div>
                  </div>
                  <div className="input-row">
                    <div className="input-group">
                      <label>Gender</label>
                      <select
                        name="gender"
                        required
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        disabled={disable}
                      >
                        <option value="">--select your gender--</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label>Blood Group</label>
                      <select
                        name="blood_group"
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        required
                        disabled={disable}
                      >
                        <option value="">--select your blood group--</option>
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="O+">O+</option>
                        <option value="AB+">AB+</option>
                      </select>
                    </div>
                  </div>
                  <div className="input-row">
                    <div className="input-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={email} // Make sure to set the correct value for email
                        readOnly
                        disabled={disable}
                      />
                    </div>
                    <div className="input-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        name="phonenumber"
                        className="phone"
                        placeholder="Type Your Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        disabled={disable}
                      />
                      <span
                        className="phoneError"
                        style={{ color: "red" }}
                      ></span>
                    </div>
                  </div>
                  <div className="input-row">
                    <div className="input-group">
                      <label htmlFor="Address">Address</label>
                      <input
                        type="text"
                        id="Address"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        disabled={disable}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    {disable ? (
                      <button
                        className="btn btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          setDisable(false);
                        }}
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={(e) => handleSave(e)}
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>{" "}
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
