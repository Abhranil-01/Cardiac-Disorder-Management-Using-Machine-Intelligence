const PostandGetData = async ({ age, sex,pain,bloodPressure,cholestrol,bloodSuger,ecg,maxHeartRate,exerciseInduced,stDepression,stSLope }) => {
    const url = 'http://127.0.0.1:8000/api/predict/';
  
    
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: parseInt(`${age}`),
          sex: `${sex}`,
          chest_pain_type:`${pain}`,
          resting_blood_pressure: parseInt(`${bloodPressure}`),
          cholesterol:parseInt(`${cholestrol}`),
          fasting_blood_sugar: parseInt(`${bloodSuger}`),
          rest_ecg:`${ecg}`,
          max_heart_rate_achieved:parseInt(`${maxHeartRate}`),
          exercise_induced_angina:parseInt(`${exerciseInduced}`),
          st_depression: parseInt(`${stDepression}`),
          st_slope:`${stSLope}`,
        }),
      };
  
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
  
      // You can return the data if needed
    return data
  };
  
  export default PostandGetData;
  