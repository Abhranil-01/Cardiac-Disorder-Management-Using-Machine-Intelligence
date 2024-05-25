import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAddToCartMutation, useGetCartDataQuery, useGetmedicineCustomDataQuery } from "../../Service/UserAuthApi";
import "./SingleProduct.css";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SingleProduct() {
  const { id } = useParams();
  const [addToCart] = useAddToCartMutation();


  const [display, setDisplay] = useState("d-none");
  const accessToken = localStorage.getItem("access_token");
const {data:cartData,refetch }=useGetCartDataQuery(accessToken)
  const handleClose = () => {
    setDisplay("d-none");
  };

const {data,isLoading}=useGetmedicineCustomDataQuery(id)
console.log(data);
  const handleAddToCart = async () => {


    if (!accessToken) {
      setDisplay("d-flex");
      return;
    }

  

    const addData = {
      Medicine_id: id,
      qty: 1,
      price: data.price
    };

    try {
      const res = await addToCart({
        access_token: accessToken,
        addData: addData,
      }); // Reload the page
    refetch()
    toast.success("Data added successfully")
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };


if(isLoading) {
  return <p>Loading....</p>
}

  return (
    <>
      <div
        className={`alert-box position-fixed top-0 z-3 ${display} justify-content-center w-100 h-100`}
      >
        <div className="main-alert position-fixed top-0 z-3 rounded-2 mt-3">
          <div className="w-100 d-flex justify-content-end px-2">
            <span className="fs-5 fw-bold" onClick={handleClose}>
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </div>
          <div
            className="d-flex align-items-center justify-content-center mt-2"
            style={{ height: "30vh" }}
          >
            <p className="fw-bold">
              Before Add The Item At Cart You Need to{" "}
              <NavLink to="/login" className="login-button">
                Login{" "}
              </NavLink>
              At First
            </p>
          </div>
        </div>
      </div>

      <div style={{ overflowX: "hidden" }}>
        <div
          className="row featurette justify-content-center align-items-center "
          style={{ marginTop: "80px" }}
        >
          <div className="col-md-12">
            <button className="btn btn-primary" style={{ marginTop: "10px" }}>
              <NavLink
                to="/OrderMedichine"
                style={{ color: "white", textDecoration: "none" }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </NavLink>
            </button>
          </div>
          <div className="row mt-3">
            <div className="col-md-4">
              <div
                className="m-image"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  className="bd-placeholder-img bd-placeholder-img-lg featurette-image mx-auto img-fluid img-dec"
                  src={data.image}
                  alt={data.name}
                />
              </div>
            </div>
            <div className="col-md-8">
              <h2 className="featurette-heading fw-normal lh-1">
                {data.name} <br />
                <span className="fs-5 text-body-secondary">{data.price}</span>
                <br />
                <span className="fs-5 text-body-secondary">In Stock</span>
              </h2>
              <br />
              <p className="lead fw-bold">Description</p>
              <p className="lead"> {data.description} </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="m-image" style={{ display: "flex", justifyContent: "center" }}>
                <img
                  className="bd-placeholder-img bd-placeholder-img-lg featurette-image mx-auto img-fluid img-dec"
                  src={data.image}
                  alt={data.name}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <p className="lead fw-bold " >
                Benifits
              </p>
              <p className="lead">{data.key_benifits}</p>
              <p className="lead fw-bold">Ingredients</p>
              <p className="lead">{data.Key_Ingredients}</p>
              <p className="lead fw-bold">Safty Information</p>
              <p className="lead">{data.Safety_Information}</p>
            </div>
          </div>
          <div className="mb-5 d-flex justify-content-center ">
          <button class="btn btn-primary" onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
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

export default SingleProduct;
