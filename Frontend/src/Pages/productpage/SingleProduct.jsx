import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./SingleProduct.css";

function SingleProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

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

  if (!product) {
    // You might want to display a loading indicator or handle the loading state
    return <div>Loading...</div>;
  }

  const { image, name, price, qty, description } = product;

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className="row featurette justify-content-center align-items-center ">
        <div className="row">
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
        </div>

        <div className="row">
          <div className="col-md-12">
            <div style={{ display: "flex", justifyContent: "center" }}>
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
            <h2 className="featurette-heading fw-normal lh-1">
              {name} <br />
              <span className="fs-5 text-body-secondary">{price}</span> <br />
              <span className="fs-5 text-body-secondary">In Stock</span>
            </h2>
            <br />
            <p className="lead"> {description} </p>

            <button
              className="btn btn-primary mb-5"
              onClick={() => {
                /* Handle Add to Cart functionality */
              }}
            >
              {/* <NavLink to='/c
              
              art'> */}
              Add to Cart
              {/* </NavLink> */}
         
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
