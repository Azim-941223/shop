/**
 * Banner component for displaying a promotional banner on the website.
 * This component shows a banner with a left section containing a sale content
 * and a "See more" button, and a right section displaying a discount percentage
 * with a background image.
 */
import React from "react";
import styles from "./Banner.module.css";
import bannerImg from "../../images/banner.png";

const Banner = () => (
  <section className={styles.banner}>
    {/* Left Section */}
    <div className={styles.left}>
      {/* Sale Content */}
      <p className={styles.content}>
        NEW YEAR
        <span>SALE</span>
      </p>

      {/* "See more" Button */}
      <button className={styles.more}>See more</button>
    </div>

    {/* Right Section */}
    <div
      className={styles.right}
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      {/* Discount Percentage */}
      <p className={styles.discount}>
        save up to <span>50%</span> off
      </p>
    </div>
  </section>
);

export default Banner;
