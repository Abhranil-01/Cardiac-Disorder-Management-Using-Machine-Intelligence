import React, { useState,useEffect } from 'react'
import './Form.css'


function Form() {
  const [age,setAge]=useState('')
  const[sex,setSex]=useState('')
  const[pain,setPain]=useState('')
  const[bloodPressure ,setbloodPressure]=useState('')
  const[cholestrol ,setCholestrol]=useState('')
  const[bloodSuger ,setbloodSuger]=useState('')
  const[ecg ,setECG]=useState('')
  const[maxHeartRate ,setMaxHeartRate]=useState('')
  const[exerciseInduced ,setExerciseInduced]=useState('')
  const [stDepression,setSTDepression]=useState('')
  const[stSLope,setSTSLope]=useState('')
  const [addClass,setAddClass]=useState('d-none') 
  const [addClassOne,setAddClassOne]=useState('d-block')
  const [Data,setData]=useState('')
  const [color,setColor]=useState('')
  const [textHead,setTextHead]=useState('')
  const [text,setText]=useState('')

  const handelSubmit = async (e) => {
    e.preventDefault();
  
    const url = 'http://127.0.0.1:8000/api/predict/';
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
      setData(data[0])
      console.log('wfewrf',Data);
     if(Data==='T'){
      console.log('hello');
      setColor('bg-success')
      setTextHead('You Are Safe')
      setText('You are safe now although if you have some problem then you consult with the doctors do not take any risk Thank You.')
     }else if(Data==='F'){
      console.log('ergferg');
      setColor('bg-danger')
      setTextHead('You Are In Danger')
      setText('You are in danger immediately consult with the doctors')
     }
  
  
      // Update the state with the fetched data
      
  
      setAddClass('d-block');
      setAddClassOne('d-none');
      setAge('');
      setSex('');
      setPain('');
      setbloodPressure('');
      setCholestrol('');
      setbloodSuger('');
      setECG('');
      setMaxHeartRate('');
      setExerciseInduced('');
      setSTDepression('');
      setSTSLope('');
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle error appropriately (e.g., show an error message)
    }
  };
  
    

  return (
    <>
      
      <div className="modal fade border border-danger" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={()=>{
                     setAddClassOne('d-block')
               setAddClass('d-none')
              }}>
        <div className="modal-dialog bg-success ">
          <div className={`modal-content ${addClassOne}`} >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Check prediction by filling the details</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handelSubmit}>
              <div>
                    <label for="age">Age:</label>
                    <input type="age" id="age" name="age" value={age} onChange={(e)=>setAge(e.target.value)} />
                </div>
                <div>
                    <label for="sex">Sex:</label>
                    <select id="sex" class="form-select form-select-sm" aria-label="small select example" value={sex} onChange={(e)=>setSex(e.target.value)} >
                        Sex:
                        <option selected>Open this select menu</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <label for="chest-pain-type">Chest pain type :</label>
                    <select id="chest-pain-type" class="form-select form-select-sm" aria-label="Small select example" value={pain} onChange={(e)=>setPain(e.target.value)}>
                        <option selected>Open this select menu</option>
                        <option value="typical angina">Typical Angina</option>
                        <option value="atypical angina">Atypical Angina</option>
                        <option value="non-anginal pain">Non-Anginal pain</option>
                        <option value="asymptomatic">Asymptomatic</option>
                      </select>
                </div>
                <div>
                    <label for="blood-pressure">Resting Blood Pressure : </label>
                    <input id="blood-pressure" type="number" min="0" value={bloodPressure} onChange={(e)=>setbloodPressure(e.target.value)}/>
                </div>
                <div>
                    <label for="cholestrol">Cholestrol :</label>
                    <input id="cholestrol" type="number" min="0" value={cholestrol} onChange={(e)=>setCholestrol(e.target.value)}/>
                </div>
                <div>
                    <label for="sugar-level">Fasting Blood Sugar Level :</label>
                    <select id="sugar-level" class="form-select form-select-sm" aria-label="Small select example" value={bloodSuger} onChange={(e)=>setbloodSuger(e.target.value)}>
                        <option selected>Open this select menu</option>
                        <option value="0">Lower than 120 mg/dl</option>
                        <option value="1">Greater than or equal to 120 mg/dl</option>
                      </select>
                </div>
                <div>
                    <label for="ecg">Rest ECG :</label>
                    <select id="ecg" class="form-select form-select-sm" aria-label="Small select example" value={ecg} onChange={(e)=>setECG(e.target.value)}>
                        <option selected>Open this select menu</option>
                        <option value="normal">Normal</option>
                        <option value="ST-T wave abnormality">ST-T Wave Abnormality</option>
                        <option value="left ventricular hypertrophy">Left Ventricular Hypertrophy</option>
                      </select>
                </div>
                <div>
                    <label for="heart-rate">Max Heart Rate Achieved</label>
                    <input type="number" id="heart-rate" value={maxHeartRate} onChange={(e)=>setMaxHeartRate(e.target.value)}/>
                </div>
                <div>
                    Exercise Induced Angina :
                    <input id="yes" type="radio" name="induced-angina"  value={1} onChange={(e)=>setExerciseInduced(e.target.value)}/>
                    <label for="yes">Yes</label>
                    <input id="no" type="radio" name="induced-angina" value={0} onChange={(e)=>setExerciseInduced(e.target.value)} />
                    <label for="no">No</label>
                </div>
                <div>
                    <label for="st-depression">ST Depression</label>
                    <input id="st-depression" type="number" value={stDepression} onChange={(e)=>setSTDepression(e.target.value)}/>
                </div>
                <div>
                    <label for="st-slope">ST SLope</label>
                    <select id="st-slope" class="form-select form-select-sm" aria-label="Small select example" value={stSLope} onChange={(e)=>setSTSLope(e.target.value)}>
                        <option selected>Open this select menu</option>
                        <option value="upsloping">Upsloping</option>
                        <option value="flat">Flat</option>
                        <option value="downsloping">Downsloping</option>
                      </select>
                </div>
                <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" >Submit</button>
            </div>
              </form>
            </div>
         
          </div>
          <div className={`bg-white modal-content predict-result ${addClass}`}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Predict Result</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{
                     setAddClassOne('d-block')
               setAddClass('d-none')
              }}></button>
            </div>
            <div className='predict-content mt-4'>
                <div className={`signal m-auto ${color} text-white fw-bold d-flex  align-items-center justify-content-center `}>{textHead}</div>
                <div className='fw-bold'>{text}</div>
            </div>
        </div>
        </div>
        
      </div>
    </>
  )
}

export default Form
