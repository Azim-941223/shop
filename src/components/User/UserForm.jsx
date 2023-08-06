import React from "react";
import { useDispatch, useSelector } from "react-redux";
import UserSignupForm from "./UserSignupForm";
import UserLoginForm from "./UserLoginForm";
import styles from "./User.module.css";
import { toggleForm, toggleFormType } from "../../features/user/userSlice";

/**
 * UserForm Component
 *
 * Компонент UserForm отвечает за отображение формы регистрации или входа пользователя.
 * Он использует хук useSelector из `react-redux` для доступа к текущему состоянию пользовательской формы и хук useDispatch для
 * Отправка действий для переключения формы и изменения formType.
 *
 * @returns {JSX.Element} The JSX representation of the UserForm component.
 */
const UserForm = () => {
  const dispatch = useDispatch();
  const { showForm, formType } = useSelector(({ user }) => user);

  /**
   * Закрыть
   *
   * Отправляет действие для отключения пользовательской формы.
   */
  const closeForm = () => dispatch(toggleForm(false));

  /**
   *
   * Отправляет действие для изменения formType в магазине Redux.
   *
   * @param {string} type - Тип формы для переключения (либо «регистрация», либо «логин»).
   */
  const toggleCurrentFormType = (type) => dispatch(toggleFormType(type));

  return showForm ? (
    <>
      <div className={styles.overlay} onClick={closeForm} />
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
