import { useEffect, useState } from 'react';

const getData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const url = 'http://127.0.0.1:8000/api/registers/';
  const options = null;

  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      })
      .catch((fetchError) => {
        setError('Failed to fetch data');
      });
  }, [url, options]);

  return { data, error };
};

export default getData;
