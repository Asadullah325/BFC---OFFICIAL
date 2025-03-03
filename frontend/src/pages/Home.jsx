import React, { useEffect, useReducer } from "react";
import { getFoods } from "../services/foodService";
import Thumbnail from "../components/Thumbnail";

const initialState = { foods: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_FOODS":
      return { ...state, foods: action.payload };
    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods } = state;

  useEffect(() => {
    getFoods().then((foods) =>
      dispatch({ type: "FETCH_FOODS", payload: foods })
    );
  }, []);

  return (
    <>
      <Thumbnail foods={foods} />
    </>
  );
};

export default Home;
