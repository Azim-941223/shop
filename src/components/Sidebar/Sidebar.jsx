import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

/**
 * Sidebar Component
 *
 * The Sidebar component represents a navigation sidebar displaying a list of categories
 * as clickable links. It uses React Redux's `useSelector` hook to access the category
 * list from the Redux store. The sidebar is styled using CSS modules through the `styles`
 * object imported from "./Sidebar.module.css".
 *
 * @returns {JSX.Element} The JSX representation of the Sidebar component.
 */
const Sidebar = () => {
  // Access the category list from the Redux store using useSelector
  const { list } = useSelector(({ categories }) => categories);

  return (
    <section className={styles.sidebar}>
      {/* Sidebar Title */}
      <div className={styles.title}>CATEGORIES</div>

      {/* Sidebar Navigation */}
      <nav>
        <ul className={styles.menu}>
          {/* Map through the category list and create NavLink for each category */}
          {list.map(({ id, name }) => (
            <li key={id}>
              <NavLink
                // Set className based on whether the NavLink represents the active route
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
                to={`/categories/${id}`}
              >
                {/* Display the category name */}
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className={styles.footer}>
        {/* Help Link */}
        <a href="/help" target="_blank" className={styles.link}>
          Help
        </a>

        {/* Terms & Conditions Link */}
        <a
          href="/terms"
          target="_blank"
          className={styles.link}
          style={{ textDecoration: "underline" }}
        >
          Terms & Conditions
        </a>
      </div>
    </section>
  );
};

export default Sidebar;
