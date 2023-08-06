/**
 * Header component for the website.
 * This component displays the website logo, user information, search bar,
 * favorites link, cart link, and cart item count.
 */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Header.module.css";
import LOGO from "../../images/logo.svg";
import AVATAR from "../../images/avatar.png";
import { toggleForm } from "../../features/user/userSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";

const Header = () => {
  // Redux Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, cart } = useSelector(({ user }) => user);

  // Component State
  const [searchValue, setSearchValue] = useState("");
  const [values, setValues] = useState({ name: "Guest", avatar: AVATAR });

  // Fetch products based on search value
  const { data, isLoading } = useGetProductsQuery({ title: searchValue });

  // Update user information when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
    }
  }, [currentUser]);

  // Handle user click event on user avatar section
  const handleClick = () => {
    if (!currentUser) {
      dispatch(toggleForm(true));
    } else {
      navigate('/profile');
    }
  };

  // Handle search input change
  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };

  return (
    <div className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>
        <Link to={'/'}>
          <img src={LOGO} alt="Stuff" />
        </Link>
      </div>

      {/* User Information and Search Bar */}
      <div className={styles.info}>
        {/* User Section */}
        <div className={styles.user} onClick={handleClick}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${values.avatar})` }}
          />
          <div className={styles.username}>{values.name}</div>
        </div>

        {/* Search Bar */}
        <form className={styles.form}>
          <div className={styles.icon}>
            {/* SVG icon for search */}
            <svg className="icon">
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
            </svg>
          </div>
          <div className={styles.input}>
            <input
              type="search"
              name="search"
              placeholder="Search for anything..."
              autoComplete="off"
              onChange={handleSearch}
              value={searchValue}
            />
          </div>
          {/* Display search results */}
          {searchValue && (
            <div className={styles.box}>
              {isLoading
                ? "Loading"
                : !data.length
                ? "No results"
                : data.map(({ title, images, id }) => {
                    return (
                      <Link
                        key={id}
                        onClick={() => setSearchValue("")}
                        className={styles.item}
                        to={`/products/${id}`}
                      >
                        <div
                          className={styles.image}
                          style={{ backgroundImage: `url(${images[0]})` }}
                        />
                        <div className={styles.title}>{title}</div>
                      </Link>
                    );
                  })}
            </div>
          )}
        </form>

        {/* User Account Section */}
        <div className={styles.account}>
          {/* Favorites link */}
          <Link to={'/'} className={styles.favourites}>
            <svg className={styles["icon-fav"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
          </Link>

          {/* Cart link with item count */}
          <Link to={'/cart'} className={styles.cart}>
            <svg className={styles["icon-cart"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            {!!cart.length && (
              <span className={styles.count}>{cart.length}</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
