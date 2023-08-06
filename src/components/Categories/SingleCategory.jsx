/**
 * SingleCategory Component
 *
 * Этот компонент представляет собой одну страницу категории, отображающую продукты определенной категории.
 * Он состоит из двух основных компонентов: компонента «Poster» и компонента «Category».
 * Компонент «Poster» отображает баннер или визуальный контент, относящийся к категории,
 * в то время как компонент «Category» показывает продукты выбранной категории и предоставляет параметры фильтрации.
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
      <Poster />
      <Category />
    </>
  );
};

export default SingleCategory;
