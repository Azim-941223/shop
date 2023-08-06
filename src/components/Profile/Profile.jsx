/**
 * Profile Component
 *
 * Страницу профиля пользователя.
 * Это позволяет пользователям обновлять информацию своего профиля, включая имя, адрес электронной почты, пароль и аватар.
 * Компонент извлекает данные текущего пользователя из хранилища Redux, используя состояние `currentUser` из слайса `user`.
 * Пользователи могут редактировать информацию профиля и отправлять изменения для обновления своего профиля с помощью действия «updateUser» из слайса «user».
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

// Состояние для управления входными значениями формы
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

// Устанавливаем данные текущего пользователя
  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

// Обработка изменения ввода для полей формы
  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

// Обработка отправки формы для обновления профиля
  const handleSubmit = (e) => {
    e.preventDefault();
// Проверяем, все ли поля формы не пусты
    const isNotEmpty = Object.values(values).every((val) => val);
    if (!isNotEmpty) return;
// Отправка updateUser для обновления профиля
    dispatch(updateUser(values));
  };

  return (
    <section className={styles.profile}>
      {!currentUser ? (
        <span>You need to log in</span>
      ) : (
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
          <button type="submit" className={styles.submit}>
            Update
          </button>
        </form>
      )}
    </section>
  );
};

export default Profile;
