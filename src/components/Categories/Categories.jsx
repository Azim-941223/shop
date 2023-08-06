/**
 * Categories Component
 *
 * This component displays a list of categories with their corresponding products.
 *
 * @component
 * @param {string} title - The title of the category section.
 * @param {Array} products - An array of product objects belonging to the category. Default is an empty array.
 * @param {number} amount - The maximum number of products to be displayed. Defaults to showing all products.
 * @example
 * import Categories from "./Categories";
 * // Inside the parent component's render function:
 * <Categories title="Featured Categories" products={categoryProducts} amount={4} />
 */
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Categories.module.css";

const Categories = ({ title, products = [], amount }) => {
  // If the 'amount' prop is provided, filter the products to display only the specified number of items.
  const list = products.filter((_, i) => i < amount);

  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <div className={styles.list}>
        {list.map(({ id, name, image }) => (
          // Create a Link to the category page with the category ID as the URL parameter.
          <Link to={`/categories/${id}`} key={id} className={styles.item}>
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
            />
            <h3 className={styles.title}>{name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
