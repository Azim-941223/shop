import React from "react";
import { useDispatch, useSelector } from "react-redux";
import UserSignupForm from "./UserSignupForm";
import UserLoginForm from "./UserLoginForm";
import styles from "./User.module.css";
import { toggleForm, toggleFormType } from "../../features/user/userSlice";

/**
 * UserForm Component
 *
 * The UserForm component is responsible for rendering the user signup or login form
 * based on the formType stored in the Redux store. It uses the useSelector hook from
 * `react-redux` to access the current state of the user form, and useDispatch hook to
 * dispatch actions to toggle the form and change the formType.
 *
 * @returns {JSX.Element} The JSX representation of the UserForm component.
 */
const UserForm = () => {
  const dispatch = useDispatch();
  const { showForm, formType } = useSelector(({ user }) => user);

  /**
   * Close the UserForm
   *
   * Dispatches an action to toggle the user form off when the overlay is clicked.
   */
  const closeForm = () => dispatch(toggleForm(false));

  /**
   * Toggle the Current Form Type
   *
   * Dispatches an action to change the formType in the Redux store.
   *
   * @param {string} type - The form type to toggle to (either "signup" or "login").
   */
  const toggleCurrentFormType = (type) => dispatch(toggleFormType(type));

  return showForm ? (
    <>
      {/* The overlay is displayed behind the form and closes the form when clicked */}
      <div className={styles.overlay} onClick={closeForm} />

      {/* Render the UserSignupForm or UserLoginForm based on the formType */}
      {formType === "signup" ? (
        <UserSignupForm
          toggleCurrentFormType={toggleCurrentFormType}
          closeForm={closeForm}
        />
      ) : (
        <UserLoginForm
          toggleCurrentFormType={toggleCurrentFormType}
          closeForm={closeForm}
        />
      )}
    </>
  ) : (
    <></>
  );
};

export default UserForm;
