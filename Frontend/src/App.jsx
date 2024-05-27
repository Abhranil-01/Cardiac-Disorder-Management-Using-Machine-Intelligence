
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from './Layout/Layout.jsx'
import {Home,MedicineStore,About} from './Pages/index.js'
import LoginSignup from './Pages/login/LoginSignup.jsx'
import { useSelector } from "react-redux";
import SingleProduct from "./Pages/productpage/SingleProduct.jsx";
import Cart from "./Pages/cart/Cart.jsx";
import Order from "./Pages/Order/Order.jsx";
import './App.css'
import Analyzer from "./Pages/Analyzer/Analyzer.jsx";
import LoadData from "./Pages/Analyzer/LoadData.jsx";
import AnalyzerLogin from "./Pages/Analyzer/login/AnalyzerLogin.jsx";
import ProfileForm from "./Components/ProfileForm/ProfileForm.jsx";
import Otp from "./Pages/OtpPage/Otp.jsx";
function App() {
  const { access_token } = useSelector(state => state.auth)
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Layout/>} >
       <Route path='' element={<Home/>}/>

       <Route path='OrderMedichine' element={<MedicineStore/>}/>
       <Route path='/:product/:id' element={<SingleProduct/>}/>
       <Route path='cart' element={<Cart/>}/>
       <Route path='AboutUs' element={<About/>}/>
       <Route path='Orders' element={<Order/>}/>
       <Route path='login' element={<LoginSignup/>}/>
       <Route path='Analyzer' element={<Analyzer/>}/>
       <Route path='Data' element={<LoadData/>}/>
       <Route path='Analyzerlogin' element={<AnalyzerLogin/>}/>
       <Route path='profile' element={<ProfileForm/>}/>
       <Route path='otp-verification/:email' element={<Otp/>}/>
     </Route>
          <Route path="/" element={access_token ? <Home/> : <Navigate to="/login" />} />
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
          <Route path="Analyzerlogin" element={access_token ? <Analyzer/> : <Navigate to="/Analyzerlogin" />} />
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;