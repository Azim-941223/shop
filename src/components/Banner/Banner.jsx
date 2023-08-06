/**
  * Баннерный компонент для отображения рекламного баннера на сайте.
  * Этот компонент показывает баннер с левой частью, содержащей распродажу
  * и кнопку «Подробнее», а также правую часть, отображающую процент скидки
  * с фоновым изображением.
 */
import React from "react";
import styles from "./Banner.module.css";
import bannerImg from "../../images/banner.png";

const Banner = () => (
  <section className={styles.banner}>
    <div className={styles.left}>
      <p className={styles.content}>
        NEW YEAR
        <span>SALE</span>
      </p>

      <button className={styles.more}>See more</button>
    </div>
    <div
      className={styles.right}
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <p className={styles.discount}>
        save up to <span>50%</span> off
      </p>
    </div>
  </section>
);

export default Banner;
