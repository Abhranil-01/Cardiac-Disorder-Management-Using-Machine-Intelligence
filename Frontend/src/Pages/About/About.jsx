import React from 'react'
import Slider from '../../Components/Slider/Slider'
export default function About() {
  return (
    <>      
<Slider/>
<div className="container mt-5">
  
    <div className="row featurette d-flex justify-content-center align-items-center">
        <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1">WHAT WE STAND FOR ?<span className="text-body-secondary">Our core values</span></h2>
            <p className="lead ">With the help of our Early Detection of Cardiac Disorders Using Machine Intelligence, set out  on a revolutionary adventure into the future of cardiac health. This innovative platform  effortlessly combines state-of-the-art technology such as chatbot functionality, natural language processing, and an easy-to-use at-home test booking system. Our system is made to provide a complete solution; it is a one-stop shop for proactive health management, in addition to being able to forecast cardiac issues.</p>
        </div>

        <div className="col-md-5">
            <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"  src="\src\Images\img13.jpg"/>
        </div>
    </div>

    <hr className="featurette-divider"/>

    <div className="row featurette d-flex justify-content-center align-items-center">
        <div className="col-md-7 order-md-2">
            <h2 className="featurette-heading fw-normal lh-1">PEOPLE YOU CAN TRUST ! <span className="text-body-secondary">Your reliable team</span></h2>
            <p className="lead">Explore a smart pharmacy that meets your specific 
            needs and use an approachable chatbot to provide you with tailored advice. Users of the cutting edge test booking system can easily schedule heart exams in the comfort of their own homes. 
            Our AI-driven solution redefines healthcare accessible by bringing medications, tailored 
            assistance, and diagnostics under one smart roof. Enter a new era when technology enables 
            people to completely and effortlessly take control of their heart health, encouraging a proactive 
            attitude to well-being in the contemporary period. </p>
        </div>

        <div className="col-md-5 order-md-1">
            <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"  src="\src\Images\img14.jpg"/>
        </div>
    </div>

    <div className="b-example-divider"></div>

</div>

    <div className="container px-4 py-5" id="hanging-icons">
    <h2 className="pb-2 border-bottom">WHY US ?</h2>
    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div className="col d-flex align-items-start">
        <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          {/* <i className="fa-solid fa-user-doctor fa-2x" width></i> */}
        </div>
        <div>
          <h3 className="fs-2 text-body-emphasis">Doctor You Choose</h3>
          <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
        </div>
      </div>
      <div className="col d-flex align-items-start">
        <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          {/* <i className="fa-solid fa-suitcase-medical fa-2x"></i> */}
        </div>
        <div>
          <h3 className="fs-2 text-body-emphasis">Always There For You</h3>
          <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
        </div>
      </div>
      <div className="col d-flex align-items-start">
        <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
         {/* <i className="fa-solid fa-heart-pulse fa-2x"></i> */}
        </div>
        <div>
          <h3 className="fs-2 text-body-emphasis">Your Health Care</h3>
          <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
        </div>
      </div>
    </div>
  </div>



  <div className="container">
  

  <div className="row">

      <div className="col-md-3 ">
            <div className="card">
                  <img className="card-img-top" src="\src\Images\doc.jpg" alt="Card image"/>
                  <div className="card-body">
                        <h4 className="card-title">Dr. Pramanik Roy</h4>
                         <p className="card-text">Heart Specialst.</p>
                         <a href="#" className="btn btn-primary">Book</a>
                  </div>
            </div>
      </div>

      <div className="col-md-3 ">
            <div className="card">
                  <img className="card-img-top" src="\src\Images\doc2.jpg" alt="Card image"/>
                  <div className="card-body">
                        <h4 className="card-title">Dr. Christina Desoza</h4>
                         <p className="card-text">Chief Surgeon</p>
                         <a href="#" className="btn btn-primary">Book</a>
                  </div>
            </div>
      </div>

      <div className="col-md-3 ">
            <div className="card">
                  <img className="card-img-top" src="\src\Images\doc3.jpg" alt="Card image"/>
                  <div className="card-body">
                        <h4 className="card-title">Dr. Vijay Malakar</h4>
                         <p className="card-text">Chief Surgoen</p>
                         <a href="#" className="btn btn-primary">Book</a>
                  </div>
            </div>
      </div>


       <div className="col-md-3 ">
            <div className="card">
                  <img className="card-img-top" src="\src\Images\doc4.jpg" alt="Card image"/>
                  <div className="card-body">
                        <h4 className="card-title">Dr. Rosey Dey</h4>
                         <p className="card-text">Assissant Surgeon</p>
                         <a href="#" className="btn btn-primary">Book</a>
                  </div>
            </div>
      </div>

  </div>
  
</div>



  <div className="container mt-5">
    <h2 style={{textAlign: 'center'}}>GET IN TOUCH </h2>
    <p className="pb-2 border-bottom" style={{fontSize: '20px', textAlign:'center'}}>Contact us anytime you want. We are open to all suggestions from our audience.</p>
    <div className="row">
        <div className="col">
          <input type="text" className="form-control" placeholder="First name" aria-label="First name"/>
        </div>
    <div className="col">
        <input type="text" className="form-control" placeholder="Last name" aria-label="Last name"/>
    </div>
    </div>

    <div className="mb-3 my-4">
        <label for="exampleFormControlInput1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
    </div>

<div className="mb-3">
  <label for="exampleFormControlTextarea1" className="form-label">Enter your message</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
<button className="btn btn-primary">Submit</button>
</div>


  <div className="container px-4 " id="featured-3">
    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div className="feature col">
        <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-success bg-gradient fs-2 mb-3">
          {/* <i className="fa-solid fa-location-dot fa-2x"></i> */}
        </div>
        <h3 className="fs-2 text-body-emphasis">Location</h3>
        <p>66 Ruby EM Bypass</p>
        <p>Kolkata-700074</p>
      </div>

      <div className="feature col">
        <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
          {/* <i className="fa-solid fa-phone fa-2x"></i> */}
        </div>
        <h3 className="fs-2 text-body-emphasis">Phone</h3>
        <p>9889765439</p>
        <p>8345088643</p>
      </div>

      <div className="feature col">
        <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-danger bg-gradient fs-2 mb-3">
          {/* <i className="fa-regular fa-envelope fa-2x"></i> */}
        </div>
        <h3 className="fs-2 text-body-emphasis">Email</h3>
        <p>heartcare@gmail.com</p>
        <p>careheart@gmail.com</p>
      </div>
    </div>
  </div>

    </>
  )
}
