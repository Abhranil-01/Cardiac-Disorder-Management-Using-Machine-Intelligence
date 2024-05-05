import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css'
import Form from '../../Components/Form/Form';
import { useProductContext } from '../../context/productContext';
import Card from '../../Components/Card/Card';
import Slider from '../../Components/Slider/Slider';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRobot} from '@fortawesome/free-solid-svg-icons'
import Chatbot from '../../Components/Chatbot/Chatbot';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[isChatbotOpen, setIsChatbotOpen] = useState(false);
  const {products}=useProductContext();
  const logoutValue=useSelector((state)=>state.user_info.logout)
useEffect(()=>{
  if(logoutValue){
  toast.success("Logged out successfully")
  }
},[logoutValue])
  const handleButtonClick = () => {
    setIsModalOpen(true);
  };
  const handleChatBotClick = () => {
    setIsChatbotOpen(true);
  }
  return (
    <>
    <div>
      {/* <!-- Main content starts --> */}
      <Slider/>
<main>
{/* 
    <!-- home section  --> */}

    <section class="home" id="home">
 
 
    </section>
    {/* <!-- home section ends -->

    <!-- about heart section starts --> */}
    <section class="about_heart">

        <div class="about_heart-cards">
            <div class="about_heart-cards-photo">
                <img src="src\Images\your_heart.jpeg.jpg" alt="Loading image"/>
            </div>
            <div class="about_heart-cards-content">
                <h2>Your Heart</h2>
                <p>What should you know?</p>
                <p>Find out how your heart works , discover the warning signs and symptoms of cardivascular disease and learn how a healthy lifestyle is achieved.</p>
          
            </div>
        </div>

        <div class="about_heart-cards">
            <div class="about_heart-cards-content">
                <h2>Keep your heart healthy</h2>
                <p>What can I do to avoid heart disease?</p>
                <p>The best way to look after your heart is with a healthy lifestyle. Read about various factors and how to monitor and maintain your cardiovascular health.</p>
      
            </div>
            <div class="about_heart-cards-photo">
                <img src="src\Images\keep_heart_healthy.webp" alt="Loading Image"/>
            </div>
        </div>

        <div class="about_heart-cards">
            <div class="about_heart-cards-photo">
                <img src="src\Images\how_to_live_with_heart_problem.jpg" alt="Loading image"/>
            </div>
            <div class="about_heart-cards-content">
                <h2>Living with heart disease</h2>
                <p>What can I do after a heart problem?</p>
                <p>Find out how your heart works , discover the warning signs and symptoms of cardivascular disease and learn how a healthy lifestyle is achieved.</p>
             
            </div>
        </div>
    </section>
    {/* <!-- about heart section ends --> */}

{/* 
    <!-- Our services section starts --> */}
    {/* <section class="services" id="services">
        <h1 class="heading">Our Services</h1>
        <div class="box-container container">

            <div class="box">
                <i class="fa-solid fa-clipboard"></i>
                <h3>Heart related Test Booking</h3>
            </div>
            <div class="box">
                <i class="fa-solid fa-cart-shopping"></i>
                <h3>Order Medicine</h3>
            </div>
            <div class="box">
                <i class="fa-solid fa-user-doctor"></i>
                <h3>Cardiovascular Health Expert</h3>
            </div>
        </div>
    </section> */}
    {/* <!-- Our services section ends --> */}
{/* 
    <!-- Our Doctors section starts --> */}
    <section class="doctors" id="doctors">
        <h1 class="heading">Medicine Store</h1>
        <div class="box-container container">
        {
        products.map((element) => (
          element.featured === true ? <Card key={element.id} {...element} />:null
  ))
}


        </div>
  <div className=' text-center fs-5 mt-5'>
    <NavLink to='/OrderMedichine' className='bg-black py-1 px-4 rounded-1  text-white'>More Medicines</NavLink>
  </div>
    </section>
    {/* <!-- Our Doctors section ends --> */}

</main>
{/* <!-- main content ends  --> */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ position: 'fixed', bottom: '20px', right: '10px' ,zIndex:'2'}}
        onClick={handleButtonClick}
      >
        Heart Disease Prediction
      </button>
      {isModalOpen && <Form closeModal={() => setIsModalOpen(false)} />}

      <button  type="button" class="chatbot-toggler" data-bs-toggle="modal"
        data-bs-target="#exampleModal" onClick={handleChatBotClick}>
      <span><FontAwesomeIcon icon={faRobot} /></span>
    </button>
    {isChatbotOpen && <Chatbot close={()=>setIsChatbotOpen(false)}/>}

    </div>
    <ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition= {Bounce}
/>
    </>
    
  );
}
