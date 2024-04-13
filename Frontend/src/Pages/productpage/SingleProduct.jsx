import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAddToCartMutation } from "../../Service/UserAuthApi";
import "./SingleProduct.css";

function SingleProduct() {
  const { id } = useParams();
  const [addToCart] = useAddToCartMutation();
  const [product, setProduct] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [display, setDisplay] = useState("d-none");

  const handleClose = () => {
    setDisplay("d-none");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/medicines/${id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = async () => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      setDisplay("d-flex");
      return;
    }

    if (!product) {
      console.log("Product data is not available yet.");
      return;
    }

    const addData = {
      Medicine_id: id,
      qty: 1,
    };

    try {
      const res = await addToCart({
        access_token: accessToken,
        addData: addData,
      });
      setRefresh(!refresh);
      window.location.reload(); // Reload the page
      console.log(res);
      console.log(addData);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { image, name, price, qty, description,key_benifits,Key_Ingredients,Safety_Information } = product;

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
                  src={image}
                  alt={name}
                />
              </div>
            </div>
            <div className="col-md-8">
              <h2 className="featurette-heading fw-normal lh-1">
                {name} <br />
                <span className="fs-5 text-body-secondary">{price}</span>
                <br />
                <span className="fs-5 text-body-secondary">In Stock</span>
              </h2>
              <br />
              <p className="lead fw-bold">Description</p>
              <p className="lead"> {description} </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="m-image" style={{ display: "flex", justifyContent: "center" }}>
                <img
                  className="bd-placeholder-img bd-placeholder-img-lg featurette-image mx-auto img-fluid img-dec"
                  src={image}
                  alt={name}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <p className="lead fw-bold " >
                Benifits
              </p>
              <p className="lead">{key_benifits}</p>
              <p className="lead fw-bold">Ingredients</p>
              <p className="lead">{Key_Ingredients}</p>
              <p className="lead fw-bold">Safty Information</p>
              <p className="lead">{Safety_Information}</p>
            </div>
          </div>
          <div className="mb-5 d-flex justify-content-center ">
          <button class="btn btn-primary" onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
