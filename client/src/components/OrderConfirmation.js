import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const OrderConfirmation = () => {
  const [orderConfirmation, setOrderConfirmation] = useState("");
  const { _id } = useParams();

  useEffect(() => {
    fetch(`/order/${_id}`)
      .then((res) => res.json())
      .then((resData) => {
        setOrderConfirmation(resData.data);
        console.log(resData.data);
      });
  }, []);
  return (
    <div>
      <div>
        <h1>Thank you for your order!</h1>

        <div>
          <p>
            {" "}
            An email confirmation has been sent to {orderConfirmation.email}
          </p>
        </div>

        <p>Order number: {orderConfirmation._id} </p>
        <p>Order total: $ {orderConfirmation.total}</p>
      </div>
    </div>
  );
};

export default OrderConfirmation;
