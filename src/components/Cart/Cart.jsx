/**
 * Cart Component
 *
 * This component displays the user's shopping cart, including items, quantities, prices, and total price.
 * It allows users to add or remove items and update their quantities in the cart.
 *
 * @component
 * @example
 * import Cart from "./Cart";
 * // Inside the parent component's render function:
 * <Cart />
 */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../features/user/userSlice";
import styles from "./Cart.module.css";
import { sumBy } from "../../utils/common";

const Cart = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const { cart } = useSelector(({ user }) => user);

  /**
   * Change the quantity of an item in the cart.
   *
   * @param {Object} item - The item object to be updated.
   * @param {number} quantity - The new quantity for the item.
   */
  const changeQuantity = (item, quantity) => {
    dispatch(addItemToCart({ ...item, quantity }));
  };

  /**
   * Remove an item from the cart.
   *
   * @param {number} id - The ID of the item to be removed.
   */
  const removeItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Your cart</h2>
      {!cart.length ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <>
          <div className={styles.list}>
            {cart.map((item) => {
              const { title, category, images, price, id, quantity } = item;
              return (
                <div className={styles.item} key={id}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${images[0]})` }}
                  />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{title}</h3>
                    <div className={styles.category}>{category.name}</div>
                  </div>
                  <div className={styles.price}>{price}$</div>
                  <div className={styles.quantity}>
                    <div
                      className={styles.minus}
                      onClick={() =>
                        changeQuantity(item, Math.max(1, quantity - 1))
                      }
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
                        />
                      </svg>
                    </div>
                    <span>{quantity}</span>
                    <div
                      className={styles.plus}
                      onClick={() =>
                        changeQuantity(item, Math.max(1, quantity + 1))
                      }
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                        />
                      </svg>
                    </div>
                  </div>
                  <div className={styles.total}>{price * quantity}$</div>
                  <div
                    className={styles.close}
                    onClick={() => removeItem(item.id)}
                  >
                    <svg className="icon">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.actions}>
            <div className={styles.total}>
              TOTAL PRICE:{" "}
              <span>
                {sumBy(
                  cart.map(({ quantity, price }) => quantity * price)
                )}
                $
              </span>
            </div>
            <button className={styles.proceed}>Proceed to checkout</button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
