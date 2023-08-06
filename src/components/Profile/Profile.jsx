/**
 * Profile Component
 *
 * This component represents the user profile page.
 * It allows users to update their profile information, including name, email, password, and avatar.
 * The component fetches the current user's data from the Redux store using the `currentUser` state from the `user` slice.
 * Users can edit their profile information and submit the changes to update their profile using the `updateUser` action from the `user` slice.
 *
 * @component
 * @example
 * import Profile from "./Profile";
 *
 * // Inside the parent component's render function:
 * <Profile />
 */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../../features/user/userSlice";

import styles from "./Profile.module.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);

  // State to manage the form input values
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  // Set the initial form input values with the current user's data
  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  // Handle input change for the form fields
  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  // Handle form submission to update the user profile
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all form fields are not empty
    const isNotEmpty = Object.values(values).every((val) => val);
    if (!isNotEmpty) return;
    // Dispatch the updateUser action to update the user profile
    dispatch(updateUser(values));
  };

  return (
    <section className={styles.profile}>
      {/* Display a message if the current user is not available (not logged in) */}
      {!currentUser ? (
        <span>You need to log in</span>
      ) : (
        // Display the user profile form if the current user is available
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.group}>
            <input
              type="email"
              placeholder="Your email"
              name="email"
              value={values.email}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type="name"
              placeholder="Your name"
              name="name"
              value={values.name}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type="password"
              placeholder="Your password"
              name="password"
              value={values.password}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type="avatar"
              placeholder="Your avatar"
              name="avatar"
              value={values.avatar}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>
          {/* Submit button to update the user profile */}
          <button type="submit" className={styles.submit}>
            Update
          </button>
        </form>
      )}
    </section>
  );
};

export default Profile;
