import React, { useEffect, useReducer } from "react";
import {
  getFoods,
  getTags,
  search,
  filterFoodsByTag,
} from "../services/foodService";
import Thumbnail from "../components/Thumbnail";
import { useParams } from "react-router-dom";
import Search from "../components/Search";
import Tags from "../components/Tags";
import NotFound from "../components/NotFound";

const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_FOODS":
      return { ...state, foods: action.payload };
    case "FETCH_TAGS":
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;
  const { searchTerm, tagName } = useParams();

  useEffect(() => {
    getTags().then((tags) =>
      dispatch({
        type: "FETCH_TAGS",
        payload: tags,
      })
    );

    const loadedFoods = tagName
      ? filterFoodsByTag(tagName)
      : searchTerm
      ? search(searchTerm)
      : getFoods();

    loadedFoods.then((foods) =>
      dispatch({
        type: "FETCH_FOODS",
        payload: foods,
      })
    );
  }, [searchTerm, tagName]);

  return (
    <>
      <Search />
      <Tags tags={tags} />
      {foods.length === 0 && (
        <NotFound message="No foods found" linkRoute="/" linkText="Reset Search" />
      )}
      <Thumbnail foods={foods} />
    </>
  );
};

export default Home;
