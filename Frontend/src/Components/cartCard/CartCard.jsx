import React, { useEffect, useState } from "react";
import {
  useDeleteCartDataMutation,
  useGetmedicineCustomDataQuery,
  useUpdateCartDataMutation,
} from "../../Service/UserAuthApi";
import { getToken } from "../../Service/LocalStorageService";

function CartCard({ value, refetch }) {
console.log(value.qty);
const {access_token} =getToken()

  const { data, isLoading, isError } = useGetmedicineCustomDataQuery(value.medicine_id);
  
  const [deleteCartData] = useDeleteCartDataMutation();
const [updateCartData]=useUpdateCartDataMutation()

const increment = async()=>{
  if (value.qty < 10) {
    // const newCount = count + 1;
   
    // dispatch(setPrice(parseFloat(data.data.attributes.price) * newCount));
    await updateCartData({
      access_token:access_token,
      id: value.id,
      qty: value.qty+1
    });
  refetch()
  }
}
const decrement = async () => {
  if (value.qty > 1) {
    // const newCount = count - 1;

    // dispatch(setPrice(parseFloat(data.data.attributes.price) * newCount));
    await updateCartData({
      access_token: access_token,
      id: value.id,
       qty:value.qty-1 ,
    });
    refetch()
  }
};

  const handleRemoveItem = () => {
    deleteCartData({ id: value.id, access_token:access_token })
      .then(() => {
        refetch();
      })
      .catch((error) => {
        console.error("Error removing item:", error);
      });
  };





  if (isLoading) {
    return <div>Loading medicine data...</div>;
  }

  if (isError) {
    return <div>Error fetching medicine data. Please try again later.</div>;
  }

  return (
    <>
      <div className="card p-4">
        <div className="row">
          {/* cart images div */}
          <div className="col-md-5 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow product_img">
            <img src={data.image} className="img-fluid" alt="cart image" />
          </div>

          {/* cart product details */}
          <div className="col-md-7 col-11 mx-auto px-4 mt-2">
            <div className="row">
              {/* product name */}
              <div className="col-12 card-title">
                <h3 className="mb-4 product_name">{data.name}</h3>
              </div>
            </div>

            {/* remove item */}
            <div className="row mb-4">
              <div className="col-8 d-flex">
                <button
                  className="btn btn-danger"
                  style={{ cursor: "pointer" }}
                  onClick={handleRemoveItem}
                >
                  REMOVE
                </button>
              </div>
              <div className="col-4 d-flex justify-content-end price_money">
                <h3>
                  ₹<span>{data.price}</span>
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-flex align-items-center justify-content-end mb-4">
                <span className="me-2 fw-bold">Qty:</span>
                <button
                  className="fw-bold rounded-1"
                  style={{
                    padding: "3px 12px",
                    fontSize: "20px",
                    border: "none",
                  }}
                  onClick={decrement}
                >
                  -
                </button>
                <input
                  type="text"
                  value={value.qty}
                  readOnly
                  className="text-center"
                  style={{ outline: "none", width: "3vw", padding: "3px 10px" }}
                />
                <button
                  className="fw-bold rounded-1"
                  style={{
                    padding: "3px 10px",
                    fontSize: "20px",
                    border: "none",
                  }}
                  onClick={increment}
                >
                  +
                </button>
              </div>
              <div className="col-12 fw-bold mb-4 text-end">
                <span>Total Amount: ₹{parseFloat(value.price) * value.qty.toFixed(2)}</span>
              </div>
              <div className="col-12">
                <p className="text-danger fw-bold" style={{ fontSize: "12px" }}>
                  *You can order minimum 1 & maximum 10 medicine at a time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartCard;
