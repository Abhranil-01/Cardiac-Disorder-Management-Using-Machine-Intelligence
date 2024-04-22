import React from 'react';
import './style.css'
function ProfileForm() {
  return (
    <div className="">
      <form >
        <section className="query-cover">
          <div className="container">
            <div className="contact-box">
              <div className="contact-left">
              
                <div id="image">
                  <img src="\src\Images\icon\c7abcd3ce378191a3dddfa4cdb2be46f.jpg" alt="Profile Picture" id="profile-pic" />
                  <label htmlFor="input-file" id="update">Update Image</label>
                <input type="file" name="inputfile" id="input-file" />
                </div>
             
              </div>
              <div className="contact-right">
                <div className="input-row">
                  <div className="input-group">
                    <label>UserName</label>
                    <input name="name" type="text"  placeholder="Enter your name" />
                  </div>
                  <div className="input-group">
                    <label>Date Of Birth</label>
                    <input name="date_of_birth" type="date" id="dob" placeholder="" value="" required />
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Gender</label>
                    <select name="gender" required>
                   
                        <option value="Male" >Male</option> :
                        <>
                          <option value="" selected disabled>--select your gender--</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </>
                   
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Blood Group</label>
                    <select name="blood_group" required>
                     
                        <option  selected></option> :
                        <>
                          <option value="None" selected disabled>--select your blood group--</option>
                          <option value="A+">A+</option>
                          <option value="B+">B+</option>
                          <option value="O+">O+</option>
                          <option value="AB+">AB+</option>
                        </>
                      
                    </select>
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Email</label>
                    <input type="email" placeholder="enteryouremail"  readOnly />
                  </div>
                  <div className="input-group">
                    <label>Phone</label>
                    <input type="tel" name="phonenumber" className="phone" placeholder="Type Your Phone Number" required />
                    <span className="phoneError" style={{ color: 'red' }}></span>
                  </div>
                </div>
                <div className="input-row1">
                  {/* <div className="input-group1">
                    <label>Prefered language</label>
                    <select name="languages_spoken" id="" required>
                      <option value="Bengali" selected={preferences.user_languages_spoken === "Bengali"}>Bengali</option>
                      <option value="English" selected={preferences.user_languages_spoken === "English"}>English</option>
                      <option value="Tamil" selected={preferences.user_languages_spoken === "Tamil"}>Tamil</option>
                      <option value="Hindi" selected={preferences.user_languages_spoken === "Hindi"}>Hindi</option>
                      <option value="Telugu" selected={preferences.user_languages_spoken === "Telugu"}>Telugu</option>
                      <option value="Marathi" selected={preferences.user_languages_spoken === "Marathi"}>Marathi</option>
                    </select>
                  </div> */}
                  {/* <div className="input-group1">
                    <label>Preffered City</label>
                    <select name="location" id="" required>
                      <option value="Chennai" selected={preferences.user_location === "Chennai"}>Chennai</option>
                      <option value="New Delhi" selected={preferences.user_location === "New Delhi"}>New Delhi</option>
                      <option value="Kanpur" selected={preferences.user_location === "Kanpur"}>Kanpur</option>
                      <option value="Lucknow" selected={preferences.user_location === "Lucknow"}>Lucknow</option>
                      <option value="Kolkata" selected={preferences.user_location === "Kolkata"}>Kolkata</option>
                      <option value="Mumbai" selected={preferences.user_location === "Mumbai"}>Mumbai</option>
                      <option value="Jaipur" selected={preferences.user_location === "Jaipur"}>Jaipur</option>
                    </select>
                  </div> */}
                </div>
                <div className="input-group">
                  <label htmlFor="Address">Address</label>
                  <input type="text" id="Address" placeholder="Enter your address" />
                </div>
                <button id="send" type="submit">Save</button>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}

export default ProfileForm;
