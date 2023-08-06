/**
 * Categories Component
 *
 * Этот компонент отображает список категорий с соответствующими им продуктами.
 *
 * @component
 * @param {string} title - Название категории.
 * @param {Array} products - Массив объектов продукта, принадлежащих категории. По умолчанию это пустой массив.
 * @param {number} amount - Максимальное количество отображаемых товаров. По умолчанию отображаются все продукты.
 * @example
 * import Categories from "./Categories";
 * // Inside the parent component's render function:
 * <Categories title="Featured Categories" products={categoryProducts} amount={4} />
 */
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Categories.module.css";

const Categories = ({ title, products = [], amount }) => {
  // Если указан «количество», отфильтруйте продукты что бы указать кол-во товаров
  const list = products.filter((_, i) => i < amount);

  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <div className={styles.list}>
        {list.map(({ id, name, image }) => (
          // Ссылку на страницу категории с ID категории в качестве параметра.
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
