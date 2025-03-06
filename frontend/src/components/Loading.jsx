import React from "react";
import { useLoader } from "../hooks/useLoader";

const Loading = () => {
  const { isLoading } = useLoader();

  if (!isLoading) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen fixed top-0 left-0 right-0 bottom-0 bg-white z-100">
        <div className="flex flex-col items-center justify-center">
          <img src="/media/loading.svg" alt="" className="w-30 h-30 border-b-4 border-pink-600 " />
          <p className="text-2xl text-pink-600 font-bold p-2">Loading ...</p>
        </div>
      </div>
    </>
  );
};

export default Loading;
