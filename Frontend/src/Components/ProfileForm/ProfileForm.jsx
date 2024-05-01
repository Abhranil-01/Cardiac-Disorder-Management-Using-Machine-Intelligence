import React, { useEffect, useState } from "react";
import "./style.css";
import {
  useGetLoggedUserQuery,
  useGetUserQuery,
  usePostProfileMutation,
} from "../../Service/UserAuthApi";
import { getToken } from "../../Service/LocalStorageService";

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
  const { data: userData } = useGetUserQuery(access_token);
  const { data } = useGetLoggedUserQuery(access_token);
  const [postProfile] = usePostProfileMutation();
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (data) {
      console.log("dewwed", data);
      setEmail(data);
    }
  }, [data]);
  console.log("dqewwe", userData);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  const handlesave = async (e) => {
    e.preventDefault();
    const addData = {
      name: name,
      phone_number: phone,
      gender: gender,
      blood_group: bloodGroup,
      date_of_birth: dob,
      address: address,
      image: image,
    };
    const res = await postProfile({
      access_token: access_token,
      data: addData,
    });

    console.log("qwefqewf", res);
    setDisable(true);
  };
  return (
    <div className="">
      <form>
        <section className="query-cover">
          <div className="container">
            <div className="contact-box">
              <div className="contact-left">
                <div id="image">
                  <img
                    src={
                      image ||
                      "/src/Images/icon/c7abcd3ce378191a3dddfa4cdb2be46f.jpg"
                    }
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
                    onChange={handleImageChange}
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
                      <option value="" disabled>
                        --select your gender--
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
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
                      <option value="" disabled>
                        --select your blood group--
                      </option>
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
                      value={email}
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
                    <button className="btn btn-primary" onClick={handlesave}>
                      Save
                    </button>
                  )}
                </div>
                
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}

export default ProfileForm;
