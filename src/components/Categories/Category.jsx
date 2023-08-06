/**
 * Category Component
 *
 * Этот компонент отображает товары, принадлежащие к определенной категории, и предоставляет параметры фильтрации.
 * Он извлекает продукты из API на основе выбранной категории и критериев фильтрации.
 *
 * @component
 * @example
 * import Category from "./Category";
 * // Inside the parent component's render function, assuming 'id' is the category ID:
 * <Category />
 */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import styles from "./Category.module.css";
import Products from "../Products/Products";

const Category = () => {
  const { id } = useParams();
  const { list } = useSelector(({ categories }) => categories);

  // Значения по умолчанию для фильтрации продуктов
  const defaultValues = {
    title: "",
    price_min: 0,
    price_max: 0,
  };

  // Параметры по умолчанию для запроса API
  const defaultParams = {
    categoryId: id,
    limit: 5,
    offset: 0,
    ...defaultValues,
  };

  // Состояния для API
  const [isEnd, setEnd] = useState(false);
  const [cat, setCat] = useState(null);
  const [items, setItems] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);

  const { data = [], isLoading, isSuccess } = useGetProductsQuery(params);

// Сброс значений и элементов фильтра при изменении идентификатора категории
  useEffect(() => {
    if (!id) return;
    setValues(defaultValues);
    setItems([]);
    setEnd(false);
    setParams({ ...defaultParams, categoryId: id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

// Обновляем список элементов при успешном вызове API
  useEffect(() => {
    if (isLoading) return;
    if (!data.length) return setEnd(true);
    setItems((_items) => [..._items, ...data]);
  }, [data, isLoading]);

  // Найти и установить текущую информацию о категории из списка категорий
  useEffect(() => {
    if (!id || !list.length) return;
    const category = list.find((item) => item.id === id * 1);
    setCat(category);
  }, [list, id]);

  // Обработка изменений во входных данных фильтра и обновление значений фильтра
  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  // Обрабатывать отправку формы, чтобы инициировать запрос API с обновленными фильтрами.
  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([]);
    setEnd(false);
    setParams({ ...defaultParams, ...values });
  };

// Обработка нажатия кнопки сброса для сброса фильтров к их значениям по умолчанию
  const handleReset = () => {
    setValues(defaultValues);
    setParams(defaultParams);
    setEnd(false);
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{cat?.name}</h2>
      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Product name"
            value={values.title}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            onChange={handleChange}
            placeholder="0"
            value={values.price_min}
          />
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            onChange={handleChange}
            placeholder="0"
            value={values.price_max}
          />
          <span>Price to</span>
        </div>
        <button type="submit" hidden />
      </form>
      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.back}>
          <span>No results</span>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <Products
          title=""
          products={items}
          style={{ padding: 0 }}
          amount={items.length}
        />
      )}
      {!isEnd && (
        <div className={styles.more}>
          <button
            onClick={() =>
              setParams({ ...params, offset: params.offset + params.limit })
            }
          >
            See more
          </button>
        </div>
      )}
    </section>
  );
};

export default Category;
