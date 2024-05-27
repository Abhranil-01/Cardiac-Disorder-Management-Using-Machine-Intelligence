import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Form({ closeModal }) {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [pain, setPain] = useState("");
  const [bloodPressure, setbloodPressure] = useState("");
  const [cholestrol, setCholestrol] = useState("");
  const [bloodSuger, setbloodSuger] = useState("");
  const [ecg, setECG] = useState("");
  const [maxHeartRate, setMaxHeartRate] = useState("");
  const [exerciseInduced, setExerciseInduced] = useState("");
  const [stDepression, setSTDepression] = useState("");
  const [stSLope, setSTSLope] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();

    const url = "http://127.0.0.1:8000/api/predict/";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        age: parseInt(`${age}`),
        sex: `${sex}`,
        chest_pain_type: `${pain}`,
        resting_blood_pressure: parseInt(`${bloodPressure}`),
        cholesterol: parseInt(`${cholestrol}`),
        fasting_blood_sugar: parseInt(`${bloodSuger}`),
        rest_ecg: `${ecg}`,
        max_heart_rate_achieved: parseInt(`${maxHeartRate}`),
        exercise_induced_angina: parseInt(`${exerciseInduced}`),
        st_depression: parseFloat(`${stDepression}`),
        st_slope: `${stSLope}`,
      }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);

      if (data[0].predict === 0) {
        toast.info(
          "Your heart beats strong, free from worry, continue thriving"
        );
      } else if (data[0].predict === 1) {
        toast.warn("Heed the call, consult a doctor without delay");
      }
      // Update the state with the fetched data
      setAddClass("d-block");
      setAddClassOne("d-none");
      setAge("");
      setSex("");
      setPain("");
      setbloodPressure("");
      setCholestrol("");
      setbloodSuger("");
      setECG("");
      setMaxHeartRate("");
      setExerciseInduced("");
      setSTDepression("");
      setSTSLope("");
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error appropriately (e.g., show an error message)
    }
  };

  return (
    <>
      <div
        className="container-fluid  position-fixed  vh-100 w-100 top-0 z-3  "
        style={{ background: "rgba(36, 35, 35, 0.301)", zIndex: "999" }}
      >
        <div className="row">
          <div className="col-6 end-0 position-fixed bg-white h-100    ">
            <div className="row">
              <div
                className="col-12  d-flex justify-content-between align-items-center border-bottom mb-4  "
                style={{ height: "60px" }}
              >
                <h3>Check Your Heart</h3>
                <span
                  className="fs-5"
                  onClick={closeModal}
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </span>
              </div>
              <div className="col-6">
                <div class="form-floating mb-3">
                  <input
                    type="number"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <label for="floatingInput">Age</label>
                </div>
              </div>
              <div class="col-6">
                <div class="form-floating">
                  <select
                    class="form-select"
                    id="floatingSelectGrid"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                  >
                    <option selected>Select Your Sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <label for="floatingSelectGrid">Sex</label>
                </div>
              </div>
              <div class="col-6">
                <div class="form-floating">
                  <select
                    class="form-select"
                    id="floatingSelectGrid"
                    value={pain}
                    onChange={(e) => setPain(e.target.value)}
                  >
                    <option selected>Open this select menu</option>
                    <option value="typical angina">Typical Angina</option>
                    <option value="atypical angina">Atypical Angina</option>
                    <option value="non-anginal pain">Non-Anginal pain</option>
                    <option value="asymptomatic">Asymptomatic</option>
                  </select>
                  <label for="floatingSelectGrid">Chest pain type</label>
                </div>
              </div>
              <div className="col-6">
                <div class="form-floating mb-3">
                  <input
                    type="number"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    min="0"
                    value={bloodPressure}
                    onChange={(e) => setbloodPressure(e.target.value)}
                  />
                  <label for="floatingInput">Resting Blood Pressure</label>
                </div>
              </div>
              <div className="col-6">
                <div class="form-floating mb-3">
                  <input
                    type="number"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    min="0"
                    value={cholestrol}
                    onChange={(e) => setCholestrol(e.target.value)}
                  />
                  <label for="floatingInput">Cholestrol</label>
                </div>
              </div>
              <div class="col-6">
                <div class="form-floating">
                  <select
                    class="form-select"
                    id="floatingSelectGrid"
                    value={bloodSuger}
                    onChange={(e) => setbloodSuger(e.target.value)}
                  >
                    <option selected>Open this select menu</option>
                    <option value="0">Lower than 120 mg/dl</option>
                    <option value="1">
                      Greater than or equal to 120 mg/dl
                    </option>
                  </select>
                  <label for="floatingSelectGrid">
                    Fasting Blood Sugar Level
                  </label>
                </div>
              </div>

              <div class="col-6">
                <div class="form-floating">
                  <select
                    class="form-select"
                    id="floatingSelectGrid"
                    value={ecg}
                    onChange={(e) => setECG(e.target.value)}
                  >
                    <option selected>Open this select menu</option>
                    <option value="normal">Normal</option>
                    <option value="ST-T wave abnormality">
                      ST-T Wave Abnormality
                    </option>
                    <option value="left ventricular hypertrophy">
                      Left Ventricular Hypertrophy
                    </option>
                  </select>
                  <label for="floatingSelectGrid">Rest ECG</label>
                </div>
              </div>

              <div className="col-6">
                <div class="form-floating mb-3">
                  <input
                    type="number"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    min="0"
                    value={maxHeartRate}
                    onChange={(e) => setMaxHeartRate(e.target.value)}
                  />
                  <label for="floatingInput">Max Heart Rate Achieved</label>
                </div>
              </div>

              <div class="col-6">
                <div class="form-floating">
                  <select
                    class="form-select"
                    id="floatingSelectGrid"
                    value={exerciseInduced}
                    onChange={(e) => setExerciseInduced(e.target.value)}
                  >
                    <option selected>Open this select menu</option>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                  <label for="floatingSelectGrid">
                    {" "}
                    Exercise Induced Angina
                  </label>
                </div>
              </div>

              <div className="col-6">
                <div class="form-floating mb-3">
                  <input
                    type="number"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    min="0"
                    value={stDepression}
                    onChange={(e) => setSTDepression(e.target.value)}
                  />
                  <label for="floatingInput">ST Depression</label>
                </div>
              </div>

              <div class="col-12">
                <div class="form-floating">
                  <select
                    class="form-select"
                    id="floatingSelectGrid"
                    value={stSLope}
                    onChange={(e) => setSTSLope(e.target.value)}
                  >
                    <option selected>Open this select menu</option>
                    <option value="upsloping">Upsloping</option>
                    <option value="flat">Flat</option>
                    <option value="downsloping">Downsloping</option>
                  </select>
                  <label for="floatingSelectGrid"> ST SLope</label>
                </div>
              </div>
              <div className="col-12 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  onClick={(e) => handelSubmit(e)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default Form;
