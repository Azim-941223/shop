import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import styles from "./User.module.css";

/**
 * UserLoginForm Component
 *
 * Компонент UserLoginForm форма для входа пользователя. Это позволяет пользователям
 * вводить адрес электронной почты и пароль, и после успешного входа он отправляет loginUser
 * действие для аутентификации пользователя. Форма использует локальное состояние с хуком useState для
 * управления входными значениями и хуком useDispatch из `react-redux` для отправки действия.
 *
 * @param {Object} props - propsы.
 * @param {Function} props.toggleCurrentFormType - Функция для переключения между регистрацией и логином.
 * @param {Function} props.closeForm - Функция закрытия текущей формы.
 * @returns {JSX.Element} JSX-компонента UserLoginForm.
 */
const UserLoginForm = ({ toggleCurrentFormType, closeForm }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  /**
   * Handle Form изменение inputa
   *
   * Обновляет состояние новыми значениями, когда пользователь вводит данные.
   *
   * @param {Object} event - Input change.
   */
  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  /**
   * Обработка отправки формы
   *
   * Отправляет loginUser для аутентификации пользователя, если все обязательные поля заполнены.
   *
   * @param {Object} event - Отправка формы.
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
        {/* Ссылка для перехода к форме регистрации */}
        <div
          onClick={() => toggleCurrentFormType("signup")}
          className={styles.link}
        >
          Create an account
        </div>
        <button type="submit" className={styles.submit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLoginForm;
