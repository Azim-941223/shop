import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import styles from "./User.module.css";

/**
 * UserLoginForm Component
 *
 * The UserLoginForm component represents a form for user login. It allows users to
 * enter their email and password, and upon successful login, it dispatches the loginUser
 * action to authenticate the user. The form uses local state with the useState hook to
 * manage input values and the useDispatch hook from `react-redux` to dispatch the action.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.toggleCurrentFormType - A function to toggle between signup and login form.
 * @param {Function} props.closeForm - A function to close the current form.
 * @returns {JSX.Element} The JSX representation of the UserLoginForm component.
 */
const UserLoginForm = ({ toggleCurrentFormType, closeForm }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
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
   * Dispatches the loginUser action to authenticate the user if all required fields are filled.
   *
   * @param {Object} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const isNotEmpty = Object.values(values).every((val) => val);
    if (!isNotEmpty) return;
    dispatch(loginUser(values));
    closeForm();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>
      <div className={styles.title}>Log In</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Input fields for email and password */}
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
            type="password"
            placeholder="Your password"
            name="password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        {/* Link to switch to the signup form */}
        <div
          onClick={() => toggleCurrentFormType("signup")}
          className={styles.link}
        >
          Create an account
        </div>
        {/* Login button */}
        <button type="submit" className={styles.submit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLoginForm;
