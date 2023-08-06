import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../features/user/userSlice";
import styles from "./User.module.css";

/**
 * UserSignupForm Component
 *
 * The UserSignupForm component represents a form for user registration. It allows users
 * to enter their name, email, password, and avatar URL. Upon successful registration, it
 * dispatches the createUser action to create a new user. The form uses local state with the
 * useState hook to manage input values and the useDispatch hook from `react-redux` to
 * dispatch the action.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.toggleCurrentFormType - A function to toggle between signup and login form.
 * @param {Function} props.closeForm - A function to close the current form.
 * @returns {JSX.Element} The JSX representation of the UserSignupForm component.
 */
const UserSignupForm = ({ toggleCurrentFormType, closeForm }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  /**
   * Handle Form Input Changes
   *
   * Updates the state with the new input values when the user types in the form fields.
   *
   * @param {Object} event - The input change event.
   */
  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  /**
   * Handle Form Submission
   *
   * Dispatches the createUser action to create a new user if all required fields are filled.
   *
   * @param {Object} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const isNotEmpty = Object.values(values).every((val) => val);
    if (!isNotEmpty) return;
    dispatch(createUser(values));
    closeForm();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Sign Up</div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Input fields for email, name, password, and avatar */}
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
        {/* Link to switch to the login form */}
        <div
          className={styles.link}
          onClick={() => toggleCurrentFormType("login")}
        >
          I already have an account
        </div>
        {/* Create an account button */}
        <button type="submit" className={styles.submit}>
          Create an account
        </button>
      </form>
    </div>
  );
};

export default UserSignupForm;
