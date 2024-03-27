
import React, { useEffect, useState } from "react";

import { useDispatch,useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import { useGetorderDataQuery } from "../../Service/UserAuthApi";

function Order() {
  const accessToken = localStorage.getItem('access_token');
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const { data, isLoading, isError } = useGetorderDataQuery(accessToken);

  console.log(data);


  if (!accessToken) {
    return <div>Access token not available. Please log in.</div>;
  }

  if (isLoading) {
    return <div>Loading cart data...</div>;
  }

  if (isError) {
    return <div>Error fetching cart data. Please try again later.</div>;
  }
  return (
    <div className="container-fluid mb-5">
      <div className="row">
        <div className="col-md-10 col-11 mx-auto">
          <div className="row mt-5 gx-3">
            <div className="col-md-12 col-lg-8 col-11 mx-auto main_cart mb-lg-0 mb-5 shadow">
              {data.map((element) => (
                <OrderCard key={element.id} value={element}/>
              ))}
            </div>
             
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
