/**
 * Products Component
 *
 * Этот компонент представляет собой список товаров, отображаемых на странице или в разделе.
 * Его можно использовать для демонстрации коллекции продуктов с их изображениями, названиями, ценами.
 *
 * @component
 * @param {string} title - Заголовок, отображаемый над списком товаров (необязательно).
 * @param {Object} style - стили(необязательно)
 * @param {Array} products - Массив объектов продукта, содержащий информацию о каждом продукте.
 * @param {number} amount - Максимальное количество товаров для отображения (необязательно).
 * @example
 * import Products from "./Products";
 * // Inside the parent component's render function:
 * const productList = [
 *   {
 *     id: 1,
 *     title: "Product 1",
 *     category: { name: "Category 1" },
 *     price: 19.99,
 *     images: ["image1.jpg", "image2.jpg", "image3.jpg"],
 *   },
 *   // Добавить больше объектов продукта...
 * ];
 * <Products title="Featured Products" products={productList} amount={4} />
 */
import React from "react";
import { Link } from "react-router-dom";

import styles from "./Products.module.css";

const Products = ({ title, style = {}, products = [], amount }) => {
  // Filter the products to get the desired amount
  const list = products.filter((_, i) => i < amount);

  return (
    <section className={styles.products} style={style}>
      {/* Display the title if provided */}
      {title && <h2>{title}</h2>}
      <div className={styles.list}>
        {/* Map through the list of products */}
        {list.map(({ id, images, title, category: { name: cat }, price }) => (
          // Render a link to the product detail page
          <Link to={`/products/${id}`} key={id} className={styles.product}>
            {/* Product Image */}
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${images[0]})` }}
            />
            <div className={styles.wrapper}>
              {/* Product Title */}
              <h3 className={styles.title}>{title}</h3>
              {/* Product Category */}
              <div className={styles.cat}>{cat}</div>
              <div className={styles.info}>
                <div className={styles.prices}>
                  {/* Product Price */}
                  <div className={styles.price}>{price}$</div>
                  {/* Discounted Price */}
                  <div className={styles.oldPrice}>{Math.floor(price * 0.8)}$</div>
                </div>
                {/* Purchase Statistics */}
                <div className={styles.purchases}>
                  {Math.floor(Math.random() * 20 + 1)} purchased
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Products;
