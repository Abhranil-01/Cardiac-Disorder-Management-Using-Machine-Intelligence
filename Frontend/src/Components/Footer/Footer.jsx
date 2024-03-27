import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone,faX, faPrint} from '@fortawesome/free-solid-svg-icons';
import { faFacebook,faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <>
            <footer className="bg-dark text-white pt-5 pb-4" >
                <div className="container tet-center text-md-left">
                    <div className="row text-center text-md-left">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">HEART</h5>
                            <p className='text-white'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt facere laboriosam unde culpa
                                ad provident accusantium, voluptatum possimus facilis illo libero eveniet asperiores soluta
                                harum quisquam eos, recusandae alias fugit?</p>
                        </div>
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Services</h5>
                            <p>
                                <NavLink to='/BookTest' className="text-white" style={{ textDecoration: "none" }}>Book Test</NavLink>
                            </p>
                            <p>
                                <NavLink to='/OrderMedichine' className="text-white" style={{ textDecoration: "none" }}>Order Medicine</NavLink>
                            </p>
                            <p>
                                <NavLink to='/AboutUs' className="text-white" style={{ textDecoration: "none" }}>About Us</NavLink>
                            </p>

                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3 ">
                            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Contact</h5>
                            <p className='text-white'><FontAwesomeIcon className='me-1' icon={faEnvelope} />heart@gmail.com</p>
                 
                            <p className='text-white'>
                            <FontAwesomeIcon icon={faPhone} /> +91 1234567890
                            </p>
                            <p className='text-white'>
                            <FontAwesomeIcon icon={faPrint} /> +01 335 662 88
                            </p>
                        </div>

                        <hr className="mb-4"/>

                            <div className="row align-items-center">
                                <div className="col-md-7 col-lg-8 ">
                                    <p className='text-white'>Copyright @2024 All rights reserved by:
                                        <span  style={{ textDecoration: "none" }}>
                                            <strong className="text-warning">Heart</strong>
                                        </span>
                                    </p>
                                </div>
                                <div className="col-md-5 col-lg-4">
                                    <div className="text-center text-md-right">
                                        <ul className="list-unstyled list-inline">
                                            <li className="list-inline-item">
                                                <p  className="btn-floating btn-sm text-white" style={{fontSize:'23px'}}>
                                                <FontAwesomeIcon icon={faFacebook} />
                                                </p>
                                            </li>
                                            <li className="list-inline-item">
                                                <Link  className="btn-floating btn-sm text-white" style={{fontSize:'23px'}}>
                                                <FontAwesomeIcon icon={faX} />
                                                </Link>
                                            </li>
                                            <li className="list-inline-item">
                                                <Link  className="btn-floating btn-sm text-white" style={{fontSize:'23px'}}>
                                                <FontAwesomeIcon icon={faLinkedin} />
                                                </Link>
                                            </li>
                                            <li className="list-inline-item">
                                                <Link  className="btn-floating btn-sm text-white" style={{fontSize:'23px'}}>
                                                <FontAwesomeIcon icon={faInstagram} />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>


                            </div>
                    </div>
                    </div>
                    <hr className="mx-5"/>
                    <div  className='text-center'>
                    <NavLink to='/Analyzerlogin' className='text-white'>
                        Analyzer
                    </NavLink>
                    </div>
            </footer>
        </>
    )
}

export default Footer
