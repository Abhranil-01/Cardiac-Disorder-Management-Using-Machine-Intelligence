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
import axios from 'axios';
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";
import NotLogin from "../../Components/NotLogin/NotLogin";
import NoItems from "../../Components/NoItems/NoItems";
function Cart() {
  const [currentData, setCurrentData] = useState([]);
  const accessToken = localStorage.getItem("access_token");
  const dispatch = useDispatch();
const navigate=useNavigate()
  const { data, isLoading, isError,refetch } = useGetCartDataQuery(accessToken);
  const {data:orderItems,refetch:refresh}=useGetorderDataQuery(accessToken);
  const [orderData] = useOrderDataMutation();
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const [Razorpay] = useRazorpay();
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
    function loadScript(src) {
      return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
              resolve(true);
          };
          script.onerror = () => {
              resolve(false);
          };
          document.body.appendChild(script);
      });
}

  const handleOrder = async () => {
    console.log("Payament implement");
  
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (res) {
      console.log('uhuihpuigg',res);
    
  }else{
    console.log(res);
  }
 // creating a new order

  
  try {
    const configOption = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const result = await axios.get("http://127.0.0.1:8000/api/payment/", configOption);
    console.log('fwwefwqe',result);
  
   // Getting the order details back

   axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/payment/',
    data: {
        amount: result.data.total,
        currency: "INR"
    }, headers: {
      Authorization: `Bearer ${accessToken}`,
    }
})
.then((response)=>{
    
    // get order id
    console.log('jhuhuh',response);
    const order_id = response.data.paymentid
    
    // handle payment
    const options = {
      key: "rzp_test_NK5x7XMB4R6nGT",
      order_id: order_id, // Replace with your actual order ID
      handler: async function (response) {
        console.log('grtg',response);
        if (response) {
          console.log(response);
          try {
            if (data) {
              console.log("data",data);
              const orderPromises = data.map((element) =>
                orderData({
                  cart_id: element.id,
                  access_token: accessToken,
                  qty: element.qty,
                  price: (element.price * element.qty).toFixed(2),
                  medicine_id: element.medicine_id,
                })
              );
             const res= await Promise.all(orderPromises);
              refetch();
              refresh()
              // navigate("/Orders")
            console.log("res",res);
              toast.success("Order Successfully Added");
            }
          } catch (error) {
            console.error("Error while placing orders:", error);
          }
        }
      },
    };
    

    const rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    });
    rzp1.open();
})
.catch((error)=>{
    console.log('bii',error);
})
}
  
   catch (error) {
    console.error("Error fetching data:", error);
  }
  

 
  

  };


  if (isLoading) {
    return <div>Loading cart data...</div>;
  }



  return (
    <>{
    accessToken ?(data.length!==0?(
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
      0).toFixed(2)
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
    ):(<NoItems img={"/src/Images/icon/cart-empty.a0a3f3f6aa4cd1e5.svg"} name={"NO ITEMS IN THE CART"}/>) ):(<NotLogin title={"THE MAGIC"}/>)
    }
       
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
