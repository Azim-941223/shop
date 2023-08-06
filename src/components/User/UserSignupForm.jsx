import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../features/user/userSlice";
import styles from "./User.module.css";

/**
 * UserSignupForm Component
 *
 * Компонент UserSignupForm форма для регистрации пользователя. Это позволяет пользователям
 * ввести свое имя, адрес электронной почты, пароль и URL-адрес аватара. После успешной регистрации он
 * отправляет действие createUser для создания нового пользователя. Форма использует локальное состояние с параметром
 * хук useState для управления входными значениями и хук useDispatch из react-redux в
 * отправить действие.
 *
 * @param {Object} props - propsы.
 * @param {Function} props.toggleCurrentFormType - Функция для переключения между регистрацией и логином.
 * @param {Function} props.closeForm - Функция закрытия текущей формы.
 * @returns {JSX.Element} JSX-элемент.
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
   * Обновляет состояние новыми входными значениями, когда пользователь вводит данные.
   *
   * @param {Object} event - The input change.
   */
  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  /**
   * HandleSubmit
   *
   * Отправляет для создания нового пользователя, если все обязательные поля заполнены.
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
        <div
          className={styles.link}
          onClick={() => toggleCurrentFormType("login")}
        >
          I already have an account
        </div>
        <button type="submit" className={styles.submit}>
          Create an account
        </button>
      </form>
    </div>
  );
};

export default UserSignupForm;
