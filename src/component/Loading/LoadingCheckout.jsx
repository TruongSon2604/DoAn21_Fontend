import React from "react";
import "./LoadingCheckout.scss";

const LoadingCheckout = () => {
  return (
    <div className="checkout-loader-container">
      <div className="checkout-loader"></div>
      <div className="checkout-loader-text">Processing order...</div>
    </div>
  );
};

export default LoadingCheckout;
