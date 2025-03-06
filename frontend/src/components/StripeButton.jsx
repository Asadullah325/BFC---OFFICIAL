import React from "react";
import { stripePayment } from "../services/orderService";

const StripeButton = ({ order, className }) => {
  const handlePayment = async () => {
    stripePayment(order);
  };

  return (
    <button className={className} onClick={handlePayment}>
      Stripe Payment
    </button>
  );
};

export default StripeButton;
