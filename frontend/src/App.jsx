import React, { useEffect } from "react";
import Navber from "./components/Navbar";
import AppRoutes from "./AppRoutes";
import Loading from "./components/Loading";
import { useLoader } from "./hooks/useLoader";
import setLoadingInterceptor from "./Interceptors/loadingInterceptor";

const App = () => {
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    setLoadingInterceptor({ showLoader, hideLoader });
  }, [showLoader, hideLoader]);

  return (
    <>
      <Loading />
      <Navber />
      <AppRoutes />
    </>
  );
};

export default App;
