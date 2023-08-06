/**
 * SingleProduct Component
 *
 * This component represents the product detail page for a single product.
 * It fetches the product data using the `useGetProductQuery` hook from the API slice.
 * It also fetches related products based on the current product's category using the `getRelatedProducts` action from the products slice.
 * The component displays the product details using the `Product` component and shows related products using the `Products` component.
 * If the product data is not available or the API request is still loading, it shows a loading indicator.
 * If the product data is not found or there is an error, the component redirects the user to the homepage.
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

  // Fetch the product data using the useGetProductQuery hook
  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

  // Redirect to the homepage if the product data is not available or there is an error
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
    // Show a loading indicator if the product data is not available yet
    <section className="preloader">Loading...</section>
  ) : (
    // Display the product details and related products once the data is available
    <>
      {/* Display the product details using the Product component */}
      <Product {...data} />
      {/* Display related products using the Products component */}
      <Products products={related} amount={5} title="Related products" />
    </>
  );
};

export default SingleProduct;
