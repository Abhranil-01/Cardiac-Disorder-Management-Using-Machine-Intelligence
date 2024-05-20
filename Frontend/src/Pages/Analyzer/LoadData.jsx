import React, { useEffect, useState } from 'react';
import   './style.css'
import Papa from 'papaparse';
import {useNavigate} from 'react-router-dom'
function LoadData() {
  const [data, setData] = useState([]);
  const navigate=useNavigate()
  const loginToken =localStorage.getItem("loginToken")
  useEffect(() => {
    if(loginToken){
      const fetchData = async () => {
        try {
          const response = await fetch('./data.csv');
          console.log(response);
          const reader = response.body.getReader();
          const result = await reader.read();
          const decoder = new TextDecoder("utf-8");
          const csvData = decoder.decode(result.value);
          const parsedData = Papa.parse(csvData, { 
            header: true, 
            skipEmptyLines: true 
          }).data;
          setData(parsedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }else{
      navigate('/')
    }

  }, [loginToken]);



  return (
    <div>
      <h1 className='text-center'>Heart Disease Data</h1>
      {data.length ? (
        <table className="table  text-center">
          <thead>
            <tr>
              <th scope="col">Age</th>
              <th scope="col">Sex</th>
              <th scope="col">Chest Pain Type</th>
              <th scope="col">Resting Blood Pressure</th>
              <th scope="col">Cholesterol</th>
              <th scope="col">Fasting Blood Sugar</th>
              <th scope="col">Rest ECG</th>
              <th scope="col">Max Heart Rate Achieved</th>
              <th scope="col">Exercise Induced Angina</th>
              <th scope="col">ST Depression</th>
              <th scope="col">ST Slope</th>
              <th scope="col">Target</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.age}</td>
                <td>{row.sex}</td>
                <td>{row.chest_pain_type}</td>
                <td>{row.resting_blood_pressure}</td>
                <td>{row.cholesterol}</td>
                <td>{row.fasting_blood_sugar}</td>
                <td>{row.rest_ecg}</td>
                <td>{row.max_heart_rate_achieved}</td>
                <td>{row.exercise_induced_angina}</td>
                <td>{row.st_depression}</td>
                <td>{row.st_slope}</td>
                <td>{row.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}

export default LoadData;
