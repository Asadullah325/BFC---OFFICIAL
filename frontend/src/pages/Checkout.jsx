import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createOrder } from "../services/orderService";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import OrderItemsList from "../components/OrderItemsList";
import Map from "../components/Map";

const Checkout = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [order, setOrder] = useState({ ...cart });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    try {
      if (!order.addressLatLng) {
        toast.warning("Please select an address on the map");
        return;
      }

      await createOrder({ ...order, address: data.address, name: data.name });

      navigate("/payment");
    } catch (error) {
      console.log(error?.response?.data || "Registration failed");
    }
  };

  return (
    <>
      <div className="container mx-auto flex  flex-col items-center p-2">
        <form
          onSubmit={handleSubmit(submit)}
          className="w-full flex sm:flex-row flex-col"
        >
          <div className="w-full sm:w-1/2 px-3">
            <Title title="Checkout" />
            <div>
              <Input
                type="text"
                label="Name"
                defaultValue={user?.name}
                placeholder="Enter your name"
                {...register("name", {
                  required: "Name is required",
                })}
                error={errors.name}
                className="border border-amber-700 p-1 rounded-md mb-1 w-full placeholder:text-amber-700 outline-none text-amber-700"
              />
              <Input
                type="text"
                label="Address"
                defaultValue={user?.address}
                placeholder="Enter your address"
                {...register("address", {
                  required: "Address is required",
                })}
                error={errors.address}
                className="border border-amber-700 p-1 rounded-md mb-1 w-full placeholder:text-amber-700 outline-none text-amber-700"
              />
            </div>
            <OrderItemsList order={order} />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col">
            <Title title="Choose Your Location" fontSize={24} />
            <Map
              onChange={(latLng) =>
                console.log("latLng", latLng) ||
                setOrder({ ...order, addressLatLng: latLng })
              }
              location={order.addressLatLng}
            />
            <div className="flex flex-col items-end mt-2">
              <Button
                type="submit"
                title="Go to Payment"
                className="bg-amber-700 mt-1 p-1 px-10 rounded-md text-white font-semibold border-2 border-amber-700 cursor-pointer hover:bg-white hover:text-amber-700"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
