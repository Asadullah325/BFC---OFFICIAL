import React, { useEffect, useState } from "react";
import { getNewOrderForCurrentUser } from "../services/orderService";
import Title from "../components/Title";
import OrderItemsList from "../components/OrderItemsList";
import Map from "../components/Map";
import Button from "../components/Button";
import StripeButton from "../components/StripeButton";

const PaymentPage = () => {

  const [order, setOrder] = useState();

  useEffect(() => {
    getNewOrderForCurrentUser().then((data) => setOrder(data));
  }, []);

  if (!order) return;

  return (
    <>
      <div className="container mx-auto p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 w-full sm:w-1/2">
          <Title title="Payment Page" fontSize={32} />
          <div className="flex flex-col">
            <h3>Name</h3>
            <p>{order.name}</p>
          </div>
          <div>
            <h3>Address</h3>
            <p>{order.address}</p>
          </div>
          <OrderItemsList order={order} />
        </div>
        <div className="w-full sm:w-1/2">
          <Title title="Your Location" fontSize={28} />
          <Map readOnly location={order.addressLatLng} />
        </div>
      </div>
      <div className="flex justify-center items-center flex-col gap-2 mb-3">
        <StripeButton
          order={order}
          className="bg-amber-700 mt-1 p-1 px-10 rounded-md text-white font-semibold border-2 border-amber-700 cursor-pointer hover:bg-white hover:text-amber-700"
        />
        <Button
          title="Cash On Delivery"
          type="button"
          className="bg-amber-700 mt-1 p-1 px-10 rounded-md text-white font-semibold border-2 border-amber-700 cursor-pointer hover:bg-white hover:text-amber-700"
        />
      </div>
    </>
  );
};

export default PaymentPage;
