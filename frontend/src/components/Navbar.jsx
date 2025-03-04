import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Navbar = () => {
  const user = {
    name: "John Doe",
    email: "Y3u8w@example.com",
  };

  const { cart } = useCart();

  const handleLogout = () => {};

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-[#C14600] shadow">
        <div className="flex items-center">
          <Link to="/">
            <h1 className="text-2xl text-white hover:text-gray-300 tracking-wider font-bold">
              BFC
            </h1>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-6 font-semibold tracking-wider">
            {user ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="text-white hover:text-gray-300"
                  >
                    {user.name}
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-white hover:text-gray-300">
                    Cart{" "}
                    <span className="ml-1 text-sm bg-red-500 px-2 rounded-full p-1 hover:bg-red-600 text-white">
                      {cart.items.length}
                    </span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-white cursor-pointer hover:text-gray-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-white hover:text-gray-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-white hover:text-gray-300"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
