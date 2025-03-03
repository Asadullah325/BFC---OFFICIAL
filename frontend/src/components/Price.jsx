import React from "react";

const Price = ({ price = 0, locale = "en-US", currency = "USD" }) => {
  const formatPrice = () => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency || "USD", // Ensure currency is always defined
    }).format(price);
  };

  return <span>{formatPrice()}</span>;
};

export default Price;
