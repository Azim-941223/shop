import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByPrice } from "../../features/products/productsSlice";
import Poster from "../../components/Poster/Poster";
import Products from "../../components/Products/Products";
import Categories from "../../components/Categories/Categories";
import Banner from "../../components/Banner/Banner";

const Home = () => {
  // Get the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Get relevant data from the Redux store using useSelector
  const {
    products: { list, filtered },
    categories,
  } = useSelector((state) => state);

  // Fetch products with a price less than 100 when the component mounts
  useEffect(() => {
    if (!list.length) return; // If the list is empty, no need to fetch products
    dispatch(filterByPrice(100)); // Dispatch the "filterByPrice" action with 100 as the max price
  }, [dispatch, list.length]);

  // Render the components with the fetched data
  return (
    <>
      <Poster />
      <Products products={list} amount={5} title="Trending" />
      <Categories products={categories.list} amount={5} title="Worth seeing" />
      <Banner />
      <Products products={filtered} amount={5} title="Less than 100$" />
    </>
  );
};

export default Home;
