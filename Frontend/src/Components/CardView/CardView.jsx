import React from 'react';

function CardView() {
  return (
    <div>
      <div className="row featurette d-flex justify-content-center align-items-center">
        <div className="col-md-5">
          <button className="btn btn-light">
            <a href="medistore2.html" style={{ color: 'black', textDecoration: 'none' }}>
              Return to Store
            </a>
          </button>
          <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto img-dec" src="m1.avif" alt="Medicine" />
        </div>

        <div className="col-md-7">
          <h2 className="featurette-heading fw-normal lh-1">
            Medicine 1 <br />
            <span className="fs-5 text-body-secondary">₹199</span> <br />
            <strike className="fs-5 price">₹ 249.00</strike> <br />
            <span className="fs-5 text-body-secondary">In Stock</span>
          </h2>
          <br />
          <p className="lead">
            Explore a smart pharmacy that meets your specific needs and use an approachable chatbot to provide you with tailored advice. Users of the cutting-edge test booking system can easily schedule heart exams in the comfort of their own homes. Our AI-driven solution redefines healthcare accessible by bringing medications, tailored assistance, and diagnostics under one smart roof. Enter a new era when technology enables people to completely and effortlessly take control of their heart health, encouraging a proactive attitude to well-being in the contemporary period.
          </p>
          <button className="btn btn-warning">Buy Now</button>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default CardView;
