import React, { useEffect, useState } from "react";
import {
  useGetmedicineDataQuery,
  useCancleOrderMutation,
  useGetmedicineCustomDataQuery,
} from "../../Service/UserAuthApi";
import { useSelector } from "react-redux";

function OrderCard({ value,refetch }) {
  const [disable,setDisable] =useState(false);
  const [cancel,setCancel] =useState('');
  const accessToken = localStorage.getItem("access_token");
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const { data, isLoading, isError } = useGetmedicineCustomDataQuery(value.medicine_id);
  
  const [cancleOrder] = useCancleOrderMutation();
console.log('cfaf',value);


useEffect(()=>{
  if(value.status === 'Cancelled') {
   
    setDisable(true)
    setCancel('Order Cancelled')
  }
},[])

  const handleCancel = async() => {
    const res= await cancleOrder({ id: value.id, access_token: accessToken });
    console.log('wefwef',res);
    if(res.data.msg==="Order canceled"){
      setDisable(true)
    setCancel('Order Cancelled')
    }
    refetch()
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
                {console.log(data.status)}
                {data.status === "Cancelled" ? null : (
                  <button
                    className="btn btn-danger"
                    style={{ cursor: "pointer" }}
                    onClick={handleCancel}
                    disabled={disable}
                  >
                    CANCEL
                  </button>
                )}
               
              </div>
              <div className="col-4 d-flex justify-content-end price_money">
                
                <h3>
                  ₹<span>{data.price}</span>
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-flex align-items-center justify-content-end mb-4">
         
                <span className="me-2 fw-bold">Qty: {value.qty}</span>
              </div>
              <div className="col-12 fw-bold mb-4 text-end">
              
                <span>Total Amount: ₹{data.price * value.qty}</span>
              </div>
              <div>
              <p className="me-2 fw-bold text-danger">{cancel}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderCard;
