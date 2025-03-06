import React from "react";
import { Link } from "react-router-dom";
import Price from "./Price";

const OrderItemsList = ({ order }) => {
  return (
    <>
      <table className="w-full">
        <tbody className="w-full">
          <tr className="w-full">
            <td colSpan={5} className="w-full">
              <h1 className="text-xl font-bold text-amber-700">Order Items</h1>
            </td>
          </tr>
          {order?.items.map((item , index) => (
            <tr key={index} className="w-full flex justify-between items-center sm:items-start md:items-center flex-col md:flex-row py-2">
              <td>
                <Link to={`/food/${item.id}`}>
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-full" />
                </Link>
              </td>
              <td>
                <Link to={`/food/${item.id}`} className="hover:underline">{item.name}</Link>
              </td>
              <td>
                <Price price={item.price} />
              </td>
              <td>{item.quantity}</td>
            </tr>
          ))}
          <tr className="w-full flex justify-between items-center sm:items-start md:items-center py-2">
            <td colSpan={4} className="font-bold text-2xl">Total:</td>
            <td className="font-bold text-2xl">
              <Price price={order?.totalPrice} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OrderItemsList;
