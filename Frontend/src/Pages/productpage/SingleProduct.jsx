import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useAddToCartMutation } from "../../Service/UserAuthApi";
import "./SingleProduct.css";

function SingleProduct() {
  const { id } = useParams();
  const [addToCart] = useAddToCartMutation();
  const [product, setProduct] = useState(null);
  const [refresh, setRefresh] = useState(false);

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
    // Check if user is authenticated (you need to implement this logic)
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      // Redirect user to login page or show authentication modal
      console.log("User is not authenticated. Redirecting to login page...");
      return;
    }

    if (!product) {
      console.log("Product data is not available yet.");
      return;
    }


    const addData = {
      Medicine_id: id,
      qty:1
    };

    try {
      const res = await addToCart({ access_token: accessToken,addData:addData}).then(() => {
        setRefresh(!refresh);
        window.location.reload(); // Reload the page
      })
      .catch((error) => {
        console.error('Error removing item:', error);
        // Handle error if needed
      });
      console.log(res);
      console.log(addData);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { image, name, price, qty, description } = product;

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className="row featurette justify-content-center align-items-center">
        <div className="col-md-12">
          <button
            className="btn btn-primary"
            style={{ marginTop: "10px" }}
          >
            <NavLink
              to="/OrderMedichine"
              style={{ color: "white", textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </NavLink>
          </button>
        </div>
        <div className="col-md-12">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              className="bd-placeholder-img bd-placeholder-img-lg featurette-image mx-auto img-fluid img-dec"
              src={image}
              alt={name}
            />
          </div>
        </div>
        <div className="col-md-12">
          <h2 className="featurette-heading fw-normal lh-1">
            {name} <br />
            <span className="fs-5 text-body-secondary">{price}</span> <br />
            <span className="fs-5 text-body-secondary">In Stock</span>
          </h2>
          <br />
          <p className="lead"> {description} </p>
          <button
            className="btn btn-primary mb-5"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
