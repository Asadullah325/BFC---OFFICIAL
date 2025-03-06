import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FoodPage from "./pages/FoodPage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthRoute from "./components/AuthRoute";
import Checkout from "./pages/Checkout";
import PaymentPage from "./pages/PaymentPage";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:searchTerm" element={<Home />} />
        <Route path="/tag/:tagName" element={<Home />} />
        <Route path="/food/:id" element={<FoodPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/checkout"
          element={
            <AuthRoute>
              <Checkout />
            </AuthRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <AuthRoute>
              <PaymentPage />
            </AuthRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
