import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotal } from "../../features/cartSlice";
import CartCard from "../../Components/cartCard/CartCard";
import {
  useGetCartDataQuery,
  useGetorderDataQuery,
  useOrderDataMutation,
} from "../../Service/UserAuthApi";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Cart() {
  const [currentData, setCurrentData] = useState([]);
  const accessToken = localStorage.getItem("access_token");
  const dispatch = useDispatch();

  const { data, isLoading, isError,refetch } = useGetCartDataQuery(accessToken);
  const {data:orderItems,refetch:refresh}=useGetorderDataQuery(accessToken);
  const [orderData] = useOrderDataMutation();
  const totalPrice = useSelector((state) => state.cart.totalPrice);

console.log('fref',totalPrice);
  // useEffect(() => {
  //   const refetchData = () => {
  //     dispatch(calculateTotal());
  //     if (data) {
  //       setCurrentData(data);
  //     }
  //   };
  //   refetchData();
  // }, [data, dispatch]);
    // Calculate total price dynamically based on currentData
  

  const handleOrder = async () => {
    try {
      if(data){
        const orderPromises = data.map((element) =>
        orderData({
          cart_id: element.id,
          access_token: accessToken,
          qty: element.qty,
          price: element.price*element.qty,
          medicine_id: element.medicine_id,
        })
      );
      await Promise.all(orderPromises);
      refetch()
    refresh()
      toast.success("Order Successfully Added")
      }
     
    } catch (error) {
      console.error("Error while placing orders:", error);
    }
  };

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
    <>
        <div className="container-fluid my-5">
      <h1 className="text-center" style={{ marginTop: "100px" }}>
        Cart Items
      </h1>
      <div className="row">
        <div className="col-md-10 col-11 mx-auto">
          <div className="row mt-5 gx-3">
            <div className="col-md-12 col-lg-8 col-11 mx-auto main_cart mb-lg-0 mb-5 shadow">
              {data&&data.map((element) => (
                <CartCard key={element.id} value={element} refetch={refetch} />
              ))}
            </div>
            <div className="col-md-12 col-lg-4 col-11 mx-auto mt-lg-0 mt-md-5">
              <div className="right_side p-3 shadow bg-white">
                <div className="price_indiv d-flex justify-content-between">
                  <p>Total Product</p>
                  <p>{data.reduce((qty, item) => qty+item.qty,0)}</p>
                </div>
                <div className="price_indiv d-flex justify-content-between">
                  <p>Total Amount</p>
                  <p>₹{data.reduce(
      (price, item) => price + item.qty * item.price,
      0)
    }</p>
                </div>
                <button
                  className="btn btn-primary text-uppercase"
                  onClick={handleOrder}
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition= {Bounce}
/>
    </>

  );
}

export default Cart;
