/**
 * Product Component
 *
 * Страница сведений о продукте.
 * Он отображает изображения продукта, название, цену, цвет, доступные размеры, описание и действия при покупке.
 * Пользователи могут добавить продукт в свою корзину или добавить его в избранное.
 *
 * @component
 * @param {Object} item - Объект продукта, содержащий информацию о продукте.
 * @example
 * import Product from "./Product";
 * // Inside the parent component's render function:
 * const product = {
 *   title: "Product Title",
 *   price: 20.99,
 *   images: ["image1.jpg", "image2.jpg", "image3.jpg"],
 *   description: "Product description...",
 * };
 * <Product item={product} />
 */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Product.module.css";
import { addItemToCart } from "../../features/user/userSlice";

// Размеры товара
const SIZES = [4, 4.5, 5];

const Product = (item) => {
  const { title, price, images, description } = item;

  const dispatch = useDispatch();

// Состояния для управления текущим изображением и выбранным размером
  const [currentImage, setCurrentImage] = useState();
  const [currentSize, setCurrentSize] = useState();

  useEffect(() => {
    if (!images.length) return;
    setCurrentImage(images[0]);
  }, [images]);

// Отправляем на добавление товара в корзину
  const addToCart = () => {
    dispatch(addItemToCart(item));
  };

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div
          className={styles.current}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        <div className={styles["images-list"]}>
          {images.map((image, i) => (
            <div
              key={i}
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{price}$</div>
        <div className={styles.color}>
          <span>Color:</span> Green
        </div>
        <div className={styles.sizes}>
          <span>Sizes:</span>
          <div className={styles.list}>
            {SIZES.map((size) => (
              <div
                onClick={() => setCurrentSize(size)}
                className={`${styles.size} ${
                  currentSize === size ? styles.active : ""
                }`}
                key={size}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <button
            onClick={addToCart}
            className={styles.add}
            disabled={!currentSize}
          >
            Add to cart
          </button>
          <button className={styles.favourite}>Add to favourites</button>
        </div>
        <div className={styles.bottom}>
          <div className={styles.purchase}>19 people purchased</div>
          <Link to={'/'}>Return to store</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
