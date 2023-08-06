/**
 * SingleCategory Component
 *
 * This component represents a single category page, displaying products of a specific category.
 * It consists of two main components: a `Poster` component and a `Category` component.
 * The `Poster` component displays a banner or visual content related to the category,
 * while the `Category` component shows the products of the selected category and provides filtering options.
 *
 * @component
 * @example
 * import SingleCategory from "./SingleCategory";
 *
 * // Inside the parent component's render function:
 * <SingleCategory />
 */
import React from "react";
import Category from "./Category";
import Poster from "../Poster/Poster";

const SingleCategory = () => {
  return (
    <>
      {/* Display a banner or visual content related to the category */}
      <Poster />
      {/* Display the products of the selected category and provide filtering options */}
      <Category />
    </>
  );
};

export default SingleCategory;
