const postData = async ({ name, ph,email,pwd }) => {
    const url = 'http://127.0.0.1:8000/api/registers/';
  
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${name}`,
          email: `${email}`,
          phone_number:`${ph}`,
          password:`${pwd}`
        }),
      };
  
      const response = await fetch(url, options);
      const data = await response.json();
   
  
      // You can return the data if needed
      return data;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error; // Rethrow the error for the calling component to handle
    }
  };
  
  export default postData;