import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByPrice } from "../../features/products/productsSlice";
import Poster from "../../components/Poster/Poster";
import Products from "../../components/Products/Products";
import Categories from "../../components/Categories/Categories";
import Banner from "../../components/Banner/Banner";

const Home = () => {
  const dispatch = useDispatch();

  const {
    products: { list, filtered },
    categories,
  } = useSelector((state) => state);

  // Выбрать товары с ценой меньше 100 при монтировании компонента
  useEffect(() => {
    if (!list.length) return;
    dispatch(filterByPrice(100));
  }, [dispatch, list.length]);

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
