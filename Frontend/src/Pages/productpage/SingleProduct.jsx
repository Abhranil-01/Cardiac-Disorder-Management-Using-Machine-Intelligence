import React, { useEffect, useState } from 'react';
import { useParams,NavLink } from 'react-router-dom';
import './SingleProduct.css'

function SingleProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/medicines/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
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
    <>
    <div className=' wrap d-flex flex-column  gap-2 '>
  
      <div className='return-button'>
      <div className="btn btn-light mx-2 mt-1">
            <NavLink to='/OrderMedichine' >
              Return to Store
            </NavLink>
          </div>
      </div>
      <div className='single-main gap-3'>
      <div className="single-image">
          <img
            className=""
            src={image}
            alt="Product Image"
          />
        </div>

        <div className="single-content">
          <h2>
            {name} <br /> 
            <span className="fs-5 text-body-secondary">{price}</span>
            <br />
            <span className="fs-5 text-body-secondary">In Stock: {qty}</span>
          </h2>
          <br />
          <p className="para">
            {description}
          </p>
          {/* <div>
          <button className="btn btn-primary">Add to Cart</button>
          </div> */}
        </div>
      </div>
  
    </div>
    </>
  );
}

export default SingleProduct;
