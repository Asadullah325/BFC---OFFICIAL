import React from "react";
import Navber from "./components/Navbar";
import Home from "./pages/Home";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <>
      <Navber />
      <AppRoutes />
    </>
  );
};

export default App;
