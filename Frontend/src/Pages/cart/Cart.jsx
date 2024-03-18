import React from 'react';

function Cart() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10 col-11 mx-auto">
            <div className="row mt-5 gx-3">

              {/* left side only */}
              <div className="col-md-12 col-lg-8 col-11 mx-auto main_cart mb-lg-0 mb-5 shadow">
                <div className="card p-4">
                  <h2 className="py-4 font-weight-bold">Cart (2 items)</h2>
                  <div className="row">
                    {/* cart images div */}
                    <div className="col-md-5 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow product_img">
                      <img src="m2.webp" className="img-fluid" alt="cart image" />
                    </div>

                    {/* cart product details */}
                    <div className="col-md-7 col-11 mx-auto px-4 mt-2">
                      <div className="row">
                        {/* product name */}
                        <div className="col-12 card-title">
                          <h1 className="mb-4 product_name">Medicine 1</h1>
                          <p className="mb-2">Medicine 470</p>
                          <p className="mb-2">For Heart</p>
                        </div>
                      </div>

                      {/* remove item */}
                      <div className="row">
                        <div className="col-8 d-flex">
                          <p style={{ cursor: 'pointer' }}><i className="trash"></i>REMOVE ITEM</p>
                        </div>
                        <div className="col-4 d-flex justify-content-end price_money">
                          <h3>₹<span>0.0</span></h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2nd cart product */}
                <div className="card p-4">

                  <div className="row">
                    {/* cart images div */}
                    <div className="col-md-5 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow product_img">
                      <img src="m2.webp" className="img-fluid" alt="cart image" />
                    </div>

                    {/* cart product details */}
                    <div className="col-md-7 col-11 mx-auto px-4 mt-2">
                      <div className="row">
                        {/* product name */}
                        <div className="col-12 card-title">
                          <h1 className="mb-4 product_name">Medicine 2</h1>
                          <p className="mb-2">Medicine 890</p>
                          <p className="mb-2">For Heart</p>
                        </div>
                      </div>

                      {/* remove item */}
                      <div className="row">
                        <div className="col-8 d-flex remove">
                          <p style={{ cursor: 'pointer' }}><i className="trash"></i>REMOVE ITEM</p>
                        </div>
                        <div className="col-4 d-flex justify-content-end price_money">
                          <h3>₹<span>0.0</span></h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* right side div */}
              <div className="col-md-12 col-lg-4 col-11 mx-auto mt-lg-0 mt-md-5">
                <div className="right_side p-3 shadow bg-white">
                  <h2 className="product_name mb-5">Total Amount</h2>
                  <div className="price_indiv d-flex justify-content-between">
                    <p>Product Amount</p>
                    <p>₹<span>0.00</span></p>
                  </div>
                  <div className="price_indiv d-flex justify-content-between">
                    <p>Shipping Charge</p>
                    <p>₹50.0</p>
                  </div>
                  <hr />
                  <div className="total-amt d-flex justify-content-between font-weight-bold">
                    <p>Amount (Including GST)</p>
                    <p>₹<span>0.00</span></p>
                  </div>
                  <button className="btn btn-primary text-uppercase">Checkout</button>
                </div>


                <div className="mt-3 shadow p-3 bg-white">
                  <div className="pt-4">
                    <h5 className="mb-4">Expected Delivery Date</h5>
                    <p>March 10th 2024 - March 15th 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
