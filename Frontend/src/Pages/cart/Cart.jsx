import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotal } from "../../features/cartSlice";
import CartCard from "../../Components/cartCard/CartCard";
import {
  useGetCartDataQuery,
  useOrderDataMutation,
} from "../../Service/UserAuthApi";

function Cart() {
  const [currentData, setCurrentData] = useState([]);
  const accessToken = localStorage.getItem("access_token");
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetCartDataQuery(accessToken);
  const [orderData] = useOrderDataMutation();
  const totalPrice = useSelector((state) => state.cart.totalPrice);

console.log('fref',totalPrice);
  useEffect(() => {
    const refetchData = () => {
      dispatch(calculateTotal());
      if (data) {
        setCurrentData(data);
      }
    };
    refetchData();
  }, [data, dispatch]);
    // Calculate total price dynamically based on currentData
    const totalAmount = totalPrice.reduce(
      (total, item) => total + item.qty * item.price,
      0
    );
const totalQty=totalPrice.reduce((qty, item) => qty+item.qty,0)
console.log(totalQty);

  const handleOrder = async () => {
    try {
      const orderPromises = currentData.map((element) =>
        orderData({
          cart_id: element.id,
          access_token: accessToken,
          qty: element.qty,
          medicine_id: element.medicine_id,
        })
      );
      await Promise.all(orderPromises);
      window.location.reload();
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
    <div className="container-fluid my-5">
      <h1 className="text-center" style={{ marginTop: "100px" }}>
        Cart Items
      </h1>
      <div className="row">
        <div className="col-md-10 col-11 mx-auto">
          <div className="row mt-5 gx-3">
            <div className="col-md-12 col-lg-8 col-11 mx-auto main_cart mb-lg-0 mb-5 shadow">
              {currentData.map((element) => (
                <CartCard key={element.id} value={element} />
              ))}
            </div>
            <div className="col-md-12 col-lg-4 col-11 mx-auto mt-lg-0 mt-md-5">
              <div className="right_side p-3 shadow bg-white">
                <div className="price_indiv d-flex justify-content-between">
                  <p>Total Product</p>
                  <p>{totalQty}</p>
                </div>
                <div className="price_indiv d-flex justify-content-between">
                  <p>Total Amount</p>
                  <p>₹{totalAmount.toFixed(2)}</p>
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
  );
}

export default Cart;
