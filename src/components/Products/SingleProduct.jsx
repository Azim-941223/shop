/**
 * SingleProduct Component
 *
 * Сведения о продукте для одного продукта.
 * Извлекает из хука`useGetProductQuery` из API слайса
 * Он также извлекает сопутствующие товары на основе категории текущего продукта, используя действие `getRelatedProducts` из слайса продуктов.
 * Компонент отображает сведения о продукте с помощью компонента «Product» и показывает сопутствующие товары с помощью компонента «Products».
 * Если данные о продукте недоступны или запрос API все еще загружается, отображается индикатор загрузки.
 * Если данные о товаре не найдены или произошла ошибка, компонент перенаправляет на главную страницу.
 *
 * @component
 * @example
 * import SingleProduct from "./SingleProduct";
 *
 * // Inside the parent component's render function:
 * <SingleProduct />
 */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useGetProductQuery } from "../../features/api/apiSlice";
import { getRelatedProducts } from "../../features/products/productsSlice";

import Product from "./Product";
import Products from "./Products";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { list, related } = useSelector(({ products }) => products);

// Получить данные о продукте с помощью хука useGetProductQuery
  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

// Перенаправление на домашнюю страницу, если данные о продукте недоступны или есть ошибка
  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, isSuccess]);

  // Fetch related products based on the current product's category
  useEffect(() => {
    if (!data || !list.length) return;

    dispatch(getRelatedProducts(data.category.id));
  }, [data, dispatch, list.length]);

  return !data ? (
// Показать индикатор загрузки, если данные о продукте еще недоступны
    <section className="preloader">Loading...</section>
  ) : (
    <>
      {/* Отображает данные о просукте с компонента Product */}
      <Product {...data} />
      {/* Отображает сопутствующие товары*/}
      <Products products={related} amount={5} title="Related products" />
    </>
  );
};

export default SingleProduct;
