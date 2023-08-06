/**
 * Footer Component
 *
 * This component represents the footer section of a website or application.
 * It typically includes a logo, copyright notice, and social media links.
 *
 * @component
 * @example
 * import Footer from "./Footer";
 *
 * // Inside the parent component's render function:
 * <Footer />
 */
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import LOGO from "../../images/logo.svg";

const Footer = () => (
  <section className={styles.footer}>
    {/* Logo */}
    <div className={styles.logo}>
      <Link to={'/'}>
        <img src={LOGO} alt="Stuff" />
      </Link>
    </div>
    {/* Copyright notice */}
    <div className={styles.rights}>All rights reserved</div>
    {/* Social media links */}
    <div className={styles.socials}>
      <a href="https://instagram.com" target="_blank" rel="noreferrer">
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
        </svg>
      </a>
      <a href="https://facebook.com" target="_blank" rel="noreferrer">
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
        </svg>
      </a>
      <a href="https://youtube.com" target="_blank" rel="noreferrer">
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`} />
        </svg>
      </a>
    </div>
  </section>
);

export default Footer;
