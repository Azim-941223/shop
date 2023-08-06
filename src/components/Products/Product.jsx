/**
 * Product Component
 *
 * This component represents a product detail page.
 * It displays the product's images, title, price, color, available sizes, description, and purchase actions.
 * Users can add the product to their cart or add it to their favorites.
 *
 * @component
 * @param {Object} item - The product object containing information about the product.
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

// Available sizes for the product
const SIZES = [4, 4.5, 5];

const Product = (item) => {
  const { title, price, images, description } = item;

  const dispatch = useDispatch();

  // State variables for managing the current image and selected size
  const [currentImage, setCurrentImage] = useState();
  const [currentSize, setCurrentSize] = useState();

  // Set the initial current image when the component mounts or the images prop changes
  useEffect(() => {
    if (!images.length) return;
    setCurrentImage(images[0]);
  }, [images]);

  // Dispatch the action to add the product to the cart
  const addToCart = () => {
    dispatch(addItemToCart(item));
  };

  return (
    <section className={styles.product}>
      {/* Product Images */}
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
      {/* Product Information */}
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{price}$</div>
        <div className={styles.color}>
          <span>Color:</span> Green
        </div>
        {/* Available Sizes */}
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
        {/* Product Description */}
        <p className={styles.description}>{description}</p>
        {/* Purchase Actions */}
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
        {/* Bottom Section */}
        <div className={styles.bottom}>
          <div className={styles.purchase}>19 people purchased</div>
          {/* Return to Store Link */}
          <Link to={'/'}>Return to store</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
