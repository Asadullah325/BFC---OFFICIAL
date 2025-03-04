import React from "react";
import { useCart } from "../hooks/useCart";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import Price from "../components/Price";
import NotFound from "../components/NotFound";

const CartPage = () => {
  const { cart, removeFromCart, changeQuantity } = useCart();

  return (
    <>
      <Title title="Cart Page" />
      {cart.items.length > 0 ? (
        <div className="flex flex-col px-4 md:px-10">
          <ul className="flex flex-col">
            {cart.items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row items-center md:items-start mb-4 p-4 bg-white shadow-lg rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg mb-2 md:mb-0 md:mr-4"
                />
                <div className="flex flex-col items-start flex-grow p-2">
                  <Link
                    to={`/food/${item.id}`}
                    className="text-lg font-semibold hover:underline"
                  >
                    {item.name}
                  </Link>
                  <select
                    name="quantity"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-75 p-2.5 outline-none cursor-pointer mt-2"
                    value={item.quantity} // Ensure it reflects current quantity
                    onChange={(e) => changeQuantity(item, e.target.value)}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ml-auto md:ml-4 mt-2 md:mt-0">
                  <Price price={item.price} />
                </div>
                <button
                  className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition cursor-pointer"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t mt-4">
            <div className="flex items-center text-lg font-semibold">
              <span className="mr-2">{cart.totalCount} items</span>
              <span>
                <Price price={cart.totalPrice} />
              </span>
            </div>
            <Link
              to="/checkout"
              className="bg-amber-700 text-white px-6 py-2 mt-2 rounded hover:bg-amber-800 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <NotFound message="Cart is empty" linkRoute="/" linkText="Go Home" />
        </div>
      )}
    </>
  );
};

export default CartPage;
