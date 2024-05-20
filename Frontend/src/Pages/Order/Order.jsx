
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import { useGetorderDataQuery } from "../../Service/UserAuthApi";
import { useProductContext } from "../../context/productContext";
import NotLogin from "../../Components/NotLogin/NotLogin";
import NoItems from "../../Components/NoItems/NoItems";
function Order() {
  const accessToken = localStorage.getItem('access_token');
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const { data, isLoading, isError ,refetch} = useGetorderDataQuery(accessToken);
  const {products}=useProductContext();
  console.log('qwdwde',products);

  console.log(data);
 
  



  if (isLoading) {
    return <div>Loading cart data...</div>;
  }

 


  return (<>{
    accessToken ? (data && data.length!==0 ?(<div className="container-fluid   " >
    <h1 className="text-center" style={{marginTop:'150px'}}>Your Orders</h1>
    <div className="row">
      <div className="col-md-10 col-11 mx-auto">
        <div className="row mt-5 gx-3">
          <div className="col-md-12 col-lg-8 col-11 mx-auto main_cart mb-lg-0 mb-5 shadow">
            {data && data.map((element) => (
              <OrderCard key={element.id} value={element} refetch={refetch}/>
            ))}
          </div>
           
        </div>
      </div>
    </div>
  </div>):(<NoItems img={"/src/Images/icon/cart-empty.a0a3f3f6aa4cd1e5.svg"} name={"NO ORDERS "}/>)  ):(<NotLogin title={"YOUR ORDERS"}/>)
  
  }</>
  )
}

export default Order
