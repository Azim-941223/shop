/**
 * Poster Component
 *
 * This component represents a banner or promotional section for a website or application.
 * It displays a title, subtitle, product information, and a call-to-action button.
 *
 * @component
 * @example
 * import Poster from "./Poster";
 *
 * // Inside the parent component's render function:
 * <Poster />
 */
import React from "react";
import styles from "../Banner/Banner.module.css";
import BG from "../../images/computer.png";

const Poster = () => (
  <section className={styles.home}>
    {/* Main title */}
    <div className={styles.title}>BIG SALE 20%</div>
    <div className={styles.product}>
      {/* Product details */}
      <div className={styles.text}>
        {/* Subtitle */}
        <div className={styles.subtitle}>the bestseller of 2022</div>
        {/* Product name */}
        <h1 className={styles.head}>LENNON r2d2 with NVIDIA 5090 TI</h1>
        {/* Call-to-action button */}
        <button className={styles.button}>Shop Now</button>
      </div>
      {/* Product image */}
      <div className={styles.image}>
        <img src={BG} alt="" />
      </div>
    </div>
  </section>
);

export default Poster;
