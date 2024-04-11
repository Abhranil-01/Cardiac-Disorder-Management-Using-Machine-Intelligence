import React, { useEffect, useState } from "react";
import {
  useDeleteCartDataMutation,
  useGetmedicineDataQuery,
  useUpdateCartDataMutation,
  useGetCartDataQuery
} from "../../Service/UserAuthApi";
import { useDispatch,useSelector } from "react-redux";
import { cartQty, setPriceTotal } from "../../features/cartSlice";

function CartCard({ value }) {
  const [count, setCount] = useState(value.qty);
  const [disable, setDisable] = useState(false);
  const [disableOne, setDisableOne] = useState(false);
  const [totalAmt, setTotalAmt] = useState(0);
  const accessToken = localStorage.getItem("access_token");


  const { data, isLoading, isError } = useGetmedicineDataQuery({
    id: value.medicine_id,
    access_token: accessToken,
  });
console.log(data);
  const [deleteCartData] = useDeleteCartDataMutation();
  const [updateCartData, { res }] = useUpdateCartDataMutation();
  const dispatch = useDispatch();
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  useEffect(() => {
    if (res) {
      // If an update is successful, update the local state
      setCount(value.qty);
      setTotalAmt(parseFloat(data.price) * value.qty);
    }
  }, [res]);

  useEffect(() => {
    if (!isLoading && data) {
      setTotalAmt(parseFloat(data.price) * count);
    }
  }, [data, isLoading, count]);

 
  useEffect(() => {
    if(data){
      dispatch(setPriceTotal({ id: data.id, qty: count, price: data.price }));
    }

  }, [count,  dispatch, value.id,data]);
  const handleRemoveItem = () => {
    deleteCartData({ id: value.id, access_token: accessToken })
      .then(() => {
        // No need to reload the page, just update the state
        window.location.reload()
        setCount(0);
        setTotalAmt(0);
      })
      .catch((error) => {
        console.error("Error removing item:", error);
        // Handle error if needed
      });
  };

  const increment = () => {
    if (count < 10) {
      const newCount = count + 1;
      setCount(newCount);
      updateCartData({ id: value.id, access_token: accessToken, qty: newCount });
      window.location.reload()
    }
  };

  const decrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      updateCartData({ id: value.id, access_token: accessToken, qty: newCount });
      window.location.reload()
    }
  };

  useEffect(() => {
    // Disable increment button if count is 10
    setDisable(count === 10);
    // Disable decrement button if count is 1
    setDisableOne(count === 1);
    
  }, [count]);




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
                  disabled={disableOne}
                >
                  -
                </button>
                <input
                  type="text"
                  value={count}
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
                  disabled={disable}
                >
                  +
                </button>
              </div>
              <div className="col-12 fw-bold mb-4 text-end">
                <span>Total Amount: ₹{totalAmt.toFixed(2)}</span>
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
