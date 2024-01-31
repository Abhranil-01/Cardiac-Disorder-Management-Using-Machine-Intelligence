import { useState ,useEffect} from 'react'
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([])

  useEffect(()=>{
  const getAllStudent= async ()=>{
      try{
        const students = await axios.get('http://127.0.0.1:8000/api/student/')
        console.log(students.data);
        setStudents(students.data)
      }catch(error){
        console.log(error);
      }
    }
    getAllStudent()
  },[])

  return (
    <>
      <h1>Hello</h1>
    </>
  )
}

export default App
